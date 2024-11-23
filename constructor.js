document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('table-form');
    const tableContainer = document.getElementById('table-container');

    const albums = [
        { title: "In Utero", artist: "Nirvana", genre: "rock", price: 4500, year: 1993, format: "LP" },
        { title: "Kind of Blue", artist: "Miles Davis", genre: "jazz", price: 3200, year: 1959, format: "LP" },
        { title: "Thriller", artist: "Michael Jackson", genre: "pop", price: 5500, year: 1982, format: "LP" },
        { title: "The Wall", artist: "Pink Floyd", genre: "rock", price: 5000, year: 1979, format: "LP" },
        { title: "The Four Seasons", artist: "Vivaldi", genre: "classical", price: 2500, year: 1725, format: "LP" },
        { title: "Back to Black", artist: "Amy Winehouse", genre: "jazz", price: 3700, year: 2006, format: "LP" },
        { title: "Call Me If You Get Lost", artist: "Tyler, The Creator", genre: "rap", price: 4800, year: 2021, format: "LP" },
        { title: "Brat", artist: "Charli XCX", genre: "pop", price: 3300, year: 2019, format: "LP" },
        { title: "The Dark Side of the Moon", artist: "Pink Floyd", genre: "rock", price: 5200, year: 1973, format: "CD" },
        { title: "Nevermind", artist: "Nirvana", genre: "rock", price: 4000, year: 1991, format: "CD" },
        { title: "Random Access Memories", artist: "Daft Punk", genre: "electronic", price: 4600, year: 2013, format: "CD" },
        { title: "Abbey Road", artist: "The Beatles", genre: "rock", price: 4200, year: 1969, format: "CD" },
    ];

    function filterAlbums(genre, price, year, format) {
        return albums.filter(album => {
            const matchesGenre = !genre || album.genre === genre;
            const matchesPrice =
                !price ||
                (price === 'low' && album.price < 3000) ||
                (price === 'medium' && album.price >= 3000 && album.price <= 5000) ||
                (price === 'high' && album.price > 5000);
            const matchesYear = !year || album.year >= year;
            const matchesFormat = !format || album.format === format;
            return matchesGenre && matchesPrice && matchesYear && matchesFormat;
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const genre = form.genre.value || undefined;
        const price = form.price.value || undefined;
        const year = form.year.value ? parseInt(form.year.value, 10) : undefined;
        const format = form.format.value || undefined;

        localStorage.setItem('tableParams', JSON.stringify({ genre, price, year, format }));

        const filteredAlbums = filterAlbums(genre, price, year, format);
        generateTable(filteredAlbums);
    });

    function generateTable(data) {
        if (data.length === 0) {
            tableContainer.innerHTML = "<p>По вашему запросу ничего не найдено.</p>";
            return;
        }

        const table = document.createElement('table');
        table.classList.add('styled-table');

        const thead = document.createElement('thead');
        thead.innerHTML = `
      <tr>
        <th>Название</th>
        <th>Исполнитель</th>
        <th>Цена</th>
        <th>Год</th>
        <th>Формат</th>
      </tr>
    `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(album => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${album.title}</td>
        <td>${album.artist}</td>
        <td>${album.price} руб.</td>
        <td>${album.year}</td>
        <td>${album.format}</td>
      `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    const savedParams = JSON.parse(localStorage.getItem('tableParams'));
    if (savedParams) {
        form.genre.value = savedParams.genre;
        form.price.value = savedParams.price;
        form.year.value = savedParams.year;
        form.format.value = savedParams.format;

        const filteredAlbums = filterAlbums(savedParams.genre, savedParams.price, savedParams.year, savedParams.format);
        generateTable(filteredAlbums);
    }
});
