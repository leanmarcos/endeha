
export function SwitchMode() {
    const currentMode = document.documentElement.getAttribute('data-theme');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    const imgMode = document.getElementById('mode-img');
    const lock = document.getElementById('lock-result');


    imgMode.setAttribute('id', 'mode-img');
    lock.setAttribute('id' , 'lock-result');

    imgMode.src = currentMode === 'dark' ? '/darkmode.png' : '/lightmode.png';
    lock.src = currentMode === 'dark' ? '/dark-encrypt-result.png' : '/encrypt-result.png';

    document.documentElement.setAttribute('data-theme', newMode);
}

// En tu archivo JavaScript
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY; // Posición actual del scroll
  const scrollHeight = document.documentElement.scrollHeight; // Altura total del contenido
  const clientHeight = document.documentElement.clientHeight; // Altura de la ventana

  // Evitar división por cero al inicio
  if (scrollHeight > clientHeight) {
    const progress = (scrollY / (scrollHeight - clientHeight)) * 100;

    console.log(progress);
    
    const header = document.querySelector('.headerBottom');
    const headerTop = document.querySelector('.headerTop');

    /*
    if(progress > 30){
        header.classList.add('header-bottom-scroll');
        headerTop.classList.add('header-top-scroll');
    }

   */
  }
});
