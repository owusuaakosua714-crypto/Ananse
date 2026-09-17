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

// ==========================================
// ANANSE — NAA AI HERITAGE GUIDE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Check if the Naa page wrapper exists before executing script
    const naaPage = document.querySelector(".naa-page");

    if (naaPage) {
        // ------------------------------------------------------------------
        // BACKEND CONNECTION & API ENDPOINT
        // Mamei will replace this endpoint with the final backend API endpoint.
        // The Gemini API key must NEVER be placed in this frontend file.
        // ------------------------------------------------------------------
        const NAA_API_ENDPOINT = "/api/naa";

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

        // Clear Chat Handler
        clearChatBtn.addEventListener("click", function () {
            // Keep only the initial Naa greeting message
            messagesBox.innerHTML = `
                <div class="naa-message-row naa-msg-naa">
                    <div class="naa-msg-avatar">
                        <img src="../images/profile.jpeg" alt="Naa">
                    </div>
                    <div class="naa-msg-content-wrapper">
                        <div class="naa-msg-bubble">
                            Hello! I’m Naa, your AI heritage guide. I’m here to help you learn about Ghana’s history, explore amazing heritage sites, and discover our culture. What would you like to explore today? 👋
                        </div>
                        <span class="naa-msg-timestamp">Just now</span>
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
                    appendNaaMessage("I'm sorry, I couldn't retrieve a response at the moment. Please try asking again.");
                }

            } catch (error) {
                console.error("Backend Connection Error:", error);
                showTypingIndicator(false);
                // Friendly error message on failure
                appendNaaMessage("Sorry, I’m having trouble connecting right now. Please try again.");
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
                    <img src="../images/profile.jpeg" alt="Naa">
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

// Prevent the Naa video from opening in Picture-in-Picture.
// This keeps the video locked inside its existing circular container
// and preserves the current autoplay behavior.
document.addEventListener("DOMContentLoaded", function () {
    const naaVideo = document.querySelector(".naa-video");

    if (!naaVideo) return;

    // Keep the existing video in its current circle and prevent PiP.
    naaVideo.setAttribute("disablepictureinpicture", "true");
    naaVideo.disablePictureInPicture = true;
    naaVideo.muted = false;
    naaVideo.volume = 1;

    // Play the existing intro once when the page loads.
    // After it reaches the end, pause it so it does not keep playing until
    // the user revisits the page.
    const tryPlayVideoWithSound = () => {
        naaVideo.play().catch(() => {
            // Browser autoplay restrictions may still block sound until interaction.
        });
    };

    naaVideo.addEventListener("canplay", tryPlayVideoWithSound, { once: true });
    setTimeout(tryPlayVideoWithSound, 300);

    naaVideo.addEventListener("ended", function () {
        naaVideo.pause();
        naaVideo.currentTime = 0;
    });

    // Some browsers still expose PiP through a presentation mode.
    if (typeof naaVideo.webkitSetPresentationMode === "function") {
        naaVideo.webkitSetPresentationMode("inline");
    }

    // If PiP is triggered anyway, force the video back to inline mode.
    naaVideo.addEventListener("enterpictureinpicture", function (event) {
        event.preventDefault();

        if (typeof naaVideo.webkitSetPresentationMode === "function") {
            naaVideo.webkitSetPresentationMode("inline");
        }
    });

    naaVideo.addEventListener("webkitpresentationmodechanged", function () {
        if (naaVideo.webkitPresentationMode === "picture-in-picture") {
            naaVideo.webkitSetPresentationMode("inline");
        }
    });

    // Extra safety: stop the browser from showing a PiP trigger via right-click menu.
    naaVideo.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
});

/**
 * Scoped JavaScript execution for about.html
 * Prevents side-effects on other platform pages
 */
document.addEventListener('DOMContentLoaded', function () {
  // Check if current page is about.html
  const isAboutPage = document.body.classList.contains('about-page');
  if (!isAboutPage) return;

  // Mobile Menu Toggle Logic
  const mobileToggleBtn = document.getElementById('aboutMobileToggle');
  const navMenu = document.getElementById('aboutNavMenu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      
      // Animate hamburger lines
      const spans = mobileToggleBtn.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Smooth Hover Micro-interactions on Core Cards & Tech Pillars
  const interactiveCards = document.querySelectorAll('.about-page .about-card, .about-page .about-tech-col');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
});

/**
 * ANANSE QR Experience - Isolated Interactive Logic
 * Fully scoped under #qr-experience-page
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // Guard check to make sure script runs only on QR Experience Page
  const pageWrapper = document.getElementById('qr-experience-page');
  if (!pageWrapper) return;

  // =========================================================================
  // 1. VERIFIED HERITAGE SITES DATABASE (DATA LAYER)
  // =========================================================================
  // EDIT OR ADD YOUR REAL HERITAGE SITES DATA BELOW
  const heritageSites = {
    "cape-coast-castle": {
      id: "cape-coast-castle",
      name: "Cape Coast Castle",
      location: "Central Region, Ghana",
      category: "Historical Site",
      description: "Built in 1653, this historic castle was one of the key slave forts used during the transatlantic slave trade. Discover the stories of resilience, strength and the enduring spirit of the African people.",
      // REPLACE MEDIA PATHS HERE
      heroImage: "../assets/images/cape-coast-castle-hero.jpg",
      mainImage: "../assets/images/cape-coast-castle-preview.jpg",
      videoUrl: "../assets/videos/cape-coast-castle-tour.mp4",
      audioUrl: "../assets/audio/cape-coast-castle-narration.mp3",
      gallery: [
        { url: "../assets/images/cape-coast-castle-1.jpg", caption: "Exterior oceanfront wall" },
        { url: "../assets/images/cape-coast-castle-2.jpg", caption: "Courtyard and historic cannons" },
        { url: "../assets/images/cape-coast-castle-3.jpg", caption: "Door of No Return entrance" }
      ],
      facts: [
        "Originally built as a wooden trading post by the Swedes in 1653 before being captured by the British.",
        "The castle contained underground dungeons that held up to 1,500 enslaved people at a time.",
        "It was designated a UNESCO World Heritage Site in 1979."
      ],
      related: [
        { id: "elmina-castle", name: "Elmina Castle", path: "elmina-castle.html" },
        { id: "fort-st-jago", name: "Fort St. Jago", path: "fort-st-jago.html" }
      ]
    },
    "elmina-castle": {
      id: "elmina-castle",
      name: "Elmina Castle",
      location: "Central Region, Ghana",
      category: "Historical Fortress",
      description: "Constructed by the Portuguese in 1482 as St. George of the Mine Castle, it is the oldest European building in existence south of the Sahara.",
      heroImage: "../assets/images/elmina-castle-hero.jpg",
      mainImage: "../assets/images/elmina-castle-preview.jpg",
      videoUrl: "../assets/videos/elmina-castle-tour.mp4",
      audioUrl: "../assets/audio/elmina-castle-narration.mp3",
      gallery: [
        { url: "../assets/images/elmina-1.jpg", caption: "Elmina Castle harbor view" }
      ],
      facts: [
        "Built by Portuguese traders in 1482.",
        "Oldest European building in sub-Saharan Africa."
      ],
      related: [
        { id: "cape-coast-castle", name: "Cape Coast Castle", path: "cape-coast-castle.html" }
      ]
    }
  };

  // State Tracking Variables
  let currentSiteId = "cape-coast-castle";
  let html5QrCodeScanner = null;
  let isScanning = false;
  let isFlashlightOn = false;
  let currentGalleryIndex = 0;


  // =========================================================================
  // 2. LIVE QR CODE SCANNER (html5-qrcode INTEGRATION)
  // =========================================================================
  const scanBox = document.getElementById('qrScanBox');
  const scannerStatus = document.getElementById('qrScannerStatus');
  const staticGraphic = document.getElementById('qrStaticGraphic');
  const flashlightBtn = document.getElementById('qrFlashlightBtn');
  const flashlightLabel = document.getElementById('qrFlashlightLabel');

  function initQrScanner() {
    if (isScanning) return;

    if (typeof Html5Qrcode === 'undefined') {
      scannerStatus.textContent = "QR library loading... Please check connection.";
      return;
    }

    html5QrCodeScanner = new Html5Qrcode("qr-reader");

    const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

    scannerStatus.textContent = "Requesting camera access...";

    html5QrCodeScanner.start(
      { facingMode: "environment" },
      qrConfig,
      onScanSuccess,
      onScanError
    ).then(() => {
      isScanning = true;
      staticGraphic.style.display = "none";
      scannerStatus.textContent = "Scanning... Align QR code within frame";
    }).catch(err => {
      console.error("Camera access error:", err);
      scannerStatus.textContent = "Camera permission denied or camera unavailable.";
    });
  }

  // =========================================================================
  // 3. ADD YOUR REAL QR CODE DETECTOR HERE
  // =========================================================================
  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scanned QR Text: ${decodedText}`);

    // Parse scanned code string or URL path
    let matchedSiteId = null;

    if (decodedText.includes("cape-coast-castle")) {
      matchedSiteId = "cape-coast-castle";
    } else if (decodedText.includes("elmina-castle")) {
      matchedSiteId = "elmina-castle";
    } else {
      // Attempt exact key matching
      matchedSiteId = heritageSites[decodedText] ? decodedText : null;
    }

    if (matchedSiteId && heritageSites[matchedSiteId]) {
      scannerStatus.textContent = `Success! Unlocking ${heritageSites[matchedSiteId].name}...`;
      loadHeritageSite(matchedSiteId);
      stopQrScanner();
    } else {
      scannerStatus.textContent = "Unrecognized QR code. Try scanning an ANANSE heritage code.";
    }
  }

  function onScanError(errorMessage) {
    // Non-critical frame parsing errors can be safely ignored
  }

  function stopQrScanner() {
    if (html5QrCodeScanner && isScanning) {
      html5QrCodeScanner.stop().then(() => {
        isScanning = false;
        staticGraphic.style.display = "flex";
      }).catch(err => console.error("Error stopping scanner:", err));
    }
  }

  // Flashlight toggle handling
  flashlightBtn.addEventListener('click', function () {
    if (!isScanning) {
      scannerStatus.textContent = "Start camera scanner first to use flashlight.";
      return;
    }

    // Check if torch constraint is supported by device
    try {
      const videoTrack = html5QrCodeScanner.getRunningTrack();
      const capabilities = videoTrack.getCapabilities();

      if (capabilities.torch) {
        isFlashlightOn = !isFlashlightOn;
        videoTrack.applyConstraints({
          advanced: [{ torch: isFlashlightOn }]
        });
        flashlightLabel.textContent = isFlashlightOn ? "Tap to turn off flashlight" : "Tap to turn on flashlight";
      } else {
        scannerStatus.textContent = "Flashlight control is not supported on this browser/device.";
      }
    } catch (e) {
      scannerStatus.textContent = "Flashlight control unavailable.";
    }
  });


  // =========================================================================
  // 4. DYNAMIC HERITAGE SITE DATA RENDERING
  // =========================================================================
  function loadHeritageSite(siteId) {
    const site = heritageSites[siteId];
    if (!site) return;

    currentSiteId = siteId;

    // Update Text Content
    document.getElementById('qrSiteName').textContent = site.name;
    document.getElementById('qrSiteLocationText').textContent = site.location;
    document.getElementById('qrSiteDesc').textContent = site.description;
    document.getElementById('qrSiteCategory').textContent = site.category;

    // Update Images
    document.getElementById('qrSiteMainImg').src = site.mainImage;
    document.getElementById('qrHeroBgImg').src = site.heroImage;

    // Update Video & Audio Modal Sources
    const videoPlayer = document.getElementById('qrModalVideoPlayer');
    videoPlayer.src = site.videoUrl;

    const audioPlayer = document.getElementById('qrModalAudioPlayer');
    audioPlayer.src = site.audioUrl;
  }


  // =========================================================================
  // 5. FEATURE PILLARS INTERACTIVE MODAL LOGIC
  // =========================================================================
  
  // Modal Backdrop Helpers
  function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');

    // Pause playing media on close
    const video = modal.querySelector('video');
    if (video) video.pause();
    const audio = modal.querySelector('audio');
    if (audio) audio.pause();
  }

  // Pillar 1: Video Tour
  document.getElementById('qrPillarVideo').addEventListener('click', () => {
    openModal('qrVideoModal');
  });
  document.getElementById('qrMainPlayBtn').addEventListener('click', () => {
    openModal('qrVideoModal');
  });
  document.getElementById('qrVideoCloseBtn').addEventListener('click', () => {
    closeModal('qrVideoModal');
  });

  // Pillar 2: Audio Story
  document.getElementById('qrPillarAudio').addEventListener('click', () => {
    openModal('qrAudioModal');
  });
  document.getElementById('qrAudioCloseBtn').addEventListener('click', () => {
    closeModal('qrAudioModal');
  });

  // Pillar 3: Photo Gallery
  document.getElementById('qrPillarGallery').addEventListener('click', () => {
    const site = heritageSites[currentSiteId];
    if (site && site.gallery.length > 0) {
      currentGalleryIndex = 0;
      updateGallerySlide();
      openModal('qrGalleryModal');
    }
  });
  document.getElementById('qrGalleryCloseBtn').addEventListener('click', () => {
    closeModal('qrGalleryModal');
  });

  function updateGallerySlide() {
    const site = heritageSites[currentSiteId];
    const item = site.gallery[currentGalleryIndex];
    document.getElementById('qrGalleryCurrentImg').src = item.url;
    document.getElementById('qrGalleryCaption').textContent = item.caption;
  }

  document.getElementById('qrGalleryNextBtn').addEventListener('click', () => {
    const site = heritageSites[currentSiteId];
    currentGalleryIndex = (currentGalleryIndex + 1) % site.gallery.length;
    updateGallerySlide();
  });

  document.getElementById('qrGalleryPrevBtn').addEventListener('click', () => {
    const site = heritageSites[currentSiteId];
    currentGalleryIndex = (currentGalleryIndex - 1 + site.gallery.length) % site.gallery.length;
    updateGallerySlide();
  });

  // Pillar 4: Fun Facts
  document.getElementById('qrPillarFacts').addEventListener('click', () => {
    const site = heritageSites[currentSiteId];
    const factsContainer = document.getElementById('qrFactsContainer');
    factsContainer.innerHTML = '';

    site.facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      factsContainer.appendChild(li);
    });

    openModal('qrFactsModal');
  });
  document.getElementById('qrFactsCloseBtn').addEventListener('click', () => {
    closeModal('qrFactsModal');
  });

  // Pillar 5: Related Sites
  document.getElementById('qrPillarRelated').addEventListener('click', () => {
    const site = heritageSites[currentSiteId];
    const relatedContainer = document.getElementById('qrRelatedContainer');
    relatedContainer.innerHTML = '';

    site.related.forEach(rel => {
      const a = document.createElement('a');
      a.className = 'qr-related-item';
      a.href = `#`;
      a.innerHTML = `<span>${rel.name}</span> <span>→</span>`;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('qrRelatedModal');
        if (heritageSites[rel.id]) {
          loadHeritageSite(rel.id);
        }
      });
      relatedContainer.appendChild(a);
    });

    openModal('qrRelatedModal');
  });
  document.getElementById('qrRelatedCloseBtn').addEventListener('click', () => {
    closeModal('qrRelatedModal');
  });


  // =========================================================================
  // 6. "SCAN AT THE SITE" BUTTON ACTION
  // =========================================================================
  const scanAtSiteBtn = document.getElementById('qrScanAtSiteBtn');
  scanAtSiteBtn.addEventListener('click', () => {
    // Scroll smoothly to scanner box
    scanBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    initQrScanner();
  });

  scanBox.addEventListener('click', () => {
    initQrScanner();
  });

});