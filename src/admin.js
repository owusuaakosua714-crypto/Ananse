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
    const trailEditor = document.getElementById('trailEditor');
    const trailStopRows = document.getElementById('trailStopRows');
    const trailStopTemplate = document.getElementById('trailStopTemplate');
    const managedStoryEditor = document.getElementById('managedStoryEditor');
    const storySectionRows = document.getElementById('storySectionRows');
    const storyTimelineRows = document.getElementById('storyTimelineRows');
    const storyPlaceRows = document.getElementById('storyPlaceRows');
    const storySectionTemplate = document.getElementById('storySectionTemplate');
    const storyEntryTemplate = document.getElementById('storyEntryTemplate');
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
    const MAX_EMBEDDED_MEDIA_BYTES = 2 * 1024 * 1024;

    async function optimizeImageFile(file) {
        if (!file) return '';
        if (!file.type.startsWith('image/')) throw new Error('Choose an image file.');
        if (file.size > 25 * 1024 * 1024) throw new Error('Choose an image smaller than 25 MB.');
        const bitmap = await createImageBitmap(file);
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();

        let imageData = '';
        for (const quality of [0.82, 0.7, 0.58, 0.46]) {
            imageData = canvas.toDataURL('image/webp', quality);
            if (!imageData.startsWith('data:image/webp')) imageData = canvas.toDataURL('image/jpeg', quality);
            if (imageData.length * 0.75 <= 480 * 1024) return imageData;
        }
        throw new Error('This image is still too large after optimization. Choose a smaller image file.');
    }

    function embeddedImageBytes(site) {
        const storyBlocks = [...(site.storyContent?.sections || []), ...(site.storyContent?.timeline || []), ...(site.storyContent?.places || [])]
            .flatMap(entry => entry.blocks || []);
        const sources = [site.coverImage, ...(site.images || []).map(image => image.src),
            ...(site.storyContent?.images || []).map(image => image.src), ...storyBlocks.map(block => block.src),
            ...(site.trail?.stops || []).map(stop => stop.image)];
        return sources.filter(source => source && (source.startsWith('data:image/') || source.startsWith('data:video/')))
            .reduce((total, source) => total + Math.ceil(source.length * 0.75), 0);
    }

    async function imageSource(fileInput, previousSource) {
        return fileInput.files?.[0] ? optimizeImageFile(fileInput.files[0]) : previousSource || '';
    }

    function showFilePreview(input, preview, previousSource) {
        const file = input.files?.[0];
        preview.src = file ? URL.createObjectURL(file) : previousSource || '';
        preview.hidden = !preview.src;
    }

    function textBlocks(text) {
        return String(text || '').split(/\n\s*\n/).map(value => value.trim()).filter(Boolean).map(text => ({ type: 'text', text }));
    }

    function createInlineMedia(block) {
        const figure = document.createElement('figure');
        figure.className = 'admin-inline-media';
        figure.contentEditable = 'true';
        figure.dataset.inlineMedia = block.type;
        figure.dataset.src = block.src;
        if (block.type === 'video') {
            const video = document.createElement('video');
            video.src = block.src;
            video.controls = true;
            video.preload = 'metadata';
            video.contentEditable = 'false';
            figure.appendChild(video);
        } else {
            const image = document.createElement('img');
            image.src = block.src;
            image.alt = block.alt || block.caption || '';
            image.contentEditable = 'false';
            figure.appendChild(image);
        }
        const caption = document.createElement('figcaption');
        caption.contentEditable = 'true';
        caption.textContent = block.caption || '';
        figure.appendChild(caption);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'admin-inline-media__remove';
        remove.contentEditable = 'false';
        remove.setAttribute('aria-label', 'Remove this media');
        remove.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
        remove.addEventListener('click', () => figure.remove());
        figure.appendChild(remove);
        return figure;
    }

    function renderEditorBlocks(canvas, blocks) {
        canvas.replaceChildren();
        (blocks || []).forEach(block => {
            if (block.type === 'image' || block.type === 'video') {
                canvas.appendChild(createInlineMedia(block));
            } else {
                const paragraph = document.createElement('p');
                paragraph.textContent = block.text || '';
                canvas.appendChild(paragraph);
            }
        });
        if (!canvas.childElementCount) canvas.appendChild(document.createElement('p'));
    }

    function collectEditorBlocks(canvas) {
        const blocks = [];
        Array.from(canvas.childNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.matches('[data-inline-media]')) {
                blocks.push({
                    type: node.dataset.inlineMedia,
                    src: node.dataset.src,
                    alt: node.querySelector('img')?.alt || '',
                    caption: node.querySelector('figcaption')?.textContent.trim() || ''
                });
                return;
            }
            const parts = (node.textContent || '').split(/\n+/).map(value => value.trim()).filter(Boolean);
            parts.forEach(text => blocks.push({ type: 'text', text }));
        });
        return blocks;
    }

    function insertAtCaret(canvas, figure, range) {
        const selection = window.getSelection();
        if (range && canvas.contains(range.startContainer)) {
            range.deleteContents();
            const start = range.startContainer;
            const paragraph = (start.nodeType === Node.ELEMENT_NODE ? start : start.parentElement)?.closest('p');
            if (paragraph && canvas.contains(paragraph)) {
                const before = document.createRange();
                before.selectNodeContents(paragraph);
                before.setEnd(range.startContainer, range.startOffset);
                const after = document.createRange();
                after.selectNodeContents(paragraph);
                after.setStart(range.startContainer, range.startOffset);
                const beforeText = before.toString();
                const afterText = after.toString();
                const fragment = document.createDocumentFragment();
                if (beforeText) {
                    const beforeParagraph = document.createElement('p');
                    beforeParagraph.textContent = beforeText;
                    fragment.appendChild(beforeParagraph);
                }
                fragment.appendChild(figure);
                if (afterText) {
                    const afterParagraph = document.createElement('p');
                    afterParagraph.textContent = afterText;
                    fragment.appendChild(afterParagraph);
                }
                paragraph.replaceWith(fragment);
            } else {
                range.insertNode(figure);
            }
        } else {
            canvas.appendChild(figure);
        }
        const caret = document.createRange();
        caret.setStartAfter(figure);
        caret.collapse(true);
        selection.removeAllRanges();
        selection.addRange(caret);
        canvas.focus();
    }

    function setupInlineEditor(row, canvas) {
        let savedRange = null;
        const saveRange = () => {
            const selection = window.getSelection();
            if (selection?.rangeCount && canvas.contains(selection.getRangeAt(0).startContainer)) {
                savedRange = selection.getRangeAt(0).cloneRange();
            }
        };
        canvas.addEventListener('keyup', saveRange);
        canvas.addEventListener('mouseup', saveRange);
        canvas.addEventListener('focus', saveRange);
        row.querySelector('.insert-story-image').addEventListener('mousedown', event => event.preventDefault());
        row.querySelector('.insert-story-video').addEventListener('mousedown', event => event.preventDefault());
        row.querySelector('.insert-story-image').addEventListener('click', () => row.querySelector('.story-image-file').click());
        row.querySelector('.insert-story-video').addEventListener('click', () => row.querySelector('.story-video-file').click());
        row.querySelector('.story-image-file').addEventListener('change', async event => {
            const file = event.currentTarget.files?.[0];
            if (!file) return;
            try {
                insertAtCaret(canvas, createInlineMedia({ type: 'image', src: await optimizeImageFile(file), alt: file.name.replace(/\.[^.]+$/, ''), caption: file.name.replace(/\.[^.]+$/, '') }), savedRange);
                savedRange = null;
            } catch (error) {
                document.getElementById('storyEditorStatus').textContent = error.message || 'Could not add this image.';
            }
            event.currentTarget.value = '';
        });
        row.querySelector('.story-video-file').addEventListener('change', async event => {
            const file = event.currentTarget.files?.[0];
            if (!file) return;
            if (!['video/mp4', 'video/webm', 'video/ogg'].includes(file.type)) {
                document.getElementById('storyEditorStatus').textContent = 'Choose an MP4, WebM, or Ogg video.';
                event.currentTarget.value = '';
                return;
            }
            if (file.size > 1.2 * 1024 * 1024) {
                document.getElementById('storyEditorStatus').textContent = 'Choose a video smaller than 1.2 MB.';
                event.currentTarget.value = '';
                return;
            }
            try {
                const src = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error('Could not read this video file.'));
                    reader.readAsDataURL(file);
                });
                insertAtCaret(canvas, createInlineMedia({ type: 'video', src, caption: file.name.replace(/\.[^.]+$/, '') }), savedRange);
                savedRange = null;
            } catch (error) {
                document.getElementById('storyEditorStatus').textContent = error.message || 'Could not add this video.';
            }
            event.currentTarget.value = '';
        });
    }

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
        row.dataset.currentImageSrc = stop?.image || '';
        const imageInput = row.querySelector('.trail-stop-image-file');
        const preview = row.querySelector('.trail-stop-preview');
        showFilePreview(imageInput, preview, row.dataset.currentImageSrc);
        imageInput.addEventListener('change', () => showFilePreview(imageInput, preview, row.dataset.currentImageSrc));
        row.querySelector('.trail-stop-caption').value = stop?.caption || '';
        trailStopRows.appendChild(row);
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
            const blocks = prose ? Array.from(prose.children).flatMap(child => {
                if (child.matches('p')) return textBlocks(child.textContent);
                if (child.matches('figure.s-story-image')) {
                    const image = child.querySelector('img');
                    return image ? [{ type: 'image', src: image.getAttribute('src') || '', alt: image.alt || '', caption: child.querySelector('figcaption')?.textContent.trim() || '' }] : [];
                }
                return [];
            }) : textBlocks(Array.from(section.querySelectorAll(':scope > p')).map(item => item.textContent.trim()).join('\n\n'));
            return { id: section.id, title: heading?.textContent.trim() || '', body: blocks.filter(block => block.type === 'text').map(block => block.text).join('\n\n'), blocks };
        });
        if (site.story) {
            const opening = sections.find(section => section.id === 'story');
            if (opening) {
                let after = 0;
                const media = opening.blocks.reduce((items, block) => {
                    if (block.type === 'text') after++;
                    else items.push({ ...block, after });
                    return items;
                }, []);
                opening.blocks = addLegacyImages(textBlocks(site.story), media);
                opening.body = site.story;
            }
        }
        const timeline = Array.from(parsed.querySelectorAll('#timeline .s-timeline details')).map(entry => {
            const blocks = Array.from(entry.children).flatMap(child => {
                if (child.matches('p')) return textBlocks(child.textContent);
                if (child.matches('figure.s-story-image')) {
                    const image = child.querySelector('img');
                    return image ? [{ type: 'image', src: image.getAttribute('src') || '', alt: image.alt || '', caption: child.querySelector('figcaption')?.textContent.trim() || '' }] : [];
                }
                return [];
            });
            return { year: entry.querySelector('.yr')?.textContent.trim() || '', title: entry.querySelector('.t')?.textContent.trim() || '', body: blocks.filter(block => block.type === 'text').map(block => block.text).join('\n\n'), blocks };
        });
        const places = Array.from(parsed.querySelectorAll('#inside .s-places details')).map(entry => {
            const blocks = Array.from(entry.children).flatMap(child => {
                if (child.matches('p')) return textBlocks(child.textContent);
                if (child.matches('figure.s-story-image')) {
                    const image = child.querySelector('img');
                    return image ? [{ type: 'image', src: image.getAttribute('src') || '', alt: image.alt || '', caption: child.querySelector('figcaption')?.textContent.trim() || '' }] : [];
                }
                return [];
            });
            return { title: entry.querySelector('summary')?.textContent.trim() || '', body: blocks.filter(block => block.type === 'text').map(block => block.text).join('\n\n'), blocks };
        });
        return { sections, timeline, places, images: [] };
    }

    function addStoryEntry(container, entry, type) {
        const row = storyEntryTemplate.content.firstElementChild.cloneNode(true);
        row.dataset.type = type;
        row.querySelector('.story-entry-label').textContent = type === 'timeline' ? 'Timeline moment' : 'Place detail';
        const year = row.querySelector('.story-entry-year');
        year.hidden = type !== 'timeline';
        row.querySelector('.story-entry-year-input').value = entry?.year || '';
        row.querySelector('.story-entry-title-input').value = entry?.title || '';
        const canvas = row.querySelector('.story-entry-canvas');
        renderEditorBlocks(canvas, entry?.blocks || textBlocks(entry?.body));
        setupInlineEditor(row, canvas);
        row.querySelector('.remove-story-entry').addEventListener('click', () => row.remove());
        container.appendChild(row);
    }

    function addLegacyImages(blocks, images) {
        const output = blocks.slice();
        images.slice().sort((left, right) => Number(left.after || 0) - Number(right.after || 0)).forEach(image => {
            let textCount = 0;
            let insertAt = 0;
            while (insertAt < output.length && textCount < Number(image.after || 0)) {
                if (output[insertAt].type === 'text') textCount++;
                insertAt++;
            }
            output.splice(insertAt, 0, { type: image.type || 'image', src: image.src, alt: image.alt || image.caption || '', caption: image.caption || '' });
        });
        return output;
    }

    function distributeLegacyImages(entries, images) {
        const result = entries.map(entry => ({ ...entry, blocks: entry.blocks || textBlocks(entry.body) }));
        images.slice().sort((left, right) => Number(left.after || 0) - Number(right.after || 0)).forEach(image => {
            let remaining = Math.max(0, Number(image.after) || 0);
            let target = result[0];
            for (const entry of result) {
                const paragraphCount = entry.blocks.filter(block => block.type === 'text').length;
                target = entry;
                if (remaining <= paragraphCount) break;
                remaining -= paragraphCount;
            }
            if (target) target.blocks = addLegacyImages(target.blocks, [{ ...image, after: remaining }]);
        });
        return result;
    }

    function renderManagedStoryEditor(content, site) {
        storySectionRows.replaceChildren();
        storyTimelineRows.replaceChildren();
        storyPlaceRows.replaceChildren();
        (content?.sections || []).forEach(section => {
            const row = storySectionTemplate.content.firstElementChild.cloneNode(true);
            row.dataset.sectionId = section.id;
            row.querySelector('.story-section-title').value = section.title || '';
            if (section.id === 'timeline' || section.id === 'inside') row.querySelector('.story-section-body').hidden = true;
            let blocks = section.blocks || textBlocks(section.body);
            const oldImages = (content.images || []).filter(image => image.sectionId === section.id);
            if (section.id === 'story') oldImages.push(...(site?.images || []));
            blocks = addLegacyImages(blocks, oldImages);
            const canvas = row.querySelector('.story-section-canvas');
            renderEditorBlocks(canvas, blocks);
            setupInlineEditor(row, canvas);
            storySectionRows.appendChild(row);
        });
        const timelineEntries = distributeLegacyImages(content?.timeline || [], (content?.images || []).filter(image => image.sectionId === 'timeline'));
        const placeEntries = distributeLegacyImages(content?.places || [], (content?.images || []).filter(image => image.sectionId === 'inside'));
        timelineEntries.forEach(entry => addStoryEntry(storyTimelineRows, entry, 'timeline'));
        placeEntries.forEach(entry => addStoryEntry(storyPlaceRows, entry, 'place'));
    }

    async function collectManagedStoryContent() {
        return {
            sections: Array.from(storySectionRows.querySelectorAll('.admin-story-section')).map(row => {
                const blocks = collectEditorBlocks(row.querySelector('.story-section-canvas'));
                return { id: row.dataset.sectionId, title: row.querySelector('.story-section-title').value.trim(),
                    body: blocks.filter(block => block.type === 'text').map(block => block.text).join('\n\n'), blocks };
            }),
            timeline: Array.from(storyTimelineRows.querySelectorAll('.admin-story-entry')).map(row => ({
                year: row.querySelector('.story-entry-year-input').value.trim(),
                title: row.querySelector('.story-entry-title-input').value.trim(),
                body: collectEditorBlocks(row.querySelector('.story-entry-canvas')).filter(block => block.type === 'text').map(block => block.text).join('\n\n'),
                blocks: collectEditorBlocks(row.querySelector('.story-entry-canvas'))
            })),
            places: Array.from(storyPlaceRows.querySelectorAll('.admin-story-entry')).map(row => ({
                title: row.querySelector('.story-entry-title-input').value.trim(),
                body: collectEditorBlocks(row.querySelector('.story-entry-canvas')).filter(block => block.type === 'text').map(block => block.text).join('\n\n'),
                blocks: collectEditorBlocks(row.querySelector('.story-entry-canvas'))
            })),
            images: []
        };
    }

    async function openSiteEditor(site) {
        const requestId = ++storyEditorRequest;
        siteForm.reset();
        document.getElementById('siteId').value = site?.id || '';
        document.getElementById('siteName').value = site?.name || '';
        document.getElementById('siteLocation').value = site?.location || '';
        document.getElementById('siteRegion').value = site?.region || '';
        document.getElementById('siteCategory').value = site?.category || 'historical';
        document.getElementById('siteLatitude').value = site?.lat ?? '';
        document.getElementById('siteLongitude').value = site?.lng ?? '';
        document.getElementById('siteDescription').value = site?.description || '';
        const coverInput = document.getElementById('siteCoverImage');
        const coverPreview = document.getElementById('siteCoverPreview');
        coverInput.value = '';
        coverInput.dataset.currentImageSrc = site?.coverImage || '';
        showFilePreview(coverInput, coverPreview, coverInput.dataset.currentImageSrc);
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
                renderManagedStoryEditor(content, site);
                storyEditorReady = true;
            } catch (error) {
                if (requestId !== storyEditorRequest) return;
                document.getElementById('storyEditorStatus').textContent = 'Could not load the current story template, so this editor will leave the published story unchanged. Reopen the editor when connected.';
            }
        }
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
    document.getElementById('siteCoverImage').addEventListener('change', event => {
        const input = event.currentTarget;
        showFilePreview(input, document.getElementById('siteCoverPreview'), input.dataset.currentImageSrc);
    });
    document.getElementById('addTimelineEntry').addEventListener('click', () => addStoryEntry(storyTimelineRows, null, 'timeline'));
    document.getElementById('addPlaceEntry').addEventListener('click', () => addStoryEntry(storyPlaceRows, null, 'place'));
    document.getElementById('closeSiteDialog').addEventListener('click', () => siteDialog.close());
    document.getElementById('cancelSiteEdit').addEventListener('click', () => siteDialog.close());

    siteForm.addEventListener('submit', async event => {
        event.preventDefault();
        const name = document.getElementById('siteName').value.trim();
        const existingId = document.getElementById('siteId').value;
        const id = existingId || name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const previousSite = siteContent.getSiteForAdmin(id);
        let coverImage;
        let managedStoryContent;
        let trail;
        try {
            coverImage = await imageSource(document.getElementById('siteCoverImage'), document.getElementById('siteCoverImage').dataset.currentImageSrc);
            managedStoryContent = storyEditorReady && previousSite?.storyPage ? await collectManagedStoryContent() : previousSite?.storyContent || null;
            trail = TRAIL_STOP_IDS[id] ? {
                title: document.getElementById('trailTitle').value.trim(),
                introduction: document.getElementById('trailIntroduction').value.trim(),
                highlights: document.getElementById('trailHighlights').value.split(/\r?\n/).map(line => line.trim()).filter(Boolean),
                stops: await Promise.all(Array.from(trailStopRows.querySelectorAll('.admin-trail-stop')).map(async row => ({
                    id: row.dataset.stopId,
                    name: row.querySelector('.trail-stop-name').value.trim(),
                    blurb: row.querySelector('.trail-stop-blurb').value.trim(),
                    content: row.querySelector('.trail-stop-content').value.trim(),
                    image: await imageSource(row.querySelector('.trail-stop-image-file'), row.dataset.currentImageSrc),
                    caption: row.querySelector('.trail-stop-caption').value.trim()
                })))
            } : null;
        } catch (error) {
            siteStatus.textContent = error.message || 'Could not prepare the selected image files.';
            return;
        }
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
            coverImage,
            storyPage: siteContent.getSiteForAdmin(id)?.storyPage || '',
            story: managedStoryContent?.sections.find(section => section.id === 'story')?.body || document.getElementById('siteStory').value.trim(),
            images: [],
            storyContent: managedStoryContent,
            naaNotes: document.getElementById('siteNaaNotes').value.trim(),
            trail
        };

        if (embeddedImageBytes(site) > MAX_EMBEDDED_MEDIA_BYTES) {
            siteStatus.textContent = 'Images and videos for one site exceed the 2 MB limit. Remove media or choose smaller files.';
            return;
        }

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
