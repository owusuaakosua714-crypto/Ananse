document.addEventListener("DOMContentLoaded", () => {
    // Mobile Hamburger Menu Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            // Toggle icon between bars and times (close X)
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // Interactive Hero Search Bar feedback
    const searchInput = document.querySelector(".hero-search-box input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchBtn && searchInput) {
        const translate = window.ananseLanguage && window.ananseLanguage.getText ? window.ananseLanguage.getText.bind(window.ananseLanguage) : (key, params = {}) => key;

        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim();
            if (query !== "") {
                alert(translate("common.searchingAnanse", { query }));
            } else {
                searchInput.focus();
            }
        });

        // Allow pressing Enter key to search
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchBtn.click();
            }
        });
    }

    // Active state toggling for nav items
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            // Close mobile menu when a link is clicked
            if (window.innerWidth <= 768) {
                navMenu.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });
});

// ==========================================
// ANANSE — NAA AI HERITAGE GUIDE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Check if the Naa page wrapper exists before executing script
    const naaPage = document.querySelector(".naa-page");

    if (naaPage) {
        const introVideo = document.querySelector(".naa-video");

        if (introVideo) {
            introVideo.loop = false;
            introVideo.pause();
            introVideo.currentTime = 0;

            introVideo.addEventListener("ended", () => {
                introVideo.pause();
                introVideo.currentTime = introVideo.duration || introVideo.currentTime;
            }, { once: true });

            introVideo.play().catch(() => {});
        }

        // ------------------------------------------------------------------
        // BACKEND CONNECTION & API ENDPOINT
        // Mamei will replace this endpoint with the final backend API endpoint.
        // The Gemini API key must NEVER be placed in this frontend file.
        // ------------------------------------------------------------------
        const NAA_API_ENDPOINT = "/api/naa";
        const NAA_AVATAR_PATH = "../images/profile%20.jpeg";

        // DOM Elements
        const chatForm = document.getElementById("naaChatForm");
        const userInput = document.getElementById("naaUserInput");
        const sendBtn = document.getElementById("naaSendBtn");
        const messagesBox = document.getElementById("naaMessagesBox");
        const typingIndicator = document.getElementById("naaTypingIndicator");
        const clearChatBtn = document.getElementById("naaClearChatBtn");
        const suggestedButtons = document.querySelectorAll(".naa-suggested-btn");
        const hamburgerBtn = document.getElementById("naaHamburger");
        const naaNav = document.getElementById("naaNav");

        // Mobile Menu Toggle
        if (hamburgerBtn && naaNav) {
            hamburgerBtn.addEventListener("click", function () {
                naaNav.classList.toggle("active");
            });
        }

        // Suggested Questions Handler
        suggestedButtons.forEach(button => {
            button.addEventListener("click", function () {
                const questionText = this.getAttribute("data-question");
                if (questionText) {
                    userInput.value = questionText;
                    handleSendMessage();
                }
            });
        });

        // Form Submit Handler
        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();
            handleSendMessage();
        });

        const translate = window.ananseLanguage && window.ananseLanguage.getText ? window.ananseLanguage.getText.bind(window.ananseLanguage) : (key, params = {}) => key;

        // Clear Chat Handler
        clearChatBtn.addEventListener("click", function () {
            // Keep only the initial Naa greeting message
            messagesBox.innerHTML = `
                <div class="naa-message-row naa-msg-naa">
                    <div class="naa-msg-avatar">
                        <img src="${NAA_AVATAR_PATH}" alt="Naa">
                    </div>
                    <div class="naa-msg-content-wrapper">
                        <div class="naa-msg-bubble">
                            ${translate("ai.defaultWelcome")}
                        </div>
                        <span class="naa-msg-timestamp">${translate("common.justNow")}</span>
                    </div>
                </div>
            `;
        });

        // Send Message Controller
        async function handleSendMessage() {
            const messageText = userInput.value.trim();

            // Prevent sending empty messages
            if (!messageText) return;

            // Display user message in chat
            appendUserMessage(messageText);

            // Clear input box and disable send button while waiting
            userInput.value = "";
            setSendingState(true);

            // Show typing indicator & scroll to bottom
            showTypingIndicator(true);
            scrollToBottom();

            try {
                // Send query to backend (Mamei's API endpoint)
                const response = await fetch(NAA_API_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: messageText })
                });

                if (!response.ok) {
                    throw new Error(`Server returned status ${response.status}`);
                }

                const data = await response.json();

                // Expecting backend response format:
                // { "answer": "Response text", "sources": [ { "title": "...", "url": "..." } ] }
                showTypingIndicator(false);

                if (data && data.answer) {
                    appendNaaMessage(data.answer, data.sources || []);
                } else {
                    appendNaaMessage(translate("ai.noResponse"));
                }

            } catch (error) {
                console.error("Backend Connection Error:", error);
                showTypingIndicator(false);
                // Friendly error message on failure
                appendNaaMessage(translate("ai.connectionError"));
            } finally {
                setSendingState(false);
                scrollToBottom();
            }
        }

        // Helper: Append User Message Bubble
        function appendUserMessage(text) {
            const timeString = getCurrentTimeString();
            const messageRow = document.createElement("div");
            messageRow.className = "naa-message-row naa-msg-user";

            messageRow.innerHTML = `
                <div class="naa-msg-content-wrapper">
                    <div class="naa-msg-bubble">${escapeHTML(text)}</div>
                    <span class="naa-msg-timestamp">${timeString}</span>
                </div>
            `;

            messagesBox.appendChild(messageRow);
        }

        // Helper: Append Naa Response Bubble (with optional Trusted Sources)
        function appendNaaMessage(answerText, sources = []) {
            const timeString = getCurrentTimeString();
            const messageRow = document.createElement("div");
            messageRow.className = "naa-message-row naa-msg-naa";

            // Build Trusted Sources HTML if provided by backend
            let sourcesHTML = "";
            if (Array.isArray(sources) && sources.length > 0) {
                const sourceItems = sources.map(src => `
                    <li>
                        <a href="${escapeHTML(src.url)}" target="_blank" rel="noopener noreferrer" class="naa-source-link">
                            <i class="fa-solid fa-link"></i> ${escapeHTML(src.title || src.url)}
                        </a>
                    </li>
                `).join("");

                sourcesHTML = `
                    <div class="naa-sources-container">
                        <div class="naa-sources-title"><i class="fa-solid fa-shield-halved"></i> Trusted Sources:</div>
                        <ul class="naa-sources-list">
                            ${sourceItems}
                        </ul>
                    </div>
                `;
            }

            messageRow.innerHTML = `
                <div class="naa-msg-avatar">
                    <img src="${NAA_AVATAR_PATH}" alt="Naa">
                </div>
                <div class="naa-msg-content-wrapper">
                    <div class="naa-msg-bubble">
                        ${escapeHTML(answerText)}
                        ${sourcesHTML}
                    </div>
                    <span class="naa-msg-timestamp">${timeString}</span>
                </div>
            `;

            messagesBox.appendChild(messageRow);
        }

        // Helper: Toggle Typing Indicator
        function showTypingIndicator(show) {
            if (typingIndicator) {
                typingIndicator.style.display = show ? "flex" : "none";
            }
        }

        // Helper: Enable/Disable UI Controls during request
        function setSendingState(isSending) {
            userInput.disabled = isSending;
            sendBtn.disabled = isSending;
        }

        // Helper: Auto Scroll Chat Box
        function scrollToBottom() {
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }

        // Helper: Format Time (e.g. 10:24 AM)
        function getCurrentTimeString() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Helper: Prevent XSS / HTML Injection
        function escapeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    }
});

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initLoginHamburger();
        initPasswordToggle();
        initFormSubmission();
    });

    /**
     * Mobile Hamburger Toggle (Scoped to Login Page)
     */
    function initLoginHamburger() {
        const hamburgerBtn = document.getElementById('loginHamburgerBtn');
        const mobileDrawer = document.getElementById('loginMobileDrawer');

        if (!hamburgerBtn || !mobileDrawer) return;

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = hamburgerBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('open', isOpen);
            
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !mobileDrawer.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileDrawer.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                mobileDrawer.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /**
     * Toggle Password Visibility
     */
    function initPasswordToggle() {
        const toggleBtn = document.getElementById('togglePasswordBtn');
        const passwordInput = document.getElementById('loginPassword');

        if (!toggleBtn || !passwordInput) return;

        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            toggleBtn.innerHTML = isPassword
                ? `<svg class="login-eye-icon" viewBox="0 0 24 24" fill="none" stroke="#05242C" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
                : `<svg class="login-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        });
    }

    /**
     * Form Validation & Submission Feedback
     */
    function initFormSubmission() {
        const form = document.getElementById('loginForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const translate = window.ananseLanguage && window.ananseLanguage.getText ? window.ananseLanguage.getText.bind(window.ananseLanguage) : (key) => key;

            if (!email || !password) {
                alert(translate('login.formMissing'));
                return;
            }

            // Interactive button feedback state
            const submitBtn = form.querySelector('.login-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `<span>${translate('login.loggingIn')}</span>`;

            // Simulate login request delay
            setTimeout(() => {
                alert(translate('login.loginSuccess'));
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalText;
            }, 1200);
        });
    }
})();

