function clickMenu() {
    if (menu.style.display == 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function mudouTamanho() {
    if (window.innerWidth >= 526) {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}