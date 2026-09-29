(() => {
    const script = document.currentScript;
    const siteRoot = new URL('../', script.src);
    const href = (path) => new URL(path, siteRoot).href;
    const footer = document.createElement('footer');
    const stylesheet = document.createElement('link');

    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('footer.css', script.src).href;
    const stylesheetIsLoaded = [...document.styleSheets].some((loadedSheet) => loadedSheet.href === stylesheet.href);

    if (!stylesheetIsLoaded) {
        footer.style.visibility = 'hidden';
        stylesheet.addEventListener('load', () => { footer.style.visibility = 'visible'; }, { once: true });
        stylesheet.addEventListener('error', () => { footer.style.visibility = 'visible'; }, { once: true });
        document.head.append(stylesheet);
    }

    footer.id = 'ananse-shared-footer';
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="site-footer__main">
            <section class="site-footer__about" aria-label="About ANANSE">
                <a class="footer-brand" href="${href('index.html')}">
                    <span class="footer-brand__mark" aria-hidden="true"><i class="fa-solid fa-spider"></i></span>
                    <span class="footer-brand__name">ANANSE</span>
                </a>
                <p>A digital cultural heritage platform connecting Ghanaian places, stories and people.</p>
                <ul class="footer-social" aria-label="Social media">
                    <li><a href="https://x.com/" aria-label="ANANSE on X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="https://instagram.com/" aria-label="ANANSE on Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href="https://github.com/" aria-label="ANANSE on GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a></li>
                </ul>
            </section>

            <nav aria-label="Explore">
                <h2>Explore</h2>
                <ul class="footer-links">
                    <li><a href="${href('pages/explore.html')}">Heritage sites</a></li>
                    <li><a href="${href('pages/map.html')}">Heritage map</a></li>
                    <li><a href="${href('pages/heritagetrails.html')}">Heritage trails</a></li>
                    <li><a href="${href('pages/plan.html')}">Plan a visit</a></li>
                </ul>
            </nav>

            <nav aria-label="The project">
                <h2>The project</h2>
                <ul class="footer-links">
                    <li><a href="${href('pages/about.html')}">About ANANSE</a></li>
                    <li><a href="${href('pages/ai.html')}">Ask Naa</a></li>
                    <li><a href="${href('pages/passport.html')}">Heritage passport</a></li>
                    <li><a href="mailto:hello@ananse.gh">Contact</a></li>
                </ul>
            </nav>

            <section class="footer-newsletter" aria-label="Newsletter">
                <h2>Stay in touch</h2>
                <p>Get new heritage sites and stories in your inbox.</p>
                <form class="footer-newsletter__form">
                    <label class="visually-hidden" for="footer-email">Email address</label>
                    <input id="footer-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
                    <button type="submit">Subscribe</button>
                </form>
                <span class="footer-newsletter__note">Submitting opens an email to request a subscription.</span>
                <p class="footer-newsletter__contact">Accra, Ghana · <a href="mailto:hello@ananse.gh">hello@ananse.gh</a></p>
            </section>
        </div>

        <div class="site-footer__legal">
            <p>&copy; <span data-current-year>${new Date().getFullYear()}</span> ANANSE. Heritage content is reviewed with local historians and heritage institutions.</p>
            <a href="${href('pages/about.html#content')}">Content sources</a>
        </div>
    `;

    document.querySelectorAll('footer').forEach((existingFooter) => existingFooter.remove());
    document.body.append(footer);

    footer.querySelector('.footer-newsletter__form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const subject = encodeURIComponent('ANANSE newsletter subscription');
        const body = encodeURIComponent(`Please subscribe ${email} to the ANANSE newsletter.`);

        window.location.href = `mailto:hello@ananse.gh?subject=${subject}&body=${body}`;
    });
})();