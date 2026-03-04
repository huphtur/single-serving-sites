(function () {
	const list = document.querySelector('ol.list');
	const items = Array.from(list.children);
	const noResultsMsg = document.querySelector('p.hidden');
	const searchInput = document.querySelector('input.search');
	const sortButtons = document.querySelectorAll('button.sort');

	// 1. Map data ONCE at initialization
	const masterData = items.map(li => ({
		el: li,
		domain: li.querySelector('.domain')?.textContent?.toLowerCase() || '',
		launch: li.querySelector('.launch')?.getAttribute('datetime') || '',
		title: li.querySelector('.title')?.textContent?.toLowerCase() || '',
		description: li.querySelector('.description')?.textContent?.toLowerCase() || '',
		author: li.querySelector('.author')?.textContent?.toLowerCase() || ''
	}));

	let filteredData = [...masterData];
	let renderCount = 0;
	const BATCH_SIZE = 42;
	let currentSort = 'launch';
	let currentDir = 'desc';

	// 2. High-performance Rendering
	function renderBatch(reset = false) {
		if (reset) {
			list.innerHTML = '';
			renderCount = 0;
		}

		const nextBatch = filteredData.slice(renderCount, renderCount + BATCH_SIZE);
		if (nextBatch.length > 0) {
			const fragment = document.createDocumentFragment();
			nextBatch.forEach(item => fragment.appendChild(item.el));
			list.appendChild(fragment);
			renderCount += nextBatch.length;
		}

		noResultsMsg.classList.toggle('hidden', filteredData.length > 0);
	}

	// 3. Modern Infinite Scroll (Intersection Observer)
	const sentinel = document.createElement('div');
	list.after(sentinel); // Place it right after the list

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting && renderCount < filteredData.length) {
			renderBatch();
		}
	}, { rootMargin: '200px' }); // Start loading 200px before reaching bottom

	observer.observe(sentinel);

	// 4. Debounced Search (stops "laggy" typing)
	let debounceTimer;
	searchInput.addEventListener('input', () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			const q = searchInput.value.trim().toLowerCase();
			filteredData = masterData.filter(d =>
				d.domain.includes(q) || d.title.includes(q) || d.description.includes(q) || d.author.includes(q)
			);
			sortData(currentSort, currentDir);
		}, 100);
	});

	// 5. Efficient Sorting
	function sortData(key, dir) {
		currentSort = key;
		currentDir = dir;

		filteredData.sort((a, b) => {
			const valA = a[key] || '';
			const valB = b[key] || '';
			const cmp = valA.localeCompare(valB);
			return dir === 'desc' ? -cmp : cmp;
		});

		updateSortUI();
		renderBatch(true);
	}

	function updateSortUI() {
		sortButtons.forEach(btn => {
			btn.classList.remove('asc', 'desc');
			if (btn.dataset.sort === currentSort) btn.classList.add(currentDir);
		});
	}

	sortButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			let dir = 'asc';
			if (btn.dataset.sort === currentSort) {
				dir = currentDir === 'asc' ? 'desc' : 'asc';
			} else if (btn.dataset.sort === 'launch') {
				dir = 'desc';
			}
			sortData(btn.dataset.sort, dir);
		});
	});

	// Initial Run
	sortData('launch', 'desc');
})();