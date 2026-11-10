(function () {
    const ANALYTICS_KEY = "ananseAdminAnalyticsV1";

    function recordView(siteId, page) {
        try {
            let visitorId = localStorage.getItem("ananseVisitorId");
            if (!visitorId) {
                visitorId = window.crypto && typeof window.crypto.randomUUID === "function"
                    ? window.crypto.randomUUID()
                    : "visitor-" + Date.now().toString(36) + Math.random().toString(36).slice(2);
                localStorage.setItem("ananseVisitorId", visitorId);
            }
            const data = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || "{}");
            data.visitors = Array.isArray(data.visitors) ? data.visitors : [];
            data.views = Array.isArray(data.views) ? data.views : [];
            if (data.visitors.indexOf(visitorId) === -1) data.visitors.push(visitorId);
            data.views.push({ siteId: siteId || "", page: page || "", at: new Date().toISOString() });
            if (data.views.length > 5000) data.views = data.views.slice(-5000);
            localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
        } catch (error) {
            // Analytics are optional when browser storage is unavailable.
        }
    }

    window.ananseAnalytics = {
        recordSiteView: function (siteId, page) { recordView(siteId, page || location.pathname); }
    };

    function createStoryImage(image) {
        const figure = document.createElement("figure");
        figure.className = "s-story-image";
        figure.dataset.adminManagedImage = "true";
        const photo = document.createElement("img");
        photo.src = image.src;
        photo.alt = image.caption || "Heritage site photograph";
        photo.loading = "lazy";
        const caption = document.createElement("figcaption");
        caption.textContent = image.caption || "";
        figure.append(photo, caption);
        return figure;
    }

    function applyManagedStory(site) {
        const hero = document.querySelector(".s-hero");
        const prose = document.querySelector("#story .s-prose");
        if (!site || !prose) return;

        if (site.name) {
            const title = hero && hero.querySelector("h1");
            if (title) title.textContent = site.name;
            document.title = site.name + ": The Story — ANANSE";
        }
        if (site.description && hero) {
            const intro = hero.querySelector("p");
            if (intro) intro.textContent = site.description;
        }

        if (site.story) {
            prose.replaceChildren();
            site.story.split(/\n\s*\n/).map(function (paragraph) { return paragraph.trim(); }).filter(Boolean).forEach(function (text) {
                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                prose.appendChild(paragraph);
            });
        }

        const images = (site.images || []).slice().sort(function (left, right) { return left.after - right.after; });
        if (!images.length) return;
        const paragraphs = Array.from(prose.children).filter(function (child) { return child.tagName === "P"; });
        images.filter(function (image) { return image.after === 0; }).forEach(function (image) {
            prose.insertBefore(createStoryImage(image), prose.firstChild);
        });
        images.filter(function (image) { return image.after > 0; }).forEach(function (image) {
            const paragraph = paragraphs[Math.min(image.after, paragraphs.length) - 1];
            if (paragraph && paragraph.nextSibling) prose.insertBefore(createStoryImage(image), paragraph.nextSibling);
            else if (paragraph) prose.appendChild(createStoryImage(image));
            else prose.appendChild(createStoryImage(image));
        });
    }

    document.addEventListener("DOMContentLoaded", async function () {
        const page = location.pathname.split("/").pop() || "index.html";
        const storySiteIds = {
            "capecoast.html": "cape-coast",
            "manhyia.html": "manhyia",
            "osucastle.html": "osu",
            "independence.html": "independence",
            "kwamepark.html": "kwame-nkrumah"
        };
        const querySite = new URLSearchParams(location.search).get("site");
        const siteId = storySiteIds[page] || (page === "explore.html" ? querySite : "");
        recordView(siteId, page);
        if (storySiteIds[page] && window.ananseSiteContent) {
            await window.ananseSiteContent.ready;
            const site = window.ananseSiteContent.getSite(storySiteIds[page]);
            applyManagedStory(site);
        }
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("home-page")) {
        const menuToggleSelector = "[data-ananse-menu-toggle]";
        const menuSelector = ".ananse-standard-menu";

        function setMenuOpen(toggle, menu, isOpen) {
            toggle.setAttribute("aria-expanded", String(isOpen));
            menu.classList.toggle("is-open", isOpen);
            const icon = toggle.querySelector(".fa-bars, .fa-xmark");
            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        }

        function closeMenus(exceptToggle = null) {
            document.querySelectorAll(menuToggleSelector).forEach(toggle => {
                if (toggle === exceptToggle) return;
                const menu = document.getElementById(toggle.getAttribute("aria-controls"));
                if (menu) setMenuOpen(toggle, menu, false);
            });
        }

        document.addEventListener("click", event => {
            const toggle = event.target.closest(menuToggleSelector);
            if (toggle) {
                event.preventDefault();
                event.stopImmediatePropagation();
                const menu = document.getElementById(toggle.getAttribute("aria-controls"));
                if (!menu) {
                    throw new Error(`Mobile navigation menu not found for ${toggle.id || "toggle"}.`);
                }
                const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
                closeMenus(toggle);
                setMenuOpen(toggle, menu, shouldOpen);
                return;
            }

            if (event.target.closest(`${menuSelector} a`)) {
                closeMenus();
                return;
            }

            if (!event.target.closest(`${menuToggleSelector}, ${menuSelector}`)) closeMenus();
        }, true);

        document.addEventListener("keydown", event => {
            if (event.key !== "Escape") return;
            const openToggle = document.querySelector(`${menuToggleSelector}[aria-expanded="true"]`);
            if (!openToggle) return;
            const menu = document.getElementById(openToggle.getAttribute("aria-controls"));
            if (menu) setMenuOpen(openToggle, menu, false);
            openToggle.focus();
        });
    }

    // Mobile Hamburger Menu Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            // Toggle icon between bars and times (close X)
            const icon = mobileToggle.querySelector(".fa-bars, .fa-xmark");
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
                const icon = mobileToggle.querySelector(".fa-bars, .fa-xmark");
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
        initGoogleSignIn();
    });

    function initGoogleSignIn() {
        const button = document.querySelector('.login-google-btn');
        if (!button) return;

        const clientIdMeta = document.querySelector('meta[name="google-client-id"]');
        const clientId = clientIdMeta && clientIdMeta.content ? clientIdMeta.content.trim() : '';

        button.addEventListener('click', () => {
            if (!window.google || !window.google.accounts || !window.google.accounts.id) {
                alert('Google Sign-In could not load. Check your connection and refresh the page.');
                return;
            }
            if (!clientId) {
                alert('Google Sign-In is not configured yet. The Google OAuth client ID is missing.');
                return;
            }

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleCredential,
                ux_mode: 'popup',
            });
            window.google.accounts.id.prompt();
        });

        function handleGoogleCredential(response) {
            if (!response || !response.credential) {
                alert('Google Sign-In was cancelled. Please try again.');
                return;
            }

            const originalContent = button.innerHTML;
            button.disabled = true;
            button.style.opacity = '0.7';

            window.ananseAuth.api('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ id_token: response.credential }),
            })
                .then(data => {
                    const session = window.ananseAuth.saveTokenResponse(data);
                    if (session.role === 'admin') {
                        window.ananseAuth.clearSession();
                        alert('Administrator accounts must sign in through the Admin Login page.');
                        button.disabled = false;
                        button.style.opacity = '';
                        button.innerHTML = originalContent;
                        return;
                    }
                    window.location.href = 'passport.html';
                })
                .catch(err => {
                    alert(err.status === 401
                        ? 'Google could not verify your account. Please try again.'
                        : 'Could not complete Google Sign-In. Please try again.\n' + err.message);
                    button.disabled = false;
                    button.style.opacity = '';
                    button.innerHTML = originalContent;
                });
        }
    }

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
                    if (session.role === 'admin') {
                        window.ananseAuth.clearSession();
                        alert('Administrator accounts must sign in through the Admin Login page.');
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '';
                        submitBtn.innerHTML = originalText;
                        return;
                    }
                    window.location.href = 'passport.html';
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

