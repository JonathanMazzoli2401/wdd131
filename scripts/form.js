document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lmEl = document.getElementById("lastModified");
  if (lmEl) {
    // document.lastModified puede llegar vacío en algunos hosts
    let lm = (document.lastModified || "").trim();

    // Fallback si viene vacío
    if (!lm) {
      lm = new Date().toLocaleString();
    }

    // Formateo amistoso (opcional)
    try {
      const d = new Date(lm);
      lmEl.textContent = isNaN(d.getTime())
        ? lm
        : d.toLocaleString();
    } catch {
      lmEl.textContent = lm;
    }
  }
});

