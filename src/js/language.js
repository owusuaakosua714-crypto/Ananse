(function () {
    const DEFAULT_LANGUAGE = 'en';
    const STORAGE_KEY = 'ananse-language';

    // Translation dictionary for all user-facing copy on the site.
    // Add or edit language strings here to update the website across all pages.
    const translations = {
        en: {
            'site.tagline': 'Weaving Ghana’s Story into the Digital Age',
            'site.taglineAlt': "Our Stories. Our Heritage. Your Journey.",
            'language.label': 'Language',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.explore': 'Explore',
            'nav.map': 'Map',
            'nav.passport': 'Passport',
            'nav.login': 'Login',
            'nav.signup': 'Sign Up',
            'nav.search': 'Search',
            'nav.notifications': 'Notifications',
            'nav.learn': 'Learn',
            'nav.preserve': 'Preserve',
            'common.viewAll': 'View All',
            'common.viewDetails': 'View Details',
            'common.startExploring': 'Start Exploring',
            'common.filterSearch': 'Filter & Search',
            'common.resetFilters': 'Reset Filters',
            'common.mapView': 'Map View',
            'common.listView': 'List View',
            'common.historical': 'Historical',
            'common.monument': 'Monument',
            'common.cultural': 'Cultural',
            'common.museum': 'Museum',
            'common.centralRegion': 'Central Region',
            'common.accra': 'Accra',
            'common.kumasi': 'Kumasi',
            'common.moreThanWebsite': 'MORE THAN A WEBSITE',
            'common.discoverLearnStory': 'Discover • Learn • Be Part of the Story',
            'common.online': 'Online',
            'common.clearChat': 'Clear chat',
            'common.justNow': 'Just now',
            'common.typeMessage': 'Type your message...',
            'common.searchingAnanse': 'Searching Ananse for: "{{query}}"',
            'common.noSearchQuery': 'Please enter a search term first.',
            'home.heroBadge': 'WELCOME TO ANANSE',
            'home.heroTitle': "Weaving Ghana's Stories into the Digital Age",
            'home.heroDescription': "Explore our rich heritage, discover hidden stories, and experience Ghana's culture like never before.",
            'home.heroQuote': '<span>Same stories.</span><br><em>New ways to explore.</em>',
            'home.featureDiscover': 'Discover',
            'home.featureDiscoverText': 'Find heritage sites across Ghana',
            'home.featureExplore': 'Explore',
            'home.featureExploreText': 'Learn about history, culture & people',
            'home.featureScan': 'Scan',
            'home.featureScanText': 'Unlock stories with QR experiences',
            'home.featureAskNaa': 'Ask Naa',
            'home.featureAskNaaText': 'Get answers from our AI guide',
            'home.featurePassport': 'Get Your Passport',
            'home.featurePassportText': 'Visit, learn, collect badges',
            'home.featureBadges': 'Earn Badges',
            'home.featureBadgesText': 'Celebrate your journey',
            'home.featuredSitesTitle': 'Featured Heritage Sites',
            'home.featuredSitesSubtitle': "Explore some of Ghana's most iconic and culturally significant landmarks.",
            'home.ctaTitle': "A Journey Through Ghana's Heritage",
            'home.ctaBullets': 'Discover • Learn • Be Part of the Story',
            'home.ctaButton': 'Start Exploring',
            'home.siteCapeCoast': 'Cape Coast Castle',
            'home.siteIndependenceArch': 'Independence Arch',
            'home.siteKwameNkrumah': 'Kwame Nkrumah Memorial Park',
            'home.siteManhyia': 'Manhyia Palace',
            'home.siteOsuCastle': 'Osu Castle',
            'home.siteElminaCastle': 'Elmina Castle',
            'home.siteNationalMuseum': 'National Museum of Ghana',
            'home.featuredCapeCoastCategory': 'Historical Monument',
            'home.featuredCapeCoastDescription': 'Explore one of Ghana’s most significant historical landmarks and learn about its role in the history of the transatlantic slave trade.',
            'home.featuredCapeCoastAlt': 'Cape Coast Castle in Ghana',
            'home.featuredCapeCoastLocation': 'Central Region',
            'home.featuredIndependenceArchCategory': 'Historical Monument',
            'home.featuredIndependenceArchDescription': 'Discover one of Ghana’s national symbols of independence, located in the heart of Accra at Independence Square.',
            'home.featuredIndependenceArchAlt': 'Independence Arch in Accra, Ghana',
            'home.featuredIndependenceArchLocation': 'Accra',
            'home.featuredKwameNkrumahCategory': 'Memorial / Historical Site',
            'home.featuredKwameNkrumahDescription': 'Visit the memorial dedicated to Ghana’s first president and learn about Kwame Nkrumah’s role in Ghana’s independence and history.',
            'home.featuredKwameNkrumahAlt': 'Kwame Nkrumah Memorial Park in Accra, Ghana',
            'home.featuredKwameNkrumahLocation': 'Accra',
            'home.featuredManhyiaCategory': 'Cultural / Historical Site',
            'home.featuredManhyiaDescription': 'Discover the history and heritage of the Ashanti Kingdom through Manhyia Palace and its cultural collections.',
            'home.featuredManhyiaAlt': 'Manhyia Palace in Kumasi, Ghana',
            'home.featuredManhyiaLocation': 'Kumasi',
            'home.featuredOsuCategory': 'Historical Monument',
            'home.featuredOsuDescription': 'Explore Osu Castle, also known as Christiansborg Castle, a historic coastal landmark in Accra with a significant role in Ghana’s political and colonial history.',
            'home.featuredOsuAlt': 'Osu Castle in Accra, Ghana',
            'home.featuredOsuLocation': 'Accra',
            'home.siteTitle': 'Featured Heritage Sites',
            'home.heroCaption': 'Same stories.<br><em>New ways to explore.</em>',
            login: {
                badge: '— WELCOME TO ANANSE',
                heroTitle: 'Explore. Learn. Preserve.',
                heroDescription: 'Log in to continue your journey through Ghana’s rich heritage, culture, and untold stories.',
                featureDiscover: 'Discover',
                featureDiscoverText: 'heritage sites',
                featureLearn: 'Learn',
                featureLearnText: 'amazing stories',
                featureEarn: 'Earn',
                featureEarnText: 'badges',
                heroQuote: 'Our heritage lives in you.',
                welcomeBack: 'Welcome Back',
                subtext: 'Log in to continue your journey with Ananse.',
                email: 'Email Address',
                emailPlaceholder: 'Enter your email address',
                password: 'Password',
                passwordPlaceholder: 'Enter your password',
                remember: 'Remember me',
                forgot: 'Forgot password?',
                submit: 'Login',
                or: 'OR',
                google: 'Continue with Google',
                noAccount: "Don't have an account?",
                signup: 'Sign Up',
                footerScript: 'Scan today. Experience forever.',
                formMissing: 'Please enter both your email and password.',
                loggingIn: 'Logging in...',
                loginSuccess: 'Welcome back to ANANSE!'
            },
            'about.sectionTitle': 'ABOUT ANANSE',
            'about.heroTitle': 'More Than a Platform.<br><span>It\'s a Movement.</span>',
            'about.heroDescription': "ANANSE is a digital heritage platform built to bring Ghana's rich history, culture and people to life — connecting the past, present and future.",
            'about.heroMotto': 'Our Heritage. Our Pride. Our Story.',
            'about.missionTitle': 'Our Mission',
            'about.missionText': "To make Ghana's heritage accessible, engaging and unforgettable through technology, storytelling and immersive experiences.",
            'about.visionTitle': 'Our Vision',
            'about.visionText': "A world where everyone can explore, learn and celebrate Ghana's heritage — anytime, anywhere.",
            'about.valuesTitle': 'Our Values',
            'about.valueCultural': 'Cultural pride',
            'about.valueInnovation': 'Innovation',
            'about.valueEducation': 'Education',
            'about.valueInclusivity': 'Inclusivity',
            'about.valueSustainability': 'Sustainability',
            'about.quoteText': '“Heritage is not just what we inherit, but what we pass on.”',
            'about.quoteAuthor': '— ANANSE',
            'about.techTitle': 'Our Technology',
            'about.techDescription': 'ANANSE combines modern technology with traditional storytelling to create meaningful, interactive experiences.',
            'about.learnMore': 'Learn More',
            'about.frontend': 'Frontend',
            'about.backend': 'Backend',
            'about.database': 'Database',
            'about.aiGuide': 'AI Guide',
            'about.qrTechnology': 'QR Technology',
            'about.detailsBeautiful': 'Beautiful, responsive user experience.',
            'about.detailsPowering': 'Powering the platform and user features.',
            'about.detailsSecurely': 'Securely storing heritage data & user progress.',
            'about.detailsAssistant': 'Your smart cultural assistant.',
            'about.detailsStories': 'Bringing physical sites to digital stories.',
            'about.bannerTitle': 'Preserving<br>Ghana\'s Heritage<br>for Generations',
            'about.teamTitle': 'The Team Behind ANANSE',
            'about.teamDescription': 'We are a passionate team of designers, developers, storytellers and culture lovers, dedicated to building a platform that celebrates Ghana\'s heritage and inspires future generations.',
            'about.roleDesign': 'Design',
            'about.roleDevelopment': 'Development',
            'about.roleContent': 'Content',
            'about.roleCommunity': 'Community',
            'about.journeyTitle': 'Be Part of the Journey',
            'about.journeyText': 'Whether you\'re a curious traveler, a proud Ghanaian, or a lover of culture — ANANSE is for you.',
            'about.exploreNow': 'Explore Now',
            'explore.heroSubtitle': "EXPLORE GHANA'S HERITAGE",
                        // ---- Explore page ----
            'explorePage.pageTitle': "Explore Ghana's Heritage — ANANSE",
            'explorePage.heroTitle': 'Explore Ghana\'s <span class="hl">Heritage</span>',
            'explorePage.heroLead': "Discover the places, people, stories, and events that have shaped Ghana's history and identity.",
            'explorePage.searchLabel': 'Search heritage sites',
            'explorePage.searchPlaceholder': 'Search heritage sites…',
            'explorePage.journeyDiscover': 'Discover',
            'explorePage.journeyDiscoverText': 'Find a heritage place.',
            'explorePage.journeyLearn': 'Learn',
            'explorePage.journeyLearnText': 'Read its story.',
            'explorePage.journeyAsk': 'Ask Naa',
            'explorePage.journeyAskText': 'Test what you learned.',
            'explorePage.journeyBadge': 'Earn a Badge',
            'explorePage.journeyBadgeText': 'Collect your achievement.',
            'explorePage.filterByCategory': 'Filter by category',
            'explorePage.filterAll': 'All',
            'explorePage.categoryHistorical': 'Historical Sites',
            'explorePage.categoryMonuments': 'Monuments',
            'explorePage.categoryPalaces': 'Palaces',
            'explorePage.regionLabel': 'Explore by Region',
            'explorePage.regionAll': 'All Regions',
            'explorePage.regionGreaterAccra': 'Greater Accra',
            'explorePage.regionAshanti': 'Ashanti',
            'explorePage.regionCentral': 'Central',
            'explorePage.showing': 'Showing',
            'explorePage.siteSingular': 'heritage site',
            'explorePage.sitePlural': 'heritage sites',
            'explorePage.noResultsTitle': 'No heritage sites match your filters',
            'explorePage.noResultsText': 'Try clearing the search box, choosing "All" categories, or selecting a different region.',
            'explorePage.noMuseumsTitle': 'No heritage sites in this category yet.',
            'explorePage.noMuseumsText': "We're still researching Ghana's museums for Ananse — check back soon.",
            'explorePage.learnStory': 'Learn the Story',
            'explorePage.listenStory': 'Listen to the Story',
            'explorePage.audioSoon': 'Audio preview coming soon',
            'explorePage.aboutSite': 'About this site',
            'explorePage.didYouKnow': 'Did You Know?',
            'explorePage.close': 'Close',
            'explorePage.modalLabel': 'Heritage site details',
            'explorePage.openDetails': 'Open details for {{name}}',
            'explorePage.saveFavourite': 'Save {{name}} to favourites',
            'explorePage.trustedTitle': 'Trusted Heritage Information',
            'explorePage.trustedNote': 'Stories and heritage information on Ananse are carefully researched using trusted sources, including:',
            'explorePage.footerRights': '© 2026 ANANSE. All rights reserved.',
            'explorePage.site.capeCoast.name': 'Cape Coast Castle',
            'explorePage.site.capeCoast.location': 'Cape Coast, Central Region',
            'explorePage.site.capeCoast.description': 'Explore Cape Coast Castle and discover powerful stories of Ghana’s history, resilience, the transatlantic slave trade, and the journey toward freedom.',
            'explorePage.site.capeCoast.didYouKnow': 'Cape Coast Castle is one of Ghana’s major historic castles along the coast and is an important site for learning about the transatlantic slave trade and Ghana’s history.',
            'explorePage.site.manhyia.name': 'Manhyia Palace',
            'explorePage.site.manhyia.location': 'Kumasi, Ashanti Region',
            'explorePage.site.manhyia.description': 'Discover the history, culture and traditions of the Ashanti Kingdom through the story of Manhyia Palace.',
            'explorePage.site.manhyia.didYouKnow': 'Manhyia Palace is closely connected to the history, culture and traditions of the Asante Kingdom.',
            'explorePage.site.osu.name': 'Osu Castle',
            'explorePage.site.osu.location': 'Osu, Greater Accra Region',
            'explorePage.site.osu.description': 'Explore Osu Castle and uncover its place in Ghana’s coastal, colonial and political history.',
            'explorePage.site.osu.didYouKnow': 'Osu Castle, also known historically as Christiansborg Castle, is located along Ghana’s coast in Osu, Accra.',
            'explorePage.site.independence.name': 'Independence Square',
            'explorePage.site.independence.location': 'Accra, Greater Accra Region',
            'explorePage.site.independence.description': 'Discover the symbolic heart of Ghana’s independence and the national story represented by Independence Square.',
            'explorePage.site.independence.didYouKnow': 'Independence Square, also known as Black Star Square, is one of Ghana’s major national landmarks.',
            'explorePage.site.kwameNkrumah.name': 'Kwame Nkrumah Memorial Park',
            'explorePage.site.kwameNkrumah.location': 'Accra, Greater Accra Region',
            'explorePage.site.kwameNkrumah.description': 'Discover the legacy of Dr. Kwame Nkrumah and the story of Ghana’s independence at Kwame Nkrumah Memorial Park.',
            'explorePage.site.kwameNkrumah.didYouKnow': 'The memorial park is dedicated to Ghana’s first Prime Minister and President, Dr. Kwame Nkrumah.',
            'ai.badge': 'Naa',
            'ai.title': 'Your AI Heritage Guide',
            'ai.subtitle': 'Ask questions, get instant answers, discover Ghana’s history, culture and hidden gems — all in one place.',
            'ai.greeting': 'Hi! I’m Naa. How can I help you explore Ghana today?',
            'ai.suggestedQuestions': 'Suggested Questions',
            'ai.questionCapeCoast': 'Tell me about Cape Coast Castle.',
            'ai.questionAshanti': 'What is the history of the Ashanti Empire?',
            'ai.questionAccra': 'Which heritage sites are near Accra?',
            'ai.questionEvents': 'What cultural events happen in Ghana?',
            'ai.questionPassport': 'How do I earn badges on the Cultural Passport?',
            'ai.questionTrip': 'Can you recommend a 1-day heritage trip?',
            'ai.quote': '“Ask about our past, plan your present, be part of our future.”',
            'ai.online': 'Online',
            'ai.defaultWelcome': "Hello! I’m Naa, your AI heritage guide. I’m here to help you learn about Ghana’s history, explore amazing heritage sites, and discover our culture. What would you like to explore today? 👋",
            'ai.thinking': 'Naa is thinking...',
            'ai.noResponse': "I'm sorry, I couldn't retrieve a response at the moment. Please try asking again.",
            'ai.connectionError': 'Sorry, I’m having trouble connecting right now. Please try again.',
            'ai.recordsUnavailable': 'Sorry, Naa can’t reach ANANSE’s heritage records right now. Please try again in a few minutes.',
            'ai.smartFriendly': 'Smart. Friendly. Always here.',
            'ai.instantAnswers': 'Instant answers',
            'ai.siteInformation': 'Site information',
            'ai.culturalFacts': 'Cultural facts',
            'ai.travelTips': 'Travel tips',
            'ai.languageSupport': 'Language support',
            'ai.chatPrompt': 'Chat with Naa and make the most of your journey!',
            'ai.footerTagline': 'Weaving Ghana’s Story into the Digital Age',
            'ai.chatPlaceHolder': 'Type your message...',
            'ai.attachFile': 'Attach File',
            'ai.sendMessage': 'Send Message',
            'ai.searchIcon': 'Search',
            'ai.notificationIcon': 'Notifications',
            'ai.profileIcon': 'User Profile',
            'ai.clearChat': 'Clear chat',
            'common.languageSelect': 'Select website language',
            'common.searching': 'Searching Ananse for: "{{query}}"',
            'common.errorNoResponse': 'No response available right now.',
            'mapPage.pageTitle': 'Ananse - Explore Ghana’s Heritage Map',
            'mapPage.toggleNavigation': 'Toggle navigation menu',
            'mapPage.viewAllStopsDefault': 'View all stops (7)',
            'mapPage.heroTitle': 'Explore Ghana’s Heritage',
            'mapPage.heroDescription': 'Discover historic places, follow heritage trails, and experience Ghana’s stories.',
            'mapPage.searchLabel': 'Search for a heritage site',
            'mapPage.searchPlaceholder': 'Search for a heritage site...',
            'mapPage.filterAll': 'All',
            'mapPage.filterCastles': 'Castles',
            'mapPage.filterPalaces': 'Palaces',
            'mapPage.filterMonuments': 'Monuments',
            'mapPage.filterMuseums': 'Museums',
            'mapPage.zoomIn': 'Zoom in',
            'mapPage.zoomOut': 'Zoom out',
            'mapPage.locateMe': 'Find my location',
            'mapPage.toggleAttribution': 'Toggle map attribution',
            'mapPage.mapFeedback': 'Improve this map',
            'mapPage.closeDetails': 'Close details popup',
            'mapPage.heritageSite': 'Heritage site',
            'mapPage.btnDirections': 'Get Directions',
            'mapPage.btnBook': 'Book Visit',
            'mapPage.btnExplore': 'Explore Site',
            'mapPage.btnViewTrail': 'View Heritage Trail',
            'mapPage.myPlans': 'My Plans',
            'mapPage.travelEstimateLabel': 'Estimated travel time from your location',
            'mapPage.travelTimeHours': '{{hours}} hr {{minutes}} min',
            'mapPage.travelTimeMinutes': '{{minutes}} min',
            'mapPage.travelDistance': '({{distance}} km)',
            'mapPage.travelTimeExample': '2 hr 45 min',
            'mapPage.travelDistanceExample': '(165 km)',
            'mapPage.trailHighlightsHeading': 'Heritage Trail Highlights',
            'mapPage.viewAllStops': 'View all stops ({{count}})',
            'mapPage.featuredTitle': 'Featured Heritage Sites',
            'mapPage.viewAllSites': 'View all sites',
            'mapPage.promoTitle': 'Plan your next heritage adventure',
            'mapPage.promoDescription': 'History is closer than you think.',
            'mapPage.planTrip': 'Plan your trip',
            'mapPage.categoryHistorical': 'Historical Monument',
            'mapPage.categoryPalace': 'Palace',
            'mapPage.categoryCastle': 'Castle',
            'mapPage.categoryMonument': 'Monument',
            'mapPage.categoryMuseum': 'Museum',
            'mapPage.mapUnavailable': 'Map preview unavailable. Add a Mapbox token to enable the live map.',
            'mapPage.geoUnsupported': 'Your browser does not support location services.',
            'mapPage.geoDenied': 'We could not access your location. You can still browse the map manually.',
            'mapPage.site.capeCoast.name': 'Cape Coast Castle',
            'mapPage.site.capeCoast.location': 'Cape Coast, Central Region',
            'mapPage.site.capeCoast.shortLocation': 'Cape Coast',
            'mapPage.site.capeCoast.category': 'Historical Monument',
            'mapPage.site.capeCoast.description': 'Explore the castle and discover the powerful stories of the transatlantic slave trade, resilience and freedom.',
            'mapPage.site.capeCoast.stopTitle': 'Door of No Return',
            'mapPage.site.capeCoast.stopDescription': 'The point where enslaved Africans were forced onto ships.',
            'mapPage.site.manhyia.name': 'Manhyia Palace',
            'mapPage.site.manhyia.location': 'Kumasi, Ashanti Region',
            'mapPage.site.manhyia.shortLocation': 'Kumasi',
            'mapPage.site.manhyia.category': 'Palace',
            'mapPage.site.manhyia.description': 'The seat of the Asantehene and the Ashanti Kingdom, blending royal tradition with living Ashanti governance.',
            'mapPage.site.manhyia.stopTitle': 'Royal court',
            'mapPage.site.manhyia.stopDescription': 'Discover how the Asantehene and royal advisors shaped political life and cultural identity.',
            'mapPage.site.osu.name': 'Osu Castle',
            'mapPage.site.osu.location': 'Osu, Greater Accra Region',
            'mapPage.site.osu.shortLocation': 'Accra',
            'mapPage.site.osu.category': 'Castle',
            'mapPage.site.osu.description': 'A former seat of government on the Accra coastline, with a layered colonial and post-independence history.',
            'mapPage.site.osu.stopTitle': 'Castle approach',
            'mapPage.site.osu.stopDescription': 'Take in the coastal setting and understand why the fortress dominated the cityscape.',
            'mapPage.site.independence.name': 'Independence Arch',
            'mapPage.site.independence.location': 'Accra, Greater Accra Region',
            'mapPage.site.independence.shortLocation': 'Accra',
            'mapPage.site.independence.category': 'Monument',
            'mapPage.site.independence.description': 'The centrepiece of Independence Square, marking Ghana’s 1957 independence and its role as the first sub-Saharan nation to break from colonial rule.',
            'mapPage.site.independence.stopTitle': 'Independence Arch',
            'mapPage.site.independence.stopDescription': 'The icon of Ghana’s national pride and public memory of 1957.',
            'mapPage.site.kwameNkrumah.name': 'Kwame Nkrumah Memorial Park',
            'mapPage.site.kwameNkrumah.location': 'Accra, Greater Accra Region',
            'mapPage.site.kwameNkrumah.shortLocation': 'Accra',
            'mapPage.site.kwameNkrumah.category': 'Museum',
            'mapPage.site.kwameNkrumah.description': 'The final resting place and museum dedicated to Ghana’s first president and a leading figure of Pan-Africanism.',
            'mapPage.site.kwameNkrumah.stopTitle': 'Tribute garden',
            'mapPage.site.kwameNkrumah.stopDescription': 'See how the memorial turns memory into a public space for reflection and honour.'
        },
        fr: {
            'language.label': 'Langue',
            'nav.home': 'Accueil',
            'nav.about': 'À propos',
            'nav.explore': 'Explorer',
            'nav.map': 'Carte',
            'nav.passport': 'Passeport',
            'nav.login': 'Connexion',
            'nav.signup': 'S’inscrire',
            'nav.search': 'Rechercher',
            'nav.notifications': 'Notifications',
            'nav.learn': 'Apprendre',
            'nav.preserve': 'Préserver',
            'site.tagline': "Tisser les récits du Ghana à l’ère numérique",
            'site.taglineAlt': 'Nos histoires. Notre patrimoine. Votre voyage.',
            'common.viewAll': 'Tout voir',
            'common.viewDetails': 'Voir les détails',
            'common.startExploring': 'Commencer l’exploration',
            'common.filterSearch': 'Filtrer & Rechercher',
            'common.resetFilters': 'Réinitialiser les filtres',
            'common.mapView': 'Vue carte',
            'common.listView': 'Vue liste',
            'common.historical': 'Historique',
            'common.monument': 'Monument',
            'common.cultural': 'Culturel',
            'common.museum': 'Musée',
            'common.centralRegion': 'Région centrale',
            'common.accra': 'Accra',
            'common.kumasi': 'Kumasi',
            'common.moreThanWebsite': 'PLUS QU’UN SITE WEB',
            'common.discoverLearnStory': 'Découvrir • Apprendre • Faire partie de l’histoire',
            'common.online': 'En ligne',
            'common.clearChat': 'Effacer le chat',
            'common.justNow': 'À l’instant',
            'common.typeMessage': 'Saisissez votre message...',
            'common.searchingAnanse': 'Recherche Ananse pour : "{{query}}"',
            'home.heroBadge': 'BIENVENUE À ANANSE',
            'home.heroTitle': "Tisser les récits du Ghana à l’ère numérique",
            'home.heroDescription': 'Explorez notre riche patrimoine, découvrez des histoires cachées et vivez la culture du Ghana comme jamais auparavant.',
            'home.heroQuote': '<span>Mêmes histoires.</span><br><em>Nouvelles façons d’explorer.</em>',
            'home.featureDiscover': 'Découvrir',
            'home.featureDiscoverText': 'Trouvez des sites du patrimoine à travers le Ghana',
            'home.featureExplore': 'Explorer',
            'home.featureExploreText': 'Apprenez l’histoire, la culture et les peuples',
            'home.featureScan': 'Scanner',
            'home.featureScanText': 'Débloquez des histoires grâce aux expériences QR',
            'home.featureAskNaa': 'Demander à Naa',
            'home.featureAskNaaText': 'Obtenez des réponses de notre guide IA',
            'home.featurePassport': 'Obtenir votre passeport',
            'home.featurePassportText': 'Visitez, apprenez, gagnez des badges',
            'home.featureBadges': 'Gagner des badges',
            'home.featureBadgesText': 'Célébrez votre parcours',
            'home.featuredSitesTitle': 'Sites du patrimoine en vedette',
            'home.featuredSitesSubtitle': 'Explorez certains des monuments les plus emblématiques et culturellement significatifs du Ghana.',
            'home.ctaTitle': 'Un voyage à travers le patrimoine du Ghana',
            'home.ctaBullets': 'Découvrir • Apprendre • Faire partie de l’histoire',
            'home.ctaButton': 'Commencer l’exploration',
            'home.siteCapeCoast': 'Château de Cape Coast',
            'home.siteIndependenceArch': 'Arc de l’Indépendance',
            'home.siteKwameNkrumah': 'Parc commémoratif Kwame Nkrumah',
            'home.siteManhyia': 'Palais Manhyia',
            'home.siteOsuCastle': 'Château d’Osu',
            'home.siteElminaCastle': 'Château d’Elmina',
            'home.siteNationalMuseum': 'Musée national du Ghana',
            'home.featuredCapeCoastCategory': 'Monument historique',
            'home.featuredCapeCoastDescription': 'Explorez l’un des monuments historiques les plus importants du Ghana et découvrez son rôle dans l’histoire de la traite transatlantique des esclaves.',
            'home.featuredCapeCoastAlt': 'Château de Cape Coast au Ghana',
            'home.featuredCapeCoastLocation': 'Région centrale',
            'home.featuredIndependenceArchCategory': 'Monument historique',
            'home.featuredIndependenceArchDescription': 'Découvrez l’un des symboles nationaux de l’indépendance du Ghana, situé au cœur d’Accra, à la place de l’Indépendance.',
            'home.featuredIndependenceArchAlt': 'Arc de l’Indépendance à Accra, au Ghana',
            'home.featuredIndependenceArchLocation': 'Accra',
            'home.featuredKwameNkrumahCategory': 'Mémorial / Site historique',
            'home.featuredKwameNkrumahDescription': 'Visitez le mémorial dédié au premier président du Ghana et découvrez le rôle de Kwame Nkrumah dans l’indépendance et l’histoire du Ghana.',
            'home.featuredKwameNkrumahAlt': 'Parc commémoratif Kwame Nkrumah à Accra, au Ghana',
            'home.featuredKwameNkrumahLocation': 'Accra',
            'home.featuredManhyiaCategory': 'Site culturel / historique',
            'home.featuredManhyiaDescription': 'Découvrez l’histoire et le patrimoine du royaume ashanti à travers le palais de Manhyia et ses collections culturelles.',
            'home.featuredManhyiaAlt': 'Palais de Manhyia à Kumasi, au Ghana',
            'home.featuredManhyiaLocation': 'Kumasi',
            'home.featuredOsuCategory': 'Monument historique',
            'home.featuredOsuDescription': 'Explorez le château d’Osu, également connu sous le nom de château de Christiansborg, un monument historique côtier à Accra qui a joué un rôle important dans l’histoire politique et coloniale du Ghana.',
            'home.featuredOsuAlt': 'Château d’Osu à Accra, au Ghana',
            'home.featuredOsuLocation': 'Accra',
            login: {
                badge: '— BIENVENUE À ANANSE',
                heroTitle: 'Explorer. Apprendre. Préserver.',
                heroDescription: 'Connectez-vous pour poursuivre votre voyage à travers le riche patrimoine, la culture et les histoires méconnues du Ghana.',
                featureDiscover: 'Découvrir',
                featureDiscoverText: 'sites du patrimoine',
                featureLearn: 'Apprendre',
                featureLearnText: 'histoires fascinantes',
                featureEarn: 'Gagner',
                featureEarnText: 'des badges',
                heroQuote: 'Notre patrimoine vit en vous.',
                welcomeBack: 'Bon retour',
                subtext: 'Connectez-vous pour poursuivre votre voyage avec Ananse.',
                email: 'Adresse e-mail',
                emailPlaceholder: 'Entrez votre adresse e-mail',
                password: 'Mot de passe',
                passwordPlaceholder: 'Entrez votre mot de passe',
                remember: 'Se souvenir de moi',
                forgot: 'Mot de passe oublié ?',
                submit: 'Connexion',
                or: 'OU',
                google: 'Continuer avec Google',
                noAccount: 'Vous n’avez pas de compte ?',
                signup: 'S’inscrire',
                footerScript: 'Scannez aujourd’hui. Découvrez pour toujours.',
                formMissing: 'Veuillez saisir à la fois votre e-mail et votre mot de passe.',
                loggingIn: 'Connexion en cours...',
                loginSuccess: 'Bon retour chez ANANSE !'
            },
            'about.sectionTitle': 'À PROPOS D’ANANSE',
            'about.heroTitle': 'Plus qu’une plateforme.<br><span>C’est un mouvement.</span>',
            'about.heroDescription': 'ANANSE est une plateforme numérique du patrimoine conçue pour faire vivre l’histoire, la culture et les peuples du Ghana — en reliant le passé, le présent et le futur.',
            'about.heroMotto': 'Notre patrimoine. Notre fierté. Notre histoire.',
            'about.missionTitle': 'Notre mission',
            'about.missionText': 'Rendre le patrimoine du Ghana accessible, engageant et inoubliable grâce à la technologie, au storytelling et aux expériences immersives.',
            'about.visionTitle': 'Notre vision',
            'about.visionText': 'Un monde où chacun peut explorer, apprendre et célébrer le patrimoine du Ghana — à tout moment, partout.',
            'about.valuesTitle': 'Nos valeurs',
            'about.valueCultural': 'Fierté culturelle',
            'about.valueInnovation': 'Innovation',
            'about.valueEducation': 'Éducation',
            'about.valueInclusivity': 'Inclusivité',
            'about.valueSustainability': 'Durabilité',
            'about.quoteText': '« Le patrimoine n’est pas seulement ce que nous héritons, mais ce que nous transmettons. »',
            'about.quoteAuthor': '— ANANSE',
            'about.techTitle': 'Notre technologie',
            'about.techDescription': 'ANANSE associe la technologie moderne au storytelling traditionnel pour créer des expériences significatives et interactives.',
            'about.learnMore': 'En savoir plus',
            'about.frontend': 'Frontend',
            'about.backend': 'Backend',
            'about.database': 'Base de données',
            'about.aiGuide': 'Guide IA',
            'about.qrTechnology': 'Technologie QR',
            'about.detailsBeautiful': 'Une expérience utilisateur belle et réactive.',
            'about.detailsPowering': 'Alimente la plateforme et ses fonctionnalités.',
            'about.detailsSecurely': 'Stocke en toute sécurité les données du patrimoine et les progrès des utilisateurs.',
            'about.detailsAssistant': 'Votre assistant culturel intelligent.',
            'about.detailsStories': 'Transforme les sites physiques en histoires numériques.',
            'about.bannerTitle': 'Préserver<br>le patrimoine du Ghana<br>pour les générations',
            'about.teamTitle': 'L’équipe derrière ANANSE',
            'about.teamDescription': 'Nous sommes une équipe passionnée de designers, développeurs, conteurs et amoureux de la culture, dédiée à la création d’une plateforme qui célèbre le patrimoine du Ghana et inspire les générations futures.',
            'about.roleDesign': 'Design',
            'about.roleDevelopment': 'Développement',
            'about.roleContent': 'Contenu',
            'about.roleCommunity': 'Communauté',
            'about.journeyTitle': 'Faites partie du voyage',
            'about.journeyText': 'Que vous soyez un voyageur curieux, un Ghanaien fier ou un amoureux de la culture — ANANSE est pour vous.',
            'about.exploreNow': 'Explorer maintenant',
                        // ---- Explore page ----
            'explorePage.pageTitle': 'Explorer le patrimoine du Ghana — ANANSE',
            'explorePage.heroTitle': 'Explorez le <span class="hl">patrimoine</span> du Ghana',
            'explorePage.heroLead': 'Découvrez les lieux, les personnes, les histoires et les événements qui ont façonné l’histoire et l’identité du Ghana.',
            'explorePage.searchLabel': 'Rechercher des sites du patrimoine',
            'explorePage.searchPlaceholder': 'Rechercher des sites du patrimoine…',
            'explorePage.journeyDiscover': 'Découvrir',
            'explorePage.journeyDiscoverText': 'Trouvez un lieu du patrimoine.',
            'explorePage.journeyLearn': 'Apprendre',
            'explorePage.journeyLearnText': 'Lisez son histoire.',
            'explorePage.journeyAsk': 'Demander à Naa',
            'explorePage.journeyAskText': 'Testez ce que vous avez appris.',
            'explorePage.journeyBadge': 'Gagner un badge',
            'explorePage.journeyBadgeText': 'Récupérez votre récompense.',
            'explorePage.filterByCategory': 'Filtrer par catégorie',
            'explorePage.filterAll': 'Tous',
            'explorePage.categoryHistorical': 'Sites historiques',
            'explorePage.categoryMonuments': 'Monuments',
            'explorePage.categoryPalaces': 'Palais',
            'explorePage.regionLabel': 'Explorer par région',
            'explorePage.regionAll': 'Toutes les régions',
            'explorePage.regionGreaterAccra': 'Grand Accra',
            'explorePage.regionAshanti': 'Ashanti',
            'explorePage.regionCentral': 'Central',
            'explorePage.showing': 'Affichage de',
            'explorePage.siteSingular': 'site du patrimoine',
            'explorePage.sitePlural': 'sites du patrimoine',
            'explorePage.noResultsTitle': 'Aucun site du patrimoine ne correspond à vos filtres',
            'explorePage.noResultsText': 'Essayez d’effacer la recherche, de choisir la catégorie « Tous » ou de sélectionner une autre région.',
            'explorePage.noMuseumsTitle': 'Aucun site du patrimoine dans cette catégorie pour le moment.',
            'explorePage.noMuseumsText': 'Nous poursuivons nos recherches sur les musées du Ghana pour Ananse — revenez bientôt.',
            'explorePage.learnStory': 'Découvrir l’histoire',
            'explorePage.listenStory': 'Écouter l’histoire',
            'explorePage.audioSoon': 'Aperçu audio bientôt disponible',
            'explorePage.aboutSite': 'À propos de ce site',
            'explorePage.didYouKnow': 'Le saviez-vous ?',
            'explorePage.close': 'Fermer',
            'explorePage.modalLabel': 'Détails du site du patrimoine',
            'explorePage.openDetails': 'Ouvrir les détails de {{name}}',
            'explorePage.saveFavourite': 'Ajouter {{name}} aux favoris',
            'explorePage.trustedTitle': 'Informations patrimoniales fiables',
            'explorePage.trustedNote': 'Les récits et les informations patrimoniales d’Ananse sont soigneusement documentés à partir de sources fiables, notamment :',
            'explorePage.footerRights': '© 2026 ANANSE. Tous droits réservés.',
            'explorePage.site.capeCoast.name': 'Château de Cape Coast',
            'explorePage.site.capeCoast.location': 'Cape Coast, Région centrale',
            'explorePage.site.capeCoast.description': 'Explorez le château de Cape Coast et découvrez de puissants récits sur l’histoire du Ghana, sa résilience, la traite transatlantique des esclaves et le chemin vers la liberté.',
            'explorePage.site.capeCoast.didYouKnow': 'Le château de Cape Coast est l’un des principaux châteaux historiques du littoral ghanéen et un lieu important pour comprendre la traite transatlantique des esclaves et l’histoire du Ghana.',
            'explorePage.site.manhyia.name': 'Palais de Manhyia',
            'explorePage.site.manhyia.location': 'Kumasi, Région ashanti',
            'explorePage.site.manhyia.description': 'Découvrez l’histoire, la culture et les traditions du royaume ashanti à travers l’histoire du palais de Manhyia.',
            'explorePage.site.manhyia.didYouKnow': 'Le palais de Manhyia est étroitement lié à l’histoire, à la culture et aux traditions du royaume ashanti.',
            'explorePage.site.osu.name': 'Château d’Osu',
            'explorePage.site.osu.location': 'Osu, Région du Grand Accra',
            'explorePage.site.osu.description': 'Explorez le château d’Osu et découvrez sa place dans l’histoire côtière, coloniale et politique du Ghana.',
            'explorePage.site.osu.didYouKnow': 'Le château d’Osu, connu historiquement sous le nom de château de Christiansborg, se trouve sur la côte du Ghana, à Osu, Accra.',
            'explorePage.site.independence.name': 'Place de l’Indépendance',
            'explorePage.site.independence.location': 'Accra, Région du Grand Accra',
            'explorePage.site.independence.description': 'Découvrez le cœur symbolique de l’indépendance du Ghana et l’histoire nationale que représente la place de l’Indépendance.',
            'explorePage.site.independence.didYouKnow': 'La place de l’Indépendance, aussi appelée Black Star Square, est l’un des grands monuments nationaux du Ghana.',
            'explorePage.site.kwameNkrumah.name': 'Parc commémoratif Kwame Nkrumah',
            'explorePage.site.kwameNkrumah.location': 'Accra, Région du Grand Accra',
            'explorePage.site.kwameNkrumah.description': 'Découvrez l’héritage du Dr Kwame Nkrumah et l’histoire de l’indépendance du Ghana au parc commémoratif Kwame Nkrumah.',
            'explorePage.site.kwameNkrumah.didYouKnow': 'Le parc commémoratif est dédié au premier Premier ministre et président du Ghana, le Dr Kwame Nkrumah.',
            'ai.badge': 'Naa',
            'ai.title': 'Votre guide IA du patrimoine',
            'ai.subtitle': 'Posez des questions, obtenez des réponses instantanées, découvrez l’histoire, la culture et les trésors cachés du Ghana — en un seul endroit.',
            'ai.greeting': 'Bonjour ! Je suis Naa. Comment puis-je vous aider à explorer le Ghana aujourd’hui ?',
            'ai.suggestedQuestions': 'Questions suggérées',
            'ai.questionCapeCoast': 'Parle-moi du château de Cape Coast.',
            'ai.questionAshanti': 'Quelle est l’histoire de l’Empire Ashanti ?',
            'ai.questionAccra': 'Quels sont les sites patrimoniaux près d’Accra ?',
            'ai.questionEvents': 'Quels sont les événements culturels au Ghana ?',
            'ai.questionPassport': 'Comment puis-je gagner des badges sur le passeport culturel ?',
            'ai.questionTrip': 'Pouvez-vous recommander un voyage patrimonial d’un jour ?',
            'ai.quote': '« Demandez notre passé, planifiez votre présent, faites partie de notre futur. »',
            'ai.online': 'En ligne',
            'ai.defaultWelcome': 'Bonjour ! Je suis Naa, votre guide IA du patrimoine. Je suis là pour vous aider à découvrir l’histoire du Ghana, explorer des sites patrimoniaux remarquables et découvrir notre culture. Que souhaitez-vous explorer aujourd’hui ? 👋',
            'ai.thinking': 'Naa réfléchit...',
            'ai.noResponse': 'Je suis désolé, je n’ai pas pu récupérer de réponse pour le moment. Veuillez réessayer.',
            'ai.connectionError': 'Désolé, j’ai du mal à me connecter pour le moment. Veuillez réessayer.',
            'ai.recordsUnavailable': 'Désolée, Naa ne parvient pas à accéder aux archives patrimoniales d’ANANSE pour le moment. Veuillez réessayer dans quelques minutes.',
            'ai.smartFriendly': 'Intelligent. Amical. Toujours là.',
            'ai.instantAnswers': 'Réponses instantanées',
            'ai.siteInformation': 'Informations sur les sites',
            'ai.culturalFacts': 'Faits culturels',
            'ai.travelTips': 'Conseils de voyage',
            'ai.languageSupport': 'Support linguistique',
            'ai.chatPrompt': 'Discutez avec Naa et profitez au maximum de votre voyage !',
            'ai.footerTagline': 'Nos histoires. Notre patrimoine. Votre voyage.',
            'ai.chatPlaceHolder': 'Écrivez votre message...',
            'ai.attachFile': 'Joindre un fichier',
            'ai.sendMessage': 'Envoyer',
            'common.languageSelect': 'Choisir la langue du site',
            'common.searching': 'Recherche Ananse pour : "{{query}}"',
            'common.errorNoResponse': 'Aucune réponse disponible pour le moment.',
            'mapPage.pageTitle': 'Ananse - Explorer le patrimoine du Ghana',
            'mapPage.toggleNavigation': 'Ouvrir ou fermer le menu de navigation',
            'mapPage.viewAllStopsDefault': 'Voir les 3 étapes',
            'mapPage.heroTitle': 'Explorez le patrimoine du Ghana',
            'mapPage.heroDescription': 'Découvrez des lieux historiques, suivez des parcours patrimoniaux et vivez les récits du Ghana.',
            'mapPage.searchLabel': 'Rechercher un site patrimonial',
            'mapPage.searchPlaceholder': 'Rechercher un site patrimonial...',
            'mapPage.filterAll': 'Tous',
            'mapPage.filterCastles': 'Châteaux',
            'mapPage.filterPalaces': 'Palais',
            'mapPage.filterMonuments': 'Monuments',
            'mapPage.filterMuseums': 'Musées',
            'mapPage.zoomIn': 'Zoom avant',
            'mapPage.zoomOut': 'Zoom arrière',
            'mapPage.locateMe': 'Trouver ma position',
            'mapPage.closeDetails': 'Fermer les détails',
            'mapPage.heritageSite': 'Site patrimonial',
            'mapPage.btnDirections': 'Obtenir l’itinéraire',
            'mapPage.btnBook': 'Réserver une visite',
            'mapPage.btnExplore': 'Explorer le site',
            'mapPage.btnViewTrail': 'Voir le parcours patrimonial',
            'mapPage.myPlans': 'Mes projets',
            'mapPage.travelEstimateLabel': 'Temps de trajet estimé depuis votre position',
            'mapPage.travelTimeHours': '{{hours}} h {{minutes}} min',
            'mapPage.travelTimeMinutes': '{{minutes}} min',
            'mapPage.travelDistance': '({{distance}} km)',
            'mapPage.trailHighlightsHeading': 'Points forts du parcours patrimonial',
            'mapPage.viewAllStops': 'Voir les {{count}} étapes',
            'mapPage.featuredTitle': 'Sites patrimoniaux à découvrir',
            'mapPage.viewAllSites': 'Voir tous les sites',
            'mapPage.promoTitle': 'Planifiez votre prochaine aventure patrimoniale',
            'mapPage.promoDescription': 'L’histoire est plus proche que vous ne le pensez.',
            'mapPage.planTrip': 'Planifier votre visite',
            'mapPage.categoryHistorical': 'Monument historique',
            'mapPage.categoryPalace': 'Palais',
            'mapPage.categoryCastle': 'Château',
            'mapPage.categoryMonument': 'Monument',
            'mapPage.categoryMuseum': 'Musée',
            'mapPage.mapUnavailable': 'Aperçu de la carte indisponible. Ajoutez un jeton Mapbox pour afficher la carte.',
            'mapPage.geoUnsupported': 'Votre navigateur ne prend pas en charge la géolocalisation.',
            'mapPage.geoDenied': 'Impossible d’accéder à votre position. Vous pouvez toujours parcourir la carte.',
            'mapPage.site.capeCoast.name': 'Château de Cape Coast',
            'mapPage.site.capeCoast.location': 'Cape Coast, Région du Centre',
            'mapPage.site.capeCoast.shortLocation': 'Cape Coast',
            'mapPage.site.capeCoast.category': 'Monument historique',
            'mapPage.site.capeCoast.description': 'Explorez le château et découvrez les récits marquants de la traite transatlantique des esclaves, de la résilience et de la liberté.',
            'mapPage.site.capeCoast.stopTitle': 'Porte du Non-Retour',
            'mapPage.site.capeCoast.stopDescription': 'Le point où les Africains réduits en esclavage étaient embarqués de force sur des navires.',
            'mapPage.site.manhyia.name': 'Palais Manhyia',
            'mapPage.site.manhyia.location': 'Kumasi, Région d’Ashanti',
            'mapPage.site.manhyia.shortLocation': 'Kumasi',
            'mapPage.site.manhyia.category': 'Palais',
            'mapPage.site.manhyia.description': 'Siège de l’Asantehene et du royaume ashanti, où la tradition royale rencontre la gouvernance actuelle.',
            'mapPage.site.manhyia.stopTitle': 'Cour royale',
            'mapPage.site.manhyia.stopDescription': 'Découvrez comment l’Asantehene et ses conseillers royaux ont façonné la vie politique et l’identité culturelle.',
            'mapPage.site.osu.name': 'Château d’Osu',
            'mapPage.site.osu.location': 'Osu, Région du Grand Accra',
            'mapPage.site.osu.shortLocation': 'Osu, Accra',
            'mapPage.site.osu.category': 'Château',
            'mapPage.site.osu.description': 'Ancien siège du gouvernement sur la côte d’Accra, marqué par une histoire coloniale et postérieure à l’indépendance.',
            'mapPage.site.osu.stopTitle': 'Approche du château',
            'mapPage.site.osu.stopDescription': 'Observez le littoral et comprenez pourquoi la forteresse dominait le paysage urbain.',
            'mapPage.site.independence.name': 'Arc de l’Indépendance',
            'mapPage.site.independence.location': 'Accra, Région du Grand Accra',
            'mapPage.site.independence.shortLocation': 'Accra',
            'mapPage.site.independence.category': 'Monument',
            'mapPage.site.independence.description': 'Pièce maîtresse de la place de l’Indépendance, commémorant l’indépendance du Ghana en 1957 et son rôle pionnier en Afrique subsaharienne.',
            'mapPage.site.independence.stopTitle': 'Arc de l’Indépendance',
            'mapPage.site.independence.stopDescription': 'Symbole de la fierté nationale du Ghana et de la mémoire publique de 1957.',
            'mapPage.site.kwameNkrumah.name': 'Parc mémorial Kwame Nkrumah',
            'mapPage.site.kwameNkrumah.location': 'Accra, Région du Grand Accra',
            'mapPage.site.kwameNkrumah.shortLocation': 'Accra',
            'mapPage.site.kwameNkrumah.category': 'Musée',
            'mapPage.site.kwameNkrumah.description': 'Dernier lieu de repos et musée dédiés au premier président du Ghana et grande figure du panafricanisme.',
            'mapPage.site.kwameNkrumah.stopTitle': 'Jardin du souvenir',
            'mapPage.site.kwameNkrumah.stopDescription': 'Découvrez comment le mémorial transforme la mémoire en un espace public de réflexion et d’hommage.'
        },
        es: {
            'language.label': 'Idioma',
            'nav.home': 'Inicio',
            'nav.about': 'Nosotros',
            'nav.explore': 'Explorar',
            'nav.map': 'Mapa',
            'nav.passport': 'Pasaporte',
            'nav.login': 'Iniciar sesión',
            'nav.signup': 'Registrarse',
            'nav.search': 'Buscar',
            'nav.notifications': 'Notificaciones',
            'nav.learn': 'Aprender',
            'nav.preserve': 'Preservar',
            'site.tagline': 'Tejiendo las historias de Ghana en la era digital',
            'site.taglineAlt': 'Nuestras historias. Nuestro patrimonio. Tu viaje.',
            'common.viewAll': 'Ver todo',
            'common.viewDetails': 'Ver detalles',
            'common.startExploring': 'Comenzar a explorar',
            'common.filterSearch': 'Filtrar y buscar',
            'common.resetFilters': 'Restablecer filtros',
            'common.mapView': 'Vista del mapa',
            'common.listView': 'Vista de lista',
            'common.historical': 'Histórico',
            'common.monument': 'Monumento',
            'common.cultural': 'Cultural',
            'common.museum': 'Museo',
            'common.centralRegion': 'Región Central',
            'common.accra': 'Acra',
            'common.kumasi': 'Kumasi',
            'common.moreThanWebsite': 'MÁS QUE UN SITIO WEB',
            'common.discoverLearnStory': 'Descubrir • Aprender • Ser parte de la historia',
            'common.online': 'En línea',
            'common.clearChat': 'Borrar chat',
            'common.justNow': 'Ahora mismo',
            'common.typeMessage': 'Escribe tu mensaje...',
            'common.searchingAnanse': 'Buscando en Ananse para: "{{query}}"',
            'home.heroBadge': 'BIENVENIDO A ANANSE',
            'home.heroTitle': 'Tejiendo las historias de Ghana en la era digital',
            'home.heroDescription': 'Explora nuestro rico patrimonio, descubre historias ocultas y experimenta la cultura de Ghana como nunca antes.',
            'home.heroQuote': '<span>Las mismas historias.</span><br><em>Nuevas formas de explorar.</em>',
            'home.featureDiscover': 'Descubrir',
            'home.featureDiscoverText': 'Encuentra sitios patrimoniales en todo Ghana',
            'home.featureExplore': 'Explorar',
            'home.featureExploreText': 'Aprende sobre historia, cultura y personas',
            'home.featureScan': 'Escanear',
            'home.featureScanText': 'Desbloquea historias con experiencias QR',
            'home.featureAskNaa': 'Preguntar a Naa',
            'home.featureAskNaaText': 'Obtén respuestas de nuestra guía con IA',
            'home.featurePassport': 'Obtén tu pasaporte',
            'home.featurePassportText': 'Visita, aprende y recoge insignias',
            'home.featureBadges': 'Ganar insignias',
            'home.featureBadgesText': 'Celebra tu recorrido',
            'home.featuredSitesTitle': 'Sitios patrimoniales destacados',
            'home.featuredSitesSubtitle': 'Explora algunos de los monumentos más icónicos y culturalmente significativos de Ghana.',
            'home.ctaTitle': 'Un viaje a través del patrimonio de Ghana',
            'home.ctaBullets': 'Descubrir • Aprender • Ser parte de la historia',
            'home.ctaButton': 'Comenzar a explorar',
            'home.siteCapeCoast': 'Castillo de Cape Coast',
            'home.siteIndependenceArch': 'Arco de la Independencia',
            'home.siteKwameNkrumah': 'Parque conmemorativo Kwame Nkrumah',
            'home.siteManhyia': 'Palacio Manhyia',
            'home.siteOsuCastle': 'Castillo de Osu',
            'home.siteElminaCastle': 'Castillo de Elmina',
            'home.siteNationalMuseum': 'Museo Nacional de Ghana',
            'home.featuredCapeCoastCategory': 'Monumento histórico',
            'home.featuredCapeCoastDescription': 'Explora uno de los monumentos históricos más importantes de Ghana y aprende sobre su papel en la historia del comercio transatlántico de esclavos.',
            'home.featuredCapeCoastAlt': 'Castillo de Cape Coast en Ghana',
            'home.featuredCapeCoastLocation': 'Región Central',
            'home.featuredIndependenceArchCategory': 'Monumento histórico',
            'home.featuredIndependenceArchDescription': 'Descubre uno de los símbolos nacionales de la independencia de Ghana, ubicado en el corazón de Accra, en la Plaza de la Independencia.',
            'home.featuredIndependenceArchAlt': 'Arco de la Independencia en Accra, Ghana',
            'home.featuredIndependenceArchLocation': 'Acra',
            'home.featuredKwameNkrumahCategory': 'Memorial / Sitio histórico',
            'home.featuredKwameNkrumahDescription': 'Visita el memorial dedicado al primer presidente de Ghana y descubre el papel de Kwame Nkrumah en la independencia y la historia de Ghana.',
            'home.featuredKwameNkrumahAlt': 'Parque conmemorativo Kwame Nkrumah en Accra, Ghana',
            'home.featuredKwameNkrumahLocation': 'Acra',
            'home.featuredManhyiaCategory': 'Sitio cultural / histórico',
            'home.featuredManhyiaDescription': 'Descubre la historia y el patrimonio del Reino Asante a través del Palacio de Manhyia y sus colecciones culturales.',
            'home.featuredManhyiaAlt': 'Palacio de Manhyia en Kumasi, Ghana',
            'home.featuredManhyiaLocation': 'Kumasi',
            'home.featuredOsuCategory': 'Monumento histórico',
            'home.featuredOsuDescription': 'Explora el Castillo de Osu, también conocido como Castillo de Christiansborg, un monumento histórico costero en Accra con un papel importante en la historia política y colonial de Ghana.',
            'home.featuredOsuAlt': 'Castillo de Osu en Accra, Ghana',
            'home.featuredOsuLocation': 'Acra',
            login: {
                badge: '— BIENVENIDO A ANANSE',
                heroTitle: 'Explorar. Aprender. Preservar.',
                heroDescription: 'Inicia sesión para continuar tu viaje a través del rico patrimonio, la cultura y las historias ocultas de Ghana.',
                featureDiscover: 'Descubrir',
                featureDiscoverText: 'sitios patrimoniales',
                featureLearn: 'Aprender',
                featureLearnText: 'historias asombrosas',
                featureEarn: 'Ganar',
                featureEarnText: 'insignias',
                heroQuote: 'Nuestro patrimonio vive en ti.',
                welcomeBack: 'Bienvenido de nuevo',
                subtext: 'Inicia sesión para continuar tu viaje con Ananse.',
                email: 'Correo electrónico',
                emailPlaceholder: 'Ingresa tu correo electrónico',
                password: 'Contraseña',
                passwordPlaceholder: 'Ingresa tu contraseña',
                remember: 'Recuérdame',
                forgot: '¿Olvidaste tu contraseña?',
                submit: 'Iniciar sesión',
                or: 'O',
                google: 'Continuar con Google',
                noAccount: '¿No tienes una cuenta?',
                signup: 'Registrarse',
                footerScript: 'Escanea hoy. Vive la experiencia para siempre.',
                formMissing: 'Por favor, introduce tanto tu correo electrónico como tu contraseña.',
                loggingIn: 'Iniciando sesión...',
                loginSuccess: '¡Bienvenido de nuevo a ANANSE!'
            },
            'about.sectionTitle': 'SOBRE ANANSE',
            'about.heroTitle': 'Más que una plataforma.<br><span>Es un movimiento.</span>',
            'about.heroDescription': 'ANANSE es una plataforma digital del patrimonio creada para dar vida a la rica historia, la cultura y la gente de Ghana, conectando el pasado, el presente y el futuro.',
            'about.heroMotto': 'Nuestro patrimonio. Nuestro orgullo. Nuestra historia.',
            'about.missionTitle': 'Nuestra misión',
            'about.missionText': 'Hacer que el patrimonio de Ghana sea accesible, atractivo e inolvidable mediante tecnología, narración y experiencias inmersivas.',
            'about.visionTitle': 'Nuestra visión',
            'about.visionText': 'Un mundo en el que todos puedan explorar, aprender y celebrar el patrimonio de Ghana en cualquier momento y lugar.',
            'about.valuesTitle': 'Nuestros valores',
            'about.valueCultural': 'Orgullo cultural',
            'about.valueInnovation': 'Innovación',
            'about.valueEducation': 'Educación',
            'about.valueInclusivity': 'Inclusión',
            'about.valueSustainability': 'Sostenibilidad',
            'about.quoteText': '“El patrimonio no es solo lo que heredamos, sino lo que transmitimos.”',
            'about.quoteAuthor': '— ANANSE',
            'about.techTitle': 'Nuestra tecnología',
            'about.techDescription': 'ANANSE combina tecnología moderna con narración tradicional para crear experiencias significativas e interactivas.',
            'about.learnMore': 'Más información',
            'about.frontend': 'Frontend',
            'about.backend': 'Backend',
            'about.database': 'Base de datos',
            'about.aiGuide': 'Guía de IA',
            'about.qrTechnology': 'Tecnología QR',
            'about.detailsBeautiful': 'Una experiencia de usuario hermosa y adaptable.',
            'about.detailsPowering': 'Impulsando la plataforma y sus funciones.',
            'about.detailsSecurely': 'Almacena de forma segura los datos patrimoniales y el progreso del usuario.',
            'about.detailsAssistant': 'Tu asistente cultural inteligente.',
            'about.detailsStories': 'Convierte lugares físicos en historias digitales.',
            'about.bannerTitle': 'Preservando<br>el patrimonio de Ghana<br>para las generaciones',
            'about.teamTitle': 'El equipo detrás de ANANSE',
            'about.teamDescription': 'Somos un equipo apasionado de diseñadores, desarrolladores, narradores y amantes de la cultura dedicados a construir una plataforma que celebre el patrimonio de Ghana e inspire a las generaciones futuras.',
            'about.roleDesign': 'Diseño',
            'about.roleDevelopment': 'Desarrollo',
            'about.roleContent': 'Contenido',
            'about.roleCommunity': 'Comunidad',
            'about.journeyTitle': 'Sé parte del viaje',
            'about.journeyText': 'Ya seas un viajero curioso, un ghanés orgulloso o un amante de la cultura, ANANSE es para ti.',
            'about.exploreNow': 'Explorar ahora',
                        // ---- Explore page ----
            'explorePage.pageTitle': 'Explorar el patrimonio de Ghana — ANANSE',
            'explorePage.heroTitle': 'Explora el <span class="hl">patrimonio</span> de Ghana',
            'explorePage.heroLead': 'Descubre los lugares, las personas, las historias y los eventos que han moldeado la historia y la identidad de Ghana.',
            'explorePage.searchLabel': 'Buscar sitios patrimoniales',
            'explorePage.searchPlaceholder': 'Buscar sitios patrimoniales…',
            'explorePage.journeyDiscover': 'Descubrir',
            'explorePage.journeyDiscoverText': 'Encuentra un lugar patrimonial.',
            'explorePage.journeyLearn': 'Aprender',
            'explorePage.journeyLearnText': 'Lee su historia.',
            'explorePage.journeyAsk': 'Preguntar a Naa',
            'explorePage.journeyAskText': 'Pon a prueba lo que aprendiste.',
            'explorePage.journeyBadge': 'Ganar una insignia',
            'explorePage.journeyBadgeText': 'Consigue tu logro.',
            'explorePage.filterByCategory': 'Filtrar por categoría',
            'explorePage.filterAll': 'Todos',
            'explorePage.categoryHistorical': 'Sitios históricos',
            'explorePage.categoryMonuments': 'Monumentos',
            'explorePage.categoryPalaces': 'Palacios',
            'explorePage.regionLabel': 'Explorar por región',
            'explorePage.regionAll': 'Todas las regiones',
            'explorePage.regionGreaterAccra': 'Gran Acra',
            'explorePage.regionAshanti': 'Ashanti',
            'explorePage.regionCentral': 'Central',
            'explorePage.showing': 'Mostrando',
            'explorePage.siteSingular': 'sitio patrimonial',
            'explorePage.sitePlural': 'sitios patrimoniales',
            'explorePage.noResultsTitle': 'Ningún sitio patrimonial coincide con tus filtros',
            'explorePage.noResultsText': 'Prueba a borrar la búsqueda, elegir la categoría «Todos» o seleccionar otra región.',
            'explorePage.noMuseumsTitle': 'Aún no hay sitios patrimoniales en esta categoría.',
            'explorePage.noMuseumsText': 'Seguimos investigando los museos de Ghana para Ananse — vuelve pronto.',
            'explorePage.learnStory': 'Conocer la historia',
            'explorePage.listenStory': 'Escuchar la historia',
            'explorePage.audioSoon': 'Vista previa de audio próximamente',
            'explorePage.aboutSite': 'Acerca de este sitio',
            'explorePage.didYouKnow': '¿Sabías que…?',
            'explorePage.close': 'Cerrar',
            'explorePage.modalLabel': 'Detalles del sitio patrimonial',
            'explorePage.openDetails': 'Abrir detalles de {{name}}',
            'explorePage.saveFavourite': 'Guardar {{name}} en favoritos',
            'explorePage.trustedTitle': 'Información patrimonial confiable',
            'explorePage.trustedNote': 'Las historias y la información patrimonial de Ananse se investigan cuidadosamente a partir de fuentes confiables, entre ellas:',
            'explorePage.footerRights': '© 2026 ANANSE. Todos los derechos reservados.',
            'explorePage.site.capeCoast.name': 'Castillo de Cape Coast',
            'explorePage.site.capeCoast.location': 'Cape Coast, Región Central',
            'explorePage.site.capeCoast.description': 'Explora el castillo de Cape Coast y descubre poderosos relatos sobre la historia de Ghana, su resiliencia, el comercio transatlántico de esclavos y el camino hacia la libertad.',
            'explorePage.site.capeCoast.didYouKnow': 'El castillo de Cape Coast es uno de los principales castillos históricos de la costa de Ghana y un lugar importante para conocer el comercio transatlántico de esclavos y la historia de Ghana.',
            'explorePage.site.manhyia.name': 'Palacio de Manhyia',
            'explorePage.site.manhyia.location': 'Kumasi, Región Ashanti',
            'explorePage.site.manhyia.description': 'Descubre la historia, la cultura y las tradiciones del Reino Asante a través de la historia del Palacio de Manhyia.',
            'explorePage.site.manhyia.didYouKnow': 'El Palacio de Manhyia está estrechamente ligado a la historia, la cultura y las tradiciones del Reino Asante.',
            'explorePage.site.osu.name': 'Castillo de Osu',
            'explorePage.site.osu.location': 'Osu, Región del Gran Acra',
            'explorePage.site.osu.description': 'Explora el Castillo de Osu y descubre su lugar en la historia costera, colonial y política de Ghana.',
            'explorePage.site.osu.didYouKnow': 'El Castillo de Osu, conocido históricamente como Castillo de Christiansborg, se encuentra en la costa de Ghana, en Osu, Acra.',
            'explorePage.site.independence.name': 'Plaza de la Independencia',
            'explorePage.site.independence.location': 'Acra, Región del Gran Acra',
            'explorePage.site.independence.description': 'Descubre el corazón simbólico de la independencia de Ghana y la historia nacional que representa la Plaza de la Independencia.',
            'explorePage.site.independence.didYouKnow': 'La Plaza de la Independencia, también conocida como Black Star Square, es uno de los principales monumentos nacionales de Ghana.',
            'explorePage.site.kwameNkrumah.name': 'Parque conmemorativo Kwame Nkrumah',
            'explorePage.site.kwameNkrumah.location': 'Acra, Región del Gran Acra',
            'explorePage.site.kwameNkrumah.description': 'Descubre el legado del Dr. Kwame Nkrumah y la historia de la independencia de Ghana en el Parque conmemorativo Kwame Nkrumah.',
            'explorePage.site.kwameNkrumah.didYouKnow': 'El parque conmemorativo está dedicado al primer Primer Ministro y Presidente de Ghana, el Dr. Kwame Nkrumah.',
            'ai.badge': 'Naa',
            'ai.title': 'Tu guía de patrimonio con IA',
            'ai.subtitle': 'Haz preguntas, consigue respuestas instantáneas, descubre la historia, la cultura y los tesoros ocultos de Ghana — todo en un solo lugar.',
            'ai.greeting': '¡Hola! Soy Naa. ¿Cómo puedo ayudarte a explorar Ghana hoy?',
            'ai.suggestedQuestions': 'Preguntas sugeridas',
            'ai.questionCapeCoast': 'Cuéntame sobre el castillo de Cape Coast.',
            'ai.questionAshanti': '¿Cuál es la historia del Imperio Ashanti?',
            'ai.questionAccra': '¿Qué sitios patrimoniales hay cerca de Acra?',
            'ai.questionEvents': '¿Qué eventos culturales hay en Ghana?',
            'ai.questionPassport': '¿Cómo puedo ganar insignias en el pasaporte cultural?',
            'ai.questionTrip': '¿Puedes recomendar un viaje patrimonial de un día?',
            'ai.quote': '“Pregunta por nuestro pasado, planifica nuestro presente, sé parte de nuestro futuro.”',
            'ai.online': 'En línea',
            'ai.defaultWelcome': '¡Hola! Soy Naa, tu guía de patrimonio con IA. Estoy aquí para ayudarte a aprender sobre la historia de Ghana, explorar impresionantes sitios patrimoniales y descubrir nuestra cultura. ¿Qué te gustaría explorar hoy? 👋',
            'ai.thinking': 'Naa está pensando...',
            'ai.noResponse': 'Lo siento, no pude obtener una respuesta en este momento. Inténtalo de nuevo.',
            'ai.connectionError': 'Lo siento, estoy teniendo problemas para conectarme en este momento. Inténtalo de nuevo.',
            'ai.recordsUnavailable': 'Lo siento, Naa no puede acceder ahora mismo a los registros patrimoniales de ANANSE. Inténtalo de nuevo en unos minutos.',
            'ai.smartFriendly': 'Inteligente. Amigable. Siempre aquí.',
            'ai.instantAnswers': 'Respuestas instantáneas',
            'ai.siteInformation': 'Información del sitio',
            'ai.culturalFacts': 'Hechos culturales',
            'ai.travelTips': 'Consejos de viaje',
            'ai.languageSupport': 'Soporte de idioma',
            'ai.chatPrompt': 'Habla con Naa y aprovecha al máximo tu viaje.',
            'ai.footerTagline': 'Nuestras historias. Nuestro patrimonio. Tu viaje.',
            'ai.chatPlaceHolder': 'Escribe tu mensaje...',
            'ai.attachFile': 'Adjuntar archivo',
            'ai.sendMessage': 'Enviar',
            'common.languageSelect': 'Seleccionar idioma del sitio',
            'common.searching': 'Buscando en Ananse para: "{{query}}"',
            'common.errorNoResponse': 'No hay respuesta disponible en este momento.',
            'mapPage.pageTitle': 'Ananse - Explora el patrimonio de Ghana',
            'mapPage.toggleNavigation': 'Abrir o cerrar el menú de navegación',
            'mapPage.viewAllStopsDefault': 'Ver las 3 paradas',
            'mapPage.heroTitle': 'Explora el patrimonio de Ghana',
            'mapPage.heroDescription': 'Descubre lugares históricos, recorre rutas patrimoniales y vive las historias de Ghana.',
            'mapPage.searchLabel': 'Buscar un sitio patrimonial',
            'mapPage.searchPlaceholder': 'Buscar un sitio patrimonial...',
            'mapPage.filterAll': 'Todos',
            'mapPage.filterCastles': 'Castillos',
            'mapPage.filterPalaces': 'Palacios',
            'mapPage.filterMonuments': 'Monumentos',
            'mapPage.filterMuseums': 'Museos',
            'mapPage.zoomIn': 'Acercar',
            'mapPage.zoomOut': 'Alejar',
            'mapPage.locateMe': 'Encontrar mi ubicación',
            'mapPage.closeDetails': 'Cerrar detalles',
            'mapPage.heritageSite': 'Sitio patrimonial',
            'mapPage.btnDirections': 'Cómo llegar',
            'mapPage.btnBook': 'Reservar visita',
            'mapPage.btnExplore': 'Explorar sitio',
            'mapPage.btnViewTrail': 'Ver ruta patrimonial',
            'mapPage.myPlans': 'Mis planes',
            'mapPage.travelEstimateLabel': 'Tiempo estimado desde tu ubicación',
            'mapPage.travelTimeHours': '{{hours}} h {{minutes}} min',
            'mapPage.travelTimeMinutes': '{{minutes}} min',
            'mapPage.travelDistance': '({{distance}} km)',
            'mapPage.trailHighlightsHeading': 'Lo más destacado de la ruta patrimonial',
            'mapPage.viewAllStops': 'Ver las {{count}} paradas',
            'mapPage.featuredTitle': 'Sitios patrimoniales destacados',
            'mapPage.viewAllSites': 'Ver todos los sitios',
            'mapPage.promoTitle': 'Planifica tu próxima aventura patrimonial',
            'mapPage.promoDescription': 'La historia está más cerca de lo que crees.',
            'mapPage.planTrip': 'Planifica tu viaje',
            'mapPage.categoryHistorical': 'Monumento histórico',
            'mapPage.categoryPalace': 'Palacio',
            'mapPage.categoryCastle': 'Castillo',
            'mapPage.categoryMonument': 'Monumento',
            'mapPage.categoryMuseum': 'Museo',
            'mapPage.mapUnavailable': 'Vista previa del mapa no disponible. Añade un token de Mapbox para activar el mapa.',
            'mapPage.geoUnsupported': 'Tu navegador no admite servicios de ubicación.',
            'mapPage.geoDenied': 'No pudimos acceder a tu ubicación. Puedes seguir explorando el mapa.',
            'mapPage.site.capeCoast.name': 'Castillo de Cape Coast',
            'mapPage.site.capeCoast.location': 'Cape Coast, Región Central',
            'mapPage.site.capeCoast.shortLocation': 'Cape Coast',
            'mapPage.site.capeCoast.category': 'Monumento histórico',
            'mapPage.site.capeCoast.description': 'Explora el castillo y descubre las poderosas historias del comercio transatlántico de esclavos, la resiliencia y la libertad.',
            'mapPage.site.capeCoast.stopTitle': 'Puerta del No Retorno',
            'mapPage.site.capeCoast.stopDescription': 'El lugar donde los africanos esclavizados fueron obligados a subir a los barcos.',
            'mapPage.site.manhyia.name': 'Palacio Manhyia',
            'mapPage.site.manhyia.location': 'Kumasi, Región de Ashanti',
            'mapPage.site.manhyia.shortLocation': 'Kumasi',
            'mapPage.site.manhyia.category': 'Palacio',
            'mapPage.site.manhyia.description': 'Sede del Asantehene y del Reino Ashanti, donde la tradición real se une al gobierno ashanti actual.',
            'mapPage.site.manhyia.stopTitle': 'Corte real',
            'mapPage.site.manhyia.stopDescription': 'Descubre cómo el Asantehene y sus consejeros reales dieron forma a la vida política y la identidad cultural.',
            'mapPage.site.osu.name': 'Castillo de Osu',
            'mapPage.site.osu.location': 'Osu, Región del Gran Accra',
            'mapPage.site.osu.shortLocation': 'Osu, Acra',
            'mapPage.site.osu.category': 'Castillo',
            'mapPage.site.osu.description': 'Antigua sede del gobierno en la costa de Acra, con una historia colonial y posterior a la independencia.',
            'mapPage.site.osu.stopTitle': 'Acceso al castillo',
            'mapPage.site.osu.stopDescription': 'Contempla el entorno costero y descubre por qué la fortaleza dominaba el paisaje urbano.',
            'mapPage.site.independence.name': 'Arco de la Independencia',
            'mapPage.site.independence.location': 'Acra, Región del Gran Accra',
            'mapPage.site.independence.shortLocation': 'Acra',
            'mapPage.site.independence.category': 'Monumento',
            'mapPage.site.independence.description': 'Pieza central de la Plaza de la Independencia, que conmemora la independencia de Ghana en 1957 y su papel pionero en el África subsahariana.',
            'mapPage.site.independence.stopTitle': 'Arco de la Independencia',
            'mapPage.site.independence.stopDescription': 'Símbolo del orgullo nacional de Ghana y de la memoria pública de 1957.',
            'mapPage.site.kwameNkrumah.name': 'Parque Conmemorativo Kwame Nkrumah',
            'mapPage.site.kwameNkrumah.location': 'Acra, Región del Gran Accra',
            'mapPage.site.kwameNkrumah.shortLocation': 'Acra',
            'mapPage.site.kwameNkrumah.category': 'Museo',
            'mapPage.site.kwameNkrumah.description': 'Lugar de descanso final y museo dedicado al primer presidente de Ghana y figura destacada del panafricanismo.',
            'mapPage.site.kwameNkrumah.stopTitle': 'Jardín del recuerdo',
            'mapPage.site.kwameNkrumah.stopDescription': 'Descubre cómo el memorial convierte la memoria en un espacio público de reflexión y homenaje.'
        }
    };

    const trailPageTranslations = {
        en: {
            'page.title': 'Heritage Trails — ANANSE',
            'page.description': "Explore Ghana's heritage trails and earn a badge by completing a route through the country's most important historical sites.",
            'nav.main': 'Main navigation',
            'nav.homeAria': 'ANANSE home',
            'nav.menu': 'Toggle navigation menu',
            'footer.copyright': '© 2026 ANANSE. All rights reserved.',
            'footer.tagline': "Weaving Ghana's Story into the Digital Age",
            'nav.backToMap': 'Back to map',
            'hero.defaultEyebrow': 'Heritage route',
            'hero.defaultTitle': 'Heritage Trail',
            'hero.defaultDescription': 'Follow a guided route through Ghana’s most meaningful historical places and earn a badge when you complete the journey.',
            'meta.stops': '{{count}} stops',
            'meta.acrossGhana': 'Across Ghana',
            'actions.completeTrail': 'Complete trail',
            'actions.trailComplete': 'Trail complete',
            'actions.viewPassport': 'View Passport',
            'progress.title': 'Trail progress',
            'progress.visited': '{{done}} / {{total}} stops visited',
            'summary.title': 'Why this route matters',
            'status.title': 'Trail status',
            'status.start': 'Start by checking off each stop as you learn about it.',
            'status.complete': 'Trail complete — the badge for this route is now in your passport.',
            'actions.resetTrail': 'Reset trail',
            'trails.available': 'Available heritage trails',
            'actions.openRoute': 'Open route',
            'actions.markVisited': 'Mark visited',
            'actions.visited': 'Visited',
            'toast.complete': 'Trail complete! Your badge has been unlocked.',
            'toast.reset': 'Trail progress reset.',
            'trail.cape-coast-castle': {
                title: 'Cape Coast journey',
                eyebrow: 'Coastal heritage route',
                region: 'Central Region',
                description: 'Trace the memory of Cape Coast Castle and the wider story of resilience, migration and freedom along Ghana’s Atlantic coast.',
                highlights: [
                    'Learn how the coast shaped trade, migration and resistance.',
                    'Connect the story of the transatlantic slave trade to modern Ghana.',
                    'Finish the route with a deeper understanding of memory and healing.'
                ],
                badge: { label: 'Castle Explorer', title: 'Cape Coast Castle' },
                stops: {
                    'door-of-no-return': {
                        name: 'Door of No Return',
                        blurb: 'The point where enslaved Africans were forced onto ships and sent across the Atlantic.',
                        tag: 'Historic landmark'
                    },
                    'castle-grounds': {
                        name: 'Castle grounds',
                        blurb: 'Walk the spaces once used for trade, governance and the enforcement of colonial power.',
                        tag: 'Tour stop'
                    },
                    'memory-and-healing': {
                        name: 'Memory and healing',
                        blurb: 'Reflect on how the site teaches resilience, remembrance and the importance of historical truth.',
                        tag: 'Reflection'
                    }
                }
            },
            'trail.manhyia-palace': {
                title: 'Royal Ashanti trail',
                eyebrow: 'Royal heritage route',
                region: 'Ashanti Region',
                description: 'Explore the living history of the Asante Kingdom through the palace, its traditions and the continuity of royal leadership.',
                highlights: [
                    'Discover the role of Manhyia Palace in Asante governance.',
                    'Understand how royal traditions continue to shape identity today.',
                    'See how history, ceremony and leadership are intertwined.'
                ],
                badge: { label: 'Royal Heritage', title: 'Manhyia Palace' },
                stops: {
                    'royal-court': {
                        name: 'Royal court',
                        blurb: 'Discover how the Asantehene and royal advisors shaped political life and cultural identity.',
                        tag: 'Leadership'
                    },
                    regalia: {
                        name: 'Court regalia',
                        blurb: 'Study the symbols, objects and garments that express Asante power, prestige and continuity.',
                        tag: 'Culture'
                    },
                    'living-tradition': {
                        name: 'Living tradition',
                        blurb: 'See how royal practices continue to provide meaning and community in modern Ashanti life.',
                        tag: 'Living heritage'
                    }
                }
            },
            'trail.osu-castle': {
                title: 'Osu coastal trail',
                eyebrow: 'Colonial and civic route',
                region: 'Greater Accra',
                description: 'Follow the story of Osu Castle from the colonial era to the present, and connect coastal history to national politics.',
                highlights: [
                    'Understand how the coast became central to power and governance.',
                    'Trace Ghana’s colonial and post-independence memory.',
                    'Place Accra’s institutions in a broader national story.'
                ],
                badge: { label: 'Coastal Heritage', title: 'Osu Castle' },
                stops: {
                    'castle-approach': {
                        name: 'Castle approach',
                        blurb: 'Take in the coastal setting and understand why the fortress dominated the cityscape.',
                        tag: 'Landscape'
                    },
                    'colonial-memory': {
                        name: 'Colonial memory',
                        blurb: 'Examine how power, administration and control were built through this strategic location.',
                        tag: 'History'
                    },
                    'national-shift': {
                        name: 'National shift',
                        blurb: 'Look at how the site changed after independence and what it means in the modern state.',
                        tag: 'Modern Ghana'
                    }
                }
            },
            'trail.independence-arch': {
                title: 'Independence route',
                eyebrow: 'National story route',
                region: 'Greater Accra',
                description: 'Move from the symbolism of Independence Square to the broader story of freedom, self-rule and national identity.',
                highlights: [
                    'See how the nation marks its independence in public space.',
                    'Connect the square to Ghana’s democratic identity.',
                    'Recognise how memory is shaped through architecture and ceremony.'
                ],
                badge: { label: 'Nation Builder', title: 'Independence Square' },
                stops: {
                    'independence-arch': {
                        name: 'Independence Arch',
                        blurb: 'The icon of Ghana’s national pride and public memory of 1957.',
                        tag: 'Symbol'
                    },
                    'national-space': {
                        name: 'National space',
                        blurb: 'Understand how public monuments turn historical values into collective identity.',
                        tag: 'Public memory'
                    },
                    'future-vision': {
                        name: 'Future vision',
                        blurb: 'Reflect on the meaning of independence as an ongoing commitment to nation-building.',
                        tag: 'Civic values'
                    }
                }
            },
            'trail.kwame-nkrumah': {
                title: 'Freedom and legacy route',
                eyebrow: 'Pan-African route',
                region: 'Greater Accra',
                description: 'Explore the memorial park as both a place of tribute and a living archive of Ghana’s independence movement and Pan-African dreams.',
                highlights: [
                    'Connect leadership, liberation and national memory.',
                    'Understand the role of Kwame Nkrumah in Ghana’s independence story.',
                    'Reflect on the politics of remembrance and legacy.'
                ],
                badge: { label: 'Freedom Fighter', title: 'Kwame Nkrumah Memorial' },
                stops: {
                    'tribute-garden': {
                        name: 'Tribute garden',
                        blurb: 'See how the memorial turns memory into a public space for reflection and honour.',
                        tag: 'Memorial'
                    },
                    'independence-story': {
                        name: 'Independence story',
                        blurb: 'Follow the political and cultural meaning of Ghana’s 1957 declaration of independence.',
                        tag: 'History'
                    },
                    'pan-african-legacy': {
                        name: 'Pan-African legacy',
                        blurb: 'Understand how the site connects Ghana to a wider African liberation story.',
                        tag: 'Legacy'
                    }
                }
            }
        },
        fr: {
            'page.title': 'Sentiers du patrimoine — ANANSE',
            'page.description': 'Explorez les sentiers du patrimoine du Ghana et gagnez un badge en parcourant ses principaux sites historiques.',
            'nav.main': 'Navigation principale',
            'nav.homeAria': 'Accueil ANANSE',
            'nav.menu': 'Ouvrir ou fermer le menu de navigation',
            'footer.copyright': '© 2026 ANANSE. Tous droits réservés.',
            'footer.tagline': 'Tisser les récits du Ghana à l’ère numérique',
            'nav.backToMap': 'Retour à la carte',
            'hero.defaultEyebrow': 'Itinéraire patrimonial',
            'hero.defaultTitle': 'Sentier du patrimoine',
            'hero.defaultDescription': 'Suivez un itinéraire guidé à travers les lieux historiques les plus importants du Ghana et gagnez un badge en terminant le parcours.',
            'meta.stops': '{{count}} étapes',
            'meta.acrossGhana': 'À travers le Ghana',
            'actions.completeTrail': 'Terminer le parcours',
            'actions.trailComplete': 'Parcours terminé',
            'actions.viewPassport': 'Voir le passeport',
            'progress.title': 'Progression du parcours',
            'progress.visited': '{{done}} / {{total}} étapes visitées',
            'summary.title': 'L’importance de cet itinéraire',
            'status.title': 'État du parcours',
            'status.start': 'Cochez chaque étape au fur et à mesure de vos découvertes.',
            'status.complete': 'Parcours terminé — le badge correspondant est maintenant dans votre passeport.',
            'actions.resetTrail': 'Réinitialiser le parcours',
            'trails.available': 'Sentiers patrimoniaux disponibles',
            'actions.openRoute': 'Voir le parcours',
            'actions.markVisited': 'Marquer comme visité',
            'actions.visited': 'Visité',
            'toast.complete': 'Parcours terminé ! Votre badge a été débloqué.',
            'toast.reset': 'La progression du parcours a été réinitialisée.',
            'trail.cape-coast-castle': {
                title: 'Voyage à Cape Coast',
                eyebrow: 'Itinéraire du patrimoine côtier',
                region: 'Région Centrale',
                description: 'Retracez la mémoire du château de Cape Coast et l’histoire plus vaste de la résilience, des migrations et de la liberté sur la côte atlantique du Ghana.',
                highlights: [
                    'Découvrez comment la côte a façonné le commerce, les migrations et la résistance.',
                    'Reliez l’histoire de la traite transatlantique des esclaves au Ghana moderne.',
                    'Terminez le parcours avec une compréhension plus profonde de la mémoire et de la guérison.'
                ],
                badge: { label: 'Explorateur du château', title: 'Château de Cape Coast' },
                stops: {
                    'door-of-no-return': {
                        name: 'Porte du non-retour',
                        blurb: 'Le lieu où des Africains réduits en esclavage étaient embarqués de force sur des navires à destination de l’autre côté de l’Atlantique.',
                        tag: 'Lieu historique'
                    },
                    'castle-grounds': {
                        name: 'Enceinte du château',
                        blurb: 'Parcourez les espaces autrefois utilisés pour le commerce, le gouvernement et l’exercice du pouvoir colonial.',
                        tag: 'Étape de visite'
                    },
                    'memory-and-healing': {
                        name: 'Mémoire et guérison',
                        blurb: 'Réfléchissez à la manière dont ce lieu transmet la résilience, le souvenir et l’importance de la vérité historique.',
                        tag: 'Réflexion'
                    }
                }
            },
            'trail.manhyia-palace': {
                title: 'Sentier royal ashanti',
                eyebrow: 'Itinéraire du patrimoine royal',
                region: 'Région Ashanti',
                description: 'Explorez l’histoire vivante du royaume Asante à travers le palais, ses traditions et la continuité de la direction royale.',
                highlights: [
                    'Découvrez le rôle du palais de Manhyia dans la gouvernance asante.',
                    'Comprenez comment les traditions royales continuent de façonner l’identité actuelle.',
                    'Voyez comment l’histoire, les cérémonies et le pouvoir sont liés.'
                ],
                badge: { label: 'Patrimoine royal', title: 'Palais de Manhyia' },
                stops: {
                    'royal-court': {
                        name: 'Cour royale',
                        blurb: 'Découvrez comment l’Asantehene et ses conseillers royaux ont façonné la vie politique et l’identité culturelle.',
                        tag: 'Direction'
                    },
                    regalia: {
                        name: 'Insignes de la cour',
                        blurb: 'Étudiez les symboles, les objets et les vêtements qui expriment le pouvoir, le prestige et la continuité asante.',
                        tag: 'Culture'
                    },
                    'living-tradition': {
                        name: 'Tradition vivante',
                        blurb: 'Découvrez comment les pratiques royales continuent de donner du sens et de renforcer la communauté ashanti moderne.',
                        tag: 'Patrimoine vivant'
                    }
                }
            },
            'trail.osu-castle': {
                title: 'Sentier côtier d’Osu',
                eyebrow: 'Itinéraire colonial et civique',
                region: 'Grand Accra',
                description: 'Suivez l’histoire du château d’Osu, de l’époque coloniale à nos jours, et reliez l’histoire côtière à la politique nationale.',
                highlights: [
                    'Comprenez comment la côte est devenue un centre de pouvoir et de gouvernance.',
                    'Retracez la mémoire coloniale et postindépendance du Ghana.',
                    'Replacez les institutions d’Accra dans une histoire nationale plus vaste.'
                ],
                badge: { label: 'Patrimoine côtier', title: 'Château d’Osu' },
                stops: {
                    'castle-approach': {
                        name: 'Abords du château',
                        blurb: 'Observez le cadre côtier et comprenez pourquoi la forteresse dominait le paysage urbain.',
                        tag: 'Paysage'
                    },
                    'colonial-memory': {
                        name: 'Mémoire coloniale',
                        blurb: 'Examinez comment le pouvoir, l’administration et le contrôle se sont établis dans ce lieu stratégique.',
                        tag: 'Histoire'
                    },
                    'national-shift': {
                        name: 'Transition nationale',
                        blurb: 'Découvrez les changements du site après l’indépendance et sa signification dans l’État moderne.',
                        tag: 'Ghana moderne'
                    }
                }
            },
            'trail.independence-arch': {
                title: 'Itinéraire de l’indépendance',
                eyebrow: 'Itinéraire du récit national',
                region: 'Grand Accra',
                description: 'Partez des symboles de la place de l’Indépendance pour découvrir l’histoire plus vaste de la liberté, de l’autonomie et de l’identité nationale.',
                highlights: [
                    'Découvrez comment la nation célèbre son indépendance dans l’espace public.',
                    'Reliez la place à l’identité démocratique du Ghana.',
                    'Comprenez comment l’architecture et les cérémonies façonnent la mémoire.'
                ],
                badge: { label: 'Bâtisseur de la nation', title: 'Place de l’Indépendance' },
                stops: {
                    'independence-arch': {
                        name: 'Arc de l’Indépendance',
                        blurb: 'Symbole de la fierté nationale ghanéenne et de la mémoire collective de 1957.',
                        tag: 'Symbole'
                    },
                    'national-space': {
                        name: 'Espace national',
                        blurb: 'Comprenez comment les monuments publics transforment les valeurs historiques en identité collective.',
                        tag: 'Mémoire publique'
                    },
                    'future-vision': {
                        name: 'Vision d’avenir',
                        blurb: 'Réfléchissez au sens de l’indépendance comme engagement continu envers la construction nationale.',
                        tag: 'Valeurs civiques'
                    }
                }
            },
            'trail.kwame-nkrumah': {
                title: 'Itinéraire de la liberté et de l’héritage',
                eyebrow: 'Itinéraire panafricain',
                region: 'Grand Accra',
                description: 'Explorez le parc commémoratif, à la fois lieu d’hommage et archive vivante du mouvement indépendantiste du Ghana et des rêves panafricains.',
                highlights: [
                    'Reliez le leadership, la libération et la mémoire nationale.',
                    'Comprenez le rôle de Kwame Nkrumah dans l’histoire de l’indépendance du Ghana.',
                    'Réfléchissez aux enjeux de la mémoire et de l’héritage.'
                ],
                badge: { label: 'Combattant de la liberté', title: 'Mémorial Kwame Nkrumah' },
                stops: {
                    'tribute-garden': {
                        name: 'Jardin du souvenir',
                        blurb: 'Découvrez comment le mémorial fait de la mémoire un espace public de réflexion et d’hommage.',
                        tag: 'Mémorial'
                    },
                    'independence-story': {
                        name: 'Histoire de l’indépendance',
                        blurb: 'Explorez la portée politique et culturelle de la déclaration d’indépendance du Ghana en 1957.',
                        tag: 'Histoire'
                    },
                    'pan-african-legacy': {
                        name: 'Héritage panafricain',
                        blurb: 'Comprenez comment ce lieu relie le Ghana à une histoire plus vaste de libération africaine.',
                        tag: 'Héritage'
                    }
                }
            }
        },
        es: {
            'page.title': 'Rutas del patrimonio — ANANSE',
            'page.description': 'Explora las rutas patrimoniales de Ghana y gana una insignia al completar un recorrido por sus principales lugares históricos.',
            'nav.main': 'Navegación principal',
            'nav.homeAria': 'Inicio de ANANSE',
            'nav.menu': 'Mostrar u ocultar el menú de navegación',
            'footer.copyright': '© 2026 ANANSE. Todos los derechos reservados.',
            'footer.tagline': 'Tejiendo las historias de Ghana en la era digital',
            'nav.backToMap': 'Volver al mapa',
            'hero.defaultEyebrow': 'Ruta patrimonial',
            'hero.defaultTitle': 'Ruta del patrimonio',
            'hero.defaultDescription': 'Sigue una ruta guiada por los lugares históricos más importantes de Ghana y gana una insignia al completar el recorrido.',
            'meta.stops': '{{count}} paradas',
            'meta.acrossGhana': 'Por todo Ghana',
            'actions.completeTrail': 'Completar ruta',
            'actions.trailComplete': 'Ruta completada',
            'actions.viewPassport': 'Ver pasaporte',
            'progress.title': 'Progreso de la ruta',
            'progress.visited': '{{done}} / {{total}} paradas visitadas',
            'summary.title': 'Por qué importa esta ruta',
            'status.title': 'Estado de la ruta',
            'status.start': 'Marca cada parada a medida que la descubras.',
            'status.complete': 'Ruta completada: la insignia ya está en tu pasaporte.',
            'actions.resetTrail': 'Reiniciar ruta',
            'trails.available': 'Rutas patrimoniales disponibles',
            'actions.openRoute': 'Abrir ruta',
            'actions.markVisited': 'Marcar como visitado',
            'actions.visited': 'Visitado',
            'toast.complete': '¡Ruta completada! Has desbloqueado tu insignia.',
            'toast.reset': 'Se ha reiniciado el progreso de la ruta.',
            'trail.cape-coast-castle': {
                title: 'Recorrido por Cape Coast',
                eyebrow: 'Ruta del patrimonio costero',
                region: 'Región Central',
                description: 'Recorre la memoria del Castillo de Cape Coast y la historia más amplia de resiliencia, migración y libertad en la costa atlántica de Ghana.',
                highlights: [
                    'Descubre cómo la costa moldeó el comercio, la migración y la resistencia.',
                    'Conecta la historia del comercio transatlántico de esclavos con el Ghana actual.',
                    'Termina la ruta con una comprensión más profunda de la memoria y la sanación.'
                ],
                badge: { label: 'Explorador del castillo', title: 'Castillo de Cape Coast' },
                stops: {
                    'door-of-no-return': {
                        name: 'Puerta del No Retorno',
                        blurb: 'El lugar desde el que africanos esclavizados eran obligados a embarcarse rumbo al otro lado del Atlántico.',
                        tag: 'Monumento histórico'
                    },
                    'castle-grounds': {
                        name: 'Recinto del castillo',
                        blurb: 'Recorre los espacios que antiguamente se usaban para el comercio, el gobierno y el ejercicio del poder colonial.',
                        tag: 'Parada del recorrido'
                    },
                    'memory-and-healing': {
                        name: 'Memoria y sanación',
                        blurb: 'Reflexiona sobre cómo este lugar enseña resiliencia, recuerdo y la importancia de la verdad histórica.',
                        tag: 'Reflexión'
                    }
                }
            },
            'trail.manhyia-palace': {
                title: 'Ruta real asante',
                eyebrow: 'Ruta del patrimonio real',
                region: 'Región Ashanti',
                description: 'Explora la historia viva del Reino Asante a través del palacio, sus tradiciones y la continuidad del liderazgo real.',
                highlights: [
                    'Descubre el papel del Palacio Manhyia en el gobierno asante.',
                    'Comprende cómo las tradiciones reales siguen moldeando la identidad actual.',
                    'Observa cómo se entrelazan la historia, las ceremonias y el liderazgo.'
                ],
                badge: { label: 'Patrimonio real', title: 'Palacio Manhyia' },
                stops: {
                    'royal-court': {
                        name: 'Corte real',
                        blurb: 'Descubre cómo el Asantehene y sus consejeros reales dieron forma a la vida política y la identidad cultural.',
                        tag: 'Liderazgo'
                    },
                    regalia: {
                        name: 'Insignias de la corte',
                        blurb: 'Estudia los símbolos, objetos y vestimentas que expresan el poder, el prestigio y la continuidad asante.',
                        tag: 'Cultura'
                    },
                    'living-tradition': {
                        name: 'Tradición viva',
                        blurb: 'Descubre cómo las prácticas reales siguen aportando significado y comunidad a la vida ashanti moderna.',
                        tag: 'Patrimonio vivo'
                    }
                }
            },
            'trail.osu-castle': {
                title: 'Ruta costera de Osu',
                eyebrow: 'Ruta colonial y cívica',
                region: 'Gran Acra',
                description: 'Sigue la historia del Castillo de Osu desde la época colonial hasta el presente y conecta la historia costera con la política nacional.',
                highlights: [
                    'Comprende cómo la costa se convirtió en un centro de poder y gobierno.',
                    'Recorre la memoria colonial y posterior a la independencia de Ghana.',
                    'Sitúa las instituciones de Acra dentro de una historia nacional más amplia.'
                ],
                badge: { label: 'Patrimonio costero', title: 'Castillo de Osu' },
                stops: {
                    'castle-approach': {
                        name: 'Acceso al castillo',
                        blurb: 'Observa el entorno costero y comprende por qué la fortaleza dominaba el paisaje urbano.',
                        tag: 'Paisaje'
                    },
                    'colonial-memory': {
                        name: 'Memoria colonial',
                        blurb: 'Examina cómo el poder, la administración y el control se establecieron en este lugar estratégico.',
                        tag: 'Historia'
                    },
                    'national-shift': {
                        name: 'Cambio nacional',
                        blurb: 'Observa cómo cambió el lugar tras la independencia y qué significa en el Estado moderno.',
                        tag: 'Ghana moderno'
                    }
                }
            },
            'trail.independence-arch': {
                title: 'Ruta de la independencia',
                eyebrow: 'Ruta de la historia nacional',
                region: 'Gran Acra',
                description: 'Parte del simbolismo de la Plaza de la Independencia para explorar la historia más amplia de libertad, autogobierno e identidad nacional.',
                highlights: [
                    'Descubre cómo la nación conmemora su independencia en los espacios públicos.',
                    'Conecta la plaza con la identidad democrática de Ghana.',
                    'Reconoce cómo la arquitectura y las ceremonias moldean la memoria.'
                ],
                badge: { label: 'Constructor de la nación', title: 'Plaza de la Independencia' },
                stops: {
                    'independence-arch': {
                        name: 'Arco de la Independencia',
                        blurb: 'Símbolo del orgullo nacional de Ghana y de la memoria pública de 1957.',
                        tag: 'Símbolo'
                    },
                    'national-space': {
                        name: 'Espacio nacional',
                        blurb: 'Comprende cómo los monumentos públicos convierten los valores históricos en identidad colectiva.',
                        tag: 'Memoria pública'
                    },
                    'future-vision': {
                        name: 'Visión de futuro',
                        blurb: 'Reflexiona sobre la independencia como un compromiso continuo con la construcción de la nación.',
                        tag: 'Valores cívicos'
                    }
                }
            },
            'trail.kwame-nkrumah': {
                title: 'Ruta de libertad y legado',
                eyebrow: 'Ruta panafricana',
                region: 'Gran Acra',
                description: 'Explora el parque conmemorativo como lugar de homenaje y archivo vivo del movimiento independentista de Ghana y los sueños panafricanos.',
                highlights: [
                    'Conecta el liderazgo, la liberación y la memoria nacional.',
                    'Comprende el papel de Kwame Nkrumah en la historia de la independencia de Ghana.',
                    'Reflexiona sobre la política del recuerdo y el legado.'
                ],
                badge: { label: 'Luchador por la libertad', title: 'Memorial Kwame Nkrumah' },
                stops: {
                    'tribute-garden': {
                        name: 'Jardín de homenaje',
                        blurb: 'Descubre cómo el memorial convierte la memoria en un espacio público de reflexión y homenaje.',
                        tag: 'Memorial'
                    },
                    'independence-story': {
                        name: 'Historia de la independencia',
                        blurb: 'Explora el significado político y cultural de la declaración de independencia de Ghana de 1957.',
                        tag: 'Historia'
                    },
                    'pan-african-legacy': {
                        name: 'Legado panafricano',
                        blurb: 'Comprende cómo este lugar conecta Ghana con una historia más amplia de liberación africana.',
                        tag: 'Legado'
                    }
                }
            }
        }
    };

    const planPageTranslations = {
        en: {
            'page.title': 'ANANSE - Plan Your Heritage Journey',
            'nav.language': 'Language',
            'nav.menu': 'Toggle navigation menu',
            'nav.main': 'Main navigation',
            'site.homeAria': 'ANANSE home',
            'image.heroAlt': 'Ghana heritage banner',
            'image.summaryAlt': 'Selected heritage site',
            'image.preservingAlt': "Preserving Ghana's heritage",
            'hero.backToMap': 'Back to Map',
            'hero.subtitle': 'PLAN YOUR',
            'hero.title': 'HERITAGE JOURNEY',
            'hero.description': 'Create your own Ghana heritage experience.',
            'planning.title': 'PLAN YOUR HERITAGE JOURNEY',
            'planning.subtitle': 'Choose your destination, date and how many people are joining you.',
            'planning.selectSite': 'SELECT HERITAGE SITE',
            'planning.chooseSitePlaceholder': 'Choose a heritage site',
            'planning.visitDate': 'VISIT DATE',
            'planning.numberOfVisitors': 'NUMBER OF VISITORS',
            'planning.selectNumberPlaceholder': 'Select number',
            'visitors.one': '1 Visitor',
            'visitors.many': '{{count}} Visitors',
            'yourPlan.title': 'YOUR PLAN',
            'yourPlan.subtitle': "Here's what you've planned for your visit.",
            'yourPlan.emptySiteName': 'Your Selected Site',
            'yourPlan.emptySiteHint': 'Choose a heritage site above to start planning your visit.',
            'yourPlan.dateLabel': 'Date',
            'yourPlan.visitorsLabel': 'Visitors',
            'yourPlan.emptyValue': '(Will appear here)',
            'yourPlan.saveButton': 'Save My Plan',
            'yourPlan.addToCalendar': 'Add to Calendar',
            'visitDetails.title': 'VISIT DETAILS',
            'visitDetails.subtitle': 'Everything you need for a smooth visit.',
            'visitDetails.date': 'Date',
            'visitDetails.visitors': 'Number of Visitors',
            'visitDetails.suggestedTime': 'Suggested Time',
            'visitDetails.getDirections': 'Get Directions',
            'preserving.title': "Preserving Ghana's heritage<br>for generations.",
            'footer.tagline': "Weaving Ghana's story into the digital age",
            'footer.copyright': '© 2026 Ananse. All rights reserved.',
            'site.capeCoast': 'Cape Coast Castle',
            'site.independence': 'Independence Arch',
            'site.kwameNkrumah': 'Kwame Nkrumah Memorial Park',
            'site.manhyia': 'Manhyia Palace',
            'site.osu': 'Osu Castle',
            'auth.required': 'Please log in or create an account to save your plan and add a calendar reminder.',
            'auth.unavailable': 'Sign-in could not be verified. Please reload the page and try again.',
            'auth.login': 'Log in',
            'auth.signup': 'Create an account',
            'auth.saved': 'Your plan was saved. Open the downloaded calendar event on your phone to add it and enable its reminder.',
            'auth.calendarReady': 'Your calendar event is ready. Open the downloaded file on your phone to add it to your calendar.',
            'error.siteRequired': 'Please select a heritage site.',
            'error.dateRequired': 'Please choose a visit date.',
            'error.visitorsRequired': 'Please select the number of visitors.',
            'error.saveFailed': 'Your plan could not be saved. Please check your browser storage and try again.',
            'error.calendarFailed': 'The calendar event could not be created. Please try again.',
            'error.calendarAfterSave': 'Your plan was saved, but its calendar reminder could not be created. Please add it to your calendar again.',
            'error.directionsSite': 'Please select a heritage site first to get directions.',
            'calendar.title': 'Visit to {{site}}',
            'calendar.description': 'ANANSE planned visit for {{count}} visitor(s). Reminder: 1 hour before.',
            'calendar.location': '{{site}}, Ghana'
        },
        fr: {
            'page.title': 'ANANSE - Planifiez votre voyage patrimonial',
            'nav.language': 'Langue',
            'nav.menu': 'Ouvrir ou fermer le menu de navigation',
            'nav.main': 'Navigation principale',
            'site.homeAria': 'Accueil ANANSE',
            'image.heroAlt': 'Bannière du patrimoine ghanéen',
            'image.summaryAlt': 'Site patrimonial sélectionné',
            'image.preservingAlt': 'Préserver le patrimoine du Ghana',
            'hero.backToMap': 'Retour à la carte',
            'hero.subtitle': 'PLANIFIEZ VOTRE',
            'hero.title': 'VOYAGE PATRIMONIAL',
            'hero.description': 'Créez votre propre expérience du patrimoine ghanéen.',
            'planning.title': 'PLANIFIEZ VOTRE VOYAGE PATRIMONIAL',
            'planning.subtitle': 'Choisissez votre destination, la date et le nombre de participants.',
            'planning.selectSite': 'CHOISIR UN SITE PATRIMONIAL',
            'planning.chooseSitePlaceholder': 'Choisissez un site patrimonial',
            'planning.visitDate': 'DATE DE VISITE',
            'planning.numberOfVisitors': 'NOMBRE DE VISITEURS',
            'planning.selectNumberPlaceholder': 'Choisissez le nombre',
            'visitors.one': '1 visiteur',
            'visitors.many': '{{count}} visiteurs',
            'yourPlan.title': 'VOTRE PROGRAMME',
            'yourPlan.subtitle': 'Voici le programme de votre visite.',
            'yourPlan.emptySiteName': 'Site sélectionné',
            'yourPlan.emptySiteHint': 'Choisissez un site patrimonial ci-dessus pour commencer à planifier votre visite.',
            'yourPlan.dateLabel': 'Date',
            'yourPlan.visitorsLabel': 'Visiteurs',
            'yourPlan.emptyValue': '(S’affichera ici)',
            'yourPlan.saveButton': 'Enregistrer mon programme',
            'yourPlan.addToCalendar': 'Ajouter au calendrier',
            'visitDetails.title': 'DÉTAILS DE LA VISITE',
            'visitDetails.subtitle': 'Tout ce qu’il vous faut pour une visite agréable.',
            'visitDetails.date': 'Date',
            'visitDetails.visitors': 'Nombre de visiteurs',
            'visitDetails.suggestedTime': 'Heure suggérée',
            'visitDetails.getDirections': 'Obtenir l’itinéraire',
            'preserving.title': 'Préserver le patrimoine du Ghana<br>pour les générations futures.',
            'footer.tagline': 'Tisser les récits du Ghana à l’ère numérique',
            'footer.copyright': '© 2026 Ananse. Tous droits réservés.',
            'site.capeCoast': 'Château de Cape Coast',
            'site.independence': 'Arc de l’Indépendance',
            'site.kwameNkrumah': 'Parc commémoratif Kwame Nkrumah',
            'site.manhyia': 'Palais de Manhyia',
            'site.osu': 'Château d’Osu',
            'auth.required': 'Connectez-vous ou créez un compte pour enregistrer votre programme et ajouter un rappel au calendrier.',
            'auth.unavailable': 'Impossible de vérifier votre connexion. Rechargez la page et réessayez.',
            'auth.login': 'Se connecter',
            'auth.signup': 'Créer un compte',
            'auth.saved': 'Votre programme est enregistré. Ouvrez le fichier de calendrier téléchargé sur votre téléphone pour l’ajouter et activer le rappel.',
            'auth.calendarReady': 'Votre événement de calendrier est prêt. Ouvrez le fichier téléchargé sur votre téléphone pour l’ajouter à votre calendrier.',
            'error.siteRequired': 'Veuillez choisir un site patrimonial.',
            'error.dateRequired': 'Veuillez choisir une date de visite.',
            'error.visitorsRequired': 'Veuillez choisir le nombre de visiteurs.',
            'error.saveFailed': 'Impossible d’enregistrer votre programme. Vérifiez le stockage de votre navigateur et réessayez.',
            'error.calendarFailed': 'Impossible de créer l’événement de calendrier. Veuillez réessayer.',
            'error.calendarAfterSave': 'Votre programme est enregistré, mais le rappel de calendrier n’a pas pu être créé. Veuillez réessayer de l’ajouter.',
            'error.directionsSite': 'Veuillez d’abord choisir un site patrimonial pour obtenir l’itinéraire.',
            'calendar.title': 'Visite de {{site}}',
            'calendar.description': 'Visite prévue avec ANANSE pour {{count}} personne(s). Rappel : 1 heure avant.',
            'calendar.location': '{{site}}, Ghana'
        },
        es: {
            'page.title': 'ANANSE - Planifica tu recorrido patrimonial',
            'nav.language': 'Idioma',
            'nav.menu': 'Mostrar u ocultar el menú de navegación',
            'nav.main': 'Navegación principal',
            'site.homeAria': 'Inicio de ANANSE',
            'image.heroAlt': 'Banner del patrimonio de Ghana',
            'image.summaryAlt': 'Sitio patrimonial seleccionado',
            'image.preservingAlt': 'Preservar el patrimonio de Ghana',
            'hero.backToMap': 'Volver al mapa',
            'hero.subtitle': 'PLANIFICA TU',
            'hero.title': 'RECORRIDO PATRIMONIAL',
            'hero.description': 'Crea tu propia experiencia del patrimonio de Ghana.',
            'planning.title': 'PLANIFICA TU RECORRIDO PATRIMONIAL',
            'planning.subtitle': 'Elige tu destino, la fecha y cuántas personas te acompañarán.',
            'planning.selectSite': 'ELIGE UN SITIO PATRIMONIAL',
            'planning.chooseSitePlaceholder': 'Elige un sitio patrimonial',
            'planning.visitDate': 'FECHA DE VISITA',
            'planning.numberOfVisitors': 'NÚMERO DE VISITANTES',
            'planning.selectNumberPlaceholder': 'Elige el número',
            'visitors.one': '1 visitante',
            'visitors.many': '{{count}} visitantes',
            'yourPlan.title': 'TU PLAN',
            'yourPlan.subtitle': 'Este es el plan de tu visita.',
            'yourPlan.emptySiteName': 'Sitio seleccionado',
            'yourPlan.emptySiteHint': 'Elige arriba un sitio patrimonial para empezar a planificar tu visita.',
            'yourPlan.dateLabel': 'Fecha',
            'yourPlan.visitorsLabel': 'Visitantes',
            'yourPlan.emptyValue': '(Aparecerá aquí)',
            'yourPlan.saveButton': 'Guardar mi plan',
            'yourPlan.addToCalendar': 'Añadir al calendario',
            'visitDetails.title': 'DETALLES DE LA VISITA',
            'visitDetails.subtitle': 'Todo lo que necesitas para disfrutar la visita.',
            'visitDetails.date': 'Fecha',
            'visitDetails.visitors': 'Número de visitantes',
            'visitDetails.suggestedTime': 'Hora sugerida',
            'visitDetails.getDirections': 'Cómo llegar',
            'preserving.title': 'Conservamos el patrimonio de Ghana<br>para las generaciones futuras.',
            'footer.tagline': 'Tejiendo las historias de Ghana en la era digital',
            'footer.copyright': '© 2026 Ananse. Todos los derechos reservados.',
            'site.capeCoast': 'Castillo de Cape Coast',
            'site.independence': 'Arco de la Independencia',
            'site.kwameNkrumah': 'Parque Conmemorativo Kwame Nkrumah',
            'site.manhyia': 'Palacio Manhyia',
            'site.osu': 'Castillo de Osu',
            'auth.required': 'Inicia sesión o crea una cuenta para guardar tu plan y añadir un recordatorio al calendario.',
            'auth.unavailable': 'No se pudo verificar tu sesión. Recarga la página e inténtalo de nuevo.',
            'auth.login': 'Iniciar sesión',
            'auth.signup': 'Crear una cuenta',
            'auth.saved': 'Tu plan se ha guardado. Abre en tu teléfono el evento descargado para añadirlo y activar el recordatorio.',
            'auth.calendarReady': 'El evento del calendario está listo. Abre el archivo descargado en tu teléfono para añadirlo al calendario.',
            'error.siteRequired': 'Selecciona un sitio patrimonial.',
            'error.dateRequired': 'Elige una fecha para la visita.',
            'error.visitorsRequired': 'Selecciona el número de visitantes.',
            'error.saveFailed': 'No se pudo guardar el plan. Comprueba el almacenamiento del navegador e inténtalo de nuevo.',
            'error.calendarFailed': 'No se pudo crear el evento del calendario. Inténtalo de nuevo.',
            'error.calendarAfterSave': 'El plan se guardó, pero no se pudo crear el recordatorio del calendario. Intenta añadirlo de nuevo.',
            'error.directionsSite': 'Primero selecciona un sitio patrimonial para obtener indicaciones.',
            'calendar.title': 'Visita a {{site}}',
            'calendar.description': 'Visita planificada con ANANSE para {{count}} visitante(s). Recordatorio: 1 hora antes.',
            'calendar.location': '{{site}}, Ghana'
        }
    };

    const storyPageTranslations = {
        '← Back to Explore': { fr: '← Retour à Explorer', es: '← Volver a Explorar' },
        'Read the story': { fr: 'Lire l’histoire', es: 'Leer la historia' },
        'The story': { fr: 'L’histoire', es: 'La historia' },
        'Timeline': { fr: 'Chronologie', es: 'Cronología' },
        'Traditions': { fr: 'Traditions', es: 'Tradiciones' },
        'Inside the castle': { fr: 'À l’intérieur du château', es: 'Dentro del castillo' },
        'Inside the park': { fr: 'À l’intérieur du parc', es: 'Dentro del parque' },
        'Inside the palace': { fr: 'À l’intérieur du palais', es: 'Dentro del palacio' },
        'Monuments': { fr: 'Monuments', es: 'Monumentos' },
        'Remembering today': { fr: 'Se souvenir aujourd’hui', es: 'Recordar hoy' },
        'Visiting today': { fr: 'Visiter aujourd’hui', es: 'Visitar hoy' },
        'Listen to the story': { fr: 'Écouter l’histoire', es: 'Escuchar la historia' },
        'Stop listening': { fr: 'Arrêter l’écoute', es: 'Dejar de escuchar' },
        'Pause': { fr: 'Pause', es: 'Pausar' },
        'Resume': { fr: 'Reprendre', es: 'Reanudar' },
        'Playing story': { fr: 'Lecture de l’histoire en cours', es: 'Reproduciendo la historia' },
        'Story paused': { fr: 'Lecture en pause', es: 'Historia en pausa' },
        'Ready to listen': { fr: 'Prêt à écouter', es: 'Listo para escuchar' },
        'Audio playback could not continue.': { fr: 'La lecture audio n’a pas pu continuer.', es: 'No se pudo continuar la reproducción de audio.' },
        'Audio playback is not supported in this browser.': { fr: 'La lecture audio n’est pas prise en charge par ce navigateur.', es: 'Este navegador no admite la reproducción de audio.' },
        'Open all': { fr: 'Tout ouvrir', es: 'Abrir todo' },
        'Close all': { fr: 'Tout fermer', es: 'Cerrar todo' },
        'Tap a date to open it.': { fr: 'Touchez une date pour afficher les détails.', es: 'Toca una fecha para ver los detalles.' },
        'Key moments in its history': { fr: 'Les moments clés de son histoire', es: 'Momentos clave de su historia' },
        'Now test what you learned': { fr: 'Maintenant, testez vos connaissances', es: 'Ahora pon a prueba lo que has aprendido' },
        'Ask Naa': { fr: 'Demander à Naa', es: 'Preguntar a Naa' },
        'Open my Passport': { fr: 'Ouvrir mon passeport', es: 'Abrir mi pasaporte' },
        'More heritage sites': { fr: 'Plus de sites patrimoniaux', es: 'Más sitios patrimoniales' },
        'From trading lodge to fortress': { fr: 'D’un comptoir commercial à une forteresse', es: 'De puesto comercial a fortaleza' },
        'From exile to a royal home': { fr: 'De l’exil à une résidence royale', es: 'Del exilio a una residencia real' },
        'From Danish fort to seat of government': { fr: 'D’un fort danois au siège du gouvernement', es: 'De fuerte danés a sede del gobierno' },
        'A square built for a new nation': { fr: 'Une place construite pour une nouvelle nation', es: 'Una plaza construida para una nueva nación' },
        'Where independence was declared': { fr: 'Le lieu où l’indépendance fut proclamée', es: 'El lugar donde se declaró la independencia' },
        'Cape Coast Castle': { fr: 'Château de Cape Coast', es: 'Castillo de Cape Coast' },
        'Manhyia Palace': { fr: 'Palais de Manhyia', es: 'Palacio Manhyia' },
        'Osu Castle': { fr: 'Château d’Osu', es: 'Castillo de Osu' },
        'Independence Square': { fr: 'Place de l’Indépendance', es: 'Plaza de la Independencia' },
        'Kwame Nkrumah Memorial Park': { fr: 'Parc commémoratif Kwame Nkrumah', es: 'Parque Conmemorativo Kwame Nkrumah' },
        'A fortress on the Atlantic shore of the Central Region, and one of the most important places for understanding Ghana’s role in the transatlantic slave trade.': {
            fr: 'Une forteresse sur la côte atlantique de la région Centrale, et l’un des lieux les plus importants pour comprendre le rôle du Ghana dans la traite transatlantique des esclaves.',
            es: 'Una fortaleza en la costa atlántica de la Región Central y uno de los lugares más importantes para comprender el papel de Ghana en la trata transatlántica de personas esclavizadas.'
        },
        'The seat of the Asantehene in Kumasi, and a place to explore the history, leadership and traditions of the Asante Kingdom.': {
            fr: 'Résidence de l’Asantehene à Kumasi, ce palais permet de découvrir l’histoire, le pouvoir et les traditions du royaume asante.',
            es: 'Sede del Asantehene en Kumasi y lugar para descubrir la historia, el liderazgo y las tradiciones del reino asante.'
        },
        'A fortress on the Accra coast that became the seat of Ghana’s government, and is now a museum of the country’s leaders and its past.': {
            fr: 'Une forteresse sur la côte d’Accra devenue le siège du gouvernement ghanéen, aujourd’hui transformée en musée consacré aux dirigeants et au passé du pays.',
            es: 'Una fortaleza en la costa de Accra que fue sede del gobierno de Ghana y hoy es un museo dedicado a sus dirigentes y a su pasado.'
        },
        'Ghana’s national parade ground on the Accra coast, also known as Black Star Square, and the home of the Independence Arch and the Black Star Gate.': {
            fr: 'La place nationale des défilés du Ghana, sur la côte d’Accra, aussi appelée Black Star Square. Elle abrite l’arche de l’Indépendance et la porte de l’Étoile noire.',
            es: 'La plaza nacional de desfiles de Ghana, en la costa de Accra, también conocida como Black Star Square. Aquí se encuentran el Arco de la Independencia y la Puerta de la Estrella Negra.'
        },
        'The park and mausoleum in Accra where Kwame Nkrumah declared Ghana’s independence in 1957, and where he now rests.': {
            fr: 'Le parc et le mausolée d’Accra où Kwame Nkrumah proclama l’indépendance du Ghana en 1957 et où il repose aujourd’hui.',
            es: 'El parque y mausoleo de Accra donde Kwame Nkrumah declaró la independencia de Ghana en 1957 y donde hoy descansan sus restos.'
        },
        'Cape Coast Castle stands in Cape Coast, known locally as Oguaa. It began in 1653 as a small trading lodge built by Swedish traders who came to the coast for timber and gold. Over the next decade it changed hands between Swedish, Danish, Dutch and English powers, each competing for the coastal trade.': {
            fr: 'Le château de Cape Coast se trouve dans la ville de Cape Coast, appelée Oguaa par ses habitants. En 1653, des marchands suédois venus chercher du bois et de l’or y construisirent un petit comptoir. Au cours de la décennie suivante, le site passa entre les mains des Suédois, des Danois, des Néerlandais et des Anglais, tous en concurrence pour le commerce côtier.',
            es: 'El castillo de Cape Coast se encuentra en la ciudad de Cape Coast, conocida localmente como Oguaa. En 1653, comerciantes suecos que llegaron a la costa en busca de madera y oro construyeron allí un pequeño puesto comercial. Durante la década siguiente, pasó de manos suecas, danesas, neerlandesas e inglesas, todas en competencia por el comercio costero.'
        },
        'By the 1660s the English held the fort, and they expanded it into a large castle. As the transatlantic slave trade grew, Cape Coast Castle became one of its main departure points on the Gold Coast. Captive men, women and children were held in its underground dungeons, sometimes for weeks or months, before being shipped across the Atlantic.': {
            fr: 'Dans les années 1660, les Anglais s’emparèrent du fort et l’agrandirent pour en faire un vaste château. Avec l’expansion de la traite transatlantique des esclaves, le château de Cape Coast devint l’un des principaux ports de départ de la Côte-de-l’Or. Des hommes, des femmes et des enfants captifs étaient enfermés dans ses cachots souterrains, parfois pendant des semaines ou des mois, avant d’être déportés par-delà l’Atlantique.',
            es: 'En la década de 1660, los ingleses tomaron el fuerte y lo ampliaron hasta convertirlo en un gran castillo. Al crecer la trata transatlántica de personas esclavizadas, el castillo de Cape Coast se convirtió en uno de sus principales puntos de salida en la Costa de Oro. Hombres, mujeres y niños cautivos permanecían en sus mazmorras subterráneas, a veces durante semanas o meses, antes de ser enviados a través del Atlántico.'
        },
        'The castle was also the seat of British administration on the Gold Coast until 1877, when the capital moved to Accra. Today it is a museum and a site of memory, visited by Ghanaians, people of the African diaspora and travellers from around the world.': {
            fr: 'Le château fut également le siège de l’administration britannique sur la Côte-de-l’Or jusqu’en 1877, date du transfert de la capitale à Accra. Aujourd’hui, c’est un musée et un lieu de mémoire visité par des Ghanéens, des membres de la diaspora africaine et des voyageurs du monde entier.',
            es: 'El castillo también fue sede de la administración británica en la Costa de Oro hasta 1877, cuando la capital se trasladó a Accra. Hoy es un museo y un lugar de memoria que visitan ghaneses, personas de la diáspora africana y viajeros de todo el mundo.'
        },
        'Manhyia Palace stands in Kumasi, the capital of the Asante Kingdom and the traditional seat of the Asantehene, the Asante king. The kingdom took shape around 1701, when Osei Tutu I and his priest and adviser Okomfo Anokye united the Asante states after their war against Denkyira. According to tradition, Okomfo Anokye called the Golden Stool down from the sky as the symbol of the bond between all Asante people.': {
            fr: 'Le palais de Manhyia se trouve à Kumasi, capitale du royaume asante et siège traditionnel de l’Asantehene, le roi asante. Le royaume prit forme vers 1701, lorsque Osei Tutu Ier et son prêtre et conseiller Okomfo Anokye réunirent les États asante après leur guerre contre Denkyira. Selon la tradition, Okomfo Anokye fit descendre du ciel le Tabouret d’or, symbole du lien entre tous les Asante.',
            es: 'El palacio Manhyia se encuentra en Kumasi, capital del reino asante y sede tradicional del Asantehene, el rey asante. El reino tomó forma hacia 1701, cuando Osei Tutu I y su sacerdote y consejero Okomfo Anokye unieron los estados asantes tras la guerra contra Denkyira. Según la tradición, Okomfo Anokye hizo descender del cielo el Taburete Dorado, símbolo del vínculo entre todo el pueblo asante.'
        },
        'The palace itself has a more recent story. In 1896 the British sent Asantehene Prempeh I into exile in the Seychelles, and the Asante kept his place on the royal stool empty for all the years he was away. When he returned in 1924, the colonial government built Manhyia Palace as his residence, and it was completed in 1925. He accepted it only after paying the cost in full.': {
            fr: 'L’histoire du palais est plus récente. En 1896, les Britanniques exilèrent l’Asantehene Prempeh Ier aux Seychelles. Pendant toute son absence, les Asante laissèrent sa place sur le trône royal inoccupée. À son retour en 1924, le gouvernement colonial fit construire le palais de Manhyia comme résidence; les travaux s’achevèrent en 1925. Prempeh ne l’accepta qu’après en avoir payé la totalité du coût.',
            es: 'La historia del palacio es más reciente. En 1896, los británicos enviaron al Asantehene Prempeh I al exilio en las Seychelles. Durante su ausencia, los asantes mantuvieron vacante su lugar en el trono real. Cuando regresó en 1924, el gobierno colonial construyó el palacio Manhyia como su residencia; las obras terminaron en 1925. Solo lo aceptó después de pagar el coste completo.'
        },
        'Two kings lived and ruled from this building, Prempeh I and Prempeh II. Around 1974 Otumfuo Opoku Ware II built a new palace behind it, and in 1995 the old palace reopened as the Manhyia Palace Museum. The royal court is still very much alive: the current Asantehene, Otumfuo Osei Tutu II, lives in the new palace, and the courtyard is used for important Asante ceremonies.': {
            fr: 'Deux rois, Prempeh Ier et Prempeh II, vécurent et régnèrent dans ce bâtiment. Vers 1974, Otumfuo Opoku Ware II fit construire un nouveau palais derrière l’ancien, qui rouvrit en 1995 sous le nom de musée du palais de Manhyia. La cour royale est toujours active : l’actuel Asantehene, Otumfuo Osei Tutu II, habite le nouveau palais et la cour accueille d’importantes cérémonies asante.',
            es: 'Dos reyes, Prempeh I y Prempeh II, vivieron y gobernaron en este edificio. Hacia 1974, Otumfuo Opoku Ware II construyó un nuevo palacio detrás del antiguo, que reabrió en 1995 como Museo del Palacio Manhyia. La corte real sigue activa: el actual Asantehene, Otumfuo Osei Tutu II, vive en el nuevo palacio y el patio acoge importantes ceremonias asantes.'
        },
        'Osu Castle, also known as Christiansborg or simply the Castle, stands on the shore at Osu in Accra. The Swedish African Company first built an earthen lodge on this coast in the 1600s. In 1661 the Danish governor at Cape Coast bought the site from Okaikoi, a Ga chief, and the Danes built a stone fort they called Christiansborg, meaning Christian’s fortress.': {
            fr: 'Le château d’Osu, aussi appelé Christiansborg ou simplement le Château, se dresse sur le rivage d’Osu, à Accra. Au XVIIe siècle, la Compagnie suédoise d’Afrique construisit d’abord un poste en terre sur cette côte. En 1661, le gouverneur danois de Cape Coast acheta le site à Okaikoi, chef ga, puis les Danois y bâtirent un fort en pierre nommé Christiansborg, c’est-à-dire « forteresse du Christ ».',
            es: 'El castillo de Osu, también llamado Christiansborg o simplemente el Castillo, se encuentra en la costa de Osu, en Accra. En el siglo XVII, la Compañía Sueca de África construyó allí un puesto de tierra. En 1661, el gobernador danés de Cape Coast compró el lugar a Okaikoi, jefe ga, y los daneses levantaron un fuerte de piedra llamado Christiansborg, que significa «fortaleza de Cristo».'
        },
        'Danish trade began with gold and grew to include enslaved people, and the castle was expanded until it became the capital of the Danish Gold Coast. Captives were held in its dungeons and taken through a Door of No Return to ships waiting at sea. Denmark banned the slave trade in 1803, and in 1850 it sold the castle to Britain.': {
            fr: 'Le commerce danois, d’abord centré sur l’or, s’étendit à la traite des personnes réduites en esclavage. Le château fut agrandi jusqu’à devenir le centre de la Côte-de-l’Or danoise. Des captifs étaient enfermés dans ses cachots puis conduits par une « porte du non-retour » vers les navires au large. Le Danemark interdit la traite en 1803 et vendit le château à la Grande-Bretagne en 1850.',
            es: 'El comercio danés comenzó con el oro y se amplió para incluir a personas esclavizadas. El castillo se expandió hasta convertirse en el centro de la Costa de Oro danesa. Los cautivos eran encerrados en sus mazmorras y llevados por una Puerta del No Retorno hasta los barcos que esperaban en el mar. Dinamarca prohibió la trata en 1803 y vendió el castillo a Gran Bretaña en 1850.'
        },
        'From 1902 the castle was the seat of government, home to colonial governors and, after independence, to Ghana’s presidents until 2013. Since 2017 it has been the Presidential Museum, and it is one of the Forts and Castles of Ghana on the UNESCO World Heritage List.': {
            fr: 'À partir de 1902, le château fut le siège du gouvernement et la résidence des gouverneurs coloniaux puis, après l’indépendance, des présidents du Ghana jusqu’en 2013. Depuis 2017, il abrite le musée présidentiel. Il fait partie des forts et châteaux du Ghana inscrits au patrimoine mondial de l’UNESCO.',
            es: 'Desde 1902, el castillo fue sede del gobierno y residencia de los gobernadores coloniales y, tras la independencia, de los presidentes de Ghana hasta 2013. Desde 2017 alberga el Museo Presidencial y forma parte de los Fuertes y Castillos de Ghana inscritos en la Lista del Patrimonio Mundial de la UNESCO.'
        },
        'Independence Square, widely known as Black Star Square, sits on the Accra coast between the Atlantic Ocean and the district of Osu. On 6 March 1957 the Gold Coast became Ghana, the first country in sub-Saharan Africa to gain independence from colonial rule. Kwame Nkrumah, Ghana’s first prime minister and president, then commissioned a huge public square to celebrate the new nation.': {
            fr: 'La place de l’Indépendance, largement connue sous le nom de Black Star Square, se trouve sur la côte d’Accra, entre l’océan Atlantique et le quartier d’Osu. Le 6 mars 1957, la Côte-de-l’Or devint le Ghana, premier pays d’Afrique subsaharienne à obtenir son indépendance de la domination coloniale. Kwame Nkrumah, premier Premier ministre puis président du Ghana, fit ensuite construire cette immense place pour célébrer la nouvelle nation.',
            es: 'La Plaza de la Independencia, conocida también como Black Star Square, está en la costa de Accra, entre el océano Atlántico y el distrito de Osu. El 6 de marzo de 1957, la Costa de Oro se convirtió en Ghana, el primer país del África subsahariana en independizarse del dominio colonial. Kwame Nkrumah, primer ministro y después presidente de Ghana, encargó entonces una enorme plaza pública para celebrar la nueva nación.'
        },
        'The square was completed in 1961, in time for the state visit of Queen Elizabeth II, and the first parades were held there in her honour. Since then it has hosted Ghana’s major national gatherings, festivals, military parades and concerts. Stands around the edges seat about 30,000 people.': {
            fr: 'La place fut achevée en 1961, à temps pour la visite officielle de la reine Elizabeth II, en l’honneur de laquelle s’y déroulèrent les premiers défilés. Depuis, elle accueille les principaux rassemblements nationaux du Ghana, des festivals, des défilés militaires et des concerts. Ses tribunes peuvent recevoir environ 30 000 personnes.',
            es: 'La plaza se terminó en 1961, a tiempo para la visita de Estado de la reina Isabel II; allí se celebraron los primeros desfiles en su honor. Desde entonces acoge las principales reuniones nacionales de Ghana, festivales, desfiles militares y conciertos. Sus gradas tienen capacidad para unas 30 000 personas.'
        },
        'Its monuments tell the story of the struggle for independence: the Independence Arch by the sea, the Memorial of the Unknown Soldier facing it, and the Black Star Gate just to the north. Every year on 6 March the square is the setting for the Independence Day parade.': {
            fr: 'Ses monuments racontent la lutte pour l’indépendance : l’arche de l’Indépendance au bord de la mer, le mémorial du Soldat inconnu qui lui fait face et la porte de l’Étoile noire juste au nord. Chaque année, le 6 mars, la place accueille le défilé de la fête de l’Indépendance.',
            es: 'Sus monumentos narran la lucha por la independencia: el Arco de la Independencia junto al mar, el Memorial del Soldado Desconocido frente a él y la Puerta de la Estrella Negra al norte. Cada 6 de marzo, la plaza acoge el desfile del Día de la Independencia.'
        },
        'The Kwame Nkrumah Memorial Park stands in central Accra on the former Old Polo Grounds. It was here, before a huge crowd, that Kwame Nkrumah declared Ghana free from British colonial rule in 1957, telling the people that Ghana was free forever. Nkrumah became Ghana’s first prime minister and later its first president.': {
            fr: 'Le parc commémoratif Kwame Nkrumah se trouve au centre d’Accra, sur l’ancien terrain de polo. C’est là, devant une foule immense, que Kwame Nkrumah proclama en 1957 la libération du Ghana de la domination coloniale britannique, affirmant que le Ghana était libre pour toujours. Il devint le premier Premier ministre du Ghana, puis son premier président.',
            es: 'El Parque Conmemorativo Kwame Nkrumah se encuentra en el centro de Accra, en los antiguos terrenos de polo. Allí, ante una enorme multitud, Kwame Nkrumah declaró en 1957 la libertad de Ghana del dominio colonial británico y afirmó que el país era libre para siempre. Nkrumah fue el primer ministro de Ghana y después su primer presidente.'
        },
        'His rule ended in 1966 when he was overthrown in a coup, and his statue on the grounds was destroyed. He died in exile in 1972 and was first buried in his birthplace, Nkroful. In 1992 the site was restored as a memorial park, and its mausoleum now holds the remains of Nkrumah and his wife, Fathia Nkrumah.': {
            fr: 'Son gouvernement prit fin en 1966, lorsqu’un coup d’État le renversa et que sa statue sur le site fut détruite. Il mourut en exil en 1972 et fut d’abord enterré dans sa ville natale, Nkroful. En 1992, le site fut restauré et transformé en parc commémoratif. Son mausolée abrite aujourd’hui les dépouilles de Nkrumah et de son épouse, Fathia Nkrumah.',
            es: 'Su gobierno terminó en 1966, cuando fue derrocado en un golpe de Estado y destruyeron su estatua en el lugar. Murió en el exilio en 1972 y primero fue enterrado en su ciudad natal, Nkroful. En 1992, el lugar se restauró como parque conmemorativo; su mausoleo alberga ahora los restos de Nkrumah y de su esposa, Fathia Nkrumah.'
        },
        'The park was closed in 2022 for redevelopment and reopened to the public in July 2023. It covers about five acres and includes the mausoleum, a bronze statue of Nkrumah, fountains and gardens, and an underground museum.': {
            fr: 'Le parc ferma en 2022 pour être réaménagé et rouvrit au public en juillet 2023. Il s’étend sur environ deux hectares et comprend le mausolée, une statue en bronze de Nkrumah, des fontaines, des jardins et un musée souterrain.',
            es: 'El parque cerró en 2022 para su remodelación y reabrió al público en julio de 2023. Ocupa unas dos hectáreas e incluye el mausoleo, una estatua de bronce de Nkrumah, fuentes, jardines y un museo subterráneo.'
        },
        'This history includes the suffering of enslaved people. Take your time reading, and know that many visitors find this story emotional.': {
            fr: 'Cette histoire évoque les souffrances des personnes réduites en esclavage. Prenez le temps de lire; sachez que ce récit est éprouvant pour de nombreux visiteurs.',
            es: 'Esta historia incluye el sufrimiento de las personas esclavizadas. Lee con calma y ten en cuenta que muchos visitantes encuentran este relato emotivo.'
        },
        'Manhyia is part of a living royal court, and the Golden Stool is sacred to the Asante. Please read and visit with respect for Asante traditions.': {
            fr: 'Manhyia fait partie d’une cour royale toujours active et le Tabouret d’or est sacré pour les Asante. Merci de lire et de visiter ce lieu dans le respect des traditions asante.',
            es: 'Manhyia forma parte de una corte real activa y el Taburete Dorado es sagrado para los asantes. Lee y visita el lugar con respeto por las tradiciones asantes.'
        },
        'Why Black Star? The five-pointed black star on top of the Black Star Gate symbolises Africa in general and Ghana in particular.': {
            fr: 'Pourquoi l’Étoile noire ? L’étoile noire à cinq branches au sommet de la porte symbolise l’Afrique en général et le Ghana en particulier.',
            es: '¿Por qué la Estrella Negra? La estrella negra de cinco puntas sobre la puerta simboliza a África en general y a Ghana en particular.'
        },
        'Kwame Nkrumah is remembered with pride by many Ghanaians, and his leadership is also debated. This page focuses on the place and its story.': {
            fr: 'De nombreux Ghanéens se souviennent de Kwame Nkrumah avec fierté, même si son leadership fait aussi débat. Cette page se concentre sur le lieu et son histoire.',
            es: 'Muchos ghaneses recuerdan a Kwame Nkrumah con orgullo, aunque su liderazgo también es objeto de debate. Esta página se centra en el lugar y su historia.'
        },
        'First built by Swedish traders': { fr: 'Construit à l’origine par des marchands suédois', es: 'Construido inicialmente por comerciantes suecos' },
        'UNESCO World Heritage listing, with the Forts and Castles of Ghana': { fr: 'Inscrit au patrimoine mondial de l’UNESCO avec les forts et châteaux du Ghana', es: 'Inscrito en la Lista del Patrimonio Mundial de la UNESCO junto con los fuertes y castillos de Ghana' },
        'Open to visitors as a place of learning and remembrance': { fr: 'Ouvert au public comme lieu de connaissance et de mémoire', es: 'Abierto al público como lugar de aprendizaje y memoria' },
        'Built for Asantehene Prempeh I after his return from exile': { fr: 'Construit pour l’Asantehene Prempeh Ier après son retour d’exil', es: 'Construido para el Asantehene Prempeh I tras su regreso del exilio' },
        'Ashanti Region, Ghana': { fr: 'Région Ashanti, Ghana', es: 'Región Ashanti, Ghana' },
        'The old palace opened as the Manhyia Palace Museum': { fr: 'L’ancien palais ouvre ses portes comme musée du palais de Manhyia', es: 'El antiguo palacio abrió como Museo del Palacio Manhyia' },
        'Living court': { fr: 'Cour royale vivante', es: 'Corte real activa' },
        'The current Asantehene lives in the new palace nearby': { fr: 'L’Asantehene actuel vit dans le nouveau palais voisin', es: 'El actual Asantehene vive en el nuevo palacio cercano' },
        'The Danes acquire the site and build Christiansborg': { fr: 'Les Danois acquièrent le site et construisent Christiansborg', es: 'Los daneses adquieren el lugar y construyen Christiansborg' },
        'Greater Accra Region, Ghana': { fr: 'Région du Grand Accra, Ghana', es: 'Región del Gran Accra, Ghana' },
        'Opened as the Presidential Museum': { fr: 'Ouvert comme musée présidentiel', es: 'Abierto como Museo Presidencial' },
        'Completed, in time for the state visit of Queen Elizabeth II': { fr: 'Achevée à temps pour la visite officielle de la reine Elizabeth II', es: 'Terminada a tiempo para la visita de Estado de la reina Isabel II' },
        'Between the Atlantic Ocean and the district of Osu': { fr: 'Entre l’océan Atlantique et le quartier d’Osu', es: 'Entre el océano Atlántico y el distrito de Osu' },
        'Seats in the stands around the square': { fr: 'Places dans les tribunes autour de la place', es: 'Asientos en las gradas que rodean la plaza' },
        'The annual Independence Day parade': { fr: 'Le défilé annuel de la fête de l’Indépendance', es: 'El desfile anual del Día de la Independencia' },
        'The memorial park and mausoleum opened': { fr: 'Ouverture du parc commémoratif et du mausolée', es: 'Apertura del parque conmemorativo y el mausoleo' },
        'Central Accra, on the former Old Polo Grounds': { fr: 'Centre d’Accra, sur l’ancien terrain de polo', es: 'Centro de Accra, en los antiguos terrenos de polo' },
        'Of gardens, fountains and monuments': { fr: 'De jardins, de fontaines et de monuments', es: 'De jardines, fuentes y monumentos' },
        'Reopened after redevelopment': { fr: 'Rouverte après réaménagement', es: 'Reabierto tras su remodelación' },
        'Traditions and symbols': { fr: 'Traditions et symboles', es: 'Tradiciones y símbolos' },
        'Monuments in the square': { fr: 'Les monuments de la place', es: 'Monumentos de la plaza' },
        'Hear the story of Cape Coast Castle read aloud.': { fr: 'Écoutez l’histoire du château de Cape Coast.', es: 'Escucha la historia del castillo de Cape Coast.' },
        'Hear the story of Manhyia Palace read aloud.': { fr: 'Écoutez l’histoire du palais de Manhyia.', es: 'Escucha la historia del palacio Manhyia.' },
        'Hear the story of Osu Castle read aloud.': { fr: 'Écoutez l’histoire du château d’Osu.', es: 'Escucha la historia del castillo de Osu.' },
        'Hear the story of Independence Square read aloud.': { fr: 'Écoutez l’histoire de la place de l’Indépendance.', es: 'Escucha la historia de la Plaza de la Independencia.' },
        'Hear the story of the Kwame Nkrumah Memorial Park read aloud.': { fr: 'Écoutez l’histoire du parc commémoratif Kwame Nkrumah.', es: 'Escucha la historia del Parque Conmemorativo Kwame Nkrumah.' },
        'Ask Naa, the ANANSE guide, about the castle, then collect your Cape Coast Castle badge in your Cultural Passport.': {
            fr: 'Posez vos questions à Naa, le guide d’ANANSE, sur le château, puis récupérez le badge du château de Cape Coast dans votre passeport culturel.',
            es: 'Pregúntale a Naa, la guía de ANANSE, sobre el castillo y consigue la insignia del castillo de Cape Coast en tu Pasaporte Cultural.'
        },
        'Ask Naa, the ANANSE guide, about Manhyia Palace, then collect your Manhyia Palace badge in your Cultural Passport.': {
            fr: 'Posez vos questions à Naa, le guide d’ANANSE, sur le palais de Manhyia, puis récupérez son badge dans votre passeport culturel.',
            es: 'Pregúntale a Naa, la guía de ANANSE, sobre el palacio Manhyia y consigue su insignia en tu Pasaporte Cultural.'
        },
        'Ask Naa, the ANANSE guide, about Osu Castle, then collect your Osu Castle badge in your Cultural Passport.': {
            fr: 'Posez vos questions à Naa, le guide d’ANANSE, sur le château d’Osu, puis récupérez son badge dans votre passeport culturel.',
            es: 'Pregúntale a Naa, la guía de ANANSE, sobre el castillo de Osu y consigue su insignia en tu Pasaporte Cultural.'
        },
        'Ask Naa, the ANANSE guide, about Independence Square, then collect your Independence Square badge in your Cultural Passport.': {
            fr: 'Posez vos questions à Naa, le guide d’ANANSE, sur la place de l’Indépendance, puis récupérez son badge dans votre passeport culturel.',
            es: 'Pregúntale a Naa, la guía de ANANSE, sobre la Plaza de la Independencia y consigue su insignia en tu Pasaporte Cultural.'
        },
        'Ask Naa, the ANANSE guide, about the Kwame Nkrumah Memorial Park, then collect your Kwame Nkrumah Memorial Park badge in your Cultural Passport.': {
            fr: 'Posez vos questions à Naa, le guide d’ANANSE, sur le parc commémoratif Kwame Nkrumah, puis récupérez son badge dans votre passeport culturel.',
            es: 'Pregúntale a Naa, la guía de ANANSE, sobre el Parque Conmemorativo Kwame Nkrumah y consigue su insignia en tu Pasaporte Cultural.'
        },
        'Central Region, Ghana': { fr: 'Région centrale, Ghana', es: 'Región Central, Ghana' },
        'Cape Coast, Central Region': { fr: 'Cape Coast, région centrale', es: 'Cape Coast, Región Central' },
        'Swedish traders build the first lodge': { fr: 'Des marchands suédois construisent le premier comptoir', es: 'Comerciantes suecos construyen el primer puesto' },
        'The Swedish Africa Company builds a trading post named Carolusborg, after King Charles X Gustav of Sweden. It is meant for trade in timber and gold.': {
            fr: 'La Compagnie suédoise d’Afrique construit un comptoir commercial nommé Carolusborg, en hommage au roi Charles X Gustave de Suède. Il sert au commerce du bois et de l’or.',
            es: 'La Compañía Sueca de África construye un puesto comercial llamado Carolusborg, en honor al rey Carlos X Gustavo de Suecia. Está destinado al comercio de madera y oro.'
        },
        'The English take control': { fr: 'Les Anglais prennent le contrôle', es: 'Los ingleses toman el control' },
        'After the fort passes between Swedish, Danish and Dutch hands, the English gain it, and Britain’s claim is confirmed by treaty in 1667. They rebuild and enlarge it as their main base on the Gold Coast.': {
            fr: 'Après avoir changé plusieurs fois de mains entre Suédois, Danois et Néerlandais, le fort passe aux Anglais. Le traité de 1667 confirme la revendication britannique. Ils le reconstruisent et l’agrandissent pour en faire leur principale base sur la Côte-de-l’Or.',
            es: 'Tras pasar por manos suecas, danesas y neerlandesas, los ingleses se hacen con el fuerte; el tratado de 1667 confirma la soberanía británica. Lo reconstruyen y amplían para convertirlo en su principal base en la Costa de Oro.'
        },
        'A centre of the slave trade': { fr: 'Un centre de la traite des esclaves', es: 'Un centro de la trata de esclavos' },
        'The castle’s dungeons are used to hold captives brought from across the region, and enslaved people are shipped from here to the Americas and the Caribbean.': {
            fr: 'Les cachots du château servent à enfermer des captifs amenés de toute la région. Des personnes réduites en esclavage sont ensuite déportées d’ici vers les Amériques et les Caraïbes.',
            es: 'Las mazmorras del castillo se utilizan para encerrar a cautivos traídos de toda la región; desde aquí, personas esclavizadas son enviadas a América y al Caribe.'
        },
        'Philip Quaque becomes chaplain': { fr: 'Philip Quaque devient aumônier', es: 'Philip Quaque se convierte en capellán' },
        'Philip Quaque, born on the Gold Coast and the first African ordained in the Church of England, returns to serve as chaplain of the castle and teaches at a school there.': {
            fr: 'Philip Quaque, né sur la Côte-de-l’Or et premier Africain ordonné dans l’Église d’Angleterre, revient pour servir comme aumônier du château et y enseigner dans une école.',
            es: 'Philip Quaque, nacido en la Costa de Oro y primer africano ordenado en la Iglesia de Inglaterra, regresa para servir como capellán del castillo y enseñar en una escuela allí.'
        },
        'Britain abolishes the slave trade': { fr: 'La Grande-Bretagne abolit la traite des esclaves', es: 'Gran Bretaña abolió la trata de esclavos' },
        'Britain outlaws its involvement in the trade in 1807, and slavery itself is abolished across the British Empire in 1833. The castle continues as the centre of colonial government.': {
            fr: 'La Grande-Bretagne interdit sa participation à la traite en 1807; l’esclavage est ensuite aboli dans tout l’Empire britannique en 1833. Le château reste le centre du gouvernement colonial.',
            es: 'Gran Bretaña prohíbe su participación en la trata en 1807, y la esclavitud se abole en todo el Imperio británico en 1833. El castillo sigue siendo el centro del gobierno colonial.'
        },
        'Governor Maclean and the courtyard grave': { fr: 'Le gouverneur Maclean et la tombe de la cour', es: 'El gobernador Maclean y la tumba del patio' },
        'Governor George Maclean runs the colony from the castle. The English poet Letitia Elizabeth Landon, who died in 1838, is buried in the courtyard.': {
            fr: 'Le gouverneur George Maclean dirige la colonie depuis le château. La poétesse anglaise Letitia Elizabeth Landon, morte en 1838, est enterrée dans la cour.',
            es: 'El gobernador George Maclean dirige la colonia desde el castillo. La poeta inglesa Letitia Elizabeth Landon, fallecida en 1838, está enterrada en el patio.'
        },
        'The capital moves to Accra': { fr: 'La capitale est transférée à Accra', es: 'La capital se traslada a Accra' },
        'The colonial capital is moved from Cape Coast to Accra, and the castle’s administrative role declines.': {
            fr: 'La capitale coloniale est transférée de Cape Coast à Accra, et le rôle administratif du château décline.',
            es: 'La capital colonial se traslada de Cape Coast a Accra y disminuye la función administrativa del castillo.'
        },
        'UNESCO World Heritage Site': { fr: 'Site du patrimoine mondial de l’UNESCO', es: 'Patrimonio Mundial de la UNESCO' },
        'Cape Coast Castle is inscribed alongside the other Forts and Castles of Ghana, recognised as a place of universal importance to human history.': {
            fr: 'Le château de Cape Coast est inscrit avec les autres forts et châteaux du Ghana, reconnus comme des lieux d’importance universelle pour l’histoire de l’humanité.',
            es: 'El castillo de Cape Coast se inscribe junto con los demás fuertes y castillos de Ghana, reconocidos como lugares de importancia universal para la historia de la humanidad.'
        },
        'A visit of global attention': { fr: 'Une visite qui attire l’attention du monde entier', es: 'Una visita que atrae la atención mundial' },
        'US President Barack Obama tours the castle with his family, drawing worldwide attention to its story.': {
            fr: 'Le président américain Barack Obama visite le château avec sa famille, attirant l’attention du monde entier sur son histoire.',
            es: 'El presidente estadounidense Barack Obama visita el castillo con su familia y atrae la atención mundial sobre su historia.'
        },
        'The dungeons': { fr: 'Les cachots', es: 'Las mazmorras' },
        'Dark, low-ceilinged chambers beneath the courtyard where captives were held before shipment. They were cramped and poorly ventilated, and conditions were brutal. Many people did not survive.': {
            fr: 'Sous la cour, des chambres sombres au plafond bas retenaient les captifs avant leur déportation. Elles étaient exiguës, mal ventilées et les conditions y étaient brutales. Beaucoup n’ont pas survécu.',
            es: 'Bajo el patio, unas cámaras oscuras y de techo bajo retenían a los cautivos antes de embarcarlos. Eran estrechas, estaban mal ventiladas y las condiciones eran brutales. Muchas personas no sobrevivieron.'
        },
        'The Door of No Return': { fr: 'La porte du non-retour', es: 'La Puerta del No Retorno' },
        'The passage that leads from the castle’s dungeons out to the sea, where captives were taken to waiting ships. For those who passed through it, it was the last step on African soil. Today, many descendants of the enslaved return to Ghana to walk through it as an act of remembrance.': {
            fr: 'Ce passage relie les cachots du château à la mer, où attendaient les navires. Pour les captifs qui le franchissaient, c’était leur dernier pas sur le sol africain. Aujourd’hui, de nombreux descendants de personnes réduites en esclavage reviennent au Ghana et le traversent en mémoire de leurs ancêtres.',
            es: 'Este pasaje conduce desde las mazmorras del castillo hasta el mar, donde esperaban los barcos. Para quienes lo cruzaban, era el último paso en suelo africano. Hoy, muchos descendientes de personas esclavizadas regresan a Ghana y lo recorren como acto de memoria.'
        },
        'The governor’s quarters': { fr: 'Les appartements du gouverneur', es: 'Las dependencias del gobernador' },
        'The living and administrative quarters sit above the dungeons, a stark contrast between comfort for the colonial officials and confinement below.': {
            fr: 'Les appartements et bureaux administratifs se trouvent au-dessus des cachots, contraste saisissant entre le confort des responsables coloniaux et l’enfermement des personnes détenues en dessous.',
            es: 'Las dependencias residenciales y administrativas están sobre las mazmorras, un marcado contraste entre la comodidad de los funcionarios coloniales y el confinamiento de abajo.'
        },
        'The museum': { fr: 'Le musée', es: 'El museo' },
        'Exhibits inside the castle present the history of the Gold Coast, the slave trade and the resistance and resilience of African peoples. Guided tours are available.': {
            fr: 'Les expositions du château présentent l’histoire de la Côte-de-l’Or, de la traite des esclaves et de la résistance et résilience des peuples africains. Des visites guidées sont proposées.',
            es: 'Las exposiciones del castillo presentan la historia de la Costa de Oro, la trata de esclavos y la resistencia y resiliencia de los pueblos africanos. Hay visitas guiadas.'
        },
        'Cape Coast Castle is now a place of reflection and reconnection. A memorial plaque honours the ancestors who suffered here, and the castle is a focal point for events such as Emancipation Day and Panafest, which welcome people of the African diaspora home to Ghana.': {
            fr: 'Le château de Cape Coast est aujourd’hui un lieu de réflexion et de retrouvailles. Une plaque commémorative rend hommage aux ancêtres qui y ont souffert. Le château est au cœur d’événements comme le Jour de l’émancipation et Panafest, qui accueillent au Ghana les membres de la diaspora africaine.',
            es: 'El castillo de Cape Coast es hoy un lugar de reflexión y reencuentro. Una placa conmemorativa honra a los antepasados que sufrieron allí. El castillo es punto central de celebraciones como el Día de la Emancipación y Panafest, que reciben en Ghana a personas de la diáspora africana.'
        },
        'Visiting, learning and sharing this story is one way of making sure it is never forgotten.': {
            fr: 'Visiter ce lieu, découvrir son histoire et la partager contribue à que celle-ci ne soit jamais oubliée.',
            es: 'Visitar el lugar, aprender su historia y compartirla ayuda a que nunca se olvide.'
        },
        'The Asante Kingdom is formed': { fr: 'Le royaume asante est fondé', es: 'Se forma el reino asante' },
        'Osei Tutu I and Okomfo Anokye bring the Asante states together after the war against Denkyira. Kumasi becomes the capital, and the Golden Stool becomes the symbol of Asante unity.': {
            fr: 'Après la guerre contre Denkyira, Osei Tutu Ier et Okomfo Anokye unissent les États asante. Kumasi devient la capitale et le Tabouret d’or le symbole de l’unité asante.',
            es: 'Tras la guerra contra Denkyira, Osei Tutu I y Okomfo Anokye unen los estados asantes. Kumasi se convierte en la capital y el Taburete Dorado, en símbolo de la unidad asante.'
        },
        'Prempeh I is sent into exile': { fr: 'Prempeh Ier est envoyé en exil', es: 'Prempeh I es enviado al exilio' },
        'The British remove Asantehene Prempeh I from Kumasi and send him into exile in the Seychelles. The Asante keep his place on the royal stool empty, so they never treat his absence as the end of his reign.': {
            fr: 'Les Britanniques éloignent l’Asantehene Prempeh Ier de Kumasi et l’envoient en exil aux Seychelles. Les Asante laissent sa place sur le trône royal vide : son absence ne signifie pas la fin de son règne.',
            es: 'Los británicos sacan al Asantehene Prempeh I de Kumasi y lo envían al exilio en las Seychelles. Los asantes mantienen vacío su lugar en el trono real; nunca consideran que su ausencia ponga fin a su reinado.'
        },
        'Yaa Asantewaa leads an uprising': { fr: 'Yaa Asantewaa mène une révolte', es: 'Yaa Asantewaa lidera una rebelión' },
        'When the British governor demands the Golden Stool, Yaa Asantewaa of Ejisu leads the last of the Asante wars against the British.': {
            fr: 'Lorsque le gouverneur britannique réclame le Tabouret d’or, Yaa Asantewaa d’Ejisu mène la dernière des guerres asante contre les Britanniques.',
            es: 'Cuando el gobernador británico exige el Taburete Dorado, Yaa Asantewaa, de Ejisu, lidera la última de las guerras asantes contra los británicos.'
        },
        'Prempeh I returns home': { fr: 'Prempeh Ier rentre chez lui', es: 'Prempeh I regresa a casa' },
        'After twenty-eight years in exile, Prempeh I returns to Kumasi and is welcomed back as Asantehene.': {
            fr: 'Après vingt-huit ans d’exil, Prempeh Ier revient à Kumasi et est accueilli de nouveau comme Asantehene.',
            es: 'Tras veintiocho años en el exilio, Prempeh I regresa a Kumasi y es recibido de nuevo como Asantehene.'
        },
        'Manhyia Palace is built': { fr: 'Le palais de Manhyia est construit', es: 'Se construye el palacio Manhyia' },
        'The British colonial government builds the palace as a private residence for Prempeh I. It is a two-storey building with open verandas and a large courtyard, and he accepts it after paying the full cost.': {
            fr: 'Le gouvernement colonial britannique construit le palais comme résidence privée pour Prempeh Ier. Le bâtiment à deux étages comprend des vérandas ouvertes et une grande cour. Prempeh ne l’accepte qu’après en avoir payé la totalité.',
            es: 'El gobierno colonial británico construye el palacio como residencia privada de Prempeh I. Es un edificio de dos plantas, con verandas abiertas y un amplio patio, y él lo acepta después de pagar el coste total.'
        },
        'A new palace is built behind the old one': { fr: 'Un nouveau palais est construit derrière l’ancien', es: 'Se construye un nuevo palacio detrás del antiguo' },
        'Around 1974, Otumfuo Opoku Ware II builds a new palace behind the old one. Until then, the old palace had served as the administrative headquarters of the Asante nation.': {
            fr: 'Vers 1974, Otumfuo Opoku Ware II fait construire un nouveau palais derrière l’ancien. Jusque-là, l’ancien palais sert de siège administratif à la nation asante.',
            es: 'Hacia 1974, Otumfuo Opoku Ware II construye un nuevo palacio detrás del antiguo. Hasta entonces, el antiguo palacio había sido la sede administrativa de la nación asante.'
        },
        'The old palace becomes a museum': { fr: 'L’ancien palais devient un musée', es: 'El antiguo palacio se convierte en museo' },
        'The old palace is rehabilitated and opened as the Manhyia Palace Museum on 12 August 1995, during the celebrations for the 25th anniversary of Opoku Ware II’s reign.': {
            fr: 'L’ancien palais est restauré et ouvre en tant que musée du palais de Manhyia le 12 août 1995, pendant les célébrations du 25e anniversaire du règne d’Opoku Ware II.',
            es: 'El antiguo palacio se rehabilita y abre como Museo del Palacio Manhyia el 12 de agosto de 1995, durante las celebraciones del 25.º aniversario del reinado de Opoku Ware II.'
        },
        'Otumfuo Osei Tutu II becomes Asantehene': { fr: 'Otumfuo Osei Tutu II devient Asantehene', es: 'Otumfuo Osei Tutu II se convierte en Asantehene' },
        'After the death of Opoku Ware II, Otumfuo Osei Tutu II is enstooled on 26 April 1999 as the sixteenth Asantehene. He lives in the new palace.': {
            fr: 'Après la mort d’Opoku Ware II, Otumfuo Osei Tutu II est intronisé le 26 avril 1999 comme seizième Asantehene. Il réside dans le nouveau palais.',
            es: 'Tras la muerte de Opoku Ware II, Otumfuo Osei Tutu II es entronizado el 26 de abril de 1999 como decimosexto Asantehene. Vive en el nuevo palacio.'
        },
        'The Asantehene': { fr: 'L’Asantehene', es: 'El Asantehene' },
        'The Asantehene is the king of the Asante and the head of the Asante Kingdom. Otumfuo Osei Tutu II is the sixteenth to hold the office and a descendant of Osei Tutu I, the founder of the kingdom. Manhyia Palace is the centre of Asante traditional leadership.': {
            fr: 'L’Asantehene est le roi des Asante et le chef du royaume asante. Otumfuo Osei Tutu II est le seizième à occuper cette fonction et descend d’Osei Tutu Ier, fondateur du royaume. Le palais de Manhyia est le centre du pouvoir traditionnel asante.',
            es: 'El Asantehene es el rey de los asantes y la máxima autoridad del reino asante. Otumfuo Osei Tutu II es el decimosexto en ocupar el cargo y descendiente de Osei Tutu I, fundador del reino. El palacio Manhyia es el centro del liderazgo tradicional asante.'
        },
        'The Golden Stool': { fr: 'Le Tabouret d’or', es: 'El Taburete Dorado' },
        'The Golden Stool, Sika Dwa Kofi, is the most sacred symbol of the Asante. According to tradition, Okomfo Anokye brought it down from the sky, and it holds the spirit of the Asante nation. No king ever sits on it, and it is not displayed to visitors.': {
            fr: 'Le Tabouret d’or, Sika Dwa Kofi, est le symbole le plus sacré des Asante. Selon la tradition, Okomfo Anokye le fit descendre du ciel; il abrite l’esprit de la nation asante. Aucun roi ne s’y assoit et il n’est pas présenté aux visiteurs.',
            es: 'El Taburete Dorado, Sika Dwa Kofi, es el símbolo más sagrado de los asantes. Según la tradición, Okomfo Anokye lo hizo descender del cielo y contiene el espíritu de la nación asante. Ningún rey se sienta en él y no se muestra a los visitantes.'
        },
        'The Adae festival': { fr: 'La fête d’Adae', es: 'El festival Adae' },
        'Adae is held every 42 days. The Asantehene receives homage from his chiefs and subjects at the palace, and the grand Sunday observance is called Akwasidae. It is a formal occasion, and visitors can usually attend if they follow the customs.': {
            fr: 'Adae a lieu tous les 42 jours. Au palais, l’Asantehene reçoit l’hommage de ses chefs et de ses sujets; la grande célébration du dimanche s’appelle Akwasidae. C’est une cérémonie officielle à laquelle les visiteurs peuvent généralement assister en respectant les coutumes.',
            es: 'Adae se celebra cada 42 días. En el palacio, el Asantehene recibe el homenaje de sus jefes y súbditos; la gran celebración dominical se llama Akwasidae. Es una ocasión formal a la que los visitantes suelen poder asistir si respetan las costumbres.'
        },
        'The Odwira festival': { fr: 'La fête d’Odwira', es: 'El festival Odwira' },
        'Odwira is an annual national festival that dates back to the founding of the kingdom. It was created as a seal of unity among the Asante states and remains a central moment in the Asante calendar.': {
            fr: 'Odwira est une fête nationale annuelle qui remonte à la fondation du royaume. Créée comme symbole de l’unité des États asante, elle demeure un événement essentiel du calendrier asante.',
            es: 'Odwira es un festival nacional anual que se remonta a la fundación del reino. Se creó como símbolo de unidad entre los estados asantes y sigue siendo una fecha central del calendario asante.'
        },
        'A visit to the Manhyia Palace Museum begins with a short film on the story of the Asante, followed by a guided tour of the old palace. Inside you will see the original furniture arranged as it was in the palace’s early years, life-sized figures of Prempeh I, Nana Yaa Akyaa and Yaa Asantewaa, and gold weights and other royal items.': {
            fr: 'La visite du musée du palais de Manhyia commence par un court film sur l’histoire des Asante, puis se poursuit par une visite guidée de l’ancien palais. Vous y verrez le mobilier d’origine disposé comme autrefois, des statues grandeur nature de Prempeh Ier, Nana Yaa Akyaa et Yaa Asantewaa, ainsi que des poids en or et d’autres objets royaux.',
            es: 'La visita al Museo del Palacio Manhyia comienza con un breve documental sobre la historia de los asantes y continúa con un recorrido guiado por el antiguo palacio. Allí verás el mobiliario original dispuesto como en sus primeros años, figuras a tamaño real de Prempeh I, Nana Yaa Akyaa y Yaa Asantewaa, pesas de oro y otros objetos reales.'
        },
        'Because Manhyia is a working royal court, opening times, ceremonies and visitor rules can change. Check with the museum before you go.': {
            fr: 'Manhyia étant une cour royale en activité, les horaires, les cérémonies et les règles de visite peuvent changer. Renseignez-vous auprès du musée avant votre visite.',
            es: 'Como Manhyia es una corte real activa, los horarios, las ceremonias y las normas para visitantes pueden cambiar. Consulta con el museo antes de ir.'
        },
        'Swedes build a trading lodge': { fr: 'Les Suédois construisent un comptoir commercial', es: 'Los suecos construyen un puesto comercial' },
        'The Swedish African Company builds an earthen lodge on the coast at Osu.': {
            fr: 'La Compagnie suédoise d’Afrique construit un poste en terre sur la côte d’Osu.',
            es: 'La Compañía Sueca de África construye un puesto de tierra en la costa de Osu.'
        },
        'The Danes build Christiansborg': { fr: 'Les Danois construisent Christiansborg', es: 'Los daneses construyen Christiansborg' },
        'The Danish governor at Cape Coast buys the site from Okaikoi, a Ga chief, for 3,200 gold florins. The Danes replace the lodge with a stone fort. The Ga still keep a shrine on the castle grounds and perform annual rituals there.': {
            fr: 'Le gouverneur danois de Cape Coast achète le site à Okaikoi, un chef ga, pour 3 200 florins d’or. Les Danois remplacent le poste par un fort en pierre. Les Ga entretiennent toujours un sanctuaire dans l’enceinte du château et y célèbrent des rites annuels.',
            es: 'El gobernador danés de Cape Coast compra el lugar a Okaikoi, jefe ga, por 3.200 florines de oro. Los daneses sustituyen el puesto por un fuerte de piedra. Los ga aún conservan un santuario en los terrenos del castillo y celebran allí rituales anuales.'
        },
        'A mutiny and a change of hands': { fr: 'Une mutinerie et un changement de pouvoir', es: 'Un motín y un cambio de manos' },
        'A mutiny kills the fort’s Danish commander. Over the following decades the castle passes between Denmark-Norway, Portugal and the Akwamu.': {
            fr: 'Une mutinerie coûte la vie au commandant danois du fort. Au cours des décennies suivantes, le château passe entre les mains du Danemark-Norvège, du Portugal et des Akwamu.',
            es: 'Un motín acaba con la vida del comandante danés del fuerte. En las décadas siguientes, el castillo pasa entre Dinamarca-Noruega, Portugal y los akwamu.'
        },
        'Denmark sells the castle to Britain': { fr: 'Le Danemark vend le château à la Grande-Bretagne', es: 'Dinamarca vende el castillo a Gran Bretaña' },
        'Trade declined sharply after Denmark abolished the slave trade in 1803. In 1850 the Danes sold the castle to the British.': {
            fr: 'Le commerce décline fortement après l’abolition de la traite des esclaves par le Danemark en 1803. En 1850, les Danois vendent le château aux Britanniques.',
            es: 'El comercio disminuye drásticamente después de que Dinamarca aboliera la trata de esclavos en 1803. En 1850, los daneses venden el castillo a los británicos.'
        },
        'The seat of government': { fr: 'Le siège du gouvernement', es: 'La sede del gobierno' },
        'British governors ruled from the castle from 1876. After a period of disuse, it becomes the seat of government again in 1902 and remains the official residence of governors and, after independence, of Ghana’s presidents.': {
            fr: 'Les gouverneurs britanniques dirigent le pays depuis le château à partir de 1876. Après une période d’inutilisation, celui-ci redevient le siège du gouvernement en 1902 et demeure la résidence officielle des gouverneurs puis, après l’indépendance, des présidents du Ghana.',
            es: 'Los gobernadores británicos gobiernan desde el castillo a partir de 1876. Tras un periodo de desuso, vuelve a ser sede del gobierno en 1902 y sigue siendo la residencia oficial de los gobernadores y, después de la independencia, de los presidentes de Ghana.'
        },
        'The castle is inscribed alongside the other Forts and Castles of Ghana.': {
            fr: 'Le château est inscrit avec les autres forts et châteaux du Ghana.',
            es: 'El castillo se inscribe junto con los demás fuertes y castillos de Ghana.'
        },
        'The government moves out': { fr: 'Le gouvernement quitte le château', es: 'El gobierno se traslada' },
        'The seat of government moves to Jubilee House, ending the castle’s long role as the centre of national government.': {
            fr: 'Le siège du gouvernement est transféré à Jubilee House, mettant fin au long rôle du château comme centre du gouvernement national.',
            es: 'La sede del gobierno se traslada a Jubilee House, poniendo fin al largo papel del castillo como centro del gobierno nacional.'
        },
        'The Presidential Museum opens': { fr: 'Le musée présidentiel ouvre ses portes', es: 'Abre el Museo Presidencial' },
        'President Akufo-Addo opens the Presidential Museum at the castle as part of Ghana’s 60th anniversary celebrations.': {
            fr: 'Le président Akufo-Addo inaugure le musée présidentiel du château dans le cadre des célébrations du 60e anniversaire du Ghana.',
            es: 'El presidente Akufo-Addo inaugura el Museo Presidencial en el castillo como parte de las celebraciones del 60.º aniversario de Ghana.'
        },
        'Dungeons at the ends of the castle held enslaved people before they were taken to the ships. Guided tours take visitors through them.': {
            fr: 'Les cachots situés aux extrémités du château enfermaient les personnes réduites en esclavage avant leur embarquement. Des visites guidées les font découvrir aux visiteurs.',
            es: 'Las mazmorras situadas en los extremos del castillo retenían a personas esclavizadas antes de llevarlas a los barcos. Las visitas guiadas permiten recorrerlas.'
        },
        'A walkway leads from the castle to the sea, where captives were loaded onto ships. It is a place where many visitors stop to reflect.': {
            fr: 'Un passage mène du château à la mer, où les captifs étaient embarqués. De nombreux visiteurs s’y arrêtent pour se recueillir.',
            es: 'Un pasaje conduce desde el castillo hasta el mar, donde embarcaban a los cautivos. Muchos visitantes se detienen allí para reflexionar.'
        },
        'The rooms of state': { fr: 'Les salles officielles', es: 'Las salas oficiales' },
        'Rooms once used by British officials and later by Ghana’s presidents show how the castle worked as the centre of government for more than a century.': {
            fr: 'Les salles autrefois utilisées par les responsables britanniques puis par les présidents du Ghana témoignent du rôle du château comme centre du gouvernement pendant plus d’un siècle.',
            es: 'Las salas que utilizaron los funcionarios británicos y, más tarde, los presidentes de Ghana muestran cómo el castillo fue el centro del gobierno durante más de un siglo.'
        },
        'The Presidential Museum': { fr: 'Le musée présidentiel', es: 'El Museo Presidencial' },
        'Displays include photographs of great Ghanaians and Pan-Africanists and an exhibition on Ghana’s road to independence. The museum also presents artefacts and personal items of past presidents.': {
            fr: 'Les expositions comprennent des photographies de grandes figures ghanéennes et panafricaines ainsi qu’une présentation du chemin du Ghana vers l’indépendance. Le musée expose aussi des objets et effets personnels d’anciens présidents.',
            es: 'La exposición incluye fotografías de grandes figuras ghanesas y panafricanistas, además de una muestra sobre el camino de Ghana hacia la independencia. El museo también presenta objetos y pertenencias personales de antiguos presidentes.'
        },
        'The grounds': { fr: 'Les jardins', es: 'Los terrenos' },
        'The castle’s gardens look out over the sea and the fishing boats of Osu. The late President John Evans Atta Mills is buried in the grounds.': {
            fr: 'Les jardins du château donnent sur la mer et les bateaux de pêche d’Osu. L’ancien président John Evans Atta Mills est enterré dans l’enceinte.',
            es: 'Los jardines del castillo dan al mar y a los barcos pesqueros de Osu. El expresidente John Evans Atta Mills está enterrado en estos terrenos.'
        },
        'Visits are usually by guided tour, which takes you through the dungeons, the rooms of state, the walkway to the Door of No Return, the gardens and the museum. The castle stands on the coast in Osu, a busy part of Accra.': {
            fr: 'Les visites se font généralement avec un guide et vous conduisent dans les cachots, les salles officielles, le passage vers la porte du non-retour, les jardins et le musée. Le château se trouve sur la côte d’Osu, un quartier animé d’Accra.',
            es: 'Las visitas suelen ser guiadas e incluyen las mazmorras, las salas oficiales, el pasaje a la Puerta del No Retorno, los jardines y el museo. El castillo está en la costa de Osu, una zona muy concurrida de Accra.'
        },
        'Opening times, tour arrangements and ticket prices can change, so check with the Ghana Museums and Monuments Board before you go.': {
            fr: 'Les horaires, les modalités de visite et les tarifs peuvent changer. Renseignez-vous auprès du Conseil des musées et monuments du Ghana avant de vous déplacer.',
            es: 'Los horarios, las visitas guiadas y los precios de las entradas pueden cambiar. Consulta con la Junta de Museos y Monumentos de Ghana antes de ir.'
        },
        'The square is completed': { fr: 'La place est achevée', es: 'Se termina la plaza' },
        'The nation’s ceremonial heart': { fr: 'Le cœur cérémoniel de la nation', es: 'El corazón ceremonial de la nación' },
        'The square hosts civic and military parades, national festivals and concerts. The Independence Day parade on 6 March is the most important event of the year.': {
            fr: 'La place accueille des défilés civils et militaires, des festivals nationaux et des concerts. Le défilé de la fête de l’Indépendance, le 6 mars, est l’événement le plus important de l’année.',
            es: 'La plaza acoge desfiles civiles y militares, festivales nacionales y conciertos. El desfile del Día de la Independencia, el 6 de marzo, es el evento más importante del año.'
        },
        'The Independence Arch': { fr: 'L’arche de l’Indépendance', es: 'El Arco de la Independencia' },
        'The arch stands at the southern end of the square with the Gulf of Guinea behind it, and is one of the monuments to Ghana’s struggle for independence.': {
            fr: 'L’arche se dresse à l’extrémité sud de la place, face au golfe de Guinée. Elle commémore la lutte du Ghana pour l’indépendance.',
            es: 'El arco se encuentra en el extremo sur de la plaza, con el golfo de Guinea detrás, y conmemora la lucha de Ghana por la independencia.'
        },
        'The Black Star Gate': { fr: 'La porte de l’Étoile noire', es: 'La Puerta de la Estrella Negra' },
        'This monument stands on a roundabout just north of the square and is topped by the Black Star of Africa. It bears the inscriptions AD 1957 and Freedom and Justice.': {
            fr: 'Ce monument se trouve sur un rond-point juste au nord de la place. Il est surmonté de l’Étoile noire d’Afrique et porte les inscriptions « AD 1957 » et « Liberté et justice ».',
            es: 'Este monumento está en una rotonda justo al norte de la plaza y lo corona la Estrella Negra de África. Lleva las inscripciones «AD 1957» y «Libertad y justicia».'
        },
        'The Memorial of the Unknown Soldier': { fr: 'Le mémorial du Soldat inconnu', es: 'El Monumento al Soldado Desconocido' },
        'Facing the arch from the opposite side of the square, this memorial honours the Ghanaian soldiers who died fighting for their country.': {
            fr: 'Situé face à l’arche, de l’autre côté de la place, ce mémorial rend hommage aux soldats ghanéens morts en défendant leur pays.',
            es: 'Situado frente al arco, al otro lado de la plaza, este monumento honra a los soldados ghaneses que murieron luchando por su país.'
        },
        'The eternal flame': { fr: 'La flamme éternelle', es: 'La llama eterna' },
        'An eternal flame, first lit by Kwame Nkrumah, burns as a symbol of the undying spirit of independence and freedom.': {
            fr: 'Une flamme éternelle, allumée pour la première fois par Kwame Nkrumah, brûle en symbole de l’esprit indomptable d’indépendance et de liberté.',
            es: 'Una llama eterna, encendida por primera vez por Kwame Nkrumah, arde como símbolo del espíritu inquebrantable de independencia y libertad.'
        },
        'On 6 March 1957 the Gold Coast becomes Ghana, the first sub-Saharan African country to gain independence from British colonial rule.': {
            fr: 'Le 6 mars 1957, la Côte-de-l’Or devient le Ghana, premier pays d’Afrique subsaharienne à obtenir son indépendance de la domination coloniale britannique.',
            es: 'El 6 de marzo de 1957, la Costa de Oro se convierte en Ghana, el primer país del África subsahariana en independizarse del dominio colonial británico.'
        },
        'Nkrumah commissions the square': { fr: 'Nkrumah commande la construction de la place', es: 'Nkrumah encarga la construcción de la plaza' },
        'Soon after independence, Kwame Nkrumah orders the construction of a large public square to celebrate the new nation and promote national unity.': {
            fr: 'Peu après l’indépendance, Kwame Nkrumah ordonne la construction d’une grande place publique pour célébrer la nouvelle nation et promouvoir l’unité nationale.',
            es: 'Poco después de la independencia, Kwame Nkrumah ordena construir una gran plaza pública para celebrar la nueva nación y fomentar la unidad nacional.'
        },
        'The square is finished in time for the state visit of Queen Elizabeth II, and the first parade is held there.': {
            fr: 'La place est achevée à temps pour la visite officielle de la reine Elizabeth II, et le premier défilé s’y déroule.',
            es: 'La plaza se termina a tiempo para la visita de Estado de la reina Isabel II y allí se celebra el primer desfile.'
        },
        'Today': { fr: 'Aujourd’hui', es: 'Hoy' },
        'Ghana becomes independent': { fr: 'Le Ghana devient indépendant', es: 'Ghana alcanza la independencia' },
        'Independence Square is an open public space, and many visitors come to photograph the Independence Arch and the Black Star Gate. It stands next to the Accra Sports Stadium and the Kwame Nkrumah Memorial Park, so all three are easy to see on one trip.': {
            fr: 'La place de l’Indépendance est un espace public ouvert où de nombreux visiteurs viennent photographier l’arche de l’Indépendance et la porte de l’Étoile noire. Elle se trouve près du stade sportif d’Accra et du parc commémoratif Kwame Nkrumah; les trois sites sont faciles à visiter au cours du même trajet.',
            es: 'La Plaza de la Independencia es un espacio público abierto donde muchos visitantes fotografían el Arco de la Independencia y la Puerta de la Estrella Negra. Está junto al Estadio Deportivo de Accra y al Parque Conmemorativo Kwame Nkrumah, por lo que los tres lugares se pueden visitar fácilmente en el mismo recorrido.'
        },
        'The square is used for national events, so parts of it can be busy or closed on parade and event days. Check ahead before you go.': {
            fr: 'La place accueille des événements nationaux; certaines parties peuvent donc être très fréquentées ou fermées les jours de défilé et de manifestation. Renseignez-vous avant votre visite.',
            es: 'La plaza se utiliza para actos nacionales, así que algunas zonas pueden estar concurridas o cerradas durante desfiles y eventos. Infórmate antes de ir.'
        },
        'Nkrumah is born': { fr: 'Naissance de Kwame Nkrumah', es: 'Nace Kwame Nkrumah' },
        'Kwame Nkrumah is born': { fr: 'Kwame Nkrumah voit le jour', es: 'Nace Kwame Nkrumah' },
        'Nkrumah is born in Nkroful, a small town in what is now Ghana’s Western Region.': {
            fr: 'Nkrumah naît à Nkroful, une petite ville située dans l’actuelle région occidentale du Ghana.',
            es: 'Nkrumah nace en Nkroful, una pequeña localidad de la actual Región Occidental de Ghana.'
        },
        'Independence is declared': { fr: 'L’indépendance est proclamée', es: 'Se declara la independencia' },
        'At the Old Polo Grounds, Nkrumah and his colleagues declare Ghana free from British colonial rule before a huge crowd. Ghana becomes the first sub-Saharan African country to gain independence.': {
            fr: 'Au terrain de polo, Nkrumah et ses collègues proclament devant une foule immense la libération du Ghana de la domination coloniale britannique. Le Ghana devient le premier pays d’Afrique subsaharienne à obtenir son indépendance.',
            es: 'En los antiguos terrenos de polo, Nkrumah y sus compañeros proclaman ante una gran multitud la libertad de Ghana del dominio colonial británico. Ghana se convierte en el primer país del África subsahariana en lograr la independencia.'
        },
        'Nkrumah is overthrown': { fr: 'Nkrumah est renversé', es: 'Nkrumah es derrocado' },
        'A coup ends his rule, and his statue on the Old Polo Grounds is destroyed.': {
            fr: 'Un coup d’État met fin à son gouvernement et sa statue sur l’ancien terrain de polo est détruite.',
            es: 'Un golpe de Estado pone fin a su gobierno y destruye su estatua en los antiguos terrenos de polo.'
        },
        'Nkrumah dies in exile': { fr: 'Nkrumah meurt en exil', es: 'Nkrumah muere en el exilio' },
        'He dies in 1972, and his remains are returned to Nkroful, his birthplace.': {
            fr: 'Il meurt en 1972 et sa dépouille est ramenée à Nkroful, son lieu de naissance.',
            es: 'Muere en 1972 y sus restos son trasladados a Nkroful, su lugar de nacimiento.'
        },
        'The memorial park opens': { fr: 'Ouverture du parc commémoratif', es: 'Abre el parque conmemorativo' },
        'The park opens on the Old Polo Grounds with a mausoleum designed by Don Arthur. Nkrumah’s remains are placed in the mausoleum and his image is restored to the site.': {
            fr: 'Le parc ouvre sur l’ancien terrain de polo avec un mausolée conçu par Don Arthur. La dépouille de Nkrumah y est transférée et son image retrouve sa place sur le site.',
            es: 'El parque abre en los antiguos terrenos de polo con un mausoleo diseñado por Don Arthur. Los restos de Nkrumah se trasladan al mausoleo y su imagen vuelve al lugar.'
        },
        'Closed for redevelopment': { fr: 'Fermeture pour réaménagement', es: 'Cierre por remodelación' },
        'The government closes the park so that it can be redeveloped into a more fitting tribute.': {
            fr: 'Le gouvernement ferme le parc afin de le réaménager pour en faire un hommage plus digne.',
            es: 'El gobierno cierra el parque para remodelarlo y convertirlo en un homenaje más apropiado.'
        },
        'The park reopens': { fr: 'Réouverture du parc', es: 'Reabre el parque' },
        'President Akufo-Addo commissions the redeveloped park on 4 July 2023, and it reopens to the public on 11 July.': {
            fr: 'Le président Akufo-Addo inaugure le parc réaménagé le 4 juillet 2023, puis il rouvre au public le 11 juillet.',
            es: 'El presidente Akufo-Addo inaugura el parque remodelado el 4 de julio de 2023 y vuelve a abrir al público el 11 de julio.'
        },
        'The mausoleum': { fr: 'Le mausolée', es: 'El mausoleo' },
        'Designed by Don Arthur, the mausoleum represents an upside-down sword, a symbol of peace in Akan culture. It is covered in Italian marble, has a black star at the top to symbolise unity, and holds the remains of Nkrumah and Fathia Nkrumah.': {
            fr: 'Conçu par Don Arthur, le mausolée évoque une épée renversée, symbole de paix dans la culture akan. Recouvert de marbre italien et surmonté d’une étoile noire symbolisant l’unité, il abrite les dépouilles de Nkrumah et de Fathia Nkrumah.',
            es: 'Diseñado por Don Arthur, el mausoleo representa una espada invertida, símbolo de paz en la cultura akan. Está revestido de mármol italiano, tiene una estrella negra en la parte superior como símbolo de unidad y alberga los restos de Nkrumah y Fathia Nkrumah.'
        },
        'The statue and the horn blowers': { fr: 'La statue et les sonneurs de cor', es: 'La estatua y los tocadores de cuerno' },
        'A tall bronze statue of Nkrumah stands in front of the mausoleum. Visitors walk between two rows of horn blowers, seven on each side. In Ghanaian culture horns are blown to welcome important guests, so every visitor is treated as one.': {
            fr: 'Une haute statue de bronze de Nkrumah se dresse devant le mausolée. Les visiteurs passent entre deux rangées de sonneurs de cor, sept de chaque côté. Dans la culture ghanéenne, les cors accueillent les invités importants : chaque visiteur est ainsi honoré.',
            es: 'Una alta estatua de bronce de Nkrumah se alza frente al mausoleo. Los visitantes caminan entre dos filas de tocadores de cuerno, siete a cada lado. En la cultura ghanesa, los cuernos dan la bienvenida a los invitados importantes, por lo que cada visitante recibe ese honor.'
        },
        'The underground museum displays rare artefacts and personal items connected to Nkrumah’s life and to Ghana’s independence. Guided tours give a deeper look at the struggle for independence.': {
            fr: 'Le musée souterrain présente des objets rares et des effets personnels liés à la vie de Nkrumah et à l’indépendance du Ghana. Les visites guidées permettent d’approfondir l’histoire de cette lutte.',
            es: 'El museo subterráneo exhibe objetos poco comunes y pertenencias personales relacionadas con la vida de Nkrumah y la independencia de Ghana. Las visitas guiadas permiten conocer mejor la lucha por la independencia.'
        },
        'The fountain': { fr: 'La fontaine', es: 'La fuente' },
        'After the redevelopment, the fountain was made audio-visual, with the water moving in time to drums and flutes.': {
            fr: 'Après le réaménagement, la fontaine est devenue un spectacle audiovisuel où l’eau évolue au rythme des tambours et des flûtes.',
            es: 'Tras la remodelación, la fuente se convirtió en un espectáculo audiovisual en el que el agua se mueve al ritmo de tambores y flautas.'
        },
        'The park is in the centre of Accra, close to Independence Square and the Accra Sports Stadium, so it is easy to visit them on the same trip. Tours of the museum and mausoleum are available.': {
            fr: 'Le parc se trouve au centre d’Accra, près de la place de l’Indépendance et du stade sportif d’Accra; il est donc facile de visiter les trois lieux au cours du même trajet. Des visites du musée et du mausolée sont proposées.',
            es: 'El parque está en el centro de Accra, cerca de la Plaza de la Independencia y del Estadio Deportivo de Accra, por lo que es fácil visitar los tres lugares en el mismo recorrido. Se ofrecen visitas guiadas al museo y al mausoleo.'
        },
        'Opening times and ticket prices can change, so check before you go.': {
            fr: 'Les horaires et les tarifs peuvent changer; vérifiez les informations avant votre visite.',
            es: 'Los horarios y los precios de las entradas pueden cambiar; comprueba la información antes de ir.'
        },
        'Cape Coast Castle: The Story — ANANSE': { fr: 'Château de Cape Coast : son histoire — ANANSE', es: 'Castillo de Cape Coast: su historia — ANANSE' },
        'Manhyia Palace: The Story — ANANSE': { fr: 'Palais de Manhyia : son histoire — ANANSE', es: 'Palacio Manhyia: su historia — ANANSE' },
        'Osu Castle: The Story — ANANSE': { fr: 'Château d’Osu : son histoire — ANANSE', es: 'Castillo de Osu: su historia — ANANSE' },
        'Independence Square: The Story — ANANSE': { fr: 'Place de l’Indépendance : son histoire — ANANSE', es: 'Plaza de la Independencia: su historia — ANANSE' },
        'Kwame Nkrumah Memorial Park: The Story — ANANSE': { fr: 'Parc commémoratif Kwame Nkrumah : son histoire — ANANSE', es: 'Parque Conmemorativo Kwame Nkrumah: su historia — ANANSE' },
        'The history of Cape Coast Castle, from a Swedish trading lodge to a centre of the transatlantic slave trade and a place of remembrance.': {
            fr: 'L’histoire du château de Cape Coast, d’un comptoir suédois à un centre de la traite transatlantique des esclaves et un lieu de mémoire.',
            es: 'La historia del castillo de Cape Coast, desde un puesto comercial sueco hasta un centro de la trata transatlántica de esclavos y un lugar de memoria.'
        },
        'The story of Manhyia Palace in Kumasi, from the founding of the Asante Kingdom and Prempeh I’s return from exile to the palace museum and the living royal court of today.': {
            fr: 'L’histoire du palais de Manhyia à Kumasi, de la fondation du royaume asante et du retour d’exil de Prempeh Ier au musée du palais et à la cour royale toujours active.',
            es: 'La historia del palacio Manhyia en Kumasi, desde la fundación del reino asante y el regreso del exilio de Prempeh I hasta el museo del palacio y la corte real activa de hoy.'
        },
        'The story of Osu Castle (Christiansborg) in Accra, from a Danish trading fort and centre of the slave trade to the seat of Ghana’s government and today’s Presidential Museum.': {
            fr: 'L’histoire du château d’Osu (Christiansborg), à Accra, d’un fort commercial danois et centre de la traite des esclaves au siège du gouvernement ghanéen et à l’actuel musée présidentiel.',
            es: 'La historia del castillo de Osu (Christiansborg), en Accra, desde un fuerte comercial danés y centro de la trata de esclavos hasta sede del gobierno de Ghana y actual Museo Presidencial.'
        },
        'The story of Independence Square (Black Star Square) in Accra, Ghana’s national parade ground, built after independence and home to the Independence Arch and the Black Star Gate.': {
            fr: 'L’histoire de la place de l’Indépendance (Black Star Square), terrain national des défilés à Accra, construite après l’indépendance et abritant l’arche de l’Indépendance et la porte de l’Étoile noire.',
            es: 'La historia de la Plaza de la Independencia (Black Star Square), plaza nacional de desfiles de Accra, construida tras la independencia y sede del Arco de la Independencia y la Puerta de la Estrella Negra.'
        },
        'The story of the Kwame Nkrumah Memorial Park and Mausoleum in Accra, built on the Old Polo Grounds where Ghana’s independence was declared in 1957.': {
            fr: 'L’histoire du parc commémoratif et du mausolée Kwame Nkrumah, à Accra, construits sur l’ancien terrain de polo où l’indépendance du Ghana fut proclamée en 1957.',
            es: 'La historia del Parque Conmemorativo y Mausoleo Kwame Nkrumah, en Accra, construido en los antiguos terrenos de polo donde se declaró la independencia de Ghana en 1957.'
        }
    };

    const originalStoryText = new WeakMap();
    const originalStoryAttributes = new WeakMap();
    const originalStoryTitles = new WeakMap();

    function normalizeStoryText(text) {
        return text.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
    }

    const normalizedStoryPageTranslations = Object.create(null);
    Object.keys(storyPageTranslations).forEach((key) => {
        normalizedStoryPageTranslations[normalizeStoryText(key)] = storyPageTranslations[key];
    });

    function getStoryText(text) {
        const sourceText = normalizeStoryText(text);
        const translation = normalizedStoryPageTranslations[sourceText];
        return translation && translation[state.language] ? translation[state.language] : sourceText;
    }

    function getPlanText(key, params = {}) {
        const dictionary = planPageTranslations[state.language] || planPageTranslations[DEFAULT_LANGUAGE];
        const fallback = planPageTranslations[DEFAULT_LANGUAGE][key] || key;
        return replacePlaceholders(dictionary[key] || fallback, params);
    }

    function getTrailText(key, params = {}) {
        const dictionary = trailPageTranslations[state.language] || trailPageTranslations[DEFAULT_LANGUAGE];
        const fallbackDictionary = trailPageTranslations[DEFAULT_LANGUAGE];
        function resolveTrailValue(source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) return source[key];
            const segments = key.split('.');
            if (segments[0] === 'trail' && segments.length > 2) {
                const trailDictionary = source['trail.' + segments[1]];
                return resolveTranslationValue(trailDictionary, segments.slice(2).join('.'));
            }
            return resolveTranslationValue(source, key);
        }
        const value = resolveTrailValue(dictionary) ??
            resolveTrailValue(fallbackDictionary) ??
            key;
        return replacePlaceholders(value, params);
    }

    function translateTrailPage(language) {
        if (!document.body.classList.contains('trail-page')) return;

        document.querySelectorAll('[data-trail-lang]').forEach((element) => {
            const params = {};
            if (element.dataset.trailCount !== undefined) params.count = element.dataset.trailCount;
            if (element.dataset.trailDone !== undefined) params.done = element.dataset.trailDone;
            if (element.dataset.trailTotal !== undefined) params.total = element.dataset.trailTotal;
            element.textContent = getTrailText(element.dataset.trailLang, params);
        });
        document.querySelectorAll('[data-trail-lang-aria]').forEach((element) => {
            element.setAttribute('aria-label', getTrailText(element.dataset.trailLangAria));
        });

        const pageTranslations = trailPageTranslations[language] || trailPageTranslations[DEFAULT_LANGUAGE];
        document.title = pageTranslations['page.title'];
        const description = document.querySelector('meta[name="description"]');
        if (description) description.content = pageTranslations['page.description'];
    }

    function translatePlanPage(language) {
        if (!document.body.classList.contains('plan-page')) return;

        document.querySelectorAll('[data-plan-lang]').forEach((element) => {
            const text = getPlanText(element.dataset.planLang);
            if (text) element.textContent = text;
        });
        document.querySelectorAll('[data-plan-lang-html]').forEach((element) => {
            const text = getPlanText(element.dataset.planLangHtml);
            if (text) element.innerHTML = text;
        });
        document.querySelectorAll('option[data-plan-lang]').forEach((option) => {
            const params = option.dataset.planCount ? { count: option.dataset.planCount } : {};
            option.textContent = getPlanText(option.dataset.planLang, params);
        });
        document.querySelectorAll('[data-plan-aria-label]').forEach((element) => {
            element.setAttribute('aria-label', getPlanText(element.dataset.planAriaLabel));
        });
        document.querySelectorAll('[data-plan-alt]').forEach((element) => {
            element.alt = getPlanText(element.dataset.planAlt);
        });

        const title = planPageTranslations[language] && planPageTranslations[language]['page.title'];
        if (title) document.title = title;
    }

    function translateStoryPage(language) {
        if (!document.body.classList.contains('story-page')) return;

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let textNode;
        while ((textNode = walker.nextNode())) {
            if (textNode.parentElement.closest('script, style, noscript, [data-i18n], [data-i18n-html]')) continue;

            if (!originalStoryText.has(textNode)) {
                originalStoryText.set(textNode, textNode.data);
            }

            const original = originalStoryText.get(textNode);
            const normalized = normalizeStoryText(original);
            const translation = normalizedStoryPageTranslations[normalized];
            if (!normalized || !translation) continue;

            const leadingSpace = (original.match(/^\s*/) || [''])[0];
            const trailingSpace = (original.match(/\s*$/) || [''])[0];
            textNode.data = language === DEFAULT_LANGUAGE
                ? original
                : `${leadingSpace}${translation[language] || normalized}${trailingSpace}`;
        }

        document.querySelectorAll('title').forEach((element) => {
            if (!originalStoryTitles.has(element)) originalStoryTitles.set(element, element.textContent);
            const original = originalStoryTitles.get(element);
            const normalized = normalizeStoryText(original);
            const translation = normalizedStoryPageTranslations[normalized];
            if (translation) {
                element.textContent = language === DEFAULT_LANGUAGE ? original : translation[language] || normalized;
            }
        });

        document.querySelectorAll('body.story-page [aria-label], body.story-page [alt], body.story-page [title], meta[name="description"]').forEach((element) => {
            const attributes = element.matches('meta[name="description"]')
                ? ['content']
                : ['aria-label', 'alt', 'title'];
            attributes.forEach((attribute) => {
                if (!element.hasAttribute(attribute)) return;
                let originals = originalStoryAttributes.get(element);
                if (!originals) {
                    originals = {};
                    originalStoryAttributes.set(element, originals);
                }
                if (!(attribute in originals)) originals[attribute] = element.getAttribute(attribute);

                const original = originals[attribute];
                const translation = normalizedStoryPageTranslations[normalizeStoryText(original)];
                if (translation) {
                    element.setAttribute(attribute, language === DEFAULT_LANGUAGE ? original : translation[language] || original);
                }
            });
        });

        const toggle = document.getElementById('toggleAll');
        if (toggle) {
            const items = document.querySelectorAll('.s-timeline details');
            const areAllOpen = items.length > 0 && Array.prototype.every.call(items, (item) => item.open);
            toggle.textContent = getStoryText(areAllOpen ? 'Close all' : 'Open all');
        }

        const listenButton = document.getElementById('listenBtn');
        if (listenButton) {
            const isListening = Boolean(listenButton.querySelector('.fa-stop'));
            const icon = isListening ? 'fa-stop' : 'fa-headphones';
            const label = getStoryText(isListening ? 'Stop listening' : 'Listen to the story');
            listenButton.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
        }

        const pauseButton = document.getElementById('pauseBtn');
        if (pauseButton) {
            const isPaused = pauseButton.dataset.paused === 'true';
            pauseButton.innerHTML = `<i class="fa-solid fa-${isPaused ? 'play' : 'pause'}"></i> ${getStoryText(isPaused ? 'Resume' : 'Pause')}`;
        }
    }

    function getPreferredSpeechVoice(language) {
        if (!('speechSynthesis' in window)) return null;

        const voices = window.speechSynthesis.getVoices();
        const languageVoices = voices.filter((voice) => (voice.lang || '').toLowerCase().startsWith(language));
        const femaleVoicePattern = /female|woman|zira|samantha|victoria|karen|susan|moira|tessa|fiona|amelie|marie|hortense|helena|monica|paulina|lucia|sofia|sabina|elena|laura|carmen|aria|jenny|libby|sonia|natasha|eva|google.*(français|france|español|spanish)/i;
        return languageVoices.find((voice) => femaleVoicePattern.test(voice.name))
            || languageVoices.find((voice) => voice.default)
            || null;
    }

    function initializeStoryAudio() {
        const listenButton = document.getElementById('listenBtn');
        const pauseButton = document.getElementById('pauseBtn');
        if (!listenButton || !pauseButton) return;

        const status = listenButton.closest('.s-listen').querySelector('p');
        if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') {
            listenButton.disabled = true;
            pauseButton.disabled = true;
            if (status) status.textContent = getStoryText('Audio playback is not supported in this browser.');
            return;
        }

        const synth = window.speechSynthesis;
        let mode = 'idle';
        let chunks = [];
        let chunkIndex = 0;
        let playbackId = 0;

        function updateControls() {
            const isActive = mode === 'playing' || mode === 'paused';
            const isPaused = mode === 'paused';
            listenButton.innerHTML = `<i class="fa-solid ${isActive ? 'fa-stop' : 'fa-headphones'}"></i> ${getStoryText(isActive ? 'Stop listening' : 'Listen to the story')}`;
            pauseButton.disabled = !isActive;
            pauseButton.dataset.paused = String(isPaused);
            pauseButton.setAttribute('aria-pressed', String(isPaused));
            pauseButton.innerHTML = `<i class="fa-solid fa-${isPaused ? 'play' : 'pause'}"></i> ${getStoryText(isPaused ? 'Resume' : 'Pause')}`;
            if (status && mode !== 'error') {
                status.textContent = mode === 'playing'
                    ? getStoryText('Playing story')
                    : mode === 'paused'
                        ? getStoryText('Story paused')
                        : getStoryText('Ready to listen');
            }
        }

        function finishPlayback(id, errorMessage) {
            if (id !== playbackId) return;
            mode = errorMessage ? 'error' : 'idle';
            chunks = [];
            chunkIndex = 0;
            updateControls();
            if (errorMessage && status) status.textContent = getStoryText(errorMessage);
        }

        function speakNext(id) {
            if (id !== playbackId || mode !== 'playing') return;
            if (chunkIndex >= chunks.length) {
                finishPlayback(id);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
            const language = state.language;
            utterance.lang = { en: 'en-GB', fr: 'fr-FR', es: 'es-ES' }[language];
            utterance.rate = 0.82;
            utterance.pitch = 1.08;
            const voice = getPreferredSpeechVoice(language);
            if (voice) utterance.voice = voice;
            utterance.onend = () => {
                if (id !== playbackId) return;
                chunkIndex += 1;
                speakNext(id);
            };
            utterance.onerror = (event) => {
                if (id !== playbackId || event.error === 'canceled' || event.error === 'interrupted') return;
                finishPlayback(id, 'Audio playback could not continue.');
            };
            synth.speak(utterance);
        }

        function stopPlayback() {
            playbackId += 1;
            synth.cancel();
            mode = 'idle';
            chunks = [];
            chunkIndex = 0;
            updateControls();
        }

        listenButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (mode === 'playing' || mode === 'paused') {
                stopPlayback();
                return;
            }

            chunks = Array.from(document.querySelectorAll(
                '#story h2, #story .s-prose p, #story .s-facts > div, #story .s-note, ' +
                '#timeline h2, #timeline .s-tools p, #timeline details, ' +
                '#inside h2, #inside details, #traditions h2, #traditions details, ' +
                '#monuments h2, #monuments details, #visit h2, #visit .s-prose p, ' +
                '#remember h2, #remember .s-prose p, .s-next h2, .s-next p'
            )).map((element) => {
                if (element.tagName === 'DETAILS') {
                    const summary = element.querySelector('summary');
                    const paragraph = element.querySelector('p');
                    return [summary ? summary.textContent : '', paragraph ? paragraph.textContent : '']
                        .filter(Boolean).join('. ');
                }
                return element.textContent;
            }).map((text) => text.replace(/\s+/g, ' ').trim()).filter(Boolean);

            if (!chunks.length) {
                finishPlayback(playbackId, 'Audio playback could not continue.');
                return;
            }
            chunkIndex = 0;
            playbackId += 1;
            mode = 'playing';
            updateControls();
            speakNext(playbackId);
        });

        pauseButton.addEventListener('click', () => {
            if (mode === 'playing') {
                synth.pause();
                mode = 'paused';
            } else if (mode === 'paused') {
                synth.resume();
                mode = 'playing';
            } else {
                return;
            }
            updateControls();
        });

        document.addEventListener('ananse:languagechange', () => {
            if (mode === 'playing' || mode === 'paused') stopPlayback();
            else updateControls();
        });
        window.addEventListener('beforeunload', () => synth.cancel());
        updateControls();
    }

    function getStoredLanguage() {
        try {
            const savedLanguage = localStorage.getItem(STORAGE_KEY);
            return savedLanguage && translations[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE;
        } catch (error) {
            return DEFAULT_LANGUAGE;
        }
    }

    function replacePlaceholders(value, params) {
        if (!value || typeof value !== 'string') return value;
        return Object.keys(params || {}).reduce((result, key) => {
            return result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), params[key]);
        }, value);
    }

    function resolveTranslationValue(languageObject, key) {
        if (!languageObject || typeof languageObject !== 'object') {
            return undefined;
        }

        if (Object.prototype.hasOwnProperty.call(languageObject, key)) {
            return languageObject[key];
        }

        const segments = key.split('.');
        let current = languageObject;

        for (const segment of segments) {
            if (!current || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, segment)) {
                return undefined;
            }
            current = current[segment];
        }

        return current;
    }

    function getText(key, params = {}) {
        const fallbackLanguage = translations[DEFAULT_LANGUAGE] || {};
        const currentLanguage = translations[state.language] || translations[DEFAULT_LANGUAGE] || {};
        const fallbackKey = String(key || 'Text unavailable').split('.').pop();
        const readableFallback = fallbackKey.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/^\w/, (letter) => letter.toUpperCase());
        const value = resolveTranslationValue(currentLanguage, key) ?? resolveTranslationValue(fallbackLanguage, key) ?? readableFallback;
        return replacePlaceholders(value, params);
    }

    function applyTranslations(language) {
        state.language = translations[language] ? language : DEFAULT_LANGUAGE;

        try {
            localStorage.setItem(STORAGE_KEY, state.language);
        } catch (error) {
            // Ignore storage permission issues.
        }

        document.documentElement.lang = state.language;

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            const translation = getText(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        document.querySelectorAll('.naa-suggested-btn [data-i18n]').forEach((label) => {
            const button = label.closest('.naa-suggested-btn');
            if (button) {
                button.dataset.question = getText(label.dataset.i18n);
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach((element) => {
            const key = element.dataset.i18nHtml;
            const translation = getText(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            const translation = getText(key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            const translation = getText(key);
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
            const key = element.dataset.i18nAlt;
            const translation = getText(key);
            if (translation) {
                element.alt = translation;
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach((element) => {
            const key = element.dataset.i18nTitle;
            const translation = getText(key);
            if (translation) {
                element.setAttribute('title', translation);
            }
        });

        document.querySelectorAll('[data-i18n-value]').forEach((element) => {
            const key = element.dataset.i18nValue;
            const translation = getText(key);
            if (translation) {
                element.value = translation;
            }
        });

        translateStoryPage(state.language);
        translateTrailPage(state.language);
        translatePlanPage(state.language);

        document.querySelectorAll('.language-select').forEach((select) => {
            select.value = state.language;
        });

        document.dispatchEvent(new CustomEvent('ananse:languagechange', { detail: { language: state.language } }));
    }

    const state = {
        language: getStoredLanguage()
    };

    function initLanguageSystem() {
        const languageSelects = document.querySelectorAll('.language-select');
        languageSelects.forEach((select) => {
            select.addEventListener('change', (event) => {
                const selectedLanguage = event.target.value;
                applyTranslations(selectedLanguage);
            });
        });

        applyTranslations(state.language);
        initializeStoryAudio();
    }

    function localizeNaaResponse(text) {
        if (/naa can(?:'|’)t reach ananse['’]s heritage records right now/i.test(text)) {
            return getText('ai.recordsUnavailable');
        }
        return text;
    }

    window.ananseLanguage = {
        getText,
        getStoryText,
        getTrailText,
        getPlanText,
        localizeNaaResponse,
        applyTranslations,
        initLanguageSystem,
        get currentLanguage() {
            return state.language;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSystem);
    } else {
        initLanguageSystem();
    }
})();