document.addEventListener("DOMContentLoaded", async function () {
    const cardGrid = document.getElementById("cardGrid");
    if (!cardGrid) return; // only run on explore.html
    if (window.ananseSiteContent) await window.ananseSiteContent.ready;

    function syncManagedSiteCards() {
        const api = window.ananseSiteContent;
        if (!api) return;
        const sites = api.getSites();
        const byId = new Map(sites.map(function (site) { return [site.id, site]; }));
        const existingIds = new Set();

        Array.from(cardGrid.querySelectorAll(".heritage-card")).forEach(function (card) {
            const site = byId.get(card.dataset.siteId);
            if (!site) {
                card.remove();
                return;
            }
            existingIds.add(site.id);
            card.dataset.name = site.name;
            card.dataset.location = site.location;
            card.dataset.region = site.region;
            card.dataset.category = site.category;
            card.dataset.categoryLabel = site.category.replace(/-/g, " ");
            card.dataset.description = site.description;
            card.querySelector(".card-body h3").textContent = site.name;
            card.querySelector(".card-loc span").textContent = site.location;
            card.querySelector(".card-desc").textContent = site.description;
            card.querySelector(".category-badge").textContent = site.category.replace(/-/g, " ");
            const image = card.querySelector(".card-media img");
            if (site.coverImage) {
                image.src = site.coverImage;
                image.alt = site.name;
                image.hidden = false;
            } else {
                image.removeAttribute("src");
                image.hidden = true;
            }
            [".card-body h3", ".card-loc span", ".card-desc", ".category-badge"].forEach(function (selector) {
                const element = card.querySelector(selector);
                if (element) element.removeAttribute("data-i18n");
            });
        });

        sites.filter(function (site) { return !existingIds.has(site.id); }).forEach(function (site) {
            const categoryLabel = site.category.replace(/-/g, " ");
            const mediaClass = "media--managed-" + site.category;
            const card = document.createElement("article");
            card.className = "heritage-card";
            card.dataset.siteId = site.id;
            card.dataset.name = site.name;
            card.dataset.location = site.location;
            card.dataset.region = site.region;
            card.dataset.category = site.category;
            card.dataset.categoryLabel = categoryLabel;
            card.dataset.mediaClass = mediaClass;
            card.dataset.description = site.description;
            card.dataset.didYouKnow = site.description;

            const media = document.createElement("div");
            media.className = "card-media " + mediaClass;
            const image = document.createElement("img");
            if (site.coverImage) image.src = site.coverImage;
            else image.hidden = true;
            image.alt = site.name;
            image.loading = "lazy";
            const badge = document.createElement("span");
            badge.className = "category-badge";
            badge.textContent = categoryLabel;
            const bookmark = document.createElement("button");
            bookmark.type = "button";
            bookmark.className = "bookmark-btn";
            bookmark.dataset.siteId = site.id;
            bookmark.setAttribute("aria-pressed", "false");
            bookmark.setAttribute("aria-label", "Save " + site.name + " to favourites");
            bookmark.innerHTML = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
            media.append(image, badge, bookmark);

            const body = document.createElement("div");
            body.className = "card-body";
            const title = document.createElement("h3");
            title.textContent = site.name;
            const location = document.createElement("p");
            location.className = "card-loc";
            location.innerHTML = '<i class="fa-solid fa-location-dot" aria-hidden="true"></i>';
            const locationText = document.createElement("span");
            locationText.textContent = site.location;
            location.appendChild(locationText);
            const description = document.createElement("p");
            description.className = "card-desc";
            description.textContent = site.description;
            const footer = document.createElement("div");
            footer.className = "card-foot";
            const learn = document.createElement("button");
            learn.type = "button";
            learn.className = "explore-story-btn";
            learn.dataset.siteId = site.id;
            learn.textContent = "Learn the Story ";
            learn.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>');
            footer.appendChild(learn);
            body.append(title, location, description, footer);
            card.append(media, body);
            cardGrid.appendChild(card);
        });
    }

    syncManagedSiteCards();
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
        const managedSite = window.ananseSiteContent && window.ananseSiteContent.getSite(siteId);
        if (managedSite && managedSite.storyPage) return managedSite.storyPage;
        if (managedSite) return "explore.html?site=" + encodeURIComponent(siteId);
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

    function escapeHTML(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
        });
    }

    function managedStoryMarkup(site) {
        if (!site || (!site.story && !(site.images && site.images.length))) return "";
        const paragraphs = (site.story || "").split(/\n\s*\n/).map(function (text) { return text.trim(); }).filter(Boolean);
        const images = (site.images || []).slice().sort(function (left, right) { return left.after - right.after; });
        const content = [];
        function addImages(after) {
            images.filter(function (image) { return image.after === after; }).forEach(function (image) {
                content.push('<figure class="managed-story-image"><img src="' + escapeHTML(image.src) + '" alt="' + escapeHTML(image.caption || site.name) + '" loading="lazy"><figcaption>' + escapeHTML(image.caption) + '</figcaption></figure>');
            });
        }
        addImages(0);
        paragraphs.forEach(function (paragraph, index) {
            content.push("<p>" + escapeHTML(paragraph) + "</p>");
            addImages(index + 1);
        });
        images.filter(function (image) { return image.after > paragraphs.length; }).forEach(function (image) {
            content.push('<figure class="managed-story-image"><img src="' + escapeHTML(image.src) + '" alt="' + escapeHTML(image.caption || site.name) + '" loading="lazy"><figcaption>' + escapeHTML(image.caption) + '</figcaption></figure>');
        });
        return '<div class="modal-section managed-story"><h4>Story</h4>' + content.join("") + "</div>";
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
        const managedSite = window.ananseSiteContent && window.ananseSiteContent.getSite(d.siteId);
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
        if (window.ananseAnalytics) window.ananseAnalytics.recordSiteView(d.siteId, location.pathname);

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
            '<div class="modal-hero ' + escapeHTML(d.mediaClass) + '">' +
                '<img src="' + escapeHTML(imageSrc) + '" alt="' + escapeHTML(imageAlt) + '" onerror="this.style.display=\'none\'">' +
                '<span class="category-badge">' + escapeHTML(categoryLabel) + '</span>' +
                '<div>' +
                    '<h2>' + escapeHTML(name) + '</h2>' +
                    '<p class="loc"><i class="fa-solid fa-location-dot"></i> ' + escapeHTML(location) + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="modal-body">' +
                '<div class="modal-section"><h4>' + t("explorePage.aboutSite", "About this site") + '</h4><p>' + escapeHTML(description) + '</p></div>' +
                managedStoryMarkup(managedSite) +
                '<div class="modal-section"><h4>' + t("explorePage.didYouKnow", "Did You Know?") + '</h4><p>' + escapeHTML(didYouKnow) + '</p></div>' +
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
    const requestedSite = new URLSearchParams(location.search).get("site");
    const exploreSiteAliases = {
        "cape-coast-castle": "cape-coast",
        "manhyia-palace": "manhyia",
        "osu-castle": "osu",
        "independence-arch": "independence"
    };
    if (requestedSite) {
        const requestedSiteId = exploreSiteAliases[requestedSite] || requestedSite;
        const requestedCard = cards.find(function (card) { return card.dataset.siteId === requestedSiteId; });
        if (requestedCard) openModal(requestedCard);
    }
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
   ANANSE — PASSPORT (all-in-one script)  ->  src/passport.js

   PART 1  Progress & rewards engine (records trail activity)
   PART 2  Passport page display (only runs on passport.html)

   Load it on passport.html AND on heritagetrails.html:
     <script src="../src/passport.js"></script>

   On the trails page, record progress with either:
     - attributes: data-trail-stop="cape-coast-castle:door-of-no-return"
                   data-trail-complete="cape-coast-castle"
     - or code:    ananseProgress.recordStop("cape-coast-castle", "door-of-no-return");
                   ananseProgress.completeTrail("cape-coast-castle");

   Points: +10 per new stop, +50 per finished trail (earns its badge),
   +100 for finishing all trails. Change them in POINTS below.
   "stopIds" in SITES must match the stops on each trail.
========================================================= */

/* ==================== PART 1: ENGINE ==================== */
(function () {
    "use strict";

    const STORAGE_PREFIX = "ananse_passport_progress";
    const GUEST_KEY = STORAGE_PREFIX + ":guest";
    const CHANGE_EVENT = "ananse:progresschange";
    const MAX_ACTIVITY = 30;

    /* -----------------------------------------------------
       REWARD RULES — the only place points are defined
    ----------------------------------------------------- */
    const POINTS = Object.freeze({
        stop: 10,           // each new stop visited on a trail
        trailComplete: 50,  // finishing every stop on a trail (also earns that site's badge)
        allTrails: 100      // finishing every trail (passport complete)
    });

    /* -----------------------------------------------------
       TRAILS / SITES
       "stopIds" must match the stop ids on each trail in
       heritagetrails.html. "aliases" let the Explore page ids
       (cape-coast, osu...) and the Map page ids both work.
    ----------------------------------------------------- */
    const SITES = [
        { id: "cape-coast-castle", aliases: ["cape-coast", "cape", "capecoast"], name: "Cape Coast Castle", badgeName: "Cape Coast", badgeTitle: "Castle Explorer", icon: "fa-landmark", stopIds: ["door-of-no-return", "castle-grounds", "memory-and-healing"] },
        { id: "manhyia-palace", aliases: ["manhyia"], name: "Manhyia Palace", badgeName: "Manhyia", badgeTitle: "Royal Heritage", icon: "fa-crown", stopIds: ["royal-court", "regalia", "living-tradition"] },
        { id: "osu-castle", aliases: ["osu", "osucastle"], name: "Osu Castle", badgeName: "Osu Castle", badgeTitle: "Coastal Heritage", icon: "fa-building-columns", stopIds: ["castle-approach", "colonial-memory", "national-shift"] },
        { id: "independence-arch", aliases: ["independence", "independence-square"], name: "Independence Arch", badgeName: "Independence", badgeTitle: "Nation Builder", icon: "fa-flag", stopIds: ["independence-arch", "national-space", "future-vision"] },
        { id: "kwame-nkrumah", aliases: ["nkrumah", "kwame-nkrumah-memorial-park", "kwamepark"], name: "Kwame Nkrumah Memorial Park", badgeName: "Nkrumah", badgeTitle: "Freedom Fighter", icon: "fa-star", stopIds: ["tribute-garden", "independence-story", "pan-african-legacy"] }
    ];

    // Rank is decided by how many trails have been completed
    const LEVELS = [
        { key: "newExplorer", title: "New Explorer", minTrails: 0 },
        { key: "explorer", title: "Heritage Explorer", minTrails: 1 },
        { key: "guide", title: "Heritage Guide", minTrails: 3 },
        { key: "storyKeeper", title: "Heritage Story Keeper", minTrails: SITES.length }
    ];

    /* -----------------------------------------------------
       HELPERS
    ----------------------------------------------------- */
    function nowIso() {
        return new Date().toISOString();
    }

    function resolveSite(raw) {
        const id = String(raw == null ? "" : raw).trim().toLowerCase();
        if (!id) return null;
        return SITES.find(function (s) {
            return s.id === id || s.aliases.indexOf(id) !== -1;
        }) || null;
    }

    function getSession() {
        try {
            return window.ananseAuth && typeof window.ananseAuth.getSession === "function"
                ? window.ananseAuth.getSession()
                : null;
        } catch (e) {
            return null;
        }
    }

    function getUser() {
        const s = getSession();
        if (!s) return { signedIn: false, name: "", email: "" };
        return {
            signedIn: true,
            email: s.email || "",
            name: s.full_name || s.fullName || s.name || ""
        };
    }

    function storageKey() {
        const u = getUser();
        return STORAGE_PREFIX + ":" + (u.signedIn && u.email ? u.email.toLowerCase() : "guest");
    }

    /* -----------------------------------------------------
       STORAGE
    ----------------------------------------------------- */
    function normalize(raw) {
        const data = {
            createdAt: (raw && raw.createdAt) || nowIso(),
            sites: {},
            rewardedStops: {},
            rewardedTrails: {},
            allTrailsAwardedAt: (raw && raw.allTrailsAwardedAt) || null,
            activity: Array.isArray(raw && raw.activity) ? raw.activity.slice(0, MAX_ACTIVITY) : []
        };
        SITES.forEach(function (site) {
            const src = raw && raw.sites && raw.sites[site.id];
            if (src && src.stops && typeof src.stops === "object") {
                const stops = {};
                const legacyStops = [];
                Object.keys(src.stops).forEach(function (stopId) {
                    if (site.stopIds.indexOf(stopId) !== -1) {
                        stops[stopId] = src.stops[stopId];
                    } else if (/^auto-\d+$/.test(stopId)) {
                        legacyStops.push(stopId);
                    } else {
                        stops[stopId] = src.stops[stopId];
                    }
                });
                legacyStops.sort(function (a, b) {
                    return Number(a.slice(5)) - Number(b.slice(5));
                }).forEach(function (stopId) {
                    const nextStop = site.stopIds.find(function (id) {
                        return !Object.prototype.hasOwnProperty.call(stops, id);
                    });
                    if (nextStop) stops[nextStop] = src.stops[stopId];
                });
                data.sites[site.id] = {
                    stops: stops,
                    completedAt: src.completedAt || null
                };
            }

            const rewardedStops = raw && raw.rewardedStops && raw.rewardedStops[site.id];
            data.rewardedStops[site.id] = {};
            if (rewardedStops && typeof rewardedStops === "object") {
                site.stopIds.forEach(function (stopId) {
                    if (rewardedStops[stopId]) data.rewardedStops[site.id][stopId] = rewardedStops[stopId];
                });
            }
            const progress = data.sites[site.id];
            if (progress) {
                site.stopIds.forEach(function (stopId) {
                    if (progress.stops[stopId] && !data.rewardedStops[site.id][stopId]) {
                        data.rewardedStops[site.id][stopId] = progress.stops[stopId];
                    }
                });
            }

            const rewardedAt = raw && raw.rewardedTrails && raw.rewardedTrails[site.id];
            data.rewardedTrails[site.id] = rewardedAt || (progress && progress.completedAt) || null;
        });
        return data;
    }

    function read(key) {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? normalize(JSON.parse(raw)) : null;
        } catch (e) {
            return null;
        }
    }

    function write(key, data) {
        try {
            window.localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error("[ananseProgress] Could not save progress.", e);
            return false;
        }
    }

    function hasAnyProgress(data) {
        return Boolean(data.allTrailsAwardedAt) || SITES.some(function (site) {
            const progress = data.sites[site.id];
            return (progress && Object.keys(progress.stops).length > 0) ||
                Object.keys(data.rewardedStops[site.id]).length > 0 ||
                Boolean(data.rewardedTrails[site.id]);
        });
    }

    // Makes sure completion flags match the stops that were recorded
    function reconcile(data) {
        let allDone = true;
        SITES.forEach(function (site) {
            const st = data.sites[site.id];
            const allStopsVisited = st && site.stopIds.every(function (stopId) {
                return Boolean(st.stops[stopId]);
            });
            if (allStopsVisited && !st.completedAt) {
                st.completedAt = site.stopIds.map(function (stopId) { return st.stops[stopId]; }).sort().pop();
            }
            if (!st || !st.completedAt) allDone = false;
        });
        if (allDone && !data.allTrailsAwardedAt) data.allTrailsAwardedAt = nowIso();
        return data;
    }

    function merge(target, source) {
        SITES.forEach(function (site) {
            const src = source.sites[site.id];
            if (src) {
                const dst = target.sites[site.id] || (target.sites[site.id] = { stops: {}, completedAt: null });
                Object.keys(src.stops).forEach(function (k) {
                    if (!dst.stops[k] || src.stops[k] < dst.stops[k]) dst.stops[k] = src.stops[k];
                });
                if (src.completedAt && (!dst.completedAt || src.completedAt < dst.completedAt)) {
                    dst.completedAt = src.completedAt;
                }
            }

            site.stopIds.forEach(function (stopId) {
                const srcReward = source.rewardedStops[site.id][stopId];
                const dstRewards = target.rewardedStops[site.id];
                if (srcReward && (!dstRewards[stopId] || srcReward < dstRewards[stopId])) {
                    dstRewards[stopId] = srcReward;
                }
            });
            const srcTrailReward = source.rewardedTrails[site.id];
            if (srcTrailReward && (!target.rewardedTrails[site.id] || srcTrailReward < target.rewardedTrails[site.id])) {
                target.rewardedTrails[site.id] = srcTrailReward;
            }
        });

        if (source.createdAt < target.createdAt) target.createdAt = source.createdAt;
        if (source.allTrailsAwardedAt && (!target.allTrailsAwardedAt || source.allTrailsAwardedAt < target.allTrailsAwardedAt)) {
            target.allTrailsAwardedAt = source.allTrailsAwardedAt;
        }

        const seen = {};
        target.activity = target.activity.concat(source.activity)
            .filter(function (a) {
                const k = [a.type, a.siteId, a.stopId].join("|");
                if (seen[k]) return false;
                seen[k] = true;
                return true;
            })
            .sort(function (a, b) { return a.at < b.at ? 1 : -1; })
            .slice(0, MAX_ACTIVITY);

        return reconcile(target);
    }

    function load() {
        const key = storageKey();
        let data = read(key);

        // Signed in now? Fold anything earned as a guest into the account.
        if (key !== GUEST_KEY) {
            const guest = read(GUEST_KEY);
            if (guest && hasAnyProgress(guest)) {
                data = merge(data || normalize(null), guest);
                if (write(key, data)) {
                    try { window.localStorage.removeItem(GUEST_KEY); } catch (e) { /* ignore */ }
                }
            }
        }

        return reconcile(data || normalize(null));
    }

    /* -----------------------------------------------------
       RECORDING PROGRESS
    ----------------------------------------------------- */
    function ensureSite(data, id) {
        return data.sites[id] || (data.sites[id] = { stops: {}, completedAt: null });
    }

    function log(data, entry) {
        data.activity.unshift(entry);
        if (data.activity.length > MAX_ACTIVITY) data.activity.length = MAX_ACTIVITY;
    }

    function newResult(site) {
        return {
            ok: true,
            siteId: site.id,
            siteName: site.name,
            badgeTitle: site.badgeTitle,
            newStops: 0,
            points: 0,
            trailCompleted: false,
            badgeEarned: false,
            allTrailsComplete: false
        };
    }

    // Adds one stop. Returns false if that stop was already collected (no farming).
    function addStop(data, site, stopId, now, result) {
        const state = ensureSite(data, site.id);
        if (state.stops[stopId]) return false;

        state.stops[stopId] = now;
        result.newStops += 1;

        const stopRewards = data.rewardedStops[site.id];
        if (!stopRewards[stopId]) {
            stopRewards[stopId] = now;
            result.points += POINTS.stop;
            log(data, { type: "stop", siteId: site.id, stopId: stopId, points: POINTS.stop, at: now });
        }

        const allStopsVisited = site.stopIds.every(function (id) {
            return Boolean(state.stops[id]);
        });
        if (!state.completedAt && allStopsVisited) {
            state.completedAt = now;
            result.trailCompleted = true;
            if (!data.rewardedTrails[site.id]) {
                data.rewardedTrails[site.id] = now;
                result.badgeEarned = true;
                result.points += POINTS.trailComplete;
                log(data, { type: "trail", siteId: site.id, points: POINTS.trailComplete, at: now });
            }

            const allDone = SITES.every(function (s) {
                return data.sites[s.id] && data.sites[s.id].completedAt;
            });
            if (allDone && !data.allTrailsAwardedAt) {
                data.allTrailsAwardedAt = now;
                result.allTrailsComplete = true;
                result.points += POINTS.allTrails;
                log(data, { type: "all", points: POINTS.allTrails, at: now });
            }
        }
        return true;
    }

    function commit(data, result, options) {
        if (result.newStops > 0) {
            if (!write(storageKey(), data)) return { ok: false, reason: "storage-failed" };
            window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: result }));
        }
        const showToast = !(options && options.toast === false);
        if (showToast && result.points > 0 && document.body && !document.body.classList.contains("passport-page")) {
            showRewardToast(result);
        }
        return result;
    }

    /**
     * The user visited / completed one stop on a trail.
     *   ananseProgress.recordStop("cape-coast-castle", "door-of-no-return");
     * The same stop only ever counts once.
     */
    function recordStop(siteRaw, stopRaw, options) {
        const site = resolveSite(siteRaw);
        const stopId = String(stopRaw == null ? "" : stopRaw).trim();
        if (!site) {
            console.warn("[ananseProgress] Unknown site:", siteRaw);
            return { ok: false, reason: "unknown-site" };
        }
        if (!stopId) {
            console.warn("[ananseProgress] recordStop needs a stop id.");
            return { ok: false, reason: "missing-stop" };
        }
        if (site.stopIds.indexOf(stopId) === -1) {
            console.warn("[ananseProgress] Unknown stop for site:", site.id, stopId);
            return { ok: false, reason: "unknown-stop" };
        }

        const data = load();
        const result = newResult(site);
        addStop(data, site, stopId, nowIso(), result);
        return commit(data, result, options);
    }

    /**
     * Confirms that every configured stop has been recorded. It never fills
     * in stops on the visitor's behalf.
     *   ananseProgress.completeTrail("cape-coast-castle");
     */
    function completeTrail(siteRaw, options) {
        const site = resolveSite(siteRaw);
        if (!site) {
            console.warn("[ananseProgress] Unknown site:", siteRaw);
            return { ok: false, reason: "unknown-site" };
        }

        const data = load();
        const state = ensureSite(data, site.id);
        const missingStops = site.stopIds.filter(function (stopId) {
            return !state.stops[stopId];
        });
        if (missingStops.length) {
            return { ok: false, reason: "stops-incomplete", remaining: missingStops.length };
        }
        const result = newResult(site);
        result.trailCompleted = true;
        return result;
    }

    function resetTrail(siteRaw) {
        const site = resolveSite(siteRaw);
        if (!site) {
            console.warn("[ananseProgress] Unknown site:", siteRaw);
            return { ok: false, reason: "unknown-site" };
        }

        const data = load();
        if (!data.sites[site.id]) return { ok: true, reset: false };
        delete data.sites[site.id];
        if (!write(storageKey(), data)) return { ok: false, reason: "storage-failed" };
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, {
            detail: { resetTrail: true, siteId: site.id }
        }));
        return { ok: true, reset: true };
    }

    /* -----------------------------------------------------
       SUMMARY (everything the passport page needs)
    ----------------------------------------------------- */
    function passportNumber(createdAt) {
        const s = storageKey();
        let h = 0;
        for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
        const year = new Date(createdAt).getFullYear() || new Date().getFullYear();
        return "AN-" + year + "-" + String(h % 10000).padStart(4, "0");
    }

    function getSummary() {
        const data = load();

        const sites = SITES.map(function (site) {
            const st = data.sites[site.id];
            const visitedStopIds = st ? site.stopIds.filter(function (stopId) {
                return Boolean(st.stops[stopId]);
            }) : [];
            const visited = visitedStopIds.length;
            const completed = !!(st && st.completedAt);
            const badgeEarnedAt = data.rewardedTrails[site.id];
            const badgeEarned = Boolean(badgeEarnedAt);
            const stopRewards = data.rewardedStops[site.id];
            const rewardPoints = Object.keys(stopRewards).length * POINTS.stop +
                (badgeEarned ? POINTS.trailComplete : 0);
            return {
                id: site.id,
                name: site.name,
                badgeName: site.badgeName,
                badgeTitle: site.badgeTitle,
                icon: site.icon,
                visitedStopIds: visitedStopIds,
                visited: visited,
                total: site.stopIds.length,
                percent: Math.round((visited / site.stopIds.length) * 100),
                completed: completed,
                badgeEarned: badgeEarned,
                badgeEarnedAt: badgeEarnedAt,
                rewardPoints: rewardPoints,
                completedAt: completed ? st.completedAt : null,
                status: completed ? "completed" : (visited > 0 ? "in-progress" : "not-started")
            };
        });

        const stopsVisited = sites.reduce(function (n, s) { return n + s.visited; }, 0);
        const totalStops = sites.reduce(function (n, s) { return n + s.total; }, 0);
        const trailsCompleted = sites.filter(function (s) { return s.completed; }).length;
        const complete = trailsCompleted === sites.length;

        const points = sites.reduce(function (total, site) { return total + site.rewardPoints; }, 0) +
            (data.allTrailsAwardedAt ? POINTS.allTrails : 0);
        const maxPoints = totalStops * POINTS.stop + sites.length * POINTS.trailComplete + POINTS.allTrails;

        const earnedBadges = sites.filter(function (s) { return s.badgeEarned; })
            .sort(function (a, b) { return a.badgeEarnedAt < b.badgeEarnedAt ? 1 : -1; });

        const level = LEVELS.filter(function (l) { return earnedBadges.length >= l.minTrails; }).pop();

        return {
            points: points,
            maxPoints: maxPoints,
            stopsVisited: stopsVisited,
            totalStops: totalStops,
            percent: totalStops ? Math.round((stopsVisited / totalStops) * 100) : 0,
            trailsCompleted: trailsCompleted,
            trailsTotal: sites.length,
            complete: complete,
            sites: sites,
            earnedBadges: earnedBadges,
            latestBadge: earnedBadges[0] || null,
            level: level,
            activity: data.activity.slice(),
            issuedAt: data.createdAt,
            passportNumber: passportNumber(data.createdAt)
        };
    }

    /* -----------------------------------------------------
       REWARD TOAST (shown on the trails page after a stop)
       Self-styled so it needs no CSS on that page.
    ----------------------------------------------------- */
    function showRewardToast(result) {
        if (!result || !result.ok || !result.newStops || !document.body) return;

        const old = document.getElementById("ananseRewardToast");
        if (old) old.remove();

        let title = "Stop collected!";
        let body = result.siteName + ": visit every stop to earn the " + result.badgeTitle + " badge.";
        if (result.allTrailsComplete) {
            title = "Passport complete!";
            body = "You've finished every heritage trail. Amazing work!";
        } else if (result.trailCompleted) {
            title = "Trail complete!";
            body = "You earned the " + result.badgeTitle + " badge for " + result.siteName + ".";
        }

        const toast = document.createElement("div");
        toast.id = "ananseRewardToast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText =
            "position:fixed;left:50%;bottom:24px;z-index:3000;width:min(430px,calc(100% - 28px));" +
            "transform:translate(-50%,20px);opacity:0;transition:opacity .25s ease,transform .25s ease;" +
            "display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:16px;" +
            "background:#062E35;color:#fff;border:1px solid rgba(234,168,53,.5);" +
            "box-shadow:0 18px 40px rgba(0,0,0,.3);font-size:13px;line-height:1.4;";

        if (result.points > 0) {
            const chip = document.createElement("div");
            chip.textContent = "+" + result.points;
            chip.style.cssText =
                "flex-shrink:0;min-width:56px;padding:9px 10px;border-radius:12px;background:#EAA835;" +
                "color:#062E35;font-weight:800;font-size:16px;text-align:center;";
            toast.appendChild(chip);
        }

        const text = document.createElement("div");
        text.style.cssText = "flex:1;min-width:0;";

        const strong = document.createElement("strong");
        strong.textContent = title;
        strong.style.cssText = "display:block;font-size:14px;margin-bottom:2px;";

        const p = document.createElement("span");
        p.textContent = body;
        p.style.cssText = "display:block;color:rgba(255,255,255,.78);font-size:12px;";

        const link = document.createElement("a");
        link.href = "./passport.html";
        link.textContent = "View passport \u2192";
        link.style.cssText = "display:inline-block;margin-top:6px;color:#EAA835;font-weight:700;font-size:12px;text-decoration:none;";

        text.appendChild(strong);
        text.appendChild(p);
        text.appendChild(link);
        toast.appendChild(text);
        document.body.appendChild(toast);

        window.requestAnimationFrame(function () {
            toast.style.opacity = "1";
            toast.style.transform = "translate(-50%,0)";
        });
        window.setTimeout(function () {
            toast.style.opacity = "0";
            toast.style.transform = "translate(-50%,20px)";
            window.setTimeout(function () { toast.remove(); }, 300);
        }, 6000);
    }

    /* -----------------------------------------------------
       NO-CODE HOOKS
       Add these attributes in heritagetrails.html and clicks are
       recorded automatically:
         data-trail-stop="cape-coast-castle:door-of-no-return"
         data-trail-complete="cape-coast-castle"
    ----------------------------------------------------- */
    document.addEventListener("click", function (e) {
        const stopEl = e.target.closest && e.target.closest("[data-trail-stop]");
        if (stopEl) {
            const parts = stopEl.getAttribute("data-trail-stop").split(":");
            recordStop(parts[0], parts.slice(1).join(":"));
            return;
        }
        const doneEl = e.target.closest && e.target.closest("[data-trail-complete]");
        if (doneEl) completeTrail(doneEl.getAttribute("data-trail-complete"));
    });

    /* -----------------------------------------------------
       PUBLIC API
    ----------------------------------------------------- */
    function reset() {
        try { window.localStorage.removeItem(storageKey()); } catch (e) { /* ignore */ }
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { reset: true } }));
    }

    window.ananseProgress = {
        POINTS: POINTS,
        SITES: SITES.map(function (s) {
            return { id: s.id, name: s.name, badgeName: s.badgeName, badgeTitle: s.badgeTitle, icon: s.icon, stops: s.stopIds.length, stopIds: s.stopIds.slice() };
        }),
        CHANGE_EVENT: CHANGE_EVENT,
        STORAGE_PREFIX: STORAGE_PREFIX,
        getUser: getUser,
        resolveSiteId: function (raw) { const s = resolveSite(raw); return s ? s.id : null; },
        recordStop: recordStop,
        completeTrail: completeTrail,
        resetTrail: resetTrail,
        getSummary: getSummary,
        showRewardToast: showRewardToast,
        onChange: function (cb) {
            window.addEventListener(CHANGE_EVENT, function (e) { cb(e.detail); });
        },
        reset: reset
    };
})();

