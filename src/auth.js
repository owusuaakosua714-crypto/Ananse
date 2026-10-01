/**
 * ANANSE — runtime configuration.
 *
 * Every environment-specific value lives here so nothing else in the
 * frontend has to know where the backend is running. Replace the
 * placeholders below when you deploy.
 */

export const CONFIG = {
    /** FastAPI base URL. Change this once when you deploy the backend. */
    apiBaseUrl: "https://ananse-backend.vercel.app",

    /** Placeholder — the AI key itself never lives in the frontend. */
    naaServiceHint: "Naa runs through the backend at /api/naa/ask",

    /** Keys used for the offline cache in the browser. */
    storageKeys: {
        session: "ananse.session",
        passport: "ananse.passport",
        preferences: "ananse.preferences",
    },

    

    /** How long a cached API response is treated as fresh, in minutes. */
    cacheMinutes: 30,

    /** When true, the UI falls back to bundled data if the API is unreachable. */
    allowOfflineFallback: true
};


export default CONFIG;

fetch(`${CONFIG.apiBaseUrl}/api/sites`)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched heritage sites:', data);
    })
    .catch(error => {
        console.error('Error fetching heritage sites:', error);
    });
