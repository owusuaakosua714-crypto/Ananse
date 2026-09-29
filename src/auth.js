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

/**
 * ANANSE — runtime configuration.
 *
 * Every environment-specific value lives here so nothing else in the
 * frontend has to know where the backend is running. Replace the
 * placeholders below when you deploy.
 */

export const CONFIG = {
    /** FastAPI base URL. Change this once when you deploy the backend. */
    apiBaseUrl: "https://ananse-backend-jxx4g7gab-owusuaa.vercel.app/",

    /** Placeholder — the AI key itself never lives in the frontend. */
    naaServiceHint: "Naa runs through the backend at /api/naa/ask",

    /** Keys used for the offline cache in the browser. */
    storageKeys: {
        session: "ananse.session",
        passport: "ananse.passport",
        preferences: "ananse.preferences",
        offlinePacks: "ananse.offline.packs"
    },

    /** How long a cached API response is treated as fresh, in minutes. */
    cacheMinutes: 30,

    /** When true, the UI falls back to bundled data if the API is unreachable. */
    allowOfflineFallback: true
};

export default CONFIG;
