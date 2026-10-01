/**
 * ANANSE — shared session + backend connection.
 * Loaded on every page (before script.js) so the signed-in state
 * survives moving between pages.
 */
(() => {
    // ---- The ONE place the backend address lives ----
    const API_BASE_URL = 'https://ananse-backend.vercel.app';

    const SESSION_KEY = 'ananse_session';

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
    }

    /** Save the { access_token, user } reply from /auth/login or /auth/register. */
    function saveTokenResponse(data) {
        const user = data.user || {};
        const session = {
            email: user.email,
            name: user.full_name || (user.email || '').split('@')[0],
            role: user.role === 'admin' ? 'admin' : 'user',
            token: data.access_token,
            loggedAt: new Date().toISOString(),
        };
        setSession(session);
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

    /** Swap "Login / Sign Up" for "My Passport / Log out" on every page. */
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

        // Passport page: show who is signed in, with a log-out link.
        const passportNav = document.getElementById('passportNav');
        if (passportNav && !document.getElementById('passportLogout')) {
            const out = document.createElement('a');
            out.id = 'passportLogout';
            out.href = '#';
            out.title = `Signed in as ${session.email}`;
            out.innerHTML = '<span>Log out</span>';
            out.addEventListener('click', e => { e.preventDefault(); logout(); });
            passportNav.appendChild(out);
        }
    }

    /** The passport needs an account: send signed-out visitors to log in. */
    function guardPassport() {
        if (!document.body.classList.contains('passport-page')) return;
        if (!getSession()) {
            window.location.replace('login.html');
            return;
        }
        // Confirm the token is still accepted (a 401 clears it inside api()).
        api('/api/auth/me').catch(err => {
            if (err.status === 401) window.location.replace('login.html');
        });
    }

    window.ananseAuth = {
        API_BASE_URL, getSession, setSession, clearSession, saveTokenResponse, api, logout,
    };

    const start = () => { guardPassport(); updateNav(); };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    // language.js re-renders text after load; re-apply once it has run.
    window.addEventListener('load', () => setTimeout(updateNav, 50));
})();
