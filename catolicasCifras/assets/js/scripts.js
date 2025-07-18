let musicDatabase = [];

async function loadMusicDatabase() {
    try {
        const response = await fetch('assets/data/musicDatabase.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o banco de dados de músicas');
        }
        musicDatabase = await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function searchSong() {
    let searchQuery = document.getElementById('search').value.toLowerCase().trim();
    let searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (searchQuery) {
        let filteredSongs = musicDatabase.filter(song => song.title.toLowerCase().includes(searchQuery));
        if (filteredSongs.length > 0) {
            filteredSongs.forEach(song => {
                let songElement = createSongElement(song);
                searchResults.appendChild(songElement);
            });
        } else {
            searchResults.innerHTML = '<p class="alert-red">Nenhuma música encontrada.</p>';
        }
    } else {
        searchResults.innerHTML = '<p class="alert-yellow">Por favor, digite um termo de busca.</p>';
    }
}

function displayCategorySongs(category) {
    let searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    let filteredSongs = musicDatabase.filter(song => song.category.toLowerCase() === category.toLowerCase());
    if (filteredSongs.length > 0) {
        let table = document.createElement('table');
        let tableHeader = `
            <thead>
                <tr>
                    <th>MÚSICA</th>
                    <th>TOM</th>
                </tr>
            </thead>`;
        table.innerHTML = tableHeader;

        let tableBody = document.createElement('tbody');
        filteredSongs.forEach(song => {
            let songRow = document.createElement('tr');
            songRow.innerHTML = `
                <td class="clickable-song">${song.title}</td>
                <td>${song.key}</td>`;
            tableBody.appendChild(songRow);
        });

        table.appendChild(tableBody);

        let tableFooter = document.createElement('tfoot');
        tableFooter.innerHTML = `
            <tr>
                <th>Total de músicas</th>
                <td>${filteredSongs.length}</td>
            </tr>`;
        table.appendChild(tableFooter);

        searchResults.appendChild(table);

        // Adiciona event listeners após criar a tabela
        let clickableSongs = document.querySelectorAll('.clickable-song');
        clickableSongs.forEach((element, index) => {
            element.addEventListener('click', () => {
                let song = filteredSongs[index];
                let songElement = createSongElement(song);
                searchResults.innerHTML = '';
                searchResults.appendChild(songElement);
            });
        });
    } else {
        searchResults.innerHTML = '<p class="alert-red">Nenhuma música encontrada.</p>';
    }
}

function createSongElement(song) {
    let songElement = document.createElement('div');
    songElement.innerHTML = `
        <h3>${song.title}</h3>
        <p>Tom: ${song.key}</p>
        ${song.options.option1 ? `<p>Opção 1: ${song.options.option1}</p>` : ''}
        ${song.options.option2 ? `<p>Opção 2: ${song.options.option2}</p>` : ''}
        ${song.options.fingerpicking ? `<p>Dedilhado: ${song.options.fingerpicking}</p>` : ''}
        ${song.options.rhythm ? `<p>Rítmo: ${song.options.rhythm}</p>` : ''}
        ${song.options.refrain_rhythm ? `<p>Rítmo do refrão: ${song.options.refrain_rhythm}</p>` : ''}
        ${song.options.verse_rhythm ? `<p>Rítmo da estrofe: ${song.options.verse_rhythm}</p>` : ''}
        <div>${song.content}</div>
    `;
    return songElement;
}

document.addEventListener('DOMContentLoaded', loadMusicDatabase);