// ==========================================================================
// ABOUT PAGE SCOPED JAVASCRIPT
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
    // Safety check: Exit early if not on the About page
    if (!document.body.classList.contains('about-page')) {
        return;
    }

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('aboutMenuToggle');
    const navLinks = document.getElementById('aboutNavLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('show');
            }
        });
    }

    // 2. Interactive Tech Cards Opacity/Hover Effect
    const techCards = document.querySelectorAll('.about-tech-card');
    techCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.opacity = '1';
        });
        card.addEventListener('mouseleave', function () {
            this.style.opacity = '';
        });
    });
});


// ==========================================
// ANANSE — EXPLORE PAGE: HERITAGE SITES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const cardGrid = document.getElementById("cardGrid");
    if (!cardGrid) return; // only run on explore.html

    const cards = Array.from(cardGrid.querySelectorAll(".heritage-card"));
    let visibleCount = cards.length;

    // ---- Translation helper (falls back to English if a key is missing) ----
    function t(key, fallback, params) {
        const lang = window.ananseLanguage;
        if (!key || !lang || !lang.getText) return fallback;
        const value = lang.getText(key, params || {});
        return value === key ? fallback : value;
    }

    function cardText(card, selector, fallback) {
        const el = card.querySelector(selector);
        return el ? el.textContent : fallback;
    }

    // ---- Dedicated story pages (sites without one fall back to site.html) ----
    const STORY_PAGES = {
        "cape-coast": "cape-coast.html" // change to your real Cape Coast filename
        // "manhyia": "manhyia.html",
        // "osu": "osu.html",
    };

    function getStoryUrl(siteId) {
        return STORY_PAGES[siteId] || ("site.html?site=" + siteId);
    }

    // ---- Pages with a Listen experience (others show "coming soon") ----
    const LISTEN_PAGES = {
        "cape-coast": "cape-coast.html#listen" // filename must match above; #listen must match an id on that page
    };

    function getListenUrl(siteId) {
        return LISTEN_PAGES[siteId] || null;
    }

    // ---- Favourites (localStorage) ----
    const FAV_KEY = "ananseExploreFavourites";

    function loadFavourites() {
        try { return JSON.parse(window.localStorage.getItem(FAV_KEY)) || {}; }
        catch (err) { return {}; }
    }

    function saveFavourites(favs) {
        try { window.localStorage.setItem(FAV_KEY, JSON.stringify(favs)); }
        catch (err) { /* localStorage unavailable — favourites just won't persist */ }
    }

    let favourites = loadFavourites();

    function setFavouriteUI(btn, isFav) {
        btn.classList.toggle("is-active", isFav);
        btn.setAttribute("aria-pressed", isFav ? "true" : "false");
        const icon = btn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-solid", isFav);
            icon.classList.toggle("fa-regular", !isFav);
        }
    }

    function syncFavourites() {
        cards.forEach(function (card) {
            const btn = card.querySelector(".bookmark-btn");
            if (btn) setFavouriteUI(btn, !!favourites[card.dataset.siteId]);
        });
    }

    // ---- Keyboard access + translated accessibility labels ----
    cards.forEach(function (card) {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
    });

    function updateCardLabels() {
        cards.forEach(function (card) {
            const name = cardText(card, ".card-body h3", card.dataset.name);
            card.setAttribute("aria-label", t("explorePage.openDetails", "Open details for " + name, { name: name }));
            const favBtn = card.querySelector(".bookmark-btn");
            if (favBtn) {
                favBtn.setAttribute("aria-label", t("explorePage.saveFavourite", "Save " + name + " to favourites", { name: name }));
            }
        });
    }

    // ---- Filtering: search + category + region ----
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const chips = Array.from(document.querySelectorAll(".chip"));
    const regionSelect = document.getElementById("regionSelect");
    const resultsCountEl = document.getElementById("resultsCount");
    const resultsNounEl = document.getElementById("resultsNoun");
    const noResults = document.getElementById("noResults");

    const state = { query: "", category: "all", region: "all" };

    // Search matches both the English data and the currently displayed (translated) text
    function matchesQuery(card, query) {
        if (!query) return true;
        const d = card.dataset;
        const haystack = [
            d.name, d.location, d.categoryLabel,
            cardText(card, ".card-body h3", ""),
            cardText(card, ".card-loc span", ""),
            cardText(card, ".category-badge", "")
        ].join(" ").toLowerCase();
        return haystack.indexOf(query.toLowerCase()) !== -1;
    }

    function updateResultsMeta(count) {
        if (resultsCountEl) resultsCountEl.textContent = count;
        if (resultsNounEl) {
            resultsNounEl.textContent = count === 1
                ? t("explorePage.siteSingular", "heritage site")
                : t("explorePage.sitePlural", "heritage sites");
        }
    }

    function toggleNoResults(count, category) {
        if (!noResults) return;

        const heading = noResults.querySelector("h3");
        const body = noResults.querySelector("p");

        if (category === "museums") {
            if (heading) heading.textContent = t("explorePage.noMuseumsTitle", "No heritage sites in this category yet.");
            if (body) body.textContent = t("explorePage.noMuseumsText", "We're still researching Ghana's museums for Ananse — check back soon.");
        } else {
            if (heading) heading.textContent = t("explorePage.noResultsTitle", "No heritage sites match your filters");
            if (body) body.textContent = t("explorePage.noResultsText", "Try clearing the search box, choosing \"All\" categories, or selecting a different region.");
        }

        if (count === 0) {
            noResults.classList.add("is-visible");
            cardGrid.style.display = "none";
        } else {
            noResults.classList.remove("is-visible");
            cardGrid.style.display = "";
        }
    }

    function applyFilters() {
        let visible = 0;
        cards.forEach(function (card) {
            const show =
                (state.category === "all" || card.dataset.category === state.category) &&
                (state.region === "all" || card.dataset.region === state.region) &&
                matchesQuery(card, state.query);
            card.hidden = !show;
            if (show) visible++;
        });
        visibleCount = visible;
        updateResultsMeta(visible);
        toggleNoResults(visible, state.category);
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            state.query = searchInput.value.trim();
            applyFilters();
        });
    }

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            state.query = searchInput ? searchInput.value.trim() : "";
            applyFilters();
        });
    }

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            chips.forEach(function (c) { c.classList.remove("is-active"); });
            chip.classList.add("is-active");
            state.category = chip.getAttribute("data-filter");
            applyFilters();
        });
    });

    if (regionSelect) {
        regionSelect.addEventListener("change", function () {
            state.region = regionSelect.value;
            applyFilters();
        });
    }

    // ---- Favourites + card clicks (event delegation) ----
    cardGrid.addEventListener("click", function (e) {
        const favBtn = e.target.closest(".bookmark-btn");
        if (favBtn) {
            e.stopPropagation();
            const id = favBtn.getAttribute("data-site-id");
            favourites[id] = !favourites[id];
            saveFavourites(favourites);
            setFavouriteUI(favBtn, !!favourites[id]);
            return;
        }

        const card = e.target.closest(".heritage-card");
        if (card) openModal(card);
    });

    // Open a card with Enter / Space (ignore keys pressed on the buttons inside it)
    cardGrid.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        if (e.target.closest("button")) return;
        const card = e.target.closest(".heritage-card");
        if (card) {
            e.preventDefault();
            openModal(card);
        }
    });

    // ---- Modal ----
    const modalOverlay = document.getElementById("modalOverlay");
    const modalContent = document.getElementById("modalContent");
    let lastFocusedCard = null;

    function openModal(card) {
        if (!card || !modalOverlay || !modalContent) return;

        lastFocusedCard = card;

        const d = card.dataset;
        const img = card.querySelector(".card-media img");
        const imageSrc = img ? img.getAttribute("src") : "";
        const imageAlt = img ? img.getAttribute("alt") : "";

        // Read the text currently shown on the card (already translated)
        const name = cardText(card, ".card-body h3", d.name);
        const location = cardText(card, ".card-loc span", d.location);
        const categoryLabel = cardText(card, ".category-badge", d.categoryLabel);
        const description = cardText(card, ".card-desc", "");
        const didYouKnow = t(d.didYouKnowKey, d.didYouKnow);

        const learnLabel = t("explorePage.learnStory", "Learn the Story");
        const listenLabel = t("explorePage.listenStory", "Listen to the Story");

        // Listen: real link if the site has a Listen page, otherwise a "coming soon" button
        const listenUrl = getListenUrl(d.siteId);
        const listenHTML = listenUrl
            ? '<a class="action-btn action-btn--listen" href="' + listenUrl + '">' +
                  '<i class="fa-solid fa-headphones"></i> ' + listenLabel + '</a>'
            : '<button type="button" class="action-btn action-btn--listen" id="modalListenBtn">' +
                  '<i class="fa-solid fa-headphones"></i> ' + listenLabel + '</button>';

        modalContent.innerHTML =
            '<button type="button" class="modal-close" aria-label="' + t("explorePage.close", "Close") + '">' +
                '<i class="fa-solid fa-xmark"></i>' +
            '</button>' +
            '<div class="modal-hero ' + d.mediaClass + '">' +
                '<img src="' + imageSrc + '" alt="' + imageAlt + '" onerror="this.style.display=\'none\'">' +
                '<span class="category-badge">' + categoryLabel + '</span>' +
                '<div>' +
                    '<h2>' + name + '</h2>' +
                    '<p class="loc"><i class="fa-solid fa-location-dot"></i> ' + location + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="modal-body">' +
                '<div class="modal-section"><h4>' + t("explorePage.aboutSite", "About this site") + '</h4><p>' + description + '</p></div>' +
                '<div class="modal-section"><h4>' + t("explorePage.didYouKnow", "Did You Know?") + '</h4><p>' + didYouKnow + '</p></div>' +
                '<div class="modal-actions">' +
                    '<a class="action-btn action-btn--learn" href="' + getStoryUrl(d.siteId) + '">' +
                        '<i class="fa-solid fa-book-open"></i> ' + learnLabel + '</a>' +
                    listenHTML +
                '</div>' +
            '</div>';

        // "Coming soon" behaviour only applies to sites without a Listen page yet
        const listenBtn = modalContent.querySelector("#modalListenBtn");
        if (listenBtn) {
            listenBtn.addEventListener("click", function () {
                listenBtn.disabled = true;
                listenBtn.innerHTML = '<i class="fa-solid fa-headphones"></i> ' + t("explorePage.audioSoon", "Audio preview coming soon");
            });
        }

        const closeBtn = modalContent.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", closeModal);
            closeBtn.focus();
        }

        modalOverlay.classList.add("is-open");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("is-open");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (lastFocusedCard) {
            lastFocusedCard.focus();
            lastFocusedCard = null;
        }
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("is-open")) {
            closeModal();
        }
    });

    // ---- Re-apply dynamic text when the language changes ----
    document.addEventListener("ananse:languagechange", function () {
        updateResultsMeta(visibleCount);
        toggleNoResults(visibleCount, state.category);
        updateCardLabels();
    });

    // ---- Init ----
    syncFavourites();
    updateCardLabels();
    applyFilters();
});



