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
                let songElement = document.createElement('div');
                songElement.innerHTML = `
                    <h3>${song.title}</h3>
                    <p>Opção 1: ${song.options.option1}</p>
                    <p>Opção 2: ${song.options.option2}</p>
                    <p>Dedilhado: ${song.options.fingerpicking}</p>
                    <div>${song.content}</div>
                `;
                searchResults.appendChild(songElement);
            });
        } else {
            searchResults.innerHTML = '<p>Nenhuma música encontrada.</p>';
        }
    } else {
        searchResults.innerHTML = '<p>Por favor, digite um termo de busca.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMusicDatabase);
