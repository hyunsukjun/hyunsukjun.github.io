const gallery = document.querySelector('.app-screens');
const controls = gallery.querySelector('.app-screens-controls');
const buttons = [...controls.querySelectorAll('[data-screen]')];
const screenshots = [...gallery.querySelectorAll('.app-screenshot')];

function showScreen(index) {
  screenshots.forEach((image, position) => {
    image.hidden = position !== index;
    buttons[position].setAttribute('aria-pressed', String(position === index));
  });
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => showScreen(index));
});

showScreen(0);
gallery.classList.add('is-enhanced');
controls.hidden = false;