/* ==========================================================================
   ANANSE — Passport page
   All progress lives in localStorage under STORAGE_KEY, in a shape that
   maps directly onto a future API response, e.g.
   GET /api/users/me/progress -> { points, sites: { "cape-coast": {...} } }
   Swap loadProgress()/saveProgress() for fetch() calls later; nothing else
   in this file needs to change.
   ========================================================================== */
(function () {
    const STORAGE_KEY = "ananseProgress";

    const SITES = [
        { id: "cape-coast", name: "Cape Coast Castle", location: "Cape Coast, Central Region", badgeTitle: "Cape Coast Heritage Explorer", image: "../images/cape coast castle.jpeg" },
        { id: "manhyia", name: "Manhyia Palace", location: "Kumasi, Ashanti Region", badgeTitle: "Manhyia Heritage Explorer", image: "../images/manhyia.jpeg" },
        { id: "osu", name: "Osu Castle", location: "Osu, Greater Accra Region", badgeTitle: "Osu Heritage Explorer", image: "../images/osu castle.jpeg" },
        { id: "independence", name: "Independence Square", location: "Accra, Greater Accra Region", badgeTitle: "Independence Heritage Explorer", image: "../images/independence square.jpeg" },
        { id: "kwame-nkrumah", name: "Kwame Nkrumah Memorial Park", location: "Accra, Greater Accra Region", badgeTitle: "Kwame Nkrumah Heritage Explorer", image: "../images/kwame Nkrumah memorial park.jpeg" }
    ];

    const POINTS = {
        discover: 10,
        story: 20,
        didYouKnow: 5,
        audio: 10, // bonus, optional — never required for a badge
        askNaa: 30
    };

    // Max points shown on the points bar: every site fully completed
    // including the optional audio bonus (5 sites x 75 possible each).
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
            user: { name: "Nharnah Aisha", passportId: "AN-2025-001", issueDate: "27 Apr 2025", expiryDate: "27 Apr 2030" },
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

    // User rank/title based on badges earned — shown under an earned badge
    // preview and next to the user's name, matching the reference design.
    function userTitle() {
        const n = earnedBadgeCount();
        if (n >= SITES.length) return "Heritage Story Keeper";
        if (n >= 3) return "Heritage Guide";
        if (n >= 1) return "Heritage Explorer";
        return "Newcomer";
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
            role: document.getElementById("userRole"),
            passportId: document.getElementById("ppPassportId"),
            issueDate: document.getElementById("ppIssueDate"),
            expiryDate: document.getElementById("ppExpiryDate")
        };
        if (els.name1) els.name1.textContent = progress.user.name;
        if (els.name2) els.name2.textContent = progress.user.name;
        if (els.role) els.role.textContent = userTitle();
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
            const rankHTML = size === "sm"
                ? '<span class="badge-token__rank">' + userTitle() + '</span>'
                : "";
            return (
                '<button type="button" class="' + cls + '" data-site="' + site.id + '" aria-label="' + site.name + ' badge, earned">' +
                    '<span class="badge-token__ring"><img src="' + site.image + '" alt="" onerror="this.style.display=\'none\'"></span>' +
                    '<span class="badge-token__name">' + site.name + '</span>' +
                    rankHTML +
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

/* ==========================================================================
   ANANSE MAP PAGE MAIN LOGIC (script.js / map.js)
   Isolated controller for Mapbox, search, filters, geolocation & navigation
   ========================================================================== */

const MAPBOX_TOKEN = "pk.eyJ1IjoiYWtvc3VhYWFhYWFhIiwiYSI6ImNtdWI3b2l6MzFza2EyenMyOHp0Z2U5dzgifQ.pRQHZhklYFeG0G6BGZ5NYw";

// --------------------------------------------------------------------------
// HERITAGE SITES DATASET
// --------------------------------------------------------------------------
const HERITAGE_SITES = [
    {
        id: "cape-coast-castle",
        nameKey: "capeCoastCastleName",
        regionKey: "capeCoastCastleRegion",
        shortLocKey: "capeCoastShortLoc",
        descKey: "capeCoastCastleDesc",
        category: "castles",
        categoryLabelKey: "catHistorical",
        badgeClass: "badge-red",
        markerClass: "marker-bg-red",
        iconClass: "fa-fort-awesome",
        coordinates: [-1.2411, 5.1031],
        image: "../images/Cape Coast Castle photo, Ghana Africa.jpeg",
        trailCount: 7,
        topHighlight: {
            titleKey: "doorOfNoReturnTitle",
            descKey: "doorOfNoReturnDesc",
            thumb: "../images/door of no return.jpeg"
        }
    },
    {
        id: "manhyia-palace",
        nameKey: "manhyiaPalaceName",
        regionKey: "manhyiaPalaceRegion",
        shortLocKey: "manhyiaShortLoc",
        descKey: "manhyiaPalaceDesc",
        category: "palaces",
        categoryLabelKey: "catPalace",
        badgeClass: "badge-gold",
        markerClass: "marker-bg-gold",
        iconClass: "fa-crown",
        coordinates: [-1.6153, 6.7028],
        image: "../images/Manhyia Palace.jpeg",
        trailCount: 5,
        topHighlight: {
            titleKey: "asanteheneCourtTitle",
            descKey: "asanteheneCourtDesc",
            thumb: "../images/Manhyia Palace.jpeg"
        }
    },
    {
        id: "osu-castle",
        nameKey: "osuCastleName",
        regionKey: "osuCastleRegion",
        shortLocKey: "osuShortLoc",
        descKey: "osuCastleDesc",
        category: "castles",
        categoryLabelKey: "catCastle",
        badgeClass: "badge-blue",
        markerClass: "marker-bg-blue",
        iconClass: "fa-building-columns",
        coordinates: [-0.1821, 5.5473],
        image: "../images/osu castle (1).jpeg", 
        trailCount: 4,
        topHighlight: {
            titleKey: "christiansborgGardensTitle",
            descKey: "christiansborgGardensDesc",
            thumb: "../images/osu castle (1).jpeg"
        }
    },
    {
        id: "independence-arch",
        nameKey: "independenceArchName",
        regionKey: "independenceArchRegion",
        shortLocKey: "accraShortLoc",
        descKey: "independenceArchDesc",
        category: "monuments",
        categoryLabelKey: "catMonument",
        badgeClass: "badge-purple",
        markerClass: "marker-bg-purple",
        iconClass: "fa-archway",
        coordinates: [-0.1928, 5.5486],
        image: "../images/INDEPENDENCE ARCH (1).jpeg",
        trailCount: 3,
        topHighlight: {
            titleKey: "blackStarFlameTitle",
            descKey: "blackStarFlameDesc",
            thumb: "../images/INDEPENDENCE ARCH (1).jpeg"
        }
    },
    {
        id: "kwame-nkrumah",
        nameKey: "kwameNkrumahName",
        regionKey: "kwameNkrumahRegion",
        shortLocKey: "accraShortLoc",
        descKey: "kwameNkrumahDesc",
        category: "museums",
        categoryLabelKey: "catMuseum",
        badgeClass: "badge-teal",
        markerClass: "marker-bg-teal",
        iconClass: "fa-monument",
        coordinates: [-0.2023, 5.5441],
        image: "../images/kwame Nkrumah memorial park.jpeg",
        trailCount: 6,
        topHighlight: {
            titleKey: "marbleMausoleumTitle",
            descKey: "marbleMausoleumDesc",
            thumb: "../images/kwame Nkrumah memorial park.jpeg"
        }
    }
];

// STATE MANAGEMENT
let mapInstance = null;
let mapboxMarkers = [];
let userLocationMarker = null;
let userCoordinates = null;
let activeSelectedSite = null;
let currentCategoryFilter = "all";

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initLanguageSelector();
    initMapbox();
    initSearchAndFilters();
    initPopupControls();
    initFeaturedCards();
    
    // Automatically attempt geolocation to derive user position
    requestUserLocation(false);
});

// 1. HAMBURGER NAVIGATION
function initNavigation() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (!hamburgerBtn || !mobileNav) return;

    function toggleMenu(open) {
        const isOpening = open !== undefined ? open : !mobileNav.classList.contains("open");
        if (isOpening) {
            mobileNav.classList.add("open");
            hamburgerBtn.classList.add("is-active");
            hamburgerBtn.setAttribute("aria-expanded", "true");
        } else {
            mobileNav.classList.remove("open");
            hamburgerBtn.classList.remove("is-active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        }
    }

    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener("click", (e) => {
        if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });
}

// 2. LANGUAGE DROPDOWN
function initLanguageSelector() {
    const langSelectBtn = document.getElementById("langSelectBtn");
    const langMenu = document.getElementById("langMenu");

    if (langSelectBtn && langMenu) {
        langSelectBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isShown = langMenu.classList.toggle("show");
            langSelectBtn.setAttribute("aria-expanded", isShown ? "true" : "false");
        });

        document.addEventListener("click", () => {
            langMenu.classList.remove("show");
            langSelectBtn.setAttribute("aria-expanded", "false");
        });
    }
}

