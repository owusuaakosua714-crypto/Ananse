/**
 * ANANSE — shared session + backend connection.
 * Loaded on every page (before script.js) so the signed-in state
 * survives moving between pages.
 */
(() => {
    // ---- The ONE place the backend address lives ----
    const API_BASE_URL = 'https://ananse-backend.vercel.app';

    const SESSION_KEY = 'ananse_session';
    const LAST_ACTIVITY_KEY = 'ananse_session_last_activity';
    const LAST_REFRESH_KEY = 'ananse_session_last_refresh';
    const IDLE_TIMEOUT_MS = 20 * 60 * 1000;
    const TOKEN_REFRESH_INTERVAL_MS = 60 * 1000;
    const ACTIVITY_EVENTS = ['keydown', 'mousedown', 'pointerdown', 'pointermove', 'scroll', 'touchstart', 'wheel'];
    let idleCheckTimer = null;
    let lastActivityWriteAt = 0;
    let lastTokenRefreshAt = 0;
    let refreshInProgress = null;
    let monitorInstalled = false;

    function getSession() {
        try {
            const session = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (!session || typeof session.email !== 'string' || !session.token ||
                !['admin', 'user'].includes(session.role)) {
                return null;
            }
            return session;
        } catch {
            return null;
        }
    }

    function setSession(session) {
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch { /* private mode */ }
    }

    function clearSession() {
        try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
        try { localStorage.removeItem(LAST_ACTIVITY_KEY); } catch { /* ignore */ }
        try { localStorage.removeItem(LAST_REFRESH_KEY); } catch { /* ignore */ }
    }

    function readLastActivity(session) {
        try {
            const stored = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
            if (Number.isFinite(stored) && stored > 0) return stored;
        } catch { /* use the sign-in timestamp when browser storage is unavailable */ }

        const signedInAt = Date.parse(session.loggedAt || '');
        return Number.isFinite(signedInAt) ? signedInAt : Date.now();
    }

    function writeLastActivity(timestamp) {
        try { localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp)); } catch { /* private mode */ }
        lastActivityWriteAt = timestamp;
    }

    function loginPageFor(session) {
        const inPages = window.location.pathname.includes('/pages/');
        const page = session?.role === 'admin' ? 'admin-login.html' : 'login.html';
        return inPages ? page : `pages/${page}`;
    }

    function showTimeoutNotice(force = false) {
        if (force || window.location.search.includes('reason=timeout')) {
            const notice = document.getElementById('sessionTimeoutNotice');
            if (notice) {
                notice.hidden = false;
                notice.textContent = 'Your session ended after 20 minutes of inactivity. Please sign in again.';
            }

            const adminAlert = document.getElementById('adminLoginAlert');
            if (adminAlert) {
                adminAlert.hidden = false;
                adminAlert.textContent = 'Your session ended after 20 minutes of inactivity. Please sign in again.';
            }
        }
    }

    function expireSession(session) {
        clearSession();
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html' || currentPage === 'admin-login.html') {
            showTimeoutNotice(true);
            return;
        }
        window.location.replace(`${loginPageFor(session)}?reason=timeout`);
    }

    function scheduleIdleCheck() {
        if (idleCheckTimer) window.clearTimeout(idleCheckTimer);
        const session = getSession();
        if (!session) return;

        const remaining = IDLE_TIMEOUT_MS - (Date.now() - readLastActivity(session));
        if (remaining <= 0) {
            expireSession(session);
            return;
        }
        idleCheckTimer = window.setTimeout(() => {
            const currentSession = getSession();
            if (!currentSession) return;
            if (Date.now() - readLastActivity(currentSession) >= IDLE_TIMEOUT_MS) {
                expireSession(currentSession);
            } else {
                scheduleIdleCheck();
            }
        }, remaining + 25);
    }

    async function refreshActiveSession() {
        const session = getSession();
        if (!session || refreshInProgress) return;

        const now = Date.now();
        let lastRefresh = lastTokenRefreshAt;
        try {
            lastRefresh = Math.max(lastRefresh, Number(localStorage.getItem(LAST_REFRESH_KEY)) || 0);
        } catch { /* use the in-memory refresh timestamp */ }
        if (now - lastRefresh < TOKEN_REFRESH_INTERVAL_MS) return;

        refreshInProgress = (async () => {
            try {
                const data = await api('/api/auth/refresh', { method: 'POST' });
                const currentSession = getSession();
                if (!currentSession) return;

                const refreshedAt = Date.now();
                setSession({
                    ...currentSession,
                    token: data.access_token,
                    tokenUpdatedAt: new Date(refreshedAt).toISOString(),
                });
                lastTokenRefreshAt = refreshedAt;
                try { localStorage.setItem(LAST_REFRESH_KEY, String(refreshedAt)); } catch { /* private mode */ }
            } catch (error) {
                if (error.status === 401) {
                    expireSession(session);
                } else {
                    console.error('Could not refresh the active ANANSE session.', error);
                }
            } finally {
                refreshInProgress = null;
            }
        })();
        await refreshInProgress;
    }

    function recordActivity() {
        const session = getSession();
        if (!session) return;

        const now = Date.now();
        if (now - readLastActivity(session) >= IDLE_TIMEOUT_MS) {
            expireSession(session);
            return;
        }

        if (now - lastActivityWriteAt >= 1000) writeLastActivity(now);
        scheduleIdleCheck();
        void refreshActiveSession();
    }

    function startSessionMonitor() {
        if (!monitorInstalled) {
            ACTIVITY_EVENTS.forEach(eventName => {
                document.addEventListener(eventName, recordActivity, { passive: true });
            });
            window.addEventListener('storage', event => {
                if (event.key === LAST_ACTIVITY_KEY) {
                    lastActivityWriteAt = Number(event.newValue) || 0;
                    scheduleIdleCheck();
                }
                if (event.key === SESSION_KEY && !event.newValue && event.oldValue) {
                    let oldSession = null;
                    try { oldSession = JSON.parse(event.oldValue); } catch { /* ignore malformed old session */ }
                    if (oldSession) window.location.replace(loginPageFor(oldSession));
                }
            });
            monitorInstalled = true;
        }

        const session = getSession();
        if (!session) return;

        const lastActivity = readLastActivity(session);
        if (Date.now() - lastActivity >= IDLE_TIMEOUT_MS) {
            expireSession(session);
            return;
        }

        writeLastActivity(lastActivity);
        const tokenUpdatedAt = Date.parse(session.tokenUpdatedAt || session.loggedAt || '');
        lastTokenRefreshAt = Number.isFinite(tokenUpdatedAt) ? tokenUpdatedAt : Date.now();
        scheduleIdleCheck();
    }

    /** Save the { access_token, user } reply from /auth/login or /auth/register. */
    function saveTokenResponse(data) {
        const user = data.user || {};
        const now = new Date();
        const session = {
            email: user.email,
            name: user.full_name || (user.email || '').split('@')[0],
            role: user.role === 'admin' ? 'admin' : 'user',
            token: data.access_token,
            loggedAt: now.toISOString(),
            tokenUpdatedAt: now.toISOString(),
        };
        setSession(session);
        writeLastActivity(now.getTime());
        lastTokenRefreshAt = now.getTime();
        startSessionMonitor();
        return session;
    }

    /** fetch() against the backend, adding the sign-in token when there is one. */
    async function api(path, options = {}) {
        const session = getSession();
        const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
        if (session) headers.Authorization = `Bearer ${session.token}`;

        const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
        let data = null;
        try { data = await response.json(); } catch { /* empty body */ }

        if (!response.ok) {
            // Only a real 401 from the server signs you out — never a network blip.
            if (response.status === 401 && session && !path.startsWith('/api/auth/login')) {
                clearSession();
            }
            const detail = data && data.detail;
            const message = typeof detail === 'string'
                ? detail
                : Array.isArray(detail) && detail[0] && detail[0].msg ? detail[0].msg
                : `Server returned status ${response.status}`;
            const error = new Error(message);
            error.status = response.status;
            throw error;
        }
        return data;
    }

    function logout() {
        clearSession();
        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? '../index.html' : 'index.html';
    }

    /** Swap Login / Sign Up for account actions, and add Log out everywhere else. */
    function updateNav() {
        const session = getSession();
        if (!session) return;
        const inPages = window.location.pathname.includes('/pages/');
        const passportHref = inPages ? 'passport.html' : 'pages/passport.html';

        document.querySelectorAll('a.btn-nav-login').forEach(link => {
            link.removeAttribute('data-i18n'); // stop the translator overwriting it
            link.textContent = 'My Passport';
            link.href = passportHref;
        });
        document.querySelectorAll('a.btn-nav-signup').forEach(link => {
            if (link.dataset.logout) return;
            link.dataset.logout = '1';
            link.removeAttribute('data-i18n');
            link.textContent = 'Log out';
            link.href = '#';
            link.addEventListener('click', e => { e.preventDefault(); logout(); });
        });

        // Add the logout action to header menus that do not already have
        // Login / Sign Up controls. The map page has separate desktop and mobile menus.
        const menus = document.querySelectorAll(
            '#passportNav, #naaNav, #aboutNavLinks, #planNavContent, #adminNav, ' +
            '.nav-menu, .login-desktop-nav, .desktop-nav, .mobile-nav, ' +
            'header nav.ananse-standard-menu, header .ananse-standard-menu'
        );

        menus.forEach(menu => {
            if (menu.querySelector('[data-ananse-session-logout]')) return;
            if (menu.querySelector('a[data-logout="1"]')) return;

            const out = document.createElement('a');
            out.id = menu.id === 'passportNav' ? 'passportLogout' : '';
            out.className = 'btn-nav btn-nav-signup ananse-session-logout';
            out.dataset.ananseSessionLogout = '1';
            out.href = '#';
            out.title = `Signed in as ${session.email}`;
            out.textContent = 'Log out';
            out.addEventListener('click', e => { e.preventDefault(); logout(); });

            if (menu.tagName === 'UL') {
                const item = document.createElement('li');
                item.appendChild(out);
                menu.appendChild(item);
            } else {
                menu.appendChild(out);
            }
        });
    }

    /** Guests can use the local passport; verify a token only for signed-in visitors. */
    function guardPassport() {
        if (!document.body.classList.contains('passport-page')) return;
        if (!getSession()) return;
        // Confirm the token is still accepted (a 401 clears it inside api()).
        api('/api/auth/me').catch(err => {
            if (err.status === 401) window.location.replace('login.html');
        });
    }

    window.ananseAuth = {
        API_BASE_URL, getSession, setSession, clearSession, saveTokenResponse, api, logout,
    };

    const start = () => { showTimeoutNotice(); startSessionMonitor(); guardPassport(); updateNav(); };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    // language.js re-renders text after load; re-apply once it has run.
    window.addEventListener('load', () => setTimeout(updateNav, 50));
})();
