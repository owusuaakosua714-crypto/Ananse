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
        const NAA_API_PATH = "/api/naa/ask";
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
                const data = await window.ananseAuth.api(NAA_API_PATH, {
                    method: "POST",
                    body: JSON.stringify({
                        question: messageText,
                        language: window.ananseLanguage ? window.ananseLanguage.currentLanguage : "en"
                    })
                });

                showTypingIndicator(false);

                // Backend reply: { title, introduction, sections[{heading, content}], visitor_notes[], sources[] }
                const parts = [];
                if (data && data.introduction) parts.push(data.introduction);
                (data && data.sections || []).forEach(sec => {
                    parts.push(`${sec.heading}\n${sec.content}`);
                });
                if (data && data.visitor_notes && data.visitor_notes.length) {
                    parts.push("Visitor notes:\n• " + data.visitor_notes.join("\n• "));
                }
                const answer = parts.join("\n\n");

                if (answer) {
                    const localizedAnswer = window.ananseLanguage && window.ananseLanguage.localizeNaaResponse
                        ? window.ananseLanguage.localizeNaaResponse(answer)
                        : answer;
                    appendNaaMessage(localizedAnswer, data.sources || []);
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
                        ${escapeHTML(answerText).replace(/\n/g, "<br>")}
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

            window.ananseAuth.api('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            })
                .then(data => {
                    const session = window.ananseAuth.saveTokenResponse(data);
                    window.location.href = session.role === 'admin' ? 'admin.html' : 'passport.html';
                })
                .catch(err => {
                    alert(err.status === 401
                        ? 'That email and password do not match an account.'
                        : 'Could not reach ANANSE right now. Please try again.\n' + err.message);
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '';
                    submitBtn.innerHTML = originalText;
                });
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

    // ---- Dedicated story pages for each heritage card ----
    const STORY_PAGES = {
        "cape-coast": "capecoast.html",
        "manhyia": "manhyia.html",
        "osu": "osucastle.html",
        "independence": "independence.html",
        "kwame-nkrumah": "kwamepark.html"
    };

    function getStoryUrl(siteId) {
        return STORY_PAGES[siteId] || "site.html?site=" + siteId;
    }

    // ---- Pages with a Listen experience (others show "coming soon") ----
    const LISTEN_PAGES = {
        "cape-coast": "capecoast.html#listen",
        "manhyia": "manhyia.html#listen",
        "osu": "osucastle.html#listen",
        "independence": "independence.html#listen",
        "kwame-nkrumah": "kwamepark.html#listen"
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
        const learnBtn = e.target.closest(".explore-story-btn");
        if (learnBtn) {
            e.preventDefault();
            e.stopPropagation();
            const siteId = learnBtn.getAttribute("data-site-id");
            const storyUrl = getStoryUrl(siteId);
            if (storyUrl) {
                window.location.href = storyUrl;
            }
            return;
        }

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

/* =========================================================
   ANANSE — PASSPORT JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const passportNav =
        document.getElementById("passportNav");

    const mobileNavOverlay =
        document.getElementById("mobileNavOverlay");


    function openMobileMenu() {

        passportNav.classList.add("open");

        mobileNavOverlay.classList.add("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

        document.body.style.overflow = "hidden";
    }


    function closeMobileMenu() {

        passportNav.classList.remove("open");

        mobileNavOverlay.classList.remove("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        document.body.style.overflow = "";
    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    passportNav.classList.contains("open");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    if (mobileNavOverlay) {

        mobileNavOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    /* CLOSE MOBILE NAV AFTER LINK */

    document
        .querySelectorAll(".passport-nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });



    /* =====================================================
       MODAL SYSTEM
    ====================================================== */

    const modals =
        document.querySelectorAll(".modal");


    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.style.overflow = "";

    }


    /* SIDEBAR BUTTONS */

    document
        .querySelectorAll("[data-modal]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const modalId =
                    button.dataset.modal;

                const modal =
                    document.getElementById(modalId);

                openModal(modal);

            });

        });


    /* CLOSE BUTTON */

    modals.forEach(modal => {

        const closeButton =
            modal.querySelector(".modal-close");

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => closeModal(modal)
            );

        }


        /* CLICK OUTSIDE MODAL */

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closeModal(modal);

            }

        });

    });


    /* ESCAPE KEY */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            modals.forEach(modal => {

                if (modal.classList.contains("open")) {

                    closeModal(modal);

                }

            });

        }
    );



    /* =====================================================
       BADGE DETAILS
    ====================================================== */

    const badgeCards =
        document.querySelectorAll(".badge-card");

    const badgeDetailModal =
        document.getElementById("badgeDetailModal");

    const badgeDetailTitle =
        document.getElementById("badgeDetailTitle");

    const badgeDetailText =
        document.getElementById("badgeDetailText");

    const badgeDetailIcon =
        document.getElementById("badgeDetailIcon");


    const badgeInformation = {

        cape: {

            title: "Cape Coast Castle",

            text:
                "You earned the Castle Explorer badge by exploring the history and heritage of Cape Coast Castle.",

            icon:
                "fa-landmark"

        },

        manhyia: {

            title: "Manhyia Palace",

            text:
                "You earned the Royal Heritage badge by discovering the history and cultural significance of Manhyia Palace.",

            icon:
                "fa-crown"

        },

        osu: {

            title: "Osu Castle",

            text:
                "You earned the Coastal Heritage badge by exploring the history of Osu Castle.",

            icon:
                "fa-building-columns"

        },

        independence: {

            title: "Independence Square",

            text:
                "You earned the Nation Builder badge by discovering one of Ghana's most important national landmarks.",

            icon:
                "fa-flag"

        },

        nkrumah: {

            title: "Kwame Nkrumah Memorial",

            text:
                "You earned the Freedom Fighter badge by learning about Ghana's independence journey and Kwame Nkrumah's legacy.",

            icon:
                "fa-star"

        }

    };


    badgeCards.forEach(card => {

        card.addEventListener("click", () => {

            const badgeId =
                card.dataset.badge;

            const badge =
                badgeInformation[badgeId];

            if (!badge) return;


            badgeDetailTitle.textContent =
                badge.title;

            badgeDetailText.textContent =
                badge.text;

            badgeDetailIcon.innerHTML =
                `<i class="fa-solid ${badge.icon}"></i>`;


            openModal(badgeDetailModal);

        });

    });



    /* =====================================================
       SMOOTH HERO SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href="#passportDashboard"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                const target =
                    document.getElementById(
                        "passportDashboard"
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });



    /* =====================================================
       SIDEBAR ACTIVE STATE
    ====================================================== */

    const profileMenuItems =
        document.querySelectorAll(
            ".profile-menu-item"
        );

    profileMenuItems.forEach(item => {

        item.addEventListener("click", () => {

            profileMenuItems.forEach(
                menuItem =>
                    menuItem.classList.remove("active")
            );

            item.classList.add("active");

        });

    });



    /* =====================================================
       PREVENT BACKGROUND SCROLL WHEN MENU IS OPEN
    ====================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 760 &&
            passportNav.classList.contains("open")
        ) {

            closeMobileMenu();

        }

    });


});
// ==========================================================================
// ANANSE — MAP PAGE (script.js)
// Guarded so it's safe to append to the shared script.js: navigation code is 
// untouched, map styling is updated to an earthy theme, and popups now fully translate.
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("mapbox-container");
    if (!mapContainer) return; // only run on map.html

    // ----------------------------------------------------------------------
    // LANGUAGE STATE & TRANSLATION HELPER
    // ----------------------------------------------------------------------
    function getCurrentLang() {
        return (window.ananseLanguage && window.ananseLanguage.currentLanguage) || document.documentElement.lang || "en";
    }

    function getI18nVal(key) {
        return t(key, "");
    }

    function t(key, fallback, params) {
        const language = window.ananseLanguage;
        if (!key) return fallback || "";
        if (language && typeof language.getText === "function") {
            const value = language.getText(key, params || {});
            if (value) return value;
        }
        return fallback || String(key).split(".").pop().replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
    }

    // ----------------------------------------------------------------------
    // MULTI-LANGUAGE SITE DATA
    // ----------------------------------------------------------------------
    const SITE_ALIASES = {
        "cape-coast": "cape-coast-castle",
        "manhyia": "manhyia-palace",
        "osu": "osu-castle",
        "independence": "independence-arch",
        "kwame-nkrumah": "kwame-nkrumah"
    };

    const SITES = [
        {
            id: "cape-coast-castle",
            name: "mapPage.site.capeCoast.name",
            location: "mapPage.site.capeCoast.location",
            shortLocation: "mapPage.site.capeCoast.shortLocation",
            category: "castles",
            categoryLabel: "mapPage.site.capeCoast.category",
            lng: -1.2466,
            lat: 5.1053,
            image: "../images/Cape Coast Castle photo, Ghana Africa.jpeg",
            description: "mapPage.site.capeCoast.description",
            trail: {
                totalStops: 3,
                url: "heritagetrails.html?site=cape-coast-castle",
                stop: {
                    title: "mapPage.site.capeCoast.stopTitle",
                    desc: "mapPage.site.capeCoast.stopDescription",
                    image: "../images/door of no return.jpeg"
                }
            }
        },
        {
            id: "manhyia-palace",
            name: "mapPage.site.manhyia.name",
            location: "mapPage.site.manhyia.location",
            shortLocation: "mapPage.site.manhyia.shortLocation",
            category: "palaces",
            categoryLabel: "mapPage.site.manhyia.category",
            lng: -1.6244,
            lat: 6.6989,
            image: "../images/Manhyia Palace.jpeg",
            description: "mapPage.site.manhyia.description",
            trail: {
                totalStops: 3,
                url: "heritagetrails.html?site=manhyia-palace",
                stop: {
                    title: "mapPage.site.manhyia.stopTitle",
                    desc: "mapPage.site.manhyia.stopDescription",
                    image: "../images/Manhyia Palace.jpeg"
                }
            }
        },
        {
            id: "osu-castle",
            name: "mapPage.site.osu.name",
            location: "mapPage.site.osu.location",
            shortLocation: "mapPage.site.osu.shortLocation",
            category: "castles",
            categoryLabel: "mapPage.site.osu.category",
            lng: -0.1785,
            lat: 5.5502,
            image: "../images/osu castle (1).jpeg",
            description: "mapPage.site.osu.description",
            trail: {
                totalStops: 3,
                url: "heritagetrails.html?site=osu-castle",
                stop: {
                    title: "mapPage.site.osu.stopTitle",
                    desc: "mapPage.site.osu.stopDescription",
                    image: "../images/osu castle (1).jpeg"
                }
            }
        },
        {
            id: "independence-arch",
            name: "mapPage.site.independence.name",
            location: "mapPage.site.independence.location",
            shortLocation: "mapPage.site.independence.shortLocation",
            category: "monuments",
            categoryLabel: "mapPage.site.independence.category",
            lng: -0.1969,
            lat: 5.5459,
            image: "../images/INDEPENDENCE ARCH (1).jpeg",
            description: "mapPage.site.independence.description",
            trail: {
                totalStops: 3,
                url: "heritagetrails.html?site=independence-arch",
                stop: {
                    title: "mapPage.site.independence.stopTitle",
                    desc: "mapPage.site.independence.stopDescription",
                    image: "../images/INDEPENDENCE ARCH (1).jpeg"
                }
            }
        },
        {
            id: "kwame-nkrumah",
            name: "mapPage.site.kwameNkrumah.name",
            location: "mapPage.site.kwameNkrumah.location",
            shortLocation: "mapPage.site.kwameNkrumah.shortLocation",
            category: "museums",
            categoryLabel: "mapPage.site.kwameNkrumah.category",
            lng: -0.2058,
            lat: 5.5449,
            image: "../images/kwame Nkrumah memorial park.jpeg",
            description: "mapPage.site.kwameNkrumah.description",
            trail: {
                totalStops: 3,
                url: "heritagetrails.html?site=kwame-nkrumah",
                stop: {
                    title: "mapPage.site.kwameNkrumah.stopTitle",
                    desc: "mapPage.site.kwameNkrumah.stopDescription",
                    image: "../images/kwame Nkrumah memorial park.jpeg"
                }
            }
        }
    ];

    let activeCategory = "all";
    let activeSiteId = null;

    // ----------------------------------------------------------------------
    // MOBILE HAMBURGER MENU (UNTOUCHED)
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener("click", function () {
            const isOpen = mobileNav.classList.toggle("open");
            hamburgerBtn.classList.toggle("is-active", isOpen);
            hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", function (e) {
            if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove("open");
                hamburgerBtn.classList.remove("is-active");
                hamburgerBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // MAPBOX INITIALISATION (EARTHY COLOR STYLING)
    // ----------------------------------------------------------------------
    const MAPBOX_TOKEN = "pk.eyJ1IjoiYWtvc3VhYWFhYWFhIiwiYSI6ImNtdWI3b2l6MzFza2EyenMyOHp0Z2U5dzgifQ.pRQHZhklYFeG0G6BGZ5NYw"; // Add your Mapbox token here
    let map = null;
    const markerById = {};

    function updateMapboxControlLabels() {
        const labels = [
            [".mapboxgl-ctrl-zoom-in", "mapPage.zoomIn"],
            [".mapboxgl-ctrl-zoom-out", "mapPage.zoomOut"],
            [".mapboxgl-ctrl-attrib-button", "mapPage.toggleAttribution"]
        ];
        labels.forEach(function (item) {
            const control = mapContainer.querySelector(item[0]);
            if (!control) return;
            const label = t(item[1], "Map control");
            control.setAttribute("aria-label", label);
            control.setAttribute("title", label);
        });
        const feedbackLink = mapContainer.querySelector(".mapbox-improve-map");
        if (feedbackLink) feedbackLink.textContent = t("mapPage.mapFeedback", "Improve this map");
    }

    function initMap() {
        if (!window.mapboxgl || !MAPBOX_TOKEN) {
            const unavailableMessage = document.createElement("div");
            unavailableMessage.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;color:#E2E8F0;font:600 15px/1.5 sans-serif;text-align:center;padding:20px;background:#2E4A3E;";
            unavailableMessage.textContent = t("mapPage.mapUnavailable", "Map preview unavailable. Add a Mapbox token to enable the live map.");
            mapContainer.replaceChildren(unavailableMessage);
            return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: "mapbox-container",
            style: "mapbox://styles/mapbox/outdoors-v12", // Outdoors/Earthy map style
            center: [-1.0232, 6.0],
            zoom: 6.2
        });

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");
        updateMapboxControlLabels();

        map.on("load", function () {
            updateMapboxControlLabels();
            SITES.forEach(function (site) {
                const el = document.createElement("button");
                el.type = "button";
                el.className = "map-marker-pin";
                const lang = getCurrentLang();
                el.setAttribute("aria-label", getI18nVal(site.name, lang));
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
    // CUSTOM MAP CONTROLS
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
    // SEARCH & CATEGORY FILTERS
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
        const lang = getCurrentLang();
        return SITES.filter(function (site) {
            const matchesCategory = activeCategory === "all" || site.category === activeCategory;
            const siteName = getI18nVal(site.name, lang).toLowerCase();
            const siteLoc = getI18nVal(site.location, lang).toLowerCase();
            const matchesQuery = !query ||
                siteName.indexOf(query) !== -1 ||
                siteLoc.indexOf(query) !== -1;
            return matchesCategory && matchesQuery;
        });
    }

    function applyFilters() {
        const visibleIds = getVisibleSites().map(function (s) { return s.id; });

        Object.keys(markerById).forEach(function (id) {
            const el = markerById[id].getElement();
            el.style.display = visibleIds.indexOf(id) !== -1 ? "" : "none";
        });

        document.querySelectorAll(".featured-cards-grid .site-card").forEach(function (card) {
            const id = card.getAttribute("data-site-id");
            card.style.display = visibleIds.indexOf(id) !== -1 ? "" : "none";
        });
    }

    // ----------------------------------------------------------------------
    // SITE DETAIL POPUP (WITH TRANSLATIONS)
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
        const avgSpeedKmh = 55;
        const hours = km / avgSpeedKmh;
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);

        if (travelTimeText) {
            travelTimeText.textContent = h > 0
                ? t("mapPage.travelTimeHours", "{{hours}} hr {{minutes}} min", { hours: h, minutes: m })
                : t("mapPage.travelTimeMinutes", "{{minutes}} min", { minutes: m });
        }
        if (travelDistText) {
            travelDistText.textContent = t("mapPage.travelDistance", "({{distance}} km)", { distance: Math.round(km) });
        }
        travelEstimateBox.classList.remove("hidden");
    }

    function openSitePopup(siteId, shouldFly = true) {
        const canonicalSiteId = SITE_ALIASES[siteId] || siteId;
        const site = SITES.find(function (s) { return s.id === canonicalSiteId; });
        if (!site || !sitePopupCard) return;

        activeSiteId = canonicalSiteId;
        const lang = getCurrentLang();

        if (popupImage) { popupImage.src = site.image; popupImage.alt = getI18nVal(site.name, lang); }
        if (popupTitle) popupTitle.textContent = getI18nVal(site.name, lang);
        if (popupLocationText) popupLocationText.textContent = getI18nVal(site.location, lang);
        if (popupCategoryText) popupCategoryText.textContent = getI18nVal(site.categoryLabel, lang);
        if (popupDescription) popupDescription.textContent = getI18nVal(site.description, lang);

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
            if (highlightThumb) { 
                highlightThumb.src = site.trail.stop.image; 
                highlightThumb.alt = getI18nVal(site.trail.stop.title, lang); 
            }
            if (highlightTitle) highlightTitle.textContent = getI18nVal(site.trail.stop.title, lang);
            if (highlightDesc) highlightDesc.textContent = getI18nVal(site.trail.stop.desc, lang);
            if (viewAllStopsLink) viewAllStopsLink.href = site.trail.url;
            if (viewAllStopsText) {
                viewAllStopsText.textContent = t("mapPage.viewAllStops", "View all stops ({{count}})", { count: site.trail.totalStops });
            }
        } else {
            if (btnViewTrail) btnViewTrail.classList.add("hidden");
            if (trailHighlightsSection) trailHighlightsSection.classList.add("hidden");
        }

        updateTravelEstimate(siteId);

        sitePopupCard.classList.remove("hidden");
        if (shouldFly) flyToSite(site);
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
    function refreshMapLanguage() {
        document.querySelectorAll("[data-site-title-id]").forEach(function (element) {
            const site = SITES.find(function (item) { return item.id === element.getAttribute("data-site-title-id"); });
            if (site) element.textContent = getI18nVal(site.name);
        });
        document.querySelectorAll("[data-site-shortloc-id]").forEach(function (element) {
            const site = SITES.find(function (item) { return item.id === element.getAttribute("data-site-shortloc-id"); });
            if (site) element.textContent = getI18nVal(site.shortLocation);
        });
        Object.keys(markerById).forEach(function (id) {
            const site = SITES.find(function (item) { return item.id === id; });
            if (site) markerById[id].getElement().setAttribute("aria-label", getI18nVal(site.name));
        });
        updateMapboxControlLabels();
        if (activeSiteId) openSitePopup(activeSiteId, false);
        applyFilters();
    }

    document.addEventListener("ananse:languagechange", refreshMapLanguage);
    refreshMapLanguage();
});

/* =========================================================
   ANANSE — SIGN UP PAGE LOGIC
   Scoped strictly to pages/signup.html
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Check page root element to ensure logic only runs on signup page
    const signupRoot = document.querySelector('[data-page="signup"]');
    if (!signupRoot) return;

    // Elements
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('signupFullName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const termsCheckbox = document.getElementById('signupTerms');
    
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const signupAlert = document.getElementById('signupAlert');
    const mobileToggleBtn = document.querySelector('.signup-mobile-toggle');
    const mobileMenu = id = document.getElementById('signupMobileMenu');

    /* ---------------------------------------------------------
       PASSWORD VISIBILITY TOGGLE
    --------------------------------------------------------- */
    function setupPasswordToggle(button, input) {
        if (!button || !input) return;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
            const icon = button.querySelector('i');
            if (icon) {
                if (isPassword) {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    }

    setupPasswordToggle(togglePasswordBtn, passwordInput);
    setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

    /* ---------------------------------------------------------
       MOBILE MENU TOGGLE
    --------------------------------------------------------- */
    if (mobileToggleBtn && mobileMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            mobileToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
        });
    }

    /* ---------------------------------------------------------
       FORM VALIDATION & SUBMISSION
    --------------------------------------------------------- */
    function showError(inputElement, errorElementId, messageKey, defaultMessage) {
        const fieldGroup = inputElement.closest('.signup-field-group');
        const errorSpan = document.getElementById(errorElementId);
        
        if (fieldGroup) fieldGroup.classList.add('has-error');
        if (errorSpan) {
            // Check if global language system function exists
            if (window.ananseLanguage && typeof window.ananseLanguage.getText === 'function') {
                errorSpan.textContent = window.ananseLanguage.getText(messageKey) || defaultMessage;
            } else {
                errorSpan.textContent = defaultMessage;
            }
        }
    }

    function clearError(inputElement, errorElementId) {
        const fieldGroup = inputElement.closest('.signup-field-group');
        const errorSpan = document.getElementById(errorElementId);
        
        if (fieldGroup) fieldGroup.classList.remove('has-error');
        if (errorSpan) errorSpan.textContent = '';
    }

    function clearAllErrors() {
        clearError(fullNameInput, 'fullNameError');
        clearError(emailInput, 'emailError');
        clearError(passwordInput, 'passwordError');
        clearError(confirmPasswordInput, 'confirmPasswordError');
        clearError(termsCheckbox, 'termsError');
        if (signupAlert) {
            signupAlert.style.display = 'none';
            signupAlert.className = 'signup-alert';
            signupAlert.textContent = '';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Input blur listeners for real-time validation clearing
    if (fullNameInput) fullNameInput.addEventListener('input', () => clearError(fullNameInput, 'fullNameError'));
    if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'emailError'));
    if (passwordInput) passwordInput.addEventListener('input', () => clearError(passwordInput, 'passwordError'));
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', () => clearError(confirmPasswordInput, 'confirmPasswordError'));
    if (termsCheckbox) termsCheckbox.addEventListener('change', () => clearError(termsCheckbox, 'termsError'));

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearAllErrors();

            let isValid = true;

            // Validate Full Name
            if (!fullNameInput.value.trim()) {
                showError(fullNameInput, 'fullNameError', 'signup.form.errorName', 'Please enter your full name.');
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'emailError', 'signup.form.errorEmailRequired', 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'emailError', 'signup.form.errorEmailInvalid', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Password
            if (!passwordInput.value) {
                showError(passwordInput, 'passwordError', 'signup.form.errorPasswordRequired', 'Please enter a password.');
                isValid = false;
            } else if (passwordInput.value.length < 8) {
                showError(passwordInput, 'passwordError', 'signup.form.errorPasswordLength', 'Password must be at least 8 characters.');
                isValid = false;
            }

            // Validate Confirm Password
            if (!confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'confirmPasswordError', 'signup.form.errorConfirmRequired', 'Please confirm your password.');
                isValid = false;
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'confirmPasswordError', 'signup.form.errorPasswordMismatch', 'Passwords do not match.');
                isValid = false;
            }

            // Validate Terms Checkbox
            if (!termsCheckbox.checked) {
                showError(termsCheckbox, 'termsError', 'signup.form.errorTerms', 'You must agree to the Terms & Privacy Policy.');
                isValid = false;
            }

            if (isValid) {
                const showAlert = (kind, text) => {
                    if (!signupAlert) { if (kind === 'error') alert(text); return; }
                    signupAlert.className = `signup-alert ${kind}`;
                    signupAlert.textContent = text;
                    signupAlert.style.display = 'block';
                };

                window.ananseAuth.api('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        full_name: fullNameInput.value.trim(),
                        email: emailInput.value.trim(),
                        password: passwordInput.value,
                    }),
                })
                    .then(data => {
                        window.ananseAuth.saveTokenResponse(data);
                        const successMsg = (window.ananseLanguage && typeof window.ananseLanguage.getText === 'function')
                            ? window.ananseLanguage.getText('signup.form.successMessage')
                            : 'Account created successfully! Redirecting...';
                        showAlert('success', successMsg);
                        setTimeout(() => { window.location.href = 'passport.html'; }, 1200);
                    })
                    .catch(err => showAlert('error', err.message));
            }
        });
    }
});

