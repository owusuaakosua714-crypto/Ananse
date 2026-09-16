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
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim();
            if (query !== "") {
                alert(`Searching Ananse for: "${query}"`);
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

    // =======================================================
    // WELCOME EXPERIENCE
    // This keeps the design and navigation intact while adding
    // a warm onboarding intro for the home page.
    // =======================================================
    const welcomeModal = document.getElementById("welcomeModal");
    const welcomeModalOverlay = document.getElementById("welcomeModalOverlay");
    const startExploreBtn = document.getElementById("startExploreBtn");
    const skipWelcomeBtn = document.getElementById("skipWelcomeBtn");
    const replayWelcomeBtn = document.getElementById("welcomeSpeakerBtn");

    const welcomeMessage = "Welcome, traveller. I am Ananse. Come, let me take you on a journey through the stories, places, and culture that make Ghana extraordinary.";
    const welcomeSessionKey = "ananseWelcomeSeen";
    const showWelcomeOncePerSession = true;
    let lastFocusedElement = null;

    function shouldShowWelcome() {
        if (!showWelcomeOncePerSession) {
            return true;
        }

        return sessionStorage.getItem(welcomeSessionKey) !== "true";
    }

    function markWelcomeSeen() {
        if (showWelcomeOncePerSession) {
            sessionStorage.setItem(welcomeSessionKey, "true");
        }
    }

    function stopWelcomeSpeech() {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }

    function getPreferredVoice() {
        if (!("speechSynthesis" in window)) {
            return null;
        }

        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) {
            return null;
        }

        const ghVoice = voices.find(voice => {
            const lang = (voice.lang || "").toLowerCase();
            const name = (voice.name || "").toLowerCase();
            return lang.includes("en-gh") || name.includes("ghana") || name.includes("ghanaian");
        });

        if (ghVoice) {
            return ghVoice;
        }

        const englishVoice = voices.find(voice => {
            const lang = (voice.lang || "").toLowerCase();
            return lang.startsWith("en");
        });

        return englishVoice || voices[0];
    }

    function speakWelcomeMessage() {
        if (!("speechSynthesis" in window)) {
            return;
        }

        // Make sure only one speech instance is active at a time.
        stopWelcomeSpeech();

        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        const voice = getPreferredVoice();

        if (voice) {
            utterance.voice = voice;
        }

        utterance.lang = "en-GH";
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
    }

    function openWelcomeModal() {
        if (!welcomeModal || !welcomeModalOverlay) {
            return;
        }

        lastFocusedElement = document.activeElement;
        welcomeModal.classList.add("visible");
        welcomeModal.setAttribute("aria-hidden", "false");
        welcomeModalOverlay.classList.add("visible");
        welcomeModalOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const firstButton = startExploreBtn || skipWelcomeBtn || replayWelcomeBtn;
        if (firstButton) {
            firstButton.focus();
        }
    }

    function closeWelcomeModal() {
        if (!welcomeModal || !welcomeModalOverlay) {
            return;
        }

        welcomeModal.classList.remove("visible");
        welcomeModal.setAttribute("aria-hidden", "true");
        welcomeModalOverlay.classList.remove("visible");
        welcomeModalOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        stopWelcomeSpeech();

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function tryAutoWelcome() {
        const shouldShow = shouldShowWelcome();

        if (!shouldShow) {
            return;
        }

        markWelcomeSeen();
        openWelcomeModal();

        // Try to start speech immediately when the page loads.
        // Browsers may block auto-play, so we still keep the modal visible.
        // If blocked, the user can use Start Exploring or Replay.
        setTimeout(() => {
            if ("speechSynthesis" in window) {
                speakWelcomeMessage();
            }
        }, 300);
    }

    if (welcomeModal && welcomeModalOverlay) {
        setTimeout(() => {
            tryAutoWelcome();
        }, 200);
    }

    if (startExploreBtn) {
        startExploreBtn.addEventListener("click", () => {
            // Try to start speech if the browser blocked the automatic start.
            if ("speechSynthesis" in window && !window.speechSynthesis.speaking) {
                speakWelcomeMessage();
            }

            closeWelcomeModal();
        });
    }

    if (skipWelcomeBtn) {
        skipWelcomeBtn.addEventListener("click", () => {
            closeWelcomeModal();
        });
    }

    if (replayWelcomeBtn) {
        replayWelcomeBtn.addEventListener("click", () => {
            speakWelcomeMessage();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && welcomeModal && welcomeModal.classList.contains("visible")) {
            closeWelcomeModal();
        }
    });

    // Older browsers may load voices after the page has already started.
    if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            if (welcomeModal && welcomeModal.classList.contains("visible")) {
                speakWelcomeMessage();
            }
        };
    }
});