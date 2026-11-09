(function () {
    "use strict";

    const SITE_KEY = "ananseAdminSitesV1";
    const CONTENT_FACT_KEY = "ananseContentV1";
    const TRAIL_FACT_KEY = "ananseTrailV1";
    const NAA_NOTES_KEY = "Naa reference notes";
    const API_BASE = window.ananseAuth && window.ananseAuth.API_BASE_URL || "https://ananse-backend.vercel.app";
    const ID_BY_SLUG = {
        "cape-coast-castle": "cape-coast",
        "manhyia-palace": "manhyia",
        "osu-castle": "osu",
        "independence-arch": "independence",
        "kwame-nkrumah-memorial-park": "kwame-nkrumah"
    };
    const DEFAULT_SITES = [
        {
            id: "cape-coast",
            slug: "cape-coast-castle",
            name: "Cape Coast Castle",
            location: "Cape Coast, Central Region",
            region: "central",
            category: "historical",
            lat: 5.1053,
            lng: -1.2466,
            description: "Explore Cape Coast Castle and discover powerful stories of Ghana's history, resilience, the transatlantic slave trade, and the journey toward freedom.",
            coverImage: "../images/cape coast castle.jpeg",
            storyPage: "capecoast.html",
            story: "",
            images: []
        },
        {
            id: "manhyia",
            slug: "manhyia-palace",
            name: "Manhyia Palace",
            location: "Kumasi, Ashanti Region",
            region: "ashanti",
            category: "palaces",
            lat: 6.6989,
            lng: -1.6244,
            description: "Discover the history, culture and traditions of the Ashanti Kingdom through the story of Manhyia Palace.",
            coverImage: "../images/Manhyia Palace.jpeg",
            storyPage: "manhyia.html",
            story: "",
            images: []
        },
        {
            id: "osu",
            slug: "osu-castle",
            name: "Osu Castle",
            location: "Osu, Greater Accra Region",
            region: "greater-accra",
            category: "historical",
            lat: 5.5502,
            lng: -0.1785,
            description: "Explore Osu Castle and uncover its place in Ghana's coastal, colonial and political history.",
            coverImage: "../images/osu castle (1).jpeg",
            storyPage: "osucastle.html",
            story: "",
            images: []
        },
        {
            id: "independence",
            slug: "independence-arch",
            name: "Independence Square",
            location: "Accra, Greater Accra Region",
            region: "greater-accra",
            category: "monuments",
            lat: 5.5459,
            lng: -0.1969,
            description: "Discover the symbolic heart of Ghana's independence and the national story represented by Independence Square.",
            coverImage: "../images/INDEPENDENCE ARCH (1).jpeg",
            storyPage: "independence.html",
            story: "",
            images: []
        },
        {
            id: "kwame-nkrumah",
            slug: "kwame-nkrumah-memorial-park",
            name: "Kwame Nkrumah Memorial Park",
            location: "Accra, Greater Accra Region",
            region: "greater-accra",
            category: "monuments",
            lat: 5.5449,
            lng: -0.2058,
            description: "Discover the legacy of Dr. Kwame Nkrumah and the story of Ghana's independence at Kwame Nkrumah Memorial Park.",
            coverImage: "../images/kwame Nkrumah memorial park.jpeg",
            storyPage: "kwamepark.html",
            story: "",
            images: []
        }
    ];

    function readSitesState() {
        try {
            const parsed = JSON.parse(window.localStorage.getItem(SITE_KEY) || "{}");
            return {
                sites: parsed.sites && typeof parsed.sites === "object" ? parsed.sites : {},
                removed: Array.isArray(parsed.removed) ? parsed.removed : []
            };
        } catch (error) {
            return { sites: {}, removed: [] };
        }
    }

    function cleanSite(site) {
        return {
            id: String(site.id || ""),
            slug: String(site.slug || site.id || ""),
            apiId: Number(site.apiId) || null,
            name: String(site.name || ""),
            location: String(site.location || ""),
            region: String(site.region || ""),
            category: String(site.category || "historical"),
            lat: site.lat == null || site.lat === "" ? null : Number(site.lat),
            lng: site.lng == null || site.lng === "" ? null : Number(site.lng),
            apiCategory: String(site.apiCategory || ""),
            apiRegion: String(site.apiRegion || ""),
            hidden: Boolean(site.hidden),
            localOnly: Boolean(site.localOnly),
            facts: site.facts && typeof site.facts === "object" ? site.facts : {},
            naaNotes: String(site.naaNotes || ""),
            trail: site.trail && typeof site.trail === "object" ? {
                title: String(site.trail.title || ""),
                introduction: String(site.trail.introduction || ""),
                highlights: Array.isArray(site.trail.highlights) ? site.trail.highlights.map(String).filter(Boolean) : [],
                stops: Array.isArray(site.trail.stops) ? site.trail.stops.map(function (stop) {
                    return {
                        id: String(stop.id || ""),
                        name: String(stop.name || ""),
                        blurb: String(stop.blurb || ""),
                        content: String(stop.content || ""),
                        image: String(stop.image || ""),
                        caption: String(stop.caption || "")
                    };
                }) : []
            } : null,
            description: String(site.description || ""),
            coverImage: String(site.coverImage || ""),
            storyPage: String(site.storyPage || ""),
            story: String(site.story || ""),
            images: Array.isArray(site.images) ? site.images.map(function (image) {
                return {
                    src: String(image.src || ""),
                    caption: String(image.caption || ""),
                    after: Math.max(0, Number(image.after) || 0)
                };
            }).filter(function (image) { return image.src; }) : []
        };
    }

    function regionCode(region) {
        return String(region || "").toLowerCase().trim().replace(/\s+/g, "-");
    }

    function categoryCode(category) {
        const value = String(category || "").toLowerCase();
        if (value.includes("palace") || value.includes("royal")) return "palaces";
        if (value.includes("monument")) return "monuments";
        return "historical";
    }

    function siteFromApi(record) {
        const id = ID_BY_SLUG[record.slug] || record.slug;
        const defaultSite = DEFAULT_SITES.find(function (site) { return site.id === id; });
        const facts = record.facts && typeof record.facts === "object" ? record.facts : {};
        let content = {};
        try { content = JSON.parse(facts[CONTENT_FACT_KEY] || "{}"); } catch (error) { content = {}; }
        let trail = null;
        try { trail = JSON.parse(facts[TRAIL_FACT_KEY] || "null"); } catch (error) { trail = null; }
        return cleanSite({
            id: id,
            slug: record.slug,
            apiId: record.id,
            name: record.name,
            location: content.location || (defaultSite && defaultSite.location) || record.region,
            region: regionCode(record.region),
            category: categoryCode(record.category),
            lat: record.latitude,
            lng: record.longitude,
            apiCategory: record.category,
            apiRegion: record.region,
            hidden: Boolean(content.hidden),
            facts: facts,
            naaNotes: facts[NAA_NOTES_KEY] || "",
            trail: trail,
            description: record.summary,
            coverImage: content.coverImage || (defaultSite && defaultSite.coverImage) || "",
            storyPage: defaultSite && defaultSite.storyPage,
            story: Array.isArray(record.history) ? record.history.join("\n\n") : "",
            images: content.images || []
        });
    }

    function getLocalSites() {
        const state = readSitesState();
        const removed = new Set(state.removed);
        const defaults = DEFAULT_SITES.filter(function (site) {
            return !removed.has(site.id);
        }).map(function (site) {
            const merged = Object.assign({}, site, state.sites[site.id] || {});
            if (!Number.isFinite(Number(merged.lat))) merged.lat = site.lat;
            if (!Number.isFinite(Number(merged.lng))) merged.lng = site.lng;
            return cleanSite(merged);
        });
        const defaultIds = new Set(DEFAULT_SITES.map(function (site) { return site.id; }));
        const added = Object.keys(state.sites).filter(function (id) {
            return !defaultIds.has(id) && !removed.has(id);
        }).map(function (id) { return cleanSite(state.sites[id]); });
        return defaults.concat(added);
    }

    function saveLocalSite(site) {
        const state = readSitesState();
        state.sites[site.id] = cleanSite(site);
        state.removed = state.removed.filter(function (id) { return id !== site.id; });
        try {
            window.localStorage.setItem(SITE_KEY, JSON.stringify(state));
            return cleanSite(Object.assign({}, site, { localOnly: true }));
        } catch (error) {
            return false;
        }
    }

    function removeLocalSite(id) {
        const state = readSitesState();
        delete state.sites[id];
        if (state.removed.indexOf(id) === -1) state.removed.push(id);
        try {
            window.localStorage.setItem(SITE_KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            return false;
        }
    }

    let remoteSites = null;
    const ready = loadSites();

    async function loadSites() {
        const controller = new AbortController();
        const timeout = setTimeout(function () { controller.abort(); }, 6000);
        try {
            const response = await fetch(API_BASE + "/api/sites", { signal: controller.signal });
            if (!response.ok) throw new Error("Could not load heritage sites.");
            const records = await response.json();
            if (!Array.isArray(records)) throw new Error("Unexpected site catalog response.");
            const apiSites = records.map(siteFromApi);
            const apiSlugs = new Set(records.map(function (site) { return site.slug; }));
            const missingDefaults = DEFAULT_SITES.filter(function (site) {
                return !apiSlugs.has(site.slug);
            }).map(cleanSite);
            remoteSites = apiSites.filter(function (site) { return !site.hidden; }).concat(missingDefaults);
            return remoteSites.slice();
        } catch (error) {
            remoteSites = null;
            return getLocalSites();
        } finally {
            clearTimeout(timeout);
        }
    }

    function getSites() {
        return remoteSites ? remoteSites.slice() : getLocalSites();
    }

    function getSite(id) {
        return getSites().find(function (site) { return site.id === id; }) || null;
    }

    function apiCategory(category) {
        return {
            historical: "Forts and castles",
            palaces: "Palaces and royal history",
            monuments: "Monuments"
        }[category] || "Historical sites";
    }

    function apiRegion(region) {
        return String(region || "").split("-").map(function (part) {
            return part.charAt(0).toUpperCase() + part.slice(1);
        }).join(" ");
    }

    function apiPayload(site, includeSlug) {
        const facts = Object.assign({}, site.facts || {});
        facts[CONTENT_FACT_KEY] = JSON.stringify({
            coverImage: site.coverImage,
            location: site.location,
            images: site.images || [],
            hidden: Boolean(site.hidden)
        });
        if (site.trail) facts[TRAIL_FACT_KEY] = JSON.stringify(site.trail);
        else delete facts[TRAIL_FACT_KEY];
        if (site.naaNotes) facts[NAA_NOTES_KEY] = site.naaNotes;
        else delete facts[NAA_NOTES_KEY];
        const payload = {
            name: site.name,
            region: site.apiRegion && regionCode(site.apiRegion) === site.region ? site.apiRegion : apiRegion(site.region),
            category: site.apiCategory && categoryCode(site.apiCategory) === site.category ? site.apiCategory : apiCategory(site.category),
            latitude: Number(site.lat),
            longitude: Number(site.lng),
            summary: site.description,
            history: (site.story || "").split(/\n\s*\n/).map(function (paragraph) { return paragraph.trim(); }).filter(Boolean),
            facts: facts
        };
        if (includeSlug) payload.slug = site.slug || site.id;
        return payload;
    }

    async function saveRemoteSite(site) {
        const clean = cleanSite(site);
        if (!clean.id || !clean.name || !clean.location || !clean.description || !clean.coverImage ||
            !Number.isFinite(clean.lat) || !Number.isFinite(clean.lng) || clean.lat < -90 || clean.lat > 90 || clean.lng < -180 || clean.lng > 180) return false;
        if (!window.ananseAuth) throw new Error("Administrator session is unavailable.");
        const isUpdate = Boolean(clean.apiId);
        const endpoint = isUpdate ? "/api/sites/id/" + clean.apiId : "/api/sites";
        let response;
        try {
            response = await window.ananseAuth.api(endpoint, {
                method: isUpdate ? "PUT" : "POST",
                body: JSON.stringify(apiPayload(clean, !isUpdate))
            });
        } catch (error) {
            if (remoteSites === null) return saveLocalSite(clean);
            throw error;
        }
        const saved = siteFromApi(response);
        if (remoteSites) {
            const index = remoteSites.findIndex(function (item) { return item.id === saved.id; });
            if (index === -1) remoteSites.push(saved);
            else remoteSites[index] = saved;
        }
        return saved;
    }

    async function deleteRemoteSite(site) {
        if (!site || !window.ananseAuth) throw new Error("This site is not connected to the shared catalog.");
        if (remoteSites === null) {
            if (!removeLocalSite(site.id)) throw new Error("Could not save this change in browser storage.");
            return { localOnly: true };
        }
        const isBuiltIn = DEFAULT_SITES.some(function (item) { return item.id === site.id; });
        if (site.apiId && isBuiltIn) {
            await window.ananseAuth.api("/api/sites/id/" + site.apiId, {
                method: "PUT",
                body: JSON.stringify(apiPayload(Object.assign({}, site, { hidden: true }), false))
            });
        } else if (site.apiId) {
            await window.ananseAuth.api("/api/sites/id/" + site.apiId, { method: "DELETE" });
        } else {
            await window.ananseAuth.api("/api/sites", {
                method: "POST",
                body: JSON.stringify(apiPayload(Object.assign({}, site, { hidden: true }), true))
            });
        }
        if (remoteSites) remoteSites = remoteSites.filter(function (item) { return item.id !== site.id; });
        return { localOnly: false };
    }

    window.ananseSiteContent = {
        getSites: getSites,
        getSite: getSite,
        loadSites: loadSites,
        ready: ready,
        isRemote: function () { return remoteSites !== null; },
        saveRemoteSite: saveRemoteSite,
        deleteRemoteSite: deleteRemoteSite
    };
})();
