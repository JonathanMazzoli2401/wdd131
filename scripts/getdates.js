const yearSpan = document.querySelector('#currentyear, #currentYear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) {
  const d = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, '0');
  const stamp = `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  modEl.textContent = `Last Modification: ${stamp}`;
}
const headerTitle = document.getElementById('course-title');
const nameH1 = document.querySelector('.site-main h1, main h1, body h1');

if (headerTitle && nameH1) {
  const spanName = document.createElement('span');
  spanName.className = 'student-name';
  spanName.textContent = nameH1.textContent;   
  headerTitle.appendChild(spanName);

  nameH1.style.position = 'absolute';
  nameH1.style.left = '-9999px';
  nameH1.style.width = '1px';
  nameH1.style.height = '1px';
  nameH1.style.overflow = 'hidden';
}

