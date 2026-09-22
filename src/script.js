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




// ==========================================
// ANANSE — EXPLORE PAGE: HERITAGE SITES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const cardGrid = document.getElementById("cardGrid");
    if (!cardGrid) return; // only run this block on explore.html

    // ---- Read site data straight from the HTML (image paths live there) ----
    const sourceEls = document.querySelectorAll("#heritageSitesSource .site-data");
    const sites = Array.from(sourceEls).map(function (el) {
        const img = el.querySelector("img");
        return {
            id: el.dataset.id,
            name: el.dataset.name,
            location: el.dataset.location,
            region: el.dataset.region,
            category: el.dataset.category,
            categoryLabel: el.dataset.categoryLabel,
            mediaClass: el.dataset.mediaClass,
            description: el.dataset.description,
            didYouKnow: el.dataset.didYouKnow,
            image: img ? img.getAttribute("src") : "",
            imageAlt: img ? img.getAttribute("alt") : ""
        };
    });

    // ---- Favourites (localStorage) ----
    const FAV_KEY = "ananseExploreFavourites";

    function loadFavourites() {
        try {
            return JSON.parse(window.localStorage.getItem(FAV_KEY)) || {};
        } catch (err) {
            return {};
        }
    }

    function saveFavourites(favs) {
        try {
            window.localStorage.setItem(FAV_KEY, JSON.stringify(favs));
        } catch (err) {
            // localStorage unavailable — favourites just won't persist
        }
    }

    let favourites = loadFavourites();

    // ---- Render cards ----
    function renderCards(list) {
        cardGrid.innerHTML = "";

        list.forEach(function (site) {
            const isFav = !!favourites[site.id];

            const card = document.createElement("article");
            card.className = "heritage-card";
            card.dataset.siteId = site.id;

            card.innerHTML =
                '<div class="card-media ' + site.mediaClass + '">' +
                    '<img src="' + site.image + '" alt="' + site.imageAlt + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                    '<span class="category-badge">' + site.categoryLabel + '</span>' +
                    '<button type="button" class="bookmark-btn' + (isFav ? ' is-active' : '') + '" data-site-id="' + site.id + '" aria-pressed="' + isFav + '" aria-label="Save ' + site.name + ' to favourites">' +
                        '<i class="fa-' + (isFav ? 'solid' : 'regular') + ' fa-heart"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="card-body">' +
                    '<h3>' + site.name + '</h3>' +
                    '<p class="card-loc"><i class="fa-solid fa-location-dot"></i> ' + site.location + '</p>' +
                    '<p class="card-desc">' + site.description + '</p>' +
                    '<div class="card-foot">' +
                        '<button type="button" class="explore-story-btn" data-site-id="' + site.id + '">' +
                            'Learn the Story <i class="fa-solid fa-arrow-right"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>';

            cardGrid.appendChild(card);
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

    function matchesQuery(site, query) {
        if (!query) return true;
        const haystack = (site.name + " " + site.location + " " + site.categoryLabel).toLowerCase();
        return haystack.indexOf(query.toLowerCase()) !== -1;
    }

    function updateResultsMeta(count) {
        if (resultsCountEl) resultsCountEl.textContent = count;
        if (resultsNounEl) resultsNounEl.textContent = count === 1 ? "heritage site" : "heritage sites";
    }

    function toggleNoResults(count, category) {
        if (!noResults) return;

        if (count === 0) {
            noResults.classList.add("is-visible");
            cardGrid.style.display = "none";

            const heading = noResults.querySelector("h3");
            const body = noResults.querySelector("p");

            if (category === "museums") {
                if (heading) heading.textContent = "No heritage sites in this category yet.";
                if (body) body.textContent = "We're still researching Ghana's museums for Ananse — check back soon.";
            } else {
                if (heading) heading.textContent = "No heritage sites match your filters";
                if (body) body.textContent = "Try clearing the search box, choosing \"All\" categories, or selecting a different region.";
            }
        } else {
            noResults.classList.remove("is-visible");
            cardGrid.style.display = "";
        }
    }

    function applyFilters() {
        const filtered = sites.filter(function (site) {
            const matchCategory = state.category === "all" || site.category === state.category;
            const matchRegion = state.region === "all" || site.region === state.region;
            return matchCategory && matchRegion && matchesQuery(site, state.query);
        });

        renderCards(filtered);
        updateResultsMeta(filtered.length);
        toggleNoResults(filtered.length, state.category);
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

            favBtn.classList.toggle("is-active");
            favBtn.setAttribute("aria-pressed", favourites[id] ? "true" : "false");
            const icon = favBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-solid", !!favourites[id]);
                icon.classList.toggle("fa-regular", !favourites[id]);
            }
            return;
        }

        const card = e.target.closest(".heritage-card");
        if (card) {
            openModal(card.getAttribute("data-site-id"));
        }
    });

    // ---- Modal ----
    const modalOverlay = document.getElementById("modalOverlay");
    const modalContent = document.getElementById("modalContent");

    function getSiteById(id) {
        return sites.find(function (s) { return s.id === id; });
    }

    function openModal(siteId) {
        const site = getSiteById(siteId);
        if (!site || !modalOverlay || !modalContent) return;

        modalContent.innerHTML =
            '<button type="button" class="modal-close" aria-label="Close">' +
                '<i class="fa-solid fa-xmark"></i>' +
            '</button>' +
            '<div class="modal-hero ' + site.mediaClass + '">' +
                '<img src="' + site.image + '" alt="' + site.imageAlt + '" onerror="this.style.display=\'none\'">' +
                '<span class="category-badge">' + site.categoryLabel + '</span>' +
                '<div>' +
                    '<h2>' + site.name + '</h2>' +
                    '<p class="loc"><i class="fa-solid fa-location-dot"></i> ' + site.location + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="modal-body">' +
                '<div class="modal-section">' +
                    '<h4>About this site</h4>' +
                    '<p>' + site.description + '</p>' +
                '</div>' +
                '<div class="modal-section">' +
                    '<h4>Did You Know?</h4>' +
                    '<p>' + site.didYouKnow + '</p>' +
                '</div>' +
                '<div class="modal-actions">' +
                    '<a class="action-btn action-btn--learn" href="site.html?site=' + site.id + '">' +
                        '<i class="fa-solid fa-book-open"></i> Learn the Story' +
                    '</a>' +
                    '<button type="button" class="action-btn action-btn--listen" id="modalListenBtn">' +
                        '<i class="fa-solid fa-headphones"></i> Listen to the Story' +
                    '</button>' +
                '</div>' +
            '</div>';

        const listenBtn = modalContent.querySelector("#modalListenBtn");
        if (listenBtn) {
            listenBtn.addEventListener("click", function () {
                listenBtn.disabled = true;
                listenBtn.innerHTML = '<i class="fa-solid fa-headphones"></i> Audio preview coming soon';
            });
        }

        const closeBtn = modalContent.querySelector(".modal-close");
        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modalOverlay.classList.add("is-open");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modalOverlay.classList.remove("is-open");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
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

    // ---- Init ----
    applyFilters();
});




