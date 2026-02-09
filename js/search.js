/**
 * On Device AI - Documentation Search
 * Client-side search using Fuse.js for fuzzy matching
 */

document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('.docs-search-input');
    const searchResults = document.querySelector('.docs-search-results');

    if (!searchInput || !searchResults || typeof Fuse === 'undefined') return;
    if (!window.DOCS_SEARCH_INDEX) return;

    // Initialize Fuse.js
    const fuse = new Fuse(window.DOCS_SEARCH_INDEX, {
        keys: [
            { name: 'title', weight: 3 },
            { name: 'keywords', weight: 2 },
            { name: 'content', weight: 1 },
            { name: 'section', weight: 0.5 }
        ],
        threshold: 0.4,
        includeMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true
    });

    let selectedIndex = -1;

    // Search on input
    searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (query.length < 2) {
            hideResults();
            return;
        }

        const results = fuse.search(query, { limit: 8 });
        showResults(results, query);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', function (e) {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateSelection(items);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const link = items[selectedIndex].querySelector('a');
            if (link) window.location.href = link.href;
        } else if (e.key === 'Escape') {
            hideResults();
            searchInput.blur();
        }
    });

    // Close results on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.docs-search')) {
            hideResults();
        }
    });

    function showResults(results, query) {
        selectedIndex = -1;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            searchResults.classList.add('visible');
            return;
        }

        const html = results.map((result, i) => {
            const item = result.item;
            const snippet = getSnippet(item.content, query);
            return `
                <div class="search-result-item" data-index="${i}">
                    <a href="${item.url}">
                        <span class="search-result-section">${item.section}</span>
                        <span class="search-result-title">${highlightMatch(item.title, query)}</span>
                        <span class="search-result-snippet">${highlightMatch(snippet, query)}</span>
                    </a>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = html;
        searchResults.classList.add('visible');

        // Mouse hover selection
        searchResults.querySelectorAll('.search-result-item').forEach((item, i) => {
            item.addEventListener('mouseenter', () => {
                selectedIndex = i;
                updateSelection(searchResults.querySelectorAll('.search-result-item'));
            });
        });
    }

    function hideResults() {
        searchResults.classList.remove('visible');
        selectedIndex = -1;
    }

    function updateSelection(items) {
        items.forEach((item, i) => {
            item.classList.toggle('selected', i === selectedIndex);
        });
    }

    function getSnippet(content, query, maxLen) {
        maxLen = maxLen || 120;
        const lower = content.toLowerCase();
        const queryLower = query.toLowerCase();
        const idx = lower.indexOf(queryLower);

        if (idx === -1) return content.substring(0, maxLen) + '...';

        const start = Math.max(0, idx - 40);
        const end = Math.min(content.length, idx + query.length + 80);
        let snippet = content.substring(start, end);

        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';

        return snippet;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('(' + escaped + ')', 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
});
