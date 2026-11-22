const gallery = document.querySelector('[data-hub-gallery]');
const controls = gallery.querySelector('.hub-gallery-controls');
const choices = [...controls.querySelectorAll('[data-hub-pick]')];
const figures = [...gallery.querySelectorAll('figure')];
const frames = [...gallery.querySelectorAll('.hub-gallery-frame')];
const images = frames.map(frame => frame.querySelector('img'));
const preview = gallery.querySelector('[data-hub-next]');
const status = gallery.querySelector('[data-hub-status]');
let current = 0;

function showScreenshot(index) {
  current = index % figures.length;
  figures.forEach((figure, position) => {
    const selected = position === current;
    figure.hidden = !selected;
    choices[position].setAttribute('aria-pressed', String(selected));
  });
  preview.replaceChildren(images[current]);
  const nextLabel = choices[(current + 1) % choices.length].textContent;
  preview.setAttribute('aria-label', `Show ${nextLabel} screenshot`);
}

function selectScreenshot(index) {
  showScreenshot(index);
  status.textContent = choices[current].textContent + ' screenshot';
}

choices.forEach((choice, index) => {
  choice.addEventListener('click', () => selectScreenshot(index));
});
preview.addEventListener('click', () => selectScreenshot(current + 1));

frames.forEach(frame => { frame.hidden = true; });
showScreenshot(0);
preview.hidden = false;
controls.hidden = false;
