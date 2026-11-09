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
    const managedStoryEditor = document.getElementById('managedStoryEditor');
    const storySectionRows = document.getElementById('storySectionRows');
    const storyTimelineRows = document.getElementById('storyTimelineRows');
    const storyPlaceRows = document.getElementById('storyPlaceRows');
    const managedStoryImageRows = document.getElementById('managedStoryImageRows');
    const storySectionTemplate = document.getElementById('storySectionTemplate');
    const storyEntryTemplate = document.getElementById('storyEntryTemplate');
    const managedStoryImageTemplate = document.getElementById('managedStoryImageTemplate');
    let storyEditorRequest = 0;
    let storyEditorReady = false;
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

    async function loadStoryContent(site) {
        if (site?.storyContent) return site.storyContent;
        if (!site?.storyPage) return null;
        const response = await fetch(site.storyPage);
        if (!response.ok) throw new Error('Could not load the story page template.');
        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        const sectionNodes = Array.from(parsed.querySelectorAll('.s-main > section'));
        const sections = sectionNodes.map(section => {
            const heading = section.querySelector('h2');
            const prose = section.querySelector('.s-prose');
            const paragraphs = prose ? Array.from(prose.querySelectorAll('p')) : Array.from(section.querySelectorAll(':scope > p'));
            return { id: section.id, title: heading?.textContent.trim() || '', body: paragraphs.map(item => item.textContent.trim()).filter(Boolean).join('\n\n') };
        });
        if (site.story) {
            const opening = sections.find(section => section.id === 'story');
            if (opening) opening.body = site.story;
        }
        const timeline = Array.from(parsed.querySelectorAll('#timeline .s-timeline details')).map(entry => ({
            year: entry.querySelector('.yr')?.textContent.trim() || '',
            title: entry.querySelector('.t')?.textContent.trim() || '',
            body: Array.from(entry.querySelectorAll(':scope > p')).map(item => item.textContent.trim()).join('\n\n')
        }));
        const places = Array.from(parsed.querySelectorAll('#inside .s-places details')).map(entry => ({
            title: entry.querySelector('summary')?.textContent.trim() || '',
            body: Array.from(entry.querySelectorAll(':scope > p')).map(item => item.textContent.trim()).join('\n\n')
        }));
        const images = Array.from(parsed.querySelectorAll('.s-main figure.s-story-image')).map(figure => {
            const section = figure.closest('section');
            const imageContainer = section?.querySelector('.s-prose, .s-timeline, .s-places') || section;
            const after = imageContainer ? Array.from(imageContainer.querySelectorAll('p')).filter(paragraph =>
                paragraph.compareDocumentPosition(figure) & Node.DOCUMENT_POSITION_FOLLOWING).length : 0;
            const image = figure.querySelector('img');
            return { src: image?.getAttribute('src') || '', alt: image?.getAttribute('alt') || '', caption: figure.querySelector('figcaption')?.textContent.trim() || '', sectionId: section?.id || 'story', after };
        }).filter(image => image.src);
        return { sections, timeline, places, images };
    }

    function addStoryEntry(container, entry, type) {
        const row = storyEntryTemplate.content.firstElementChild.cloneNode(true);
        row.dataset.type = type;
        row.querySelector('.story-entry-label').textContent = type === 'timeline' ? 'Timeline moment' : 'Place detail';
        const year = row.querySelector('.story-entry-year');
        year.hidden = type !== 'timeline';
        row.querySelector('.story-entry-year-input').value = entry?.year || '';
        row.querySelector('.story-entry-title-input').value = entry?.title || '';
        row.querySelector('.story-entry-body-input').value = entry?.body || '';
        row.querySelector('.remove-story-entry').addEventListener('click', () => row.remove());
        container.appendChild(row);
    }

    function addManagedStoryImage(image, sections) {
        const row = managedStoryImageTemplate.content.firstElementChild.cloneNode(true);
        row.querySelector('.managed-image-src').value = image?.src || '';
        row.querySelector('.managed-image-alt').value = image?.alt || '';
        row.querySelector('.managed-image-caption').value = image?.caption || '';
        row.querySelector('.managed-image-after').value = String(image?.after || 0);
        const select = row.querySelector('.managed-image-section');
        sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section.id;
            option.textContent = section.title || section.id;
            select.appendChild(option);
        });
        select.value = image?.sectionId || sections[0]?.id || 'story';
        row.querySelector('.remove-managed-image').addEventListener('click', () => row.remove());
        managedStoryImageRows.appendChild(row);
    }

    function renderManagedStoryEditor(content) {
        storySectionRows.replaceChildren();
        storyTimelineRows.replaceChildren();
        storyPlaceRows.replaceChildren();
        managedStoryImageRows.replaceChildren();
        (content?.sections || []).forEach(section => {
            const row = storySectionTemplate.content.firstElementChild.cloneNode(true);
            row.dataset.sectionId = section.id;
            row.querySelector('.story-section-title').value = section.title || '';
            row.querySelector('.story-section-text').value = section.body || '';
            storySectionRows.appendChild(row);
        });
        (content?.timeline || []).forEach(entry => addStoryEntry(storyTimelineRows, entry, 'timeline'));
        (content?.places || []).forEach(entry => addStoryEntry(storyPlaceRows, entry, 'place'));
        (content?.images || []).forEach(image => addManagedStoryImage(image, content.sections || []));
    }

    function collectManagedStoryContent() {
        return {
            sections: Array.from(storySectionRows.querySelectorAll('.admin-story-section')).map(row => ({
                id: row.dataset.sectionId,
                title: row.querySelector('.story-section-title').value.trim(),
                body: row.querySelector('.story-section-text').value.trim()
            })),
            timeline: Array.from(storyTimelineRows.querySelectorAll('.admin-story-entry')).map(row => ({
                year: row.querySelector('.story-entry-year-input').value.trim(),
                title: row.querySelector('.story-entry-title-input').value.trim(),
                body: row.querySelector('.story-entry-body-input').value.trim()
            })),
            places: Array.from(storyPlaceRows.querySelectorAll('.admin-story-entry')).map(row => ({
                title: row.querySelector('.story-entry-title-input').value.trim(),
                body: row.querySelector('.story-entry-body-input').value.trim()
            })),
            images: Array.from(managedStoryImageRows.querySelectorAll('.admin-managed-story-image')).map(row => ({
                src: row.querySelector('.managed-image-src').value.trim(),
                alt: row.querySelector('.managed-image-alt').value.trim(),
                caption: row.querySelector('.managed-image-caption').value.trim(),
                sectionId: row.querySelector('.managed-image-section').value,
                after: Math.max(0, Number(row.querySelector('.managed-image-after').value) || 0)
            })).filter(image => image.src)
        };
    }

    async function openSiteEditor(site) {
        const requestId = ++storyEditorRequest;
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
        document.getElementById('siteLegacyStoryField').hidden = Boolean(site?.storyPage);
        document.getElementById('siteNaaNotes').value = site?.naaNotes || '';
        managedStoryEditor.hidden = !site?.storyPage;
        document.getElementById('storyEditorStatus').textContent = '';
        storyEditorReady = false;
        renderManagedStoryEditor(null);
        if (site?.storyPage) {
            try {
                const content = await loadStoryContent(site);
                if (requestId !== storyEditorRequest) return;
                renderManagedStoryEditor(content);
                storyEditorReady = true;
            } catch (error) {
                if (requestId !== storyEditorRequest) return;
                document.getElementById('storyEditorStatus').textContent = 'Could not load the current story template, so this editor will leave the published story unchanged. Reopen the editor when connected.';
            }
        }
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
    document.getElementById('addTimelineEntry').addEventListener('click', () => addStoryEntry(storyTimelineRows, null, 'timeline'));
    document.getElementById('addPlaceEntry').addEventListener('click', () => addStoryEntry(storyPlaceRows, null, 'place'));
    document.getElementById('addManagedStoryImage').addEventListener('click', () => {
        const sections = Array.from(storySectionRows.querySelectorAll('.admin-story-section')).map(row => ({
            id: row.dataset.sectionId,
            title: row.querySelector('.story-section-title').value.trim()
        }));
        addManagedStoryImage(null, sections);
    });
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
        const managedStoryContent = storyEditorReady && previousSite?.storyPage ? collectManagedStoryContent() : previousSite?.storyContent || null;
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
            story: managedStoryContent?.sections.find(section => section.id === 'story')?.body || document.getElementById('siteStory').value.trim(),
            images,
            storyContent: managedStoryContent,
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
