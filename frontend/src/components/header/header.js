
export function SwitchMode() {
    const currentMode = document.documentElement.getAttribute('data-theme');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    const imgMode = document.getElementById('mode-img');
    const lock = document.getElementById('lock-result');


    imgMode.setAttribute('id', 'mode-img');
    lock.setAttribute('id', 'lock-result');

    imgMode.src = currentMode === 'dark' ? '/darkmode.png' : '/lightmode.png';
    lock.src = currentMode === 'dark' ? '/dark-encrypt-result.png' : '/encrypt-result.png';

    document.documentElement.setAttribute('data-theme', newMode);
}

/*
let isScrolled = false;
const minPixels = 30;

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight <= clientHeight) return;

    const header = document.querySelector('.headerBottom');
    const headerTop = document.querySelector('.headerTop');

    if (window.scrollY > minPixels && !isScrolled) {
        header.classList.add('header-bottom-scroll');
        headerTop.classList.add('header-top-scroll');
        isScrolled = true;
    }

    if (window.scrollY < minPixels && isScrolled) {
        header.classList.remove('header-bottom-scroll');
        headerTop.classList.remove('header-top-scroll');
        isScrolled = false;
    }
});
*/