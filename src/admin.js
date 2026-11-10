document.addEventListener('DOMContentLoaded', () => {
    const session = window.ananseAuth?.getSession();
    if (!session || session.role !== 'admin') {
        window.location.replace('admin-login.html');
        return;
    }

    const dashboard = document.getElementById('adminDashboard');
    const displayName = session.name || session.email;
    document.getElementById('adminName').textContent = displayName;
    document.getElementById('adminWelcomeName').textContent = displayName.split(' ')[0];
    dashboard.hidden = false;

    const menuToggle = document.querySelector('[data-ananse-menu-toggle]');
    const adminNav = document.getElementById('adminNav');
    if (menuToggle && adminNav) {
        const setMenuOpen = isOpen => {
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            adminNav.classList.toggle('is-open', isOpen);
            const icon = menuToggle.querySelector('.fa-bars, .fa-xmark');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        };

        menuToggle.addEventListener('click', () => {
            setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
        });
        adminNav.addEventListener('click', event => {
            if (event.target.closest('a')) setMenuOpen(false);
        });
        document.addEventListener('click', event => {
            if (!event.target.closest('.admin-sidebar__header')) setMenuOpen(false);
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') setMenuOpen(false);
        });
    }

    document.getElementById('adminLogout').addEventListener('click', () => {
        window.ananseAuth.clearSession();
        window.location.href = 'admin-login.html';
    });

    const siteContent = window.ananseSiteContent;
    const siteRows = document.getElementById('adminSiteRows');
    const siteDialog = document.getElementById('siteDialog');
    const siteForm = document.getElementById('siteForm');
    const imageRows = document.getElementById('storyImageRows');
    const imageTemplate = document.getElementById('storyImageTemplate');
    const siteStatus = document.getElementById('siteSaveStatus');
    let knownSiteIds = new Set((siteContent?.getSites() || []).map(site => site.id));

    function readAnalytics() {
        try {
            const data = JSON.parse(localStorage.getItem('ananseAdminAnalyticsV1') || '{}');
            return {
                visitors: Array.isArray(data.visitors) ? data.visitors : [],
                views: Array.isArray(data.views) ? data.views : []
            };
        } catch (error) {
            return { visitors: [], views: [] };
        }
    }

    function renderAnalytics() {
        const data = readAnalytics();
        const siteNames = new Map((siteContent?.getSites() || []).map(site => [site.id, site.name]));
        const siteViews = new Map();
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        let storyViews = 0;
        let recentViews = 0;

        data.views.forEach(view => {
            if (view.siteId) {
                storyViews++;
                siteViews.set(view.siteId, (siteViews.get(view.siteId) || 0) + 1);
            }
            if (Date.parse(view.at) >= weekAgo) recentViews++;
        });

        document.getElementById('visitorCount').textContent = data.visitors.length.toLocaleString();
        document.getElementById('pageViewCount').textContent = data.views.length.toLocaleString();
        document.getElementById('storyViewCount').textContent = storyViews.toLocaleString();
        document.getElementById('recentViewCount').textContent = recentViews.toLocaleString();

        const ranking = document.getElementById('mostViewedSites');
        ranking.replaceChildren();
        Array.from(siteViews.entries())
            .sort((left, right) => right[1] - left[1] || (siteNames.get(left[0]) || left[0]).localeCompare(siteNames.get(right[0]) || right[0]))
            .slice(0, 5)
            .forEach(([id, count]) => {
                const item = document.createElement('li');
                const name = document.createElement('span');
                const views = document.createElement('strong');
                name.textContent = siteNames.get(id) || id;
                views.textContent = count.toLocaleString() + (count === 1 ? ' view' : ' views');
                item.append(name, views);
                ranking.appendChild(item);
            });

        if (!ranking.childElementCount) {
            const empty = document.createElement('li');
            empty.className = 'admin-empty-ranking';
            empty.textContent = 'No site views recorded yet.';
            ranking.appendChild(empty);
        }
    }

    function addImageRow(image) {
        const row = imageTemplate.content.firstElementChild.cloneNode(true);
        row.querySelector('.story-image-src').value = image?.src || '';
        row.querySelector('.story-image-caption').value = image?.caption || '';
        row.querySelector('.story-image-position').value = String(image?.after || 0);
        row.querySelector('.remove-story-image').addEventListener('click', () => row.remove());
        imageRows.appendChild(row);
    }

    function openSiteEditor(site) {
        siteForm.reset();
        imageRows.replaceChildren();
        document.getElementById('siteId').value = site?.id || '';
        document.getElementById('siteName').value = site?.name || '';
        document.getElementById('siteLocation').value = site?.location || '';
        document.getElementById('siteRegion').value = site?.region || '';
        document.getElementById('siteCategory').value = site?.category || 'historical';
        document.getElementById('siteLatitude').value = site?.lat ?? '';
        document.getElementById('siteLongitude').value = site?.lng ?? '';
        document.getElementById('siteDescription').value = site?.description || '';
        document.getElementById('siteCoverImage').value = site?.coverImage || '';
        document.getElementById('siteStory').value = site?.story || '';
        (site?.images || []).forEach(addImageRow);
        document.getElementById('siteDialogTitle').textContent = site ? 'Edit heritage site' : 'Add heritage site';
        siteDialog.showModal();
        document.getElementById('siteName').focus();
    }

    function renderSites() {
        const sites = siteContent?.getSites() || [];
        const analytics = readAnalytics();
        const views = new Map();
        analytics.views.forEach(view => {
            if (view.siteId) views.set(view.siteId, (views.get(view.siteId) || 0) + 1);
        });
        siteRows.replaceChildren();

        sites.forEach(site => {
            const row = document.createElement('tr');
            const siteCell = document.createElement('td');
            const siteSummary = document.createElement('div');
            siteSummary.className = 'admin-table-site';
            const thumbnail = document.createElement('img');
            if (site.coverImage) thumbnail.src = site.coverImage;
            else thumbnail.hidden = true;
            thumbnail.alt = '';
            thumbnail.loading = 'lazy';
            const identity = document.createElement('span');
            const name = document.createElement('strong');
            const location = document.createElement('small');
            name.textContent = site.name;
            location.textContent = site.location;
            identity.append(name, location);
            siteSummary.append(thumbnail, identity);
            siteCell.appendChild(siteSummary);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = site.apiCategory || site.category.replace(/-/g, ' ');
            const viewsCell = document.createElement('td');
            viewsCell.textContent = (views.get(site.id) || 0).toLocaleString();
            const actionCell = document.createElement('td');
            actionCell.className = 'admin-table-actions';
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'admin-icon-button';
            editButton.title = 'Edit ' + site.name;
            editButton.setAttribute('aria-label', 'Edit ' + site.name);
            editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
            editButton.addEventListener('click', () => openSiteEditor(site));
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'admin-icon-button admin-icon-button--danger';
            removeButton.title = 'Remove ' + site.name;
            removeButton.setAttribute('aria-label', 'Remove ' + site.name);
            removeButton.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
            removeButton.addEventListener('click', async () => {
                if (!window.confirm('Remove ' + site.name + ' from the public site?')) return;
                try {
                    const result = await siteContent.deleteRemoteSite(site);
                    siteStatus.textContent = result.localOnly
                        ? site.name + ' removed in this browser only. The shared catalog is unavailable.'
                        : site.name + ' removed from the shared catalog.';
                } catch (error) {
                    siteStatus.textContent = error.message || 'Could not remove this site from the shared catalog.';
                    return;
                }
                knownSiteIds.delete(site.id);
                renderSites();
                renderAnalytics();
            });
            actionCell.append(editButton, removeButton);
            row.append(siteCell, categoryCell, viewsCell, actionCell);
            siteRows.appendChild(row);
        });

        if (!sites.length) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
            cell.textContent = 'No heritage sites are published.';
            row.appendChild(cell);
            siteRows.appendChild(row);
        }

        renderAnalytics();
    }

    document.getElementById('addSiteButton').addEventListener('click', () => openSiteEditor(null));
    document.getElementById('addStoryImage').addEventListener('click', () => addImageRow(null));
    document.getElementById('closeSiteDialog').addEventListener('click', () => siteDialog.close());
    document.getElementById('cancelSiteEdit').addEventListener('click', () => siteDialog.close());

    siteForm.addEventListener('submit', async event => {
        event.preventDefault();
        const name = document.getElementById('siteName').value.trim();
        const existingId = document.getElementById('siteId').value;
        const id = existingId || name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const images = Array.from(imageRows.querySelectorAll('.admin-image-row')).map(row => ({
            src: row.querySelector('.story-image-src').value.trim(),
            caption: row.querySelector('.story-image-caption').value.trim(),
            after: Number(row.querySelector('.story-image-position').value)
        })).filter(image => image.src);
        const previousSite = siteContent.getSite(id);
        const site = {
            id,
            slug: previousSite?.slug || id,
            apiId: previousSite?.apiId || null,
            facts: previousSite?.facts || {},
            name,
            location: document.getElementById('siteLocation').value.trim(),
            region: document.getElementById('siteRegion').value.trim(),
            category: document.getElementById('siteCategory').value,
            lat: Number(document.getElementById('siteLatitude').value),
            lng: Number(document.getElementById('siteLongitude').value),
            apiCategory: previousSite?.apiCategory || '',
            apiRegion: previousSite?.apiRegion || '',
            description: document.getElementById('siteDescription').value.trim(),
            coverImage: document.getElementById('siteCoverImage').value.trim(),
            storyPage: siteContent.getSite(id)?.storyPage || '',
            story: document.getElementById('siteStory').value.trim(),
            images
        };

        if (!existingId && knownSiteIds.has(id)) {
            siteStatus.textContent = 'A site with that name already exists.';
            return;
        }
        let savedSite;
        try {
            savedSite = await siteContent.saveRemoteSite(site);
        } catch (error) {
            siteStatus.textContent = error.message || 'Could not save this site to the shared catalog.';
            return;
        }
        if (!savedSite) {
            siteStatus.textContent = 'Enter a valid site, image, and map coordinates before saving.';
            return;
        }
        knownSiteIds.add(savedSite.id);
        siteDialog.close();
        siteStatus.textContent = savedSite.localOnly
            ? name + ' saved in this browser only. The shared catalog is unavailable.'
            : name + ' saved to the shared catalog.';
        renderSites();
    });

    renderSites();
    siteContent.ready.then(sites => {
        knownSiteIds = new Set(sites.map(site => site.id));
        if (!siteContent.isRemote()) {
            siteStatus.textContent = 'Shared catalog is unavailable. Site changes cannot be published right now.';
        }
        renderSites();
    });
});