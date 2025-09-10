const yearSpan = document.querySelector('#currentyear, #currentYear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) {
  const d = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, '0');
  const stamp = `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  modEl.textContent = `Last Modification: ${stamp}`;
}

const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}