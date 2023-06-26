let accordions = document.getElementsByClassName('accordion');

for (let accordion of accordions) {
  accordion.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    let panel = e.target.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}
