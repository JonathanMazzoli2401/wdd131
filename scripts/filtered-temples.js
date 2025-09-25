const yearSpan = document.querySelector('#currentyear, #currentYear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) {
  const d = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, '0');
  modEl.textContent =
    `Last Modification: ${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const menuBtn = document.getElementById('menu');
const navEl  = document.getElementById('primary-nav') || document.querySelector('nav');

if (menuBtn && navEl) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Montevideo Uruguay",
    location: "Montevideo, Uruguay",
    dedicated: "2001, March, 18",
    area: 10700,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/montevideo-uruguay-temple/montevideo-uruguay-temple-18474-main.jpg"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6-24",
    area: 382207,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Brasilia Brazil",
    location: "Brasilia, Brazil",
    dedicated: "2023, September, 17",
    area: 25000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-39184-main.jpg"
  }
];

const cards = document.getElementById('cards');

function getYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(',')[0].trim(), 10);
}

function renderTemples(list) {
  if (!cards) return;
  cards.innerHTML = '';
  list.forEach(t => {
    const fig = document.createElement('figure');
    fig.className = 'card';

    const img = document.createElement('img');
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = 'lazy';

    const cap = document.createElement('figcaption');
    const h3 = document.createElement('h3'); h3.textContent = t.templeName;

    const loc = document.createElement('p');
    loc.className = 'meta';
    loc.innerHTML = `<strong>Location:</strong> ${t.location}`;

    const ded = document.createElement('p');
    ded.className = 'meta';
    ded.innerHTML = `<strong>Dedicated:</strong> ${t.dedicated}`;

    const area = document.createElement('p');
    area.className = 'meta';
    area.innerHTML = `<strong>Size:</strong> ${t.area.toLocaleString()} sq ft`;

    cap.append(h3, loc, ded, area);
    fig.append(cap, img);              
    cards.append(fig);
  });
}

function normalizeKind(k) {
  if (!k) return 'home';
  k = k.toLowerCase().trim();
  return ['home','old','new','large','small'].includes(k) ? k : 'home';
}

function applyFilter(kind) {
  const k = normalizeKind(kind);
  let filtered = temples;

  if (k === 'old')   filtered = temples.filter(t => getYear(t.dedicated) < 1900);
  if (k === 'new')   filtered = temples.filter(t => getYear(t.dedicated) > 2000);
  if (k === 'large') filtered = temples.filter(t => t.area > 90000);
  if (k === 'small') filtered = temples.filter(t => t.area < 10000);

  renderTemples(filtered);

  if (navEl && navEl.classList.contains('open') && menuBtn) {
    navEl.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  }
}

if (navEl) {
  navEl.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    applyFilter(a.dataset.filter || a.textContent);
  });
} else {
  console.warn('No se encontró el <nav>; los filtros no se podrán activar.');
}

renderTemples(temples);