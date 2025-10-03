const PRODUCT_NAMES = (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS))
  ? PRODUCTS
  : [
      "Mate Thermo X200",
      "Wireless Keyboard K9",
      "Noise-Canceling Headphones N7",
      "4K IPS Monitor 27”",
      "Mechanical Keyboard Azul MK68",
      "Ergonomic Chair Orion"
    ];

function toId(name) {
  return String(name)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const productsObj = PRODUCT_NAMES.map(n => ({ id: toId(n), name: n }));

const productSelect = document.querySelector("#product");
if (productSelect) {
  productsObj.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;          
    opt.textContent = p.name;  
    productSelect.appendChild(opt);
  });
}

const form = document.querySelector("#reviewForm");
const hiddenTime = document.querySelector("#submittedAt");

if (form && hiddenTime) {
  form.addEventListener("submit", () => {
    hiddenTime.value = new Date().toISOString();
  });
}
