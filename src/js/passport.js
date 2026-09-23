/* ==========================================================================
   ANANSE — Passport page
   All progress lives in localStorage under ANANSE_PROGRESS_KEY, in a shape
   that maps directly onto a future API response, e.g.
   GET /api/users/me/progress -> { points, sites: { "cape-coast": {...} } }
   Swap loadProgress()/saveProgress() for fetch() calls later; nothing else
   in this file needs to change.
   ========================================================================== */
(function () {
    const STORAGE_KEY = "ananseProgress";

    const SITES = [
        { id: "cape-coast", name: "Cape Coast Castle", location: "Cape Coast, Central Region", badgeTitle: "Cape Coast Heritage Explorer", image: "../images/cape-coast-castle.jpg" },
        { id: "manhyia", name: "Manhyia Palace", location: "Kumasi, Ashanti Region", badgeTitle: "Manhyia Heritage Explorer", image: "../images/manhyia-palace.jpg" },
        { id: "osu", name: "Osu Castle", location: "Osu, Greater Accra Region", badgeTitle: "Osu Heritage Explorer", image: "../images/osu-castle.jpg" },
        { id: "independence", name: "Independence Square", location: "Accra, Greater Accra Region", badgeTitle: "Independence Heritage Explorer", image: "../images/independence-square.jpg" },
        { id: "kwame-nkrumah", name: "Kwame Nkrumah Memorial Park", location: "Accra, Greater Accra Region", badgeTitle: "Kwame Nkrumah Heritage Explorer", image: "../images/kwame-nkrumah-memorial.jpg" }
    ];

    const POINTS = {
        discover: 5,
        story: 5,
        didYouKnow: 5,
        audio: 2, // bonus, optional — never required for a badge
        askNaa: 5
    };

    // Max points shown on the points bar: every site fully completed
    // including the optional audio bonus .
    const POINTS_MAX = SITES.length * (POINTS.discover + POINTS.story + POINTS.didYouKnow + POINTS.audio + POINTS.askNaa);

    function defaultSiteState() {
        return {
            discovered: false,
            story: false,
            didYouKnow: false,
            audio: false,
            askNaa: false,
            badgeEarned: false,
            earnedDate: null
        };
    }

    function defaultProgress() {
        const sites = {};
        SITES.forEach(function (s) { sites[s.id] = defaultSiteState(); });
        return {
            user: { name: "Username", passportId: "AN-2025-001", issueDate: "27 Apr 2025", expiryDate: "27 Apr 2030" },
            sites: sites
        };
    }

    function loadProgress() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultProgress();
            const parsed = JSON.parse(raw);
            // Merge with defaults so a newly-added site never crashes an old save
            const base = defaultProgress();
            base.user = Object.assign(base.user, parsed.user || {});
            SITES.forEach(function (s) {
                base.sites[s.id] = Object.assign(defaultSiteState(), (parsed.sites && parsed.sites[s.id]) || {});
            });
            return base;
        } catch (err) {
            return defaultProgress();
        }
    }

    function saveProgress(progress) {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (err) {
            /* localStorage unavailable — progress just won't persist */
        }
    }

    let progress = loadProgress();

    // ---- Derived values ----
    function sitePoints(siteState) {
        let pts = 0;
        if (siteState.discovered) pts += POINTS.discover;
        if (siteState.story) pts += POINTS.story;
        if (siteState.didYouKnow) pts += POINTS.didYouKnow;
        if (siteState.audio) pts += POINTS.audio; // bonus, optional
        if (siteState.askNaa) pts += POINTS.askNaa;
        return pts;
    }

    function totalPoints() {
        return SITES.reduce(function (sum, s) { return sum + sitePoints(progress.sites[s.id]); }, 0);
    }

    // Badge unlock rule: Discover + Story + Did You Know + Ask Naa.
    // Audio is deliberately excluded — it is bonus-only, never required.
    function isBadgeEligible(siteState) {
        return siteState.discovered && siteState.story && siteState.didYouKnow && siteState.askNaa;
    }

    function syncBadges() {
        SITES.forEach(function (s) {
            const state = progress.sites[s.id];
            if (isBadgeEligible(state) && !state.badgeEarned) {
                state.badgeEarned = true;
                state.earnedDate = new Date().toISOString().slice(0, 10);
            }
        });
    }

    function earnedBadgeCount() {
        return SITES.filter(function (s) { return progress.sites[s.id].badgeEarned; }).length;
    }

    function stepCompletionCount(step) {
        // step: discover | learn (story) | asknaa | badge
        const map = { discover: "discovered", learn: "story", asknaa: "askNaa", badge: "badgeEarned" };
        const field = map[step];
        return SITES.filter(function (s) { return progress.sites[s.id][field]; }).length;
    }

    // ==========================================================================
    // RENDER
    // ==========================================================================
    function formatDate(iso) {
        if (!iso) return "";
        const d = new Date(iso + "T00:00:00");
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }

    function renderUserInfo() {
        const els = {
            name1: document.getElementById("userName"),
            name2: document.getElementById("ppName"),
            passportId: document.getElementById("ppPassportId"),
            issueDate: document.getElementById("ppIssueDate"),
            expiryDate: document.getElementById("ppExpiryDate")
        };
        if (els.name1) els.name1.textContent = progress.user.name;
        if (els.name2) els.name2.textContent = progress.user.name;
        if (els.passportId) els.passportId.textContent = progress.user.passportId;
        if (els.issueDate) els.issueDate.textContent = progress.user.issueDate;
        if (els.expiryDate) els.expiryDate.textContent = progress.user.expiryDate;
    }

    function renderVisitedStamps() {
        document.querySelectorAll("#visitedStamps .stamp").forEach(function (btn) {
            const siteId = btn.getAttribute("data-site");
            const discovered = !!(progress.sites[siteId] && progress.sites[siteId].discovered);
            btn.classList.toggle("is-visited", discovered);
        });
    }

    function renderPoints() {
        const points = totalPoints();
        const valueEl = document.getElementById("pointsValue");
        const maxEl = document.getElementById("pointsMax");
        const fillEl = document.getElementById("pointsFill");
        if (valueEl) valueEl.textContent = points;
        if (maxEl) maxEl.textContent = POINTS_MAX;
        if (fillEl) fillEl.style.width = Math.min(100, (points / POINTS_MAX) * 100) + "%";

        const nextText = document.getElementById("nextRewardText");
        if (nextText) {
            const earned = earnedBadgeCount();
            if (earned >= SITES.length) {
                nextText.textContent = "You've unlocked every badge — Heritage Story Keeper achieved!";
            } else {
                const nextSite = SITES.find(function (s) { return !progress.sites[s.id].badgeEarned; });
                nextText.textContent = nextSite
                    ? "Complete " + nextSite.name + "'s journey to earn your next badge."
                    : "Keep exploring to earn more badges.";
            }
        }
    }

    function badgeCardHTML(site, state, size) {
        const earned = state.badgeEarned;
        const cls = "badge-token" + (earned ? " is-earned" : " is-locked") + (size ? " badge-token--" + size : "");
        if (earned) {
            return (
                '<button type="button" class="' + cls + '" data-site="' + site.id + '" aria-label="' + site.name + ' badge, earned">' +
                    '<span class="badge-token__ring"><img src="' + site.image + '" alt="" onerror="this.style.display=\'none\'"></span>' +
                    '<span class="badge-token__name">' + site.name + '</span>' +
                '</button>'
            );
        }
        return (
            '<span class="' + cls + '" aria-label="' + site.name + ' badge, locked">' +
                '<span class="badge-token__ring badge-token__ring--locked"><i class="fa-solid fa-lock"></i></span>' +
            '</span>'
        );
    }

    function renderBadgesPreview() {
        const row = document.getElementById("badgesPreviewRow");
        const countEl = document.getElementById("badgesEarnedCount");
        if (countEl) countEl.textContent = earnedBadgeCount();
        if (!row) return;
        row.innerHTML = SITES.map(function (s) {
            return badgeCardHTML(s, progress.sites[s.id], "sm");
        }).join("");
    }

    function renderBadgesFull() {
        const grid = document.getElementById("badgesFullGrid");
        const countEl = document.getElementById("badgesFullCount");
        if (countEl) countEl.textContent = earnedBadgeCount();
        if (!grid) return;
        grid.innerHTML = SITES.map(function (s) {
            const state = progress.sites[s.id];
            return badgeCardHTML(s, state, "lg");
        }).join("");
    }

    function renderJourneySteps() {
        ["discover", "learn", "asknaa", "badge"].forEach(function (step) {
            const el = document.querySelector('[data-count="' + step + '"]');
            if (el) el.textContent = stepCompletionCount(step);
        });
        const discoverDone = stepCompletionCount("discover");
        document.querySelectorAll(".journey-card__step").forEach(function (li) {
            li.classList.toggle("is-current", li.getAttribute("data-step") === "discover" && discoverDone > 0 && discoverDone < SITES.length);
        });
    }

    function renderPassportComplete() {
        const overlay = document.getElementById("passportComplete");
        if (!overlay) return;
        overlay.hidden = earnedBadgeCount() < SITES.length;
    }

    function renderAll() {
        syncBadges();
        renderUserInfo();
        renderVisitedStamps();
        renderPoints();
        renderBadgesPreview();
        renderBadgesFull();
        renderJourneySteps();
        renderPassportComplete();
    }

    // ==========================================================================
    // SIDEBAR PANEL SWITCHING
    // ==========================================================================
    function showPanel(panel) {
        const badgesSection = document.getElementById("badgesFullSection");
        if (badgesSection) badgesSection.hidden = panel !== "badges";

        document.querySelectorAll(".sidebar-nav__item").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-panel") === panel);
        });

        if (panel === "badges" && badgesSection) {
            badgesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    document.querySelectorAll(".sidebar-nav__item, [data-panel]").forEach(function (el) {
        el.addEventListener("click", function () {
            showPanel(el.getAttribute("data-panel"));
        });
    });

    // ==========================================================================
    // BADGE MODAL + SHARE
    // ==========================================================================
    const modalOverlay = document.getElementById("badgeModalOverlay");
    const modalContent = document.getElementById("badgeModalContent");

    function shareText(site) {
        return "I just earned the " + site.badgeTitle + " badge on ANANSE! \uD83C\uDDEC\uD83C\uDDED\uD83C\uDFC5\n\n" +
            "I discovered the story of " + site.name + " and continued my Ghanaian heritage journey.\n\n" +
            "#ANANSE #GhanaHeritage";
    }

    function openBadgeModal(siteId) {
        const site = SITES.find(function (s) { return s.id === siteId; });
        const state = progress.sites[siteId];
        if (!site || !state || !state.badgeEarned || !modalOverlay || !modalContent) return;

        const points = sitePoints(state);
        const text = shareText(site);
        const shareUrl = window.location.href.split("#")[0] + "#" + site.id;

        modalContent.innerHTML =
            '<button type="button" class="badge-modal__close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
            '<div class="badge-modal__badge">' +
                '<span class="badge-modal__ring"><img src="' + site.image + '" alt="" onerror="this.style.display=\'none\'"></span>' +
            '</div>' +
            '<h2>' + site.badgeTitle + '</h2>' +
            '<p class="badge-modal__site">' + site.name + '</p>' +
            '<div class="badge-modal__meta">' +
                '<div><strong>' + formatDate(state.earnedDate) + '</strong><small>Date earned</small></div>' +
                '<div><strong>' + points + ' pts</strong><small>Points earned</small></div>' +
            '</div>' +
            '<button type="button" class="btn-primary badge-modal__share" id="shareBadgeBtn">' +
                '<i class="fa-solid fa-share-nodes"></i> Share Badge' +
            '</button>' +
            '<div class="badge-modal__share-fallback" id="shareFallback" hidden>' +
                '<a target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(text + " " + shareUrl) + '"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>' +
                '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl) + '"><i class="fa-brands fa-facebook"></i> Facebook</a>' +
                '<a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(shareUrl) + '"><i class="fa-brands fa-x-twitter"></i> X</a>' +
                '<button type="button" id="copyLinkBtn"><i class="fa-solid fa-link"></i> Copy Link</button>' +
            '</div>';

        modalContent.querySelector(".badge-modal__close").addEventListener("click", closeBadgeModal);

        const shareBtn = document.getElementById("shareBadgeBtn");
        const fallback = document.getElementById("shareFallback");

        shareBtn.addEventListener("click", async function () {
            if (navigator.share) {
                try {
                    await navigator.share({ title: site.badgeTitle, text: text, url: shareUrl });
                    return;
                } catch (err) {
                    // user cancelled or share failed — fall through to fallback UI
                }
            }
            fallback.hidden = !fallback.hidden;
        });

        const copyBtn = document.getElementById("copyLinkBtn");
        if (copyBtn) {
            copyBtn.addEventListener("click", async function () {
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    setTimeout(function () {
                        copyBtn.innerHTML = '<i class="fa-solid fa-link"></i> Copy Link';
                    }, 1800);
                } catch (err) {
                    /* clipboard unavailable — link stays visible in the address bar's share dialog instead */
                }
            });
        }

        modalOverlay.classList.add("is-open");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeBadgeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("is-open");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.addEventListener("click", function (e) {
        const badgeBtn = e.target.closest(".badge-token.is-earned");
        if (badgeBtn) {
            openBadgeModal(badgeBtn.getAttribute("data-site"));
            return;
        }
        const stampBtn = e.target.closest(".stamp");
        if (stampBtn) {
            const siteId = stampBtn.getAttribute("data-site");
            if (progress.sites[siteId] && progress.sites[siteId].badgeEarned) {
                openBadgeModal(siteId);
            }
        }
    });

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) closeBadgeModal();
        });
    }
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeBadgeModal();
    });

    // ==========================================================================
    // DEMO CONTROLS
    // Simulates what Explore / Ask Naa will eventually write to this same
    // localStorage key. Delete the #demoControls section from passport.html
    // (and this block) once those pages call the real completion events.
    // ==========================================================================
    function renderDemoControls() {
        const row = document.getElementById("demoControlsRow");
        if (!row) return;
        row.innerHTML = SITES.map(function (s) {
            const state = progress.sites[s.id];
            return (
                '<div class="demo-controls__site">' +
                    '<strong>' + s.name + '</strong>' +
                    '<label><input type="checkbox" data-site="' + s.id + '" data-field="discovered" ' + (state.discovered ? "checked" : "") + '> Discover</label>' +
                    '<label><input type="checkbox" data-site="' + s.id + '" data-field="story" ' + (state.story ? "checked" : "") + '> Story</label>' +
                    '<label><input type="checkbox" data-site="' + s.id + '" data-field="didYouKnow" ' + (state.didYouKnow ? "checked" : "") + '> Did You Know</label>' +
                    '<label><input type="checkbox" data-site="' + s.id + '" data-field="audio" ' + (state.audio ? "checked" : "") + '> Audio (bonus)</label>' +
                    '<label><input type="checkbox" data-site="' + s.id + '" data-field="askNaa" ' + (state.askNaa ? "checked" : "") + '> Ask Naa</label>' +
                '</div>'
            );
        }).join("");

        row.querySelectorAll("input[type=checkbox]").forEach(function (input) {
            input.addEventListener("change", function () {
                const siteId = input.getAttribute("data-site");
                const field = input.getAttribute("data-field");
                progress.sites[siteId][field] = input.checked;
                saveProgress(progress);
                renderAll();
                renderDemoControls();
            });
        });
    }

    const resetBtn = document.getElementById("demoResetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            progress = defaultProgress();
            saveProgress(progress);
            renderAll();
            renderDemoControls();
        });
    }

    // ==========================================================================
    // INIT
    // ==========================================================================
    document.addEventListener("DOMContentLoaded", function () {
        renderAll();
        renderDemoControls();
    });
})();