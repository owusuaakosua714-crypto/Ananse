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
    const trailEditor = document.getElementById('trailEditor');
    const trailStopRows = document.getElementById('trailStopRows');
    const trailStopTemplate = document.getElementById('trailStopTemplate');
    const siteStatus = document.getElementById('siteSaveStatus');
    const TRAIL_STOP_IDS = {
        'cape-coast': ['door-of-no-return', 'castle-grounds', 'memory-and-healing'],
        manhyia: ['royal-court', 'regalia', 'living-tradition'],
        osu: ['castle-approach', 'colonial-memory', 'national-shift'],
        independence: ['independence-arch', 'national-space', 'future-vision'],
        'kwame-nkrumah': ['tribute-garden', 'independence-story', 'pan-african-legacy']
    };
    let knownSiteIds = new Set((siteContent?.getAllSites() || []).map(site => site.id));
    let siteViewCounts = new Map();

    function renderAnalytics(summary, users) {
        const eventCounts = summary?.eventsByType || {};
        siteViewCounts = new Map((summary?.topSites || []).map(site => [site.siteSlug, site.count]));
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const recentViews = (summary?.dailyEvents || []).filter(event => Date.parse(event.day) >= weekAgo)
            .reduce((total, event) => total + event.count, 0);
        document.getElementById('visitorCount').textContent = (users || []).length.toLocaleString();
        document.getElementById('pageViewCount').textContent = (eventCounts.page_view || 0).toLocaleString();
        document.getElementById('storyViewCount').textContent = (eventCounts.story_view || 0).toLocaleString();
        document.getElementById('recentViewCount').textContent = recentViews.toLocaleString();

        const ranking = document.getElementById('mostViewedSites');
        ranking.replaceChildren();
        const sitesBySlug = new Map((siteContent?.getSites() || []).map(site => [site.slug, site.name]));
        (summary?.topSites || []).slice(0, 5).forEach(site => {
                const item = document.createElement('li');
                const name = document.createElement('span');
                const views = document.createElement('strong');
                name.textContent = sitesBySlug.get(site.siteSlug) || site.siteSlug;
                views.textContent = site.count.toLocaleString() + (site.count === 1 ? ' view' : ' views');
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

    function appendEmptyRow(tbody, message, columnCount) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = columnCount;
        cell.textContent = message;
        row.appendChild(cell);
        tbody.replaceChildren(row);
    }

    function renderUsers(users) {
        const rows = document.getElementById('adminUserRows');
        rows.replaceChildren();
        if (!users.length) return appendEmptyRow(rows, 'No registered visitors yet.', 6);
        users.forEach(user => {
            const row = document.createElement('tr');
            const createdAt = user.createdAt || user.created_at;
            [user.fullName || user.full_name || user.name, user.email,
                user.visitCount ?? user.visit_count ?? 0,
                user.storyCount ?? user.story_count ?? 0,
                user.planCount ?? user.plan_count ?? 0,
                createdAt ? new Date(createdAt).toLocaleDateString() : ''].forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = String(value ?? '');
                row.appendChild(cell);
            });
            rows.appendChild(row);
        });
    }

    function renderPlans(plans) {
        const rows = document.getElementById('adminPlanRows');
        rows.replaceChildren();
        if (!plans.length) return appendEmptyRow(rows, 'No saved visit plans yet.', 6);
        plans.forEach(plan => {
            const row = document.createElement('tr');
            [plan.userName || plan.user_name, plan.userEmail || plan.user_email,
                plan.siteName || plan.site_name || plan.siteSlug || plan.site_slug,
                plan.visitDate || plan.visit_date, plan.visitTime || plan.visit_time, plan.visitors].forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = String(value ?? '');
                row.appendChild(cell);
            });
            rows.appendChild(row);
        });
    }

    async function loadAdminData() {
        const usersStatus = document.getElementById('usersLoadStatus');
        const plansStatus = document.getElementById('plansLoadStatus');
        try {
            const [summary, users, plans] = await Promise.all([
                window.ananseAuth.api('/api/analytics/summary'),
                window.ananseAuth.api('/api/admin/users'),
                window.ananseAuth.api('/api/plans/admin')
            ]);
            renderAnalytics(summary, users);
            renderSites();
            renderUsers(users);
            renderPlans(plans);
            usersStatus.textContent = '';
            plansStatus.textContent = '';
        } catch (error) {
            usersStatus.textContent = error.message || 'Could not load shared user analytics.';
            plansStatus.textContent = error.message || 'Could not load shared visit plans.';
        }
    }

    function addTrailStopRow(stopId, stop) {
        const row = trailStopTemplate.content.firstElementChild.cloneNode(true);
        row.dataset.stopId = stopId;
        row.querySelector('.trail-stop-legend').textContent = stopId.replace(/-/g, ' ');
        row.querySelector('.trail-stop-name').value = stop?.name || '';
        row.querySelector('.trail-stop-blurb').value = stop?.blurb || '';
        row.querySelector('.trail-stop-content').value = stop?.content || '';
        row.querySelector('.trail-stop-image').value = stop?.image || '';
        row.querySelector('.trail-stop-caption').value = stop?.caption || '';
        trailStopRows.appendChild(row);
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
        document.getElementById('siteNaaNotes').value = site?.naaNotes || '';
        (site?.images || []).forEach(addImageRow);
        const trailStopIds = TRAIL_STOP_IDS[site?.id] || [];
        trailEditor.hidden = trailStopIds.length === 0;
        trailStopRows.replaceChildren();
        document.getElementById('trailTitle').value = site?.trail?.title || '';
        document.getElementById('trailIntroduction').value = site?.trail?.introduction || '';
        document.getElementById('trailHighlights').value = (site?.trail?.highlights || []).join('\n');
        trailStopIds.forEach((stopId, index) => {
            const savedStop = site?.trail?.stops?.find(stop => stop.id === stopId) || site?.trail?.stops?.[index];
            addTrailStopRow(stopId, savedStop);
        });
        document.getElementById('siteDialogTitle').textContent = site ? 'Edit heritage site' : 'Add heritage site';
        siteDialog.showModal();
        document.getElementById('siteName').focus();
    }

    function renderSites() {
        const sites = siteContent?.getAllSites() || [];
        siteRows.replaceChildren();

        sites.forEach(site => {
            const row = document.createElement('tr');
            if (site.hidden) row.classList.add('is-hidden-site');
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
            const visibilityCell = document.createElement('td');
            visibilityCell.className = 'admin-site-visibility';
            const visibilityLabel = document.createElement('span');
            visibilityLabel.className = site.hidden ? 'admin-visibility-badge is-hidden' : 'admin-visibility-badge';
            visibilityLabel.textContent = site.hidden ? 'Hidden from public' : 'Public';
            visibilityCell.appendChild(visibilityLabel);
            const viewsCell = document.createElement('td');
            viewsCell.textContent = (siteViewCounts.get(site.slug) || 0).toLocaleString();
            const actionCell = document.createElement('td');
            actionCell.className = 'admin-table-actions';
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'admin-icon-button';
            editButton.title = 'Edit ' + site.name;
            editButton.setAttribute('aria-label', 'Edit ' + site.name);
            editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
            editButton.addEventListener('click', () => openSiteEditor(site));
            const visibilityButton = document.createElement('button');
            visibilityButton.type = 'button';
            visibilityButton.className = 'admin-secondary-action admin-visibility-action';
            visibilityButton.textContent = site.hidden ? 'Make public' : 'Hide';
            visibilityButton.setAttribute('aria-label', (site.hidden ? 'Make ' : 'Hide ') + site.name + (site.hidden ? ' from hidden status' : ' from the public website'));
            visibilityButton.addEventListener('click', async () => {
                visibilityButton.disabled = true;
                try {
                    const updatedSite = await siteContent.saveRemoteSite(Object.assign({}, site, { hidden: !site.hidden }));
                    if (!updatedSite) throw new Error('Could not update this site’s visibility.');
                    siteStatus.textContent = updatedSite.hidden
                        ? site.name + ' is now hidden from the public website.'
                        : site.name + ' is now public.';
                    renderSites();
                } catch (error) {
                    siteStatus.textContent = error.message || 'Could not update this site’s visibility.';
                    visibilityButton.disabled = false;
                }
            });
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
                loadAdminData();
            });
            actionCell.append(editButton, visibilityButton, removeButton);
            row.append(siteCell, categoryCell, visibilityCell, viewsCell, actionCell);
            siteRows.appendChild(row);
        });

        if (!sites.length) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 5;
            cell.textContent = 'No heritage sites are in the catalog.';
            row.appendChild(cell);
            siteRows.appendChild(row);
        }

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
        const previousSite = siteContent.getSiteForAdmin(id);
        const site = {
            id,
            slug: previousSite?.slug || id,
            apiId: previousSite?.apiId || null,
            facts: previousSite?.facts || {},
            name,
            hidden: previousSite?.hidden || false,
            location: document.getElementById('siteLocation').value.trim(),
            region: document.getElementById('siteRegion').value.trim(),
            category: document.getElementById('siteCategory').value,
            lat: Number(document.getElementById('siteLatitude').value),
            lng: Number(document.getElementById('siteLongitude').value),
            apiCategory: previousSite?.apiCategory || '',
            apiRegion: previousSite?.apiRegion || '',
            description: document.getElementById('siteDescription').value.trim(),
            coverImage: document.getElementById('siteCoverImage').value.trim(),
            storyPage: siteContent.getSiteForAdmin(id)?.storyPage || '',
            story: document.getElementById('siteStory').value.trim(),
            images,
            naaNotes: document.getElementById('siteNaaNotes').value.trim(),
            trail: TRAIL_STOP_IDS[id] ? {
                title: document.getElementById('trailTitle').value.trim(),
                introduction: document.getElementById('trailIntroduction').value.trim(),
                highlights: document.getElementById('trailHighlights').value.split(/\r?\n/).map(line => line.trim()).filter(Boolean),
                stops: Array.from(trailStopRows.querySelectorAll('.admin-trail-stop')).map(row => ({
                    id: row.dataset.stopId,
                    name: row.querySelector('.trail-stop-name').value.trim(),
                    blurb: row.querySelector('.trail-stop-blurb').value.trim(),
                    content: row.querySelector('.trail-stop-content').value.trim(),
                    image: row.querySelector('.trail-stop-image').value.trim(),
                    caption: row.querySelector('.trail-stop-caption').value.trim()
                }))
            } : null
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
        loadAdminData();
    });

    renderSites();
    loadAdminData();
    siteContent.ready.then(sites => {
        knownSiteIds = new Set((siteContent.getAllSites?.() || sites).map(site => site.id));
        if (!siteContent.isRemote()) {
            siteStatus.textContent = 'Shared catalog is unavailable. Site changes cannot be published right now.';
        }
        renderSites();
        loadAdminData();
    });
});
