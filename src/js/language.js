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
            'explore.heroTitle': 'Discover Amazing<br>Heritage Sites',
            'explore.heroDesc': "From ancient forts to royal palaces, explore the places that tell Ghana's rich and inspiring story.",
            'explore.location': 'Location',
            'explore.regionGreaterAccra': 'Greater Accra',
            'explore.regionAshanti': 'Ashanti',
            'explore.regionCentral': 'Central',
            'explore.regionWestern': 'Western',
            'explore.regionNorthern': 'Northern',
            'explore.regionEastern': 'Eastern',
            'explore.category': 'Category',
            'explore.categoryHistorical': 'Historical',
            'explore.categoryCultural': 'Cultural',
            'explore.categoryNatural': 'Natural',
            'explore.categoryMonument': 'Monument',
            'explore.categoryRoyal': 'Royal',
            'explore.sortBy': 'Sort By',
            'explore.mostPopular': 'Most Popular',
            'explore.nearest': 'Nearest',
            'explore.az': 'A - Z',
            'explore.mapView': 'Map View',
            'explore.listView': 'List View',
            'explore.featuredSites': 'Featured Sites',
            'explore.allSites': 'All Heritage Sites',
            'explore.mapOfGhana': 'Map of Ghana',
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
            'common.errorNoResponse': 'No response available right now.'
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
            'explore.heroSubtitle': "DÉCOUVREZ LE PATRIMOINE DU GHANA",
            'explore.heroTitle': 'Découvrez des sites patrimoniaux incroyables',
            'explore.heroDesc': 'Des forts anciens aux palais royaux, explorez les lieux qui racontent l’histoire riche et inspirante du Ghana.',
            'explore.location': 'Lieu',
            'explore.regionGreaterAccra': 'Grand Accra',
            'explore.regionAshanti': 'Ashanti',
            'explore.regionCentral': 'Central',
            'explore.regionWestern': 'Ouest',
            'explore.regionNorthern': 'Nord',
            'explore.regionEastern': 'Est',
            'explore.category': 'Catégorie',
            'explore.categoryHistorical': 'Historique',
            'explore.categoryCultural': 'Culturel',
            'explore.categoryNatural': 'Naturel',
            'explore.categoryMonument': 'Monument',
            'explore.categoryRoyal': 'Royal',
            'explore.sortBy': 'Trier par',
            'explore.mostPopular': 'Les plus populaires',
            'explore.nearest': 'Les plus proches',
            'explore.az': 'A - Z',
            'explore.mapView': 'Vue carte',
            'explore.listView': 'Vue liste',
            'explore.featuredSites': 'Sites en vedette',
            'explore.allSites': 'Tous les sites du patrimoine',
            'explore.mapOfGhana': 'Carte du Ghana',
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
            'common.errorNoResponse': 'Aucune réponse disponible pour le moment.'
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
            'explore.heroSubtitle': 'EXPLORA EL PATRIMONIO DE GHANA',
            'explore.heroTitle': 'Descubre sitios patrimoniales increíbles',
            'explore.heroDesc': 'Desde antiguos fuertes hasta palacios reales, explora los lugares que cuentan la rica e inspiradora historia de Ghana.',
            'explore.location': 'Ubicación',
            'explore.regionGreaterAccra': 'Gran Acra',
            'explore.regionAshanti': 'Ashanti',
            'explore.regionCentral': 'Central',
            'explore.regionWestern': 'Occidente',
            'explore.regionNorthern': 'Norte',
            'explore.regionEastern': 'Este',
            'explore.category': 'Categoría',
            'explore.categoryHistorical': 'Histórico',
            'explore.categoryCultural': 'Cultural',
            'explore.categoryNatural': 'Natural',
            'explore.categoryMonument': 'Monumento',
            'explore.categoryRoyal': 'Real',
            'explore.sortBy': 'Ordenar por',
            'explore.mostPopular': 'Más populares',
            'explore.nearest': 'Más cercanos',
            'explore.az': 'A - Z',
            'explore.mapView': 'Vista del mapa',
            'explore.listView': 'Vista de lista',
            'explore.featuredSites': 'Sitios destacados',
            'explore.allSites': 'Todos los sitios patrimoniales',
            'explore.mapOfGhana': 'Mapa de Ghana',
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
            'common.errorNoResponse': 'No hay respuesta disponible en este momento.'
        }
    };

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
        const value = resolveTranslationValue(currentLanguage, key) ?? resolveTranslationValue(fallbackLanguage, key) ?? key;
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

        document.querySelectorAll('.language-select').forEach((select) => {
            select.value = state.language;
        });
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
    }

    window.ananseLanguage = {
        getText,
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
