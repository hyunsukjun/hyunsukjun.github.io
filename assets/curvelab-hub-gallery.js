const gallery = document.querySelector('[data-hub-gallery]');
const controls = gallery.querySelector('.hub-gallery-controls');
const choices = [...controls.querySelectorAll('[data-hub-pick]')];
const figures = [...gallery.querySelectorAll('figure')];
const status = gallery.querySelector('[data-hub-status]');
let current = 0;

function showScreenshot(index) {
  current = (index + figures.length) % figures.length;
  figures.forEach((figure, position) => {
    const selected = position === current;
    figure.hidden = !selected;
    choices[position].setAttribute('aria-pressed', String(selected));
  });
}

function selectScreenshot(index) {
  showScreenshot(index);
  status.textContent = choices[current].textContent + ' screenshot';
}

choices.forEach((choice, index) => {
  choice.addEventListener('click', () => selectScreenshot(index));
});
controls.querySelectorAll('[data-hub-step]').forEach((button) => {
  button.addEventListener('click', () => selectScreenshot(current + Number(button.dataset.hubStep)));
});

showScreenshot(0);
controls.hidden = false;