// 3. MAPBOX INITIALIZATION & MARKERS
function initMapbox() {
    const container = document.getElementById("mapbox-container");
    if (!container) return;

    if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "PASTE_YOUR_MAPBOX_TOKEN_HERE") {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#0D4738; color:#FFF; text-align:center; padding:20px;">
                <i class="fa-solid fa-map-location-dot" style="font-size:3rem; color:#FFC72C; margin-bottom:12px;"></i>
                <h3 style="margin:0 0 8px 0;">Mapbox Token Required</h3>
                <p style="max-width:400px; font-size:0.9rem; margin:0; opacity:0.9;">Please paste your valid Mapbox Access Token into <code>script.js</code> to display the interactive map.</p>
            </div>
        `;
        return;
    }

    try {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapInstance = new mapboxgl.Map({
            container: "mapbox-container",
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [-1.0, 6.2],
            zoom: 6.8
        });

        mapInstance.on("load", () => {
            renderMapMarkers();
            bindMapControls();
        });
    } catch (err) {
        console.error("Mapbox initialization error:", err);
    }
}

function renderMapMarkers() {
    if (!mapInstance) return;

    mapboxMarkers.forEach(m => m.remove());
    mapboxMarkers = [];

    HERITAGE_SITES.forEach(site => {
        if (currentCategoryFilter !== "all" && site.category !== currentCategoryFilter) {
            return;
        }

        const siteName = window.MapLang ? window.MapLang.getTranslation(site.nameKey) : site.id;
        const shortLoc = window.MapLang ? window.MapLang.getTranslation(site.shortLocKey) : "";

        const el = document.createElement("div");
        el.className = "ananse-marker-wrapper";
        el.innerHTML = `
            <div class="ananse-marker-pin ${site.markerClass}">
                <i class="fa-solid ${site.iconClass}"></i>
            </div>
            <div class="ananse-marker-label">
                ${siteName} <span>(${shortLoc})</span>
            </div>
        `;

        el.addEventListener("click", () => {
            selectSiteAndShowPopup(site);
        });

        const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(site.coordinates)
            .addTo(mapInstance);

        mapboxMarkers.push(marker);
    });
}

function bindMapControls() {
    const btnZoomIn = document.getElementById("btnZoomIn");
    const btnZoomOut = document.getElementById("btnZoomOut");
    const btnLocateMe = document.getElementById("btnLocateMe");

    if (btnZoomIn) btnZoomIn.addEventListener("click", () => mapInstance && mapInstance.zoomIn());
    if (btnZoomOut) btnZoomOut.addEventListener("click", () => mapInstance && mapInstance.zoomOut());
    if (btnLocateMe) btnLocateMe.addEventListener("click", () => requestUserLocation(true));
}

function requestUserLocation(userInitiated = true) {
    if (!navigator.geolocation) {
        if (userInitiated) alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userCoordinates = [position.coords.longitude, position.coords.latitude];

            if (mapInstance && userInitiated) {
                mapInstance.flyTo({ center: userCoordinates, zoom: 12 });
            }

            if (mapInstance) {
                if (!userLocationMarker) {
                    const el = document.createElement("div");
                    el.style.display = "flex";
                    el.style.alignItems = "center";
                    const youAreHereText = window.MapLang ? window.MapLang.getTranslation("youAreHere") : "You are here";
                    el.innerHTML = `
                        <div class="user-location-pulse"></div>
                        <div class="user-location-label" data-lang-key="youAreHere">${youAreHereText}</div>
                    `;

                    userLocationMarker = new mapboxgl.Marker({ element: el })
                        .setLngLat(userCoordinates)
                        .addTo(mapInstance);
                } else {
                    userLocationMarker.setLngLat(userCoordinates);
                }
            }

            if (activeSelectedSite) {
                calculateTravelEstimate(activeSelectedSite);
            }
        },
        (error) => {
            if (userInitiated) {
                alert("Unable to retrieve location. Please check browser permissions.");
            }
        },
        { timeout: 10000, enableHighAccuracy: true }
    );
}

// 4. SEARCH & FILTERS
function initSearchAndFilters() {
    const searchInput = document.getElementById("mapSearchInput");
    const filterContainer = document.getElementById("categoryFilters");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderMapMarkers();
                return;
            }

            const matched = HERITAGE_SITES.filter(s => {
                const name = window.MapLang ? window.MapLang.getTranslation(s.nameKey).toLowerCase() : "";
                const region = window.MapLang ? window.MapLang.getTranslation(s.regionKey).toLowerCase() : "";
                return name.includes(query) || region.includes(query);
            });

            if (matched.length > 0 && mapInstance) {
                mapInstance.flyTo({ center: matched[0].coordinates, zoom: 10 });
                selectSiteAndShowPopup(matched[0]);
            }
        });
    }

    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-btn");
            if (!btn) return;

            filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentCategoryFilter = btn.getAttribute("data-category");
            renderMapMarkers();
        });
    }
}

// 5. POPUP DISPLAY CONTROLLER
function selectSiteAndShowPopup(site) {
    activeSelectedSite = site;
    updatePopupContent();

    const popupCard = document.getElementById("sitePopupCard");
    if (popupCard) {
        if (mapInstance) {
            mapInstance.flyTo({ center: site.coordinates, zoom: 11 });
        }
        calculateTravelEstimate(site);
        popupCard.classList.remove("hidden");
    }
}

function updatePopupContent() {
    if (!activeSelectedSite) return;

    const site = activeSelectedSite;

    const popupImg = document.getElementById("popupImage");
    const popupTitle = document.getElementById("popupTitle");
    const popupLoc = document.getElementById("popupLocationText");
    const popupCatText = document.getElementById("popupCategoryText");
    const popupDesc = document.getElementById("popupDescription");
    const highlightThumb = document.getElementById("highlightThumb");
    const highlightTitle = document.getElementById("highlightTitle");
    const highlightDesc = document.getElementById("highlightDesc");
    const viewAllStopsText = document.getElementById("viewAllStopsText");
    const primaryHighlightLink = document.getElementById("primaryHighlightLink");
    const viewAllStopsLink = document.getElementById("viewAllStopsLink");

    const t = (key) => window.MapLang ? window.MapLang.getTranslation(key) : key;

    if (popupImg) {
        popupImg.src = site.image;
        popupImg.alt = t(site.nameKey);
    }
    if (popupTitle) popupTitle.textContent = t(site.nameKey);
    if (popupLoc) popupLoc.textContent = t(site.regionKey);
    if (popupDesc) popupDesc.textContent = t(site.descKey);

    if (popupCatText) {
        popupCatText.setAttribute("data-lang-key", site.categoryLabelKey);
        popupCatText.textContent = t(site.categoryLabelKey);
    }

    if (site.topHighlight) {
        if (highlightThumb) highlightThumb.src = site.topHighlight.thumb;
        if (highlightTitle) highlightTitle.textContent = t(site.topHighlight.titleKey);
        if (highlightDesc) highlightDesc.textContent = t(site.topHighlight.descKey);
    }

    if (viewAllStopsText) {
        const template = t("viewAllStops");
        viewAllStopsText.textContent = `${template} (${site.trailCount})`;
    }

    if (primaryHighlightLink) primaryHighlightLink.href = `heritage-trail.html?site=${site.id}`;
    if (viewAllStopsLink) viewAllStopsLink.href = `heritage-trail.html?site=${site.id}`;
}

function updateUIOnLanguageChange() {
    renderMapMarkers();
    
    if (activeSelectedSite) {
        updatePopupContent();
        calculateTravelEstimate(activeSelectedSite);
    }

    // Update featured card static titles dynamically
    HERITAGE_SITES.forEach(site => {
        const titleEl = document.querySelector(`[data-site-title-id="${site.id}"]`);
        const locEl = document.querySelector(`[data-site-shortloc-id="${site.id}"]`);
        if (titleEl && window.MapLang) titleEl.textContent = window.MapLang.getTranslation(site.nameKey);
        if (locEl && window.MapLang) locEl.textContent = window.MapLang.getTranslation(site.shortLocKey);
    });
}

function initPopupControls() {
    const closeBtn = document.getElementById("closePopupBtn");
    const popupCard = document.getElementById("sitePopupCard");
    const btnDirections = document.getElementById("btnGetDirections");

    if (closeBtn && popupCard) {
        closeBtn.addEventListener("click", () => {
            popupCard.classList.add("hidden");
            activeSelectedSite = null;
        });
    }

    if (btnDirections) {
        btnDirections.addEventListener("click", () => {
            if (!userCoordinates) {
                requestUserLocation(true);
            } else if (activeSelectedSite) {
                const origin = `${userCoordinates[1]},${userCoordinates[0]}`;
                const dest = `${activeSelectedSite.coordinates[1]},${activeSelectedSite.coordinates[0]}`;
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`, "_blank");
            }
        });
    }
}

