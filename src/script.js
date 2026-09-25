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

        // ---- Mobile menu (Explore page) ----
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function () {
            const open = navMenu.classList.toggle("is-active");
            hamburgerBtn.setAttribute("aria-expanded", open ? "true" : "false");
            const icon = hamburgerBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-xmark", open);
                icon.classList.toggle("fa-bars", !open);
            }
        });
    }

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
    "cape-coast": "capecoast.html",
    "independence": "independence.html"
    // "manhyia": "manhyia.html",
    // "osu": "osu.html",
};
    function getStoryUrl(siteId) {
        return STORY_PAGES[siteId] || ("site.html?site=" + siteId);
    }

    // ---- Pages with a Listen experience (others show "coming soon") ----
    const LISTEN_PAGES = {
        "cape-coast": "capecoast.html#listen" // filename must match above; #listen must match an id on that page
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
        catch (err) { }
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

    // ---- Journey strip: smooth-scroll links (Discover, Learn) ----
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".journey-step[data-scroll]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

            // Discover also puts the cursor in the search box
            const focusId = link.getAttribute("data-focus");
            if (focusId) {
                const el = document.getElementById(focusId);
                if (el) setTimeout(function () { el.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
            }
        });
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

// ==========================================================================
// ANANSE — MAP PAGE (map.html)
// Guarded so it's safe to append to the shared script.js: everything here
// is skipped on any page that doesn't have the map container.
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("mapbox-container");
    if (!mapContainer) return; // only run on map.html

    // ----------------------------------------------------------------------
    // TRANSLATION HELPER (same fallback pattern used elsewhere in the app)
    // ----------------------------------------------------------------------
    function t(key, fallback, params) {
        const lang = window.ananseLanguage;
        if (!key || !lang || !lang.getText) return fallback;
        const value = lang.getText(key, params || {});
        return value === key ? fallback : value;
    }

    // ----------------------------------------------------------------------
    // SITE DATA
    // Mamei: swap this for a fetch("/api/sites") call later — everything
    // below reads from this array only, so nothing else needs to change.
    // ----------------------------------------------------------------------
    const SITES = [
        {
            id: "cape-coast-castle",
            name: "Cape Coast Castle",
            location: "Cape Coast, Central Region",
            category: "castles",
            categoryLabel: "Historical Monument",
            lng: -1.2466,
            lat: 5.1053,
            image: "../images/Cape Coast Castle photo, Ghana Africa.jpeg",
            description: "Explore the castle and discover the powerful stories of the transatlantic slave trade, resilience and freedom.",
            trail: {
                totalStops: 7,
                url: "heritage-trail.html?site=cape-coast-castle",
                stop: {
                    title: "Door of No Return",
                    desc: "The point where enslaved Africans were forced onto ships.",
                    image: "../images/The Door Of No Return At Cape Coast Castle photo, Ghana Africa.jpeg"
                }
            }
        },
        {
            id: "manhyia-palace",
            name: "Manhyia Palace",
            location: "Kumasi, Ashanti Region",
            category: "palaces",
            categoryLabel: "Palace",
            lng: -1.6244,
            lat: 6.6989,
            image: "../images/Manhyia Palace.jpeg",
            description: "The seat of the Asantehene and the Ashanti Kingdom, blending royal tradition with living Ashanti governance."
        },
        {
            id: "osu-castle",
            name: "Osu Castle",
            location: "Osu, Greater Accra Region",
            category: "castles",
            categoryLabel: "Castle",
            lng: -0.1785,
            lat: 5.5502,
            image: "../images/osu castle (1).jpeg",
            description: "A former seat of government perched on the Accra coastline, with a layered colonial and post-independence history."
        },
        {
            id: "independence-arch",
            name: "Independence Arch",
            location: "Accra, Greater Accra Region",
            category: "monuments",
            categoryLabel: "Monument",
            lng: -0.1969,
            lat: 5.5459,
            image: "../images/INDEPENDENCE ARCH (1).jpeg",
            description: "The centrepiece of Independence Square, marking Ghana's 1957 independence and its role as the first sub-Saharan nation to break from colonial rule."
        },
        {
            id: "kwame-nkrumah",
            name: "Kwame Nkrumah Memorial Park",
            location: "Accra, Greater Accra Region",
            category: "museums",
            categoryLabel: "Museum",
            lng: -0.2058,
            lat: 5.5449,
            image: "../images/kwame Nkrumah memorial park.jpeg",
            description: "The final resting place and museum dedicated to Ghana's first president and a leading figure of Pan-Africanism."
        }
    ];

    let activeCategory = "all";
    let activeSiteId = null;

    // ----------------------------------------------------------------------
    // MOBILE HAMBURGER MENU
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener("click", function () {
            const isOpen = mobileNav.classList.toggle("is-open");
            hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", function (e) {
            if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove("is-open");
                hamburgerBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ----------------------------------------------------------------------
    // LANGUAGE DROPDOWN
    // ----------------------------------------------------------------------
    const langSelectBtn = document.getElementById("langSelectBtn");
    const langMenu = document.getElementById("langMenu");
    const currentLangLabel = document.getElementById("currentLangLabel");

    if (langSelectBtn && langMenu) {
        langSelectBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = langMenu.classList.toggle("is-open");
            langSelectBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", function (e) {
            if (!langSelectBtn.contains(e.target) && !langMenu.contains(e.target)) {
                langMenu.classList.remove("is-open");
                langSelectBtn.setAttribute("aria-expanded", "false");
            }
        });

        langMenu.querySelectorAll(".lang-option").forEach(function (opt) {
            opt.addEventListener("click", function () {
                const code = opt.getAttribute("data-lang");

                langMenu.querySelectorAll(".lang-option").forEach(function (o) {
                    o.classList.remove("is-active");
                });
                opt.classList.add("is-active");

                if (currentLangLabel) currentLangLabel.textContent = opt.textContent;
                langMenu.classList.remove("is-open");
                langSelectBtn.setAttribute("aria-expanded", "false");

                if (window.ananseLanguage && window.ananseLanguage.setLanguage) {
                    window.ananseLanguage.setLanguage(code);
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // MAPBOX INITIALISATION
    // Mamei: set a real public token below (or load it from your backend).
    // The map still degrades gracefully — search, filters and the featured
    // list all work — if no token is set yet.
    // ----------------------------------------------------------------------
    const MAPBOX_TOKEN = ""; // <-- set your Mapbox public token here
    let map = null;
    const markerById = {};

    function initMap() {
        if (!window.mapboxgl || !MAPBOX_TOKEN) {
            mapContainer.innerHTML =
                '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#5b6b69;font:600 14px/1.4 sans-serif;text-align:center;padding:20px;">' +
                'Map preview unavailable — add a Mapbox token in map-page.js to enable the live map.' +
                '</div>';
            return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: "mapbox-container",
            style: "mapbox://styles/mapbox/light-v11",
            center: [-1.0232, 6.0], // roughly centred on Ghana
            zoom: 6.2
        });

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");

        map.on("load", function () {
            SITES.forEach(function (site) {
                const el = document.createElement("button");
                el.type = "button";
                el.className = "map-marker-pin";
                el.setAttribute("aria-label", site.name);
                el.style.cssText =
                    "width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);" +
                    "background:#073B40;border:2px solid #D9A21B;cursor:pointer;";

                el.addEventListener("click", function () {
                    openSitePopup(site.id);
                });

                const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
                    .setLngLat([site.lng, site.lat])
                    .addTo(map);

                markerById[site.id] = marker;
            });
        });
    }

    initMap();

    function flyToSite(site) {
        if (map) {
            map.flyTo({ center: [site.lng, site.lat], zoom: 12, essential: true });
        }
    }

    // ----------------------------------------------------------------------
    // CUSTOM MAP CONTROLS (zoom in / zoom out / locate me)
    // ----------------------------------------------------------------------
    const btnZoomIn = document.getElementById("btnZoomIn");
    const btnZoomOut = document.getElementById("btnZoomOut");
    const btnLocateMe = document.getElementById("btnLocateMe");

    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", function () {
            if (map) map.zoomIn();
        });
    }

    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", function () {
            if (map) map.zoomOut();
        });
    }

    let userLocation = null;

    if (btnLocateMe) {
        btnLocateMe.addEventListener("click", function () {
            if (!navigator.geolocation) {
                alert(t("mapPage.geoUnsupported", "Your browser doesn't support location services."));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                function (pos) {
                    userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    if (map) {
                        map.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 10, essential: true });
                    }
                    if (activeSiteId) updateTravelEstimate(activeSiteId);
                },
                function () {
                    alert(t("mapPage.geoDenied", "We couldn't access your location. You can still browse the map manually."));
                }
            );
        });
    }

    // ----------------------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------------------
    const mapSearchInput = document.getElementById("mapSearchInput");

    if (mapSearchInput) {
        mapSearchInput.addEventListener("input", function () {
            applyFilters();
        });
        mapSearchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const match = getVisibleSites()[0];
                if (match) {
                    flyToSite(match);
                    openSitePopup(match.id);
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // CATEGORY FILTERS
    // ----------------------------------------------------------------------
    const categoryFilters = document.getElementById("categoryFilters");

    if (categoryFilters) {
        categoryFilters.querySelectorAll(".filter-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                categoryFilters.querySelectorAll(".filter-btn").forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
                activeCategory = btn.getAttribute("data-category") || "all";
                applyFilters();
            });
        });
    }

    function getVisibleSites() {
        const query = mapSearchInput ? mapSearchInput.value.trim().toLowerCase() : "";
        return SITES.filter(function (site) {
            const matchesCategory = activeCategory === "all" || site.category === activeCategory;
            const matchesQuery = !query ||
                site.name.toLowerCase().indexOf(query) !== -1 ||
                site.location.toLowerCase().indexOf(query) !== -1;
            return matchesCategory && matchesQuery;
        });
    }

    function applyFilters() {
        const visibleIds = getVisibleSites().map(function (s) { return s.id; });

        // Show/hide map markers
        Object.keys(markerById).forEach(function (id) {
            const el = markerById[id].getElement();
            el.style.display = visibleIds.indexOf(id) !== -1 ? "" : "none";
        });

        // Show/hide matching featured cards
        document.querySelectorAll(".featured-cards-grid .site-card").forEach(function (card) {
            const id = card.getAttribute("data-site-id");
            card.style.display = visibleIds.indexOf(id) !== -1 ? "" : "none";
        });
    }

    // ----------------------------------------------------------------------
    // SITE DETAIL POPUP
    // ----------------------------------------------------------------------
    const sitePopupCard = document.getElementById("sitePopupCard");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popupImage = document.getElementById("popupImage");
    const popupTitle = document.getElementById("popupTitle");
    const popupLocationText = document.getElementById("popupLocationText");
    const popupCategoryText = document.getElementById("popupCategoryText");
    const popupDescription = document.getElementById("popupDescription");
    const btnGetDirections = document.getElementById("btnGetDirections");
    const btnBookVisit = document.getElementById("btnBookVisit");
    const btnExploreSite = document.getElementById("btnExploreSite");
    const btnViewTrail = document.getElementById("btnViewTrail");

    const travelEstimateBox = document.getElementById("travelEstimateBox");
    const travelTimeText = document.getElementById("travelTimeText");
    const travelDistText = document.getElementById("travelDistText");

    const trailHighlightsSection = document.querySelector(".trail-highlights-section");
    const primaryHighlightLink = document.getElementById("primaryHighlightLink");
    const highlightThumb = document.getElementById("highlightThumb");
    const highlightTitle = document.getElementById("highlightTitle");
    const highlightDesc = document.getElementById("highlightDesc");
    const viewAllStopsLink = document.getElementById("viewAllStopsLink");
    const viewAllStopsText = document.getElementById("viewAllStopsText");

    function haversineKm(a, b) {
        const R = 6371;
        const dLat = ((b.lat - a.lat) * Math.PI) / 180;
        const dLng = ((b.lng - a.lng) * Math.PI) / 180;
        const lat1 = (a.lat * Math.PI) / 180;
        const lat2 = (b.lat * Math.PI) / 180;
        const h =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }

    function updateTravelEstimate(siteId) {
        if (!travelEstimateBox) return;
        const site = SITES.find(function (s) { return s.id === siteId; });

        if (!site || !userLocation) {
            travelEstimateBox.classList.add("hidden");
            return;
        }

        const km = haversineKm(userLocation, site);
        const avgSpeedKmh = 55; // rough average for Ghanaian road conditions
        const hours = km / avgSpeedKmh;
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);

        if (travelTimeText) {
            travelTimeText.textContent = h > 0 ? (h + " hr " + m + " min") : (m + " min");
        }
        if (travelDistText) {
            travelDistText.textContent = "(" + Math.round(km) + " km)";
        }
        travelEstimateBox.classList.remove("hidden");
    }

    function openSitePopup(siteId) {
        const site = SITES.find(function (s) { return s.id === siteId; });
        if (!site || !sitePopupCard) return;

        activeSiteId = siteId;

        if (popupImage) { popupImage.src = site.image; popupImage.alt = site.name; }
        if (popupTitle) popupTitle.textContent = site.name;
        if (popupLocationText) popupLocationText.textContent = site.location;
        if (popupCategoryText) popupCategoryText.textContent = site.categoryLabel;
        if (popupDescription) popupDescription.textContent = site.description;

        if (btnGetDirections) {
            btnGetDirections.onclick = function () {
                const url = "https://www.google.com/maps/dir/?api=1&destination=" + site.lat + "," + site.lng;
                window.open(url, "_blank", "noopener");
            };
        }
        if (btnBookVisit) btnBookVisit.href = "plan.html?site=" + site.id;
        if (btnExploreSite) btnExploreSite.href = "explore.html?site=" + site.id;

        if (site.trail) {
            if (btnViewTrail) { btnViewTrail.href = site.trail.url; btnViewTrail.classList.remove("hidden"); }
            if (trailHighlightsSection) trailHighlightsSection.classList.remove("hidden");
            if (primaryHighlightLink) primaryHighlightLink.href = site.trail.url;
            if (highlightThumb) { highlightThumb.src = site.trail.stop.image; highlightThumb.alt = site.trail.stop.title; }
            if (highlightTitle) highlightTitle.textContent = site.trail.stop.title;
            if (highlightDesc) highlightDesc.textContent = site.trail.stop.desc;
            if (viewAllStopsLink) viewAllStopsLink.href = site.trail.url;
            if (viewAllStopsText) {
                viewAllStopsText.textContent = t("mapPage.viewAllStops", "View all stops (" + site.trail.totalStops + ")", { count: site.trail.totalStops });
            }
        } else {
            if (btnViewTrail) btnViewTrail.classList.add("hidden");
            if (trailHighlightsSection) trailHighlightsSection.classList.add("hidden");
        }

        updateTravelEstimate(siteId);

        sitePopupCard.classList.remove("hidden");
        flyToSite(site);
    }

    function closeSitePopup() {
        if (!sitePopupCard) return;
        sitePopupCard.classList.add("hidden");
        activeSiteId = null;
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", closeSitePopup);
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && sitePopupCard && !sitePopupCard.classList.contains("hidden")) {
            closeSitePopup();
        }
    });

    // ----------------------------------------------------------------------
    // FEATURED SITE CARDS
    // ----------------------------------------------------------------------
    document.querySelectorAll(".featured-cards-grid .site-card").forEach(function (card) {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", function () {
            const id = card.getAttribute("data-site-id");
            if (id) openSitePopup(id);
        });

        card.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const id = card.getAttribute("data-site-id");
                if (id) openSitePopup(id);
            }
        });
    });

    // ----------------------------------------------------------------------
    // INIT
    // ----------------------------------------------------------------------
    applyFilters();
});