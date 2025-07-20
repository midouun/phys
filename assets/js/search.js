document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    const pagesToSearch = [
        { url: './lessons.html', title: 'Lessons', content: '' },
        { url: './resources.html', title: 'Resources', content: '' },
        { url: './faq.html', title: 'FAQ', content: '' }
    ];

    // Function to fetch content and build index
    async function buildSearchIndex() {
        for (const page of pagesToSearch) {
            try {
                const response = await fetch(page.url);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                // Extract relevant text content from the main section
                const mainContent = doc.querySelector('main');
                if (mainContent) {
                    page.content = mainContent.innerText;
                }
            } catch (error) {
                console.error(`Error fetching ${page.url}:`, error);
            }
        }
    }

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            return;
        }

        const filteredResults = pagesToSearch.filter(page =>
            page.title.toLowerCase().includes(query) || page.content.toLowerCase().includes(query)
        );

        if (filteredResults.length === 0) {
            const noResults = document.createElement('p');
            noResults.textContent = 'No results found.';
            searchResults.appendChild(noResults);
            return;
        }

        filteredResults.forEach(page => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            const link = document.createElement('a');
            link.href = page.url;
            link.textContent = page.title;
            resultItem.appendChild(link);
            searchResults.appendChild(resultItem);
        });
    }

    // Build index on load
    buildSearchIndex();

    // Event listener for search input
    searchInput.addEventListener('input', performSearch);
});