function calculateTravelEstimate(site) {
    const estimateBox = document.getElementById("travelEstimateBox");
    const timeText = document.getElementById("travelTimeText");
    const distText = document.getElementById("travelDistText");

    if (!estimateBox) return;

    if (!userCoordinates) {
        estimateBox.classList.add("hidden");
        return;
    }

    const [lon1, lat1] = userCoordinates;
    const [lon2, lat2] = site.coordinates;

    // Haversine formula for distance calculation
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distKm = Math.round(R * c);

    // Estimate driving speed (~60 km/h average)
    const totalMinutes = Math.round((distKm / 60) * 60);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const tHr = window.MapLang ? window.MapLang.getTranslation("unitHr") : "hr";
    const tMin = window.MapLang ? window.MapLang.getTranslation("unitMin") : "min";

    let timeString = "";
    if (hours > 0) timeString += `${hours} ${tHr} `;
    timeString += `${mins} ${tMin}`;

    if (timeText) timeText.textContent = timeString;
    if (distText) distText.textContent = `(${distKm} km)`;

    estimateBox.classList.remove("hidden");
}

// 6. FEATURED CARDS
function initFeaturedCards() {
    const cards = document.querySelectorAll(".site-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const siteId = card.getAttribute("data-site-id");
            const site = HERITAGE_SITES.find(s => s.id === siteId);
            if (site) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                selectSiteAndShowPopup(site);
            }
        });
    });
}

// Global hook for language changes
window.onAnanseLanguageChanged = function() {
    updateUIOnLanguageChange();
};