/* ==================== PART 2: PASSPORT PAGE ==================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("passport-page")) return;

    const P = window.ananseProgress;
    if (!P) {
        console.error("The shared passport progress engine is unavailable on passport.html.");
        return;
    }

    let current = null; // latest summary

    /* =====================================================
       HELPERS
    ====================================================== */

    const $ = id => document.getElementById(id);

    function setText(id, value) {
        const node = $(id);
        if (node) node.textContent = value;
    }

    function esc(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    // Uses the site translations when a key exists, otherwise the English fallback
    function t(key, fallback, params) {
        const lang = window.ananseLanguage;
        if (lang && typeof lang.getText === "function") {
            const value = lang.getText(key, params || {});
            if (value && value !== key) return value;
        }
        return String(fallback).replace(/\{\{(\w+)\}\}/g, (m, k) =>
            params && params[k] !== undefined ? params[k] : m);
    }

    function locale() {
        const l = document.documentElement.lang;
        return l === "fr" ? "fr-FR" : l === "es" ? "es-ES" : "en-GB";
    }

    function fmtDate(iso) {
        const d = new Date(iso);
        return isNaN(d) ? "" : d.toLocaleDateString(locale(), { day: "2-digit", month: "short", year: "numeric" });
    }

    function relDay(iso) {
        const d = new Date(iso);
        if (isNaN(d)) return "";
        const startOf = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
        const diff = Math.round((startOf(new Date()) - startOf(d)) / 86400000);
        if (diff <= 0) return t("passportPage.today", "Today");
        if (diff === 1) return t("passportPage.yesterday", "Yesterday");
        return fmtDate(iso);
    }

    function trailUrl(siteId) {
        return "./heritagetrails.html?site=" + encodeURIComponent(siteId);
    }

    /* =====================================================
       RENDERING
    ====================================================== */

    function renderUser(s, user) {
        const name = user.name || t("passportPage.defaultName", "Heritage Explorer");
        setText("profileName", name);
        setText("ppName", name);
        setText("modalPassName", name);
        setText("profileLevelText", t("passportPage.level." + s.level.key, s.level.title));

        const notice = $("passportGuestNotice");
        if (notice) notice.hidden = user.signedIn;
    }

    function renderPoints(s) {
        setText("pointsValue", s.points);
        setText("pointsMax", "/ " + s.maxPoints);
    }

    function renderPassportCard(s) {
        setText("ppNumber", s.passportNumber);
        setText("modalPassNumber", s.passportNumber);
        setText("ppIssueDate", fmtDate(s.issuedAt));

        const expiry = new Date(s.issuedAt);
        expiry.setFullYear(expiry.getFullYear() + 5);
        setText("ppExpiryDate", fmtDate(expiry.toISOString()));

        const tags = $("visitedSites");
        if (!tags) return;
        const visited = s.sites.filter(site => site.visited > 0 || site.badgeEarned);
        tags.innerHTML = visited.length
            ? visited.map(site => "<span>" + esc(site.name) + "</span>").join("")
            : '<span class="site-tags-empty">' + esc(t("passportPage.noSitesYet",
                "No sites stamped yet. Walk a heritage trail to collect your first stamp.")) + "</span>";

        const stamps = $("passportStamps");
        if (stamps) {
            stamps.innerHTML = s.sites.map(site => {
                const earned = site.badgeEarned;
                const inProgress = !earned && site.visited > 0;
                const state = earned ? "is-stamped" : inProgress ? "is-in-progress" : "is-empty";
                const status = earned
                    ? t("passportPage.stampEarned", "Stamped {{date}}", { date: fmtDate(site.badgeEarnedAt) })
                    : inProgress
                        ? t("passportPage.stampInProgress", "In progress · {{visited}}/{{total}} stops", { visited: site.visited, total: site.total })
                        : t("passportPage.stampNotStarted", "Not started · {{visited}}/{{total}} stops", { visited: site.visited, total: site.total });
                const label = site.name + ": " + status;

                return '<article class="passport-stamp ' + state + '" aria-label="' + esc(label) + '">' +
                    '<span class="passport-stamp-seal" style="--stamp-progress:' + site.percent + '%">' +
                    '<i class="fa-solid ' + esc(site.icon) + '" aria-hidden="true"></i>' +
                    '<span class="passport-stamp-star" aria-hidden="true">★</span>' +
                    '</span>' +
                    '<span class="passport-stamp-copy"><strong>' + esc(site.badgeName) + '</strong>' +
                    '<small>' + esc(status) + '</small></span>' +
                    '</article>';
            }).join("");
        }
    }

    function renderBadges(s) {
        const earnedCount = s.sites.filter(site => site.badgeEarned).length;
        setText("badgesCount", earnedCount + " / " + s.trailsTotal);

        const grid = $("badgesGrid");
        if (grid) {
            grid.innerHTML = s.sites.map(site => {
                const earned = site.badgeEarned;
                const sub = earned
                    ? site.badgeTitle
                    : t("passportPage.stopsCount", "{{visited}}/{{total}} stops", { visited: site.visited, total: site.total });
                const footer = earned
                    ? '<span class="badge-check"><i class="fa-solid fa-check"></i></span>'
                    : '<div class="mini-bar"><span class="mini-bar-fill" style="width:' + site.percent + '%"></span></div>';
                return '<button class="badge-card ' + (earned ? "is-earned" : "is-locked") + '" type="button" data-badge="' + esc(site.id) + '">' +
                    '<div class="badge-icon"><i class="fa-solid ' + (earned ? esc(site.icon) : "fa-lock") + '"></i></div>' +
                    "<h4>" + esc(site.badgeName) + "</h4>" +
                    "<p>" + esc(sub) + "</p>" +
                    footer +
                    "</button>";
            }).join("");
        }

        const modalGrid = $("modalBadgeGrid");
        if (modalGrid) {
            modalGrid.innerHTML = s.sites.map(site =>
                '<div class="modal-badge ' + (site.badgeEarned ? "" : "is-locked") + '">' +
                '<i class="fa-solid ' + (site.badgeEarned ? esc(site.icon) : "fa-lock") + '"></i>' +
                "<strong>" + esc(site.badgeName) + "</strong>" +
                "<span>" + esc(site.badgeEarned
                    ? site.badgeTitle
                    : t("passportPage.stopsCount", "{{visited}}/{{total}} stops", { visited: site.visited, total: site.total })) + "</span>" +
                "</div>"
            ).join("");
        }
    }

    function renderProgress(s) {
        setText("progressPercent", s.percent + "%");
        const fill = $("progressFill");
        if (fill) fill.style.width = s.percent + "%";

        setText("progressSummaryText", t("passportPage.progressSummary",
            "{{stops}} of {{totalStops}} trail stops · {{trails}} of {{trailsTotal}} trails",
            { stops: s.stopsVisited, totalStops: s.totalStops, trails: s.trailsCompleted, trailsTotal: s.trailsTotal }));

        setText("progressStatusText", s.complete
            ? t("passportPage.statusComplete", "Complete")
            : s.stopsVisited > 0
                ? t("passportPage.statusInProgress", "In progress")
                : t("passportPage.statusNotStarted", "Not started"));

        // Progress modal
        const circle = $("modalProgressCircle");
        if (circle) circle.style.setProperty("--progress", s.percent);
        setText("modalProgressPercent", s.percent + "%");

        if (s.complete) {
            setText("modalProgressTitle", t("passportPage.modalCompleteTitle", "Passport Complete"));
            setText("modalProgressText", t("passportPage.modalCompleteText",
                "You have finished all {{count}} heritage trails and earned every badge.", { count: s.trailsTotal }));
        } else if (s.stopsVisited > 0) {
            setText("modalProgressTitle", t("passportPage.modalKeepGoingTitle", "Keep exploring"));
            setText("modalProgressText", t("passportPage.modalKeepGoingText",
                "You have visited {{stops}} of {{totalStops}} trail stops and completed {{trails}} of {{trailsTotal}} trails.",
                { stops: s.stopsVisited, totalStops: s.totalStops, trails: s.trailsCompleted, trailsTotal: s.trailsTotal }));
        } else {
            setText("modalProgressTitle", t("passportPage.modalStartTitle", "Start your journey"));
            setText("modalProgressText", t("passportPage.modalStartText",
                "Walk a heritage trail to collect your first stamp, points and badge."));
        }

        const list = $("trailProgressList");
        if (list) {
            list.innerHTML = s.sites.map(site =>
                '<a class="trail-progress-row ' + (site.completed ? "is-complete" : "") + '" href="' + trailUrl(site.id) + '">' +
                "<strong>" + esc(site.name) + "</strong>" +
                "<span>" + esc(site.completed
                    ? t("passportPage.completed", "Completed")
                    : site.visited + "/" + site.total) + "</span>" +
                '<div class="mini-bar"><span class="mini-bar-fill" style="width:' + site.percent + '%"></span></div>' +
                "</a>"
            ).join("");
        }
    }

    function renderEarned(s) {
        const card = $("earnedCard");
        const latest = s.latestBadge;
        if (card) card.classList.toggle("is-empty", !latest);

        const icon = $("earnedIcon");
        if (icon) icon.innerHTML = '<i class="fa-solid ' + (latest ? esc(latest.icon) : "fa-lock") + '"></i>';

        if (latest) {
            setText("earnedTitle", t("passportPage.earnedTitle", "Badge Earned!"));
            setText("earnedText", t("passportPage.earnedText",
                "You completed the {{site}} trail and earned the {{badge}} badge.",
                { site: latest.name, badge: latest.badgeTitle }));
        } else {
            setText("earnedTitle", t("passportPage.noBadgeTitle", "Earn your first badge"));
            setText("earnedText", t("passportPage.noBadgeText",
                "Visit every stop on a heritage trail to unlock the badge for that site."));
        }

        const btn = $("earnedButton");
        if (btn) {
            btn.dataset.action = latest ? "badge:" + latest.id : "map";
            btn.innerHTML = esc(latest
                ? t("passportPage.viewBadge", "View Badge")
                : t("passportPage.startTrail", "Start a trail")) + ' <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    function renderJourney(s) {
        const list = $("journeyList");
        if (!list) return;

        const rank = { "completed": 0, "in-progress": 1, "not-started": 2 };
        list.innerHTML = s.sites.slice()
            .sort((a, b) => rank[a.status] - rank[b.status])
            .map(site => {
                const icon = site.completed ? "fa-check" : site.status === "in-progress" ? "fa-person-walking" : "fa-location-dot";
                const sub = site.completed
                    ? t("passportPage.completed", "Completed")
                    : site.status === "in-progress"
                        ? t("passportPage.stopsOf", "{{visited}} of {{total}} stops", { visited: site.visited, total: site.total })
                        : t("passportPage.notStarted", "Not started");
                return '<a class="journey-item ' + (site.completed ? "completed" : site.status === "in-progress" ? "in-progress" : "upcoming") + '" href="' + trailUrl(site.id) + '">' +
                    '<span class="journey-icon"><i class="fa-solid ' + icon + '"></i></span>' +
                    "<div><strong>" + esc(site.name) + "</strong><small>" + esc(sub) + "</small></div>" +
                    "</a>";
            }).join("");
    }

    function renderRules() {
        const box = $("rewardRules");
        if (!box) return;
        const rules = [
            ["+" + P.POINTS.stop, t("passportPage.rule.stop", "Visit a stop on a heritage trail")],
            ["+" + P.POINTS.trailComplete, t("passportPage.rule.trail", "Finish a trail and earn that site's badge")],
            ["+" + P.POINTS.allTrails, t("passportPage.rule.all", "Finish all {{count}} trails to complete your passport", { count: P.SITES.length })]
        ];
        box.innerHTML = rules.map(r =>
            '<div class="reward-rule"><strong>' + esc(r[0]) + "</strong><span>" + esc(r[1]) + "</span></div>"
        ).join("");
    }

    function renderActivity(s) {
        const list = $("activityList");
        if (!list) return;

        if (!s.activity.length) {
            list.innerHTML = '<div class="empty-state"><i class="fa-solid fa-clock-rotate-left"></i>' +
                "<h3>" + esc(t("passportPage.noActivityTitle", "No activity yet")) + "</h3>" +
                "<p>" + esc(t("passportPage.noActivityText", "Visit a stop on a heritage trail and it will show up here.")) + "</p>" +
                '<a href="./map.html" class="secondary-button">' + esc(t("passportPage.findTrail", "Find a trail")) + "</a></div>";
            return;
        }

        const pts = t("passportPage.pts", "pts");
        list.innerHTML = s.activity.slice(0, 15).map(a => {
            const site = s.sites.find(x => x.id === a.siteId);
            let icon = "fa-location-dot";
            let title = t("passportPage.actStop", "Trail stop visited");
            let sub = site ? site.name : "";

            if (a.type === "trail") {
                icon = "fa-medal";
                title = t("passportPage.actBadge", "Badge earned");
                sub = site ? site.badgeTitle + " · " + site.name : "";
            } else if (a.type === "all") {
                icon = "fa-trophy";
                title = t("passportPage.actAll", "Passport complete");
                sub = t("passportPage.actAllSub", "All heritage trails completed");
            }

            return '<div class="activity-item"><span><i class="fa-solid ' + icon + '"></i></span>' +
                "<div><strong>" + esc(title) + "</strong><small>" + esc(sub) + " · +" + esc(a.points) + " " + esc(pts) + "</small></div>" +
                "<time>" + esc(relDay(a.at)) + "</time></div>";
        }).join("");
    }

    function renderAll() {
        const s = P.getSummary();
        const user = P.getUser();
        current = s;

        renderUser(s, user);
        renderPoints(s);
        renderPassportCard(s);
        renderBadges(s);
        renderProgress(s);
        renderEarned(s);
        renderJourney(s);
        renderRules();
        renderActivity(s);
    }

    /* =====================================================
       MODALS
    ====================================================== */

    const modals = document.querySelectorAll(".modal");

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("open");
        if (!document.querySelector(".modal.open")) document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-modal]").forEach(button => {
        button.addEventListener("click", () => openModal($(button.dataset.modal)));
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector(".modal-close");
        if (closeButton) closeButton.addEventListener("click", () => closeModal(modal));
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        modals.forEach(modal => {
            if (modal.classList.contains("open")) closeModal(modal);
        });
    });

    /* =====================================================
       BADGE DETAIL (earned or still locked)
    ====================================================== */

    function openBadgeDetail(siteId) {
        if (!current) return;
        const site = current.sites.find(s => s.id === siteId);
        if (!site) return;

        const icon = $("badgeDetailIcon");
        const label = $("badgeEarnedLabel");
        const cta = $("badgeDetailCta");
        const earned = site.badgeEarned;

        icon.className = "badge-detail-icon" + (earned ? "" : " is-locked");
        icon.innerHTML = '<i class="fa-solid ' + (earned ? esc(site.icon) : "fa-lock") + '"></i>';
        setText("badgeDetailTitle", site.name);

        if (earned) {
            setText("badgeDetailText", t("passportPage.badgeEarnedText",
                "You earned the {{badge}} badge by completing the {{site}} heritage trail on {{date}}.",
                { badge: site.badgeTitle, site: site.name, date: fmtDate(site.badgeEarnedAt) }));
            label.className = "badge-earned-label";
            label.innerHTML = '<i class="fa-solid fa-check"></i> ' + esc(t("passportPage.badgeEarnedLabel", "Badge Earned"));
            cta.hidden = true;
        } else {
            setText("badgeDetailText", t("passportPage.badgeLockedText",
                "Visit every stop on the {{site}} heritage trail to earn the {{badge}} badge. You have visited {{visited}} of {{total}} stops so far.",
                { site: site.name, badge: site.badgeTitle, visited: site.visited, total: site.total }));
            label.className = "badge-earned-label is-locked";
            label.innerHTML = '<i class="fa-solid fa-lock"></i> ' + esc(t("passportPage.badgeLockedLabel", "Not earned yet"));
            cta.href = trailUrl(site.id);
            cta.textContent = site.visited > 0
                ? t("passportPage.continueTrail", "Continue trail")
                : t("passportPage.startTrail", "Start a trail");
            cta.hidden = false;
        }

        openModal($("badgeDetailModal"));
    }

    document.addEventListener("click", event => {
        const card = event.target.closest(".badge-card[data-badge]");
        if (card) openBadgeDetail(card.dataset.badge);
    });

    const earnedBtn = $("earnedButton");
    if (earnedBtn) {
        earnedBtn.addEventListener("click", () => {
            const action = earnedBtn.dataset.action || "";
            if (action.indexOf("badge:") === 0) openBadgeDetail(action.slice(6));
            else window.location.href = "./map.html";
        });
    }

    /* =====================================================
       SMOOTH HERO SCROLL + SIDEBAR ACTIVE STATE
    ====================================================== */

    document.querySelectorAll('a[href="#passportDashboard"]').forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const target = $("passportDashboard");
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const profileMenuItems = document.querySelectorAll(".profile-menu-item");
    profileMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            profileMenuItems.forEach(menuItem => menuItem.classList.remove("active"));
            item.classList.add("active");
        });
    });

    /* =====================================================
       KEEP THE PAGE IN SYNC
       - a trail stop was recorded (this tab or another tab)
       - the user comes back with the browser Back button
       - the language changes
    ====================================================== */

    P.onChange(renderAll);

    window.addEventListener("storage", event => {
        if (event.key && event.key.indexOf(P.STORAGE_PREFIX) === 0) renderAll();
    });
    window.addEventListener("pageshow", renderAll);
    document.addEventListener("ananse:languagechange", renderAll);

    renderAll();
});
// ==========================================================================
// ANANSE — MAP PAGE (script.js)
// Guarded so it's safe to append to the shared script.js: navigation code is 
// untouched, map styling is updated to an earthy theme, and popups now fully translate.
// ==========================================================================

document.addEventListener("DOMContentLoaded", async function () {
    const mapContainer = document.getElementById("mapbox-container");
    if (!mapContainer) return; // only run on map.html
    if (window.ananseSiteContent) await window.ananseSiteContent.ready;

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

    const DEFAULT_MAP_SITES = [
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

    const CONTENT_TO_MAP_ID = {
        "cape-coast": "cape-coast-castle",
        "manhyia": "manhyia-palace",
        "osu": "osu-castle",
        "independence": "independence-arch",
        "kwame-nkrumah": "kwame-nkrumah"
    };
    const CATEGORY_CONFIG = {
        historical: { category: "castles", label: "mapPage.categoryCastle" },
        palaces: { category: "palaces", label: "mapPage.categoryPalace" },
        monuments: { category: "monuments", label: "mapPage.categoryMonument" }
    };
    const managedSites = window.ananseSiteContent ? window.ananseSiteContent.getSites() : [];
    const managedById = new Map(managedSites.map(function (site) { return [site.id, site]; }));
    const DEFAULT_CONTENT_IDS = new Set(Object.keys(CONTENT_TO_MAP_ID));
    const SITES = DEFAULT_MAP_SITES.map(function (mapSite) {
        const contentId = Object.keys(CONTENT_TO_MAP_ID).find(function (id) {
            return CONTENT_TO_MAP_ID[id] === mapSite.id;
        });
        const content = contentId && managedById.get(contentId);
        if (!content) return null;
        const category = CATEGORY_CONFIG[content.category] || CATEGORY_CONFIG.historical;
        return Object.assign({}, mapSite, {
            name: content.name,
            location: content.location,
            shortLocation: content.location.split(",")[0],
            category: category.category,
            categoryLabel: content.apiCategory || category.label,
            lat: content.lat,
            lng: content.lng,
            image: content.coverImage,
            description: content.description
        });
    }).filter(Boolean).concat(managedSites.filter(function (site) {
        return !DEFAULT_CONTENT_IDS.has(site.id);
    }).map(function (site) {
        const category = CATEGORY_CONFIG[site.category] || CATEGORY_CONFIG.historical;
        return {
            id: site.id,
            name: site.name,
            location: site.location,
            shortLocation: site.location.split(",")[0],
            category: category.category,
            categoryLabel: site.apiCategory || category.label,
            lat: site.lat,
            lng: site.lng,
            image: site.coverImage,
            description: site.description
        };
    }));

    const featuredGrid = document.querySelector(".featured-cards-grid");
    if (featuredGrid) {
        const originalCard = featuredGrid.querySelector(".site-card");
        SITES.forEach(function (site) {
            let card = Array.from(featuredGrid.querySelectorAll(".site-card")).find(function (item) {
                return item.dataset.siteId === site.id;
            });
            if (!card && originalCard) {
                card = originalCard.cloneNode(true);
                featuredGrid.appendChild(card);
            }
            if (!card) return;
            card.dataset.siteId = site.id;
            const image = card.querySelector(".card-media img");
            if (image && site.image) {
                image.src = site.image;
                image.alt = site.name;
                image.removeAttribute("data-i18n-alt");
                image.hidden = false;
            } else if (image) {
                image.removeAttribute("src");
                image.hidden = true;
            }
            const title = card.querySelector(".card-titles h3");
            if (title) {
                title.dataset.siteTitleId = site.id;
                title.removeAttribute("data-i18n");
                title.textContent = site.name;
            }
            const location = card.querySelector(".card-titles .card-loc span");
            if (location) {
                location.dataset.siteShortlocId = site.id;
                location.removeAttribute("data-i18n");
                location.textContent = site.shortLocation;
            }
            const categoryLabel = card.querySelector(".card-category-tag");
            if (categoryLabel) {
                categoryLabel.removeAttribute("data-i18n");
                categoryLabel.textContent = site.categoryLabel.indexOf("mapPage.") === 0
                    ? getI18nVal(site.categoryLabel)
                    : site.categoryLabel;
            }
        });
    }

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

        if (window.ananseAnalytics) {
            const contentSiteId = Object.keys(CONTENT_TO_MAP_ID).find(function (id) {
                return CONTENT_TO_MAP_ID[id] === canonicalSiteId;
            }) || canonicalSiteId;
            window.ananseAnalytics.recordSiteView(contentSiteId, location.pathname);
        }

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

    // Restore the visitor's saved details, then honor a site selected from the map.
    restoreSavedPlan();
    const requestedSite = new URLSearchParams(window.location.search).get("site");
    const requestedSiteKey = requestedSite === "kwame-nkrumah"
        ? "kwame-nkrumah-memorial-park"
        : requestedSite;
    if (siteSelect && HERITAGE_SITES[requestedSiteKey]) {
        siteSelect.value = requestedSiteKey;
        updatePlanUI();
    }
});