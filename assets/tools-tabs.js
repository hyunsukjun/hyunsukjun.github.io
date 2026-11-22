const tabList = document.querySelector('.tool-tabs');
const tabs = [...tabList.querySelectorAll('[role="tab"]')];
const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

function showCategory(index) {
  tabs.forEach((tab, position) => {
    const selected = position === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[position].hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  const panel = panels[index];
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.tabIndex = 0;
  panel.querySelector('.tool-category-heading').classList.add('visually-hidden');
  tab.addEventListener('click', () => showCategory(index));
  tab.addEventListener('keydown', event => {
    let next;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (index + tabs.length - 1) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    showCategory(next);
    tabs[next].focus();
  });
});

showCategory(0);
tabList.hidden = false;
