(() => {
    const SESSION_KEY = 'ananse_session';

    function getSession() {
        try {
            const session = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (!session || typeof session.email !== 'string' || !['admin', 'user'].includes(session.role)) {
                return null;
            }
            return session;
        } catch {
            return null;
        }
    }

    function setSession(session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    window.ananseAuth = { getSession, setSession, clearSession };
})();