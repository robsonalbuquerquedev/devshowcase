let musicDatabase = [];

async function loadMusicDatabase() {
    try {
        const response = await fetch('assets/data/musicDatabase.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o banco de dados de músicas');
        }
        musicDatabase = await response.json();
        // Não chame displayCategorySongs ou qualquer função de exibição aqui
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
            searchResults.innerHTML = '<p>Nenhuma música encontrada.</p>';
        }
    } else {
        searchResults.innerHTML = '<p>Por favor, digite um termo de busca.</p>';
    }
}

function displayCategorySongs(category) {
    let searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    let filteredSongs = musicDatabase.filter(song => song.category === category);
    if (filteredSongs.length > 0) {
        filteredSongs.forEach(song => {
            let songElement = createSongElement(song);
            searchResults.appendChild(songElement);
        });
    } else {
        searchResults.innerHTML = '<p>Nenhuma música encontrada.</p>';
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