/**
 * ANANSE Ghana Heritage Website - Plan Page Interactive Controller
 * Scoped exclusively to pages/plan.html logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. Heritage Sites Database & Placeholders
    // ----------------------------------------------------------------------
    const HERITAGE_SITES = {
        "cape-coast-castle": {
            name: "Cape Coast Castle",
            translationKey: "site.capeCoast",
            image: "../images/cape coast castle.jpeg",
            locationQuery: "Cape Coast Castle, Ghana"
        },
        "independence-arch": {
            name: "Independence Arch",
            translationKey: "site.independence",
            image: "../images/INDEPENDENCE ARCH (1).jpeg",
            locationQuery: "Independence Arch, Accra, Ghana"
        },
        "kwame-nkrumah-memorial-park": {
            name: "Kwame Nkrumah Memorial Park",
            translationKey: "site.kwameNkrumah",
            image: "../images/kwame Nkrumah memorial park.jpeg",
            locationQuery: "Kwame Nkrumah Memorial Park, Accra, Ghana"
        },
        "manhyia-palace": {
            name: "Manhyia Palace",
            translationKey: "site.manhyia",
            image: "../images/Manhyia Palace.jpeg",
            locationQuery: "Manhyia Palace Museum, Kumasi, Ghana"
        },
        "osu-castle": {
            name: "Osu Castle",
            translationKey: "site.osu",
            image: "../images/osu castle (1).jpeg",
            locationQuery: "Osu Castle, Accra, Ghana"
        }
    };

    // ----------------------------------------------------------------------
    // 2. DOM Elements
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById("planMenuToggle");
    const navContent = document.getElementById("planNavContent");
    const siteSelect = document.getElementById("planSiteSelect");
    const visitDateInput = document.getElementById("planVisitDate");
    const visitorSelect = document.getElementById("planVisitorCount");
    const timeInput = document.getElementById("planSuggestedTime");

    const summaryBox = document.getElementById("planSummaryBox");
    const imageContainer = document.getElementById("planImageContainer");
    const siteNameDisplay = document.getElementById("planSiteName");
    const siteHintDisplay = document.getElementById("planSiteHint");
    const summaryDateDisplay = document.getElementById("planSummaryDate");
    const summaryVisitorsDisplay = document.getElementById("planSummaryVisitors");

    const detailDateDisplay = document.getElementById("planDetailDateDisplay");
    const detailVisitorsDisplay = document.getElementById("planDetailVisitorsDisplay");

    const saveBtn = document.getElementById("planSaveBtn");
    const calendarBtn = document.getElementById("planCalendarBtn");
    const directionsBtn = document.getElementById("planDirectionsBtn");
    const authNotice = document.getElementById("planAuthNotice");
    const planLanguage = window.ananseLanguage;

    function planText(key, params = {}) {
        return planLanguage && typeof planLanguage.getPlanText === "function"
            ? planLanguage.getPlanText(key, params)
            : key;
    }

    function getPlanLocale() {
        const language = document.documentElement.lang;
        return language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en";
    }

    function getSiteName(siteKey) {
        const siteData = HERITAGE_SITES[siteKey];
        return siteData ? planText(siteData.translationKey) : "";
    }

    function getVisitorLabel(visitorCount) {
        if (!visitorCount) return planText("yourPlan.emptyValue");
        return visitorCount === "1"
            ? planText("visitors.one")
            : planText("visitors.many", { count: visitorCount });
    }

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Hamburger Menu Toggle
    // ----------------------------------------------------------------------
    if (menuToggle && navContent) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            navContent.classList.toggle("plan-nav-active");
        });
    }

    function getLocalDateValue() {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }

    // Set Minimum Date for Date Selector to Today
    if (visitDateInput) {
        visitDateInput.setAttribute("min", getLocalDateValue());
    }

    // ----------------------------------------------------------------------
    // 4. Reactive State Management & UI Updates
    // ----------------------------------------------------------------------
    function updatePlanUI() {
        const selectedSiteKey = siteSelect ? siteSelect.value : "";
        const selectedDate = visitDateInput ? visitDateInput.value : "";
        const selectedVisitors = visitorSelect ? visitorSelect.value : "";

        const siteData = HERITAGE_SITES[selectedSiteKey];

        if (siteData) {
            const siteName = getSiteName(selectedSiteKey);
            // Active Selected State
            if (summaryBox) summaryBox.classList.remove("plan-empty-state");
            if (siteNameDisplay) siteNameDisplay.textContent = siteName;
            if (siteHintDisplay) siteHintDisplay.style.display = "none";

            // Dynamic Image Handling
            if (imageContainer) {
                const image = document.createElement("img");
                image.src = siteData.image;
                image.alt = siteName;
                image.loading = "lazy";
                image.className = "plan-summary-img";
                imageContainer.replaceChildren(image);
            }
        } else {
            // Empty Default State
            if (summaryBox) summaryBox.classList.add("plan-empty-state");
            if (siteHintDisplay) siteHintDisplay.style.display = "block";
        }

        // Format Date for Display
        let formattedDate = planText("yourPlan.emptyValue");
        if (selectedDate) {
            const dateObj = new Date(selectedDate + "T00:00:00");
            formattedDate = dateObj.toLocaleDateString(getPlanLocale(), {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        const formattedVisitors = getVisitorLabel(selectedVisitors);

        // Update Text Nodes
        if (summaryDateDisplay) summaryDateDisplay.textContent = formattedDate;
        if (summaryVisitorsDisplay) summaryVisitorsDisplay.textContent = formattedVisitors;
        if (detailDateDisplay) detailDateDisplay.textContent = formattedDate;
        if (detailVisitorsDisplay) detailVisitorsDisplay.textContent = formattedVisitors;
    }

    // Event Listeners for Reactive Controls
    if (siteSelect) siteSelect.addEventListener("change", updatePlanUI);
    if (visitDateInput) visitDateInput.addEventListener("change", updatePlanUI);
    if (visitorSelect) visitorSelect.addEventListener("change", updatePlanUI);
    document.addEventListener("ananse:languagechange", updatePlanUI);

    // ----------------------------------------------------------------------
    // 5. LocalStorage Save & Restore Functionality
    // ----------------------------------------------------------------------
    function getSignedInSession() {
        if (!window.ananseAuth || typeof window.ananseAuth.getSession !== "function") {
            console.error("ANANSE authentication is unavailable on the plan page.");
            alert(planText("auth.unavailable"));
            return null;
        }
        const session = window.ananseAuth.getSession();
        if (!session) {
            if (authNotice) {
                authNotice.hidden = false;
                authNotice.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return null;
        }
        if (authNotice) authNotice.hidden = true;
        return session;
    }

    function getPlanInput() {
        const siteKey = siteSelect ? siteSelect.value : "";
        const dateVal = visitDateInput ? visitDateInput.value : "";
        const visitorVal = visitorSelect ? visitorSelect.value : "";
        const timeVal = timeInput ? timeInput.value : "";
        if (!HERITAGE_SITES[siteKey]) {
            alert(planText("error.siteRequired"));
            return null;
        }
        if (!dateVal || dateVal < getLocalDateValue()) {
            alert(planText("error.dateRequired"));
            return null;
        }
        if (!visitorVal) {
            alert(planText("error.visitorsRequired"));
            return null;
        }
        return {
            siteKey,
            date: dateVal,
            visitors: visitorVal,
            time: timeVal || "10:00"
        };
    }

    function savePlanToStorage() {
        const session = getSignedInSession();
        if (!session) return;
        const planData = getPlanInput();
        if (!planData) return;
        try {
            planData.savedAt = new Date().toISOString();
            const storageKey = `ananse_user_plan:${session.email.toLowerCase()}`;
            localStorage.setItem(storageKey, JSON.stringify(planData));
        } catch (e) {
            console.error("Could not save plan to localStorage.", e);
            alert(planText("error.saveFailed"));
            return;
        }
        try {
            downloadCalendarEvent(planData);
            alert(planText("auth.saved"));
        } catch (e) {
            console.error("Could not create the calendar event.", e);
            alert(planText("error.calendarAfterSave"));
        }
    }

    function restoreSavedPlan() {
        const session = window.ananseAuth && window.ananseAuth.getSession();
        if (!session) return;
        try {
            const storageKey = `ananse_user_plan:${session.email.toLowerCase()}`;
            const savedRaw = localStorage.getItem(storageKey);
            if (!savedRaw) return;

            const saved = JSON.parse(savedRaw);
            if (saved.siteKey && siteSelect) siteSelect.value = saved.siteKey;
            if (saved.date && visitDateInput) visitDateInput.value = saved.date;
            if (saved.visitors && visitorSelect) visitorSelect.value = saved.visitors;
            if (saved.time && timeInput) timeInput.value = saved.time;

            updatePlanUI();
        } catch (e) {
            console.error("Could not parse saved plan from localStorage", e);
        }
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", savePlanToStorage);
    }

    // ----------------------------------------------------------------------
    // 6. Add to Calendar (.ics Generator)
    // ----------------------------------------------------------------------
    function generateIcsCalendarEvent() {
        if (!getSignedInSession()) return;
        const planData = getPlanInput();
        if (!planData) return;
        try {
            downloadCalendarEvent(planData);
            alert(planText("auth.calendarReady"));
        } catch (e) {
            console.error("Could not create the calendar event.", e);
            alert(planText("error.calendarFailed"));
        }
    }

    function escapeIcsText(value) {
        return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
    }

    function downloadCalendarEvent(planData) {
        const siteName = getSiteName(planData.siteKey);
        const start = new Date(`${planData.date}T${planData.time}:00`);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const formatLocalDate = (date) => [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("") + "T" + [
            String(date.getHours()).padStart(2, "0"),
            String(date.getMinutes()).padStart(2, "0"),
            String(date.getSeconds()).padStart(2, "0")
        ].join("");
        const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@ananse`;
        const formatUtcDate = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//ANANSE Ghana Heritage//NONSGML v1.0//EN",
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${formatUtcDate(new Date())}`,
            `SUMMARY:${escapeIcsText(planText("calendar.title", { site: siteName }))}`,
            `DESCRIPTION:${escapeIcsText(planText("calendar.description", { count: planData.visitors }))}`,
            `LOCATION:${escapeIcsText(planText("calendar.location", { site: siteName }))}`,
            `DTSTART:${formatLocalDate(start)}`,
            `DTEND:${formatLocalDate(end)}`,
            "BEGIN:VALARM",
            "TRIGGER:-PT1H",
            "ACTION:DISPLAY",
            `DESCRIPTION:${escapeIcsText(planText("calendar.title", { site: siteName }))}`,
            "END:VALARM",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `Ananse-Visit-${planData.siteKey}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.setTimeout(() => window.URL.revokeObjectURL(link.href), 1000);
    }

    if (calendarBtn) {
        calendarBtn.addEventListener("click", generateIcsCalendarEvent);
    }

    // ----------------------------------------------------------------------
    // 7. Get Directions (Google Maps / ANANSE Map Integration)
    // ----------------------------------------------------------------------
    function handleGetDirections() {
        const siteKey = siteSelect ? siteSelect.value : "";
        if (!siteKey) {
            alert(planText("error.directionsSite"));
            return;
        }

        const siteData = HERITAGE_SITES[siteKey];
        if (siteData && siteData.locationQuery) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.locationQuery)}`;
            window.open(mapsUrl, "_blank");
        }
    }

    if (directionsBtn) {
        directionsBtn.addEventListener("click", handleGetDirections);
    }

    // Initialize state on page load
    restoreSavedPlan();
});