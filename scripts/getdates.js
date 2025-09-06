
const yearSpan = document.getElementById("currentyear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();


const mod = document.getElementById("lastModified");
if (mod) {
  const when = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, "0");
  const formatted = `${pad(when.getDate())}/${pad(when.getMonth()+1)}/${when.getFullYear()} ${pad(when.getHours())}:${pad(when.getMinutes())}:${pad(when.getSeconds())}`;
  mod.textContent = `Last Modification: ${formatted}`;
}
