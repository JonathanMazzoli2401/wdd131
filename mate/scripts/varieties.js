(function(){
  const $grid = document.getElementById("grid");
  const $filters = document.getElementById("filters");
  const $fav = document.getElementById("favList");
  const $clear = document.getElementById("clearBtn");

  const LS_KEY = "mate_favs";
  const favs = new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));

  function card(v){
    const chips = `
      <span class="chip">Flavor: ${v.flavor}</span>
      <span class="chip">Origin: ${v.origin}</span>
      <span class="chip">Cut: ${v.cut}</span>
    `;
    const favText = favs.has(v.id) ? "★ Favorited" : "☆ Favorite";
    return `
      <article class="item" data-id="${v.id}">
        <img src="${v.img}" alt="${v.name}" loading="lazy" width="400" height="260">
        <div class="pad">
          <h3>${v.name}</h3>
          <div class="chips">${chips}</div>
          <p class="price">$${v.price.toFixed(2)}</p>
          <p><button class="btn btn-fav" type="button">${favText}</button></p>
        </div>
      </article>
    `;
  }

  function render(list){
    $grid.innerHTML = list.map(card).join("");
    $grid.querySelectorAll(".btn-fav").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        const id = e.target.closest(".item").dataset.id;
        if(favs.has(id)) favs.delete(id); else favs.add(id);
        localStorage.setItem(LS_KEY, JSON.stringify([...favs]));
        renderFavs();
        render(list); // re-render to update button text
      });
    });
  }

  function renderFavs(){
    const arr = window.MATE_DATA.filter(x=>favs.has(x.id));
    $fav.innerHTML = arr.map(x => `<li>${x.name}</li>`).join("") || "<li>No favorites yet.</li>";
  }

  function applyFilters(){
    const fd = new FormData($filters);
    const flavor = fd.get("flavor");
    const origin = fd.get("origin");
    const sort = fd.get("sort") || "price-asc";

    // Remember preferred flavor
    if(flavor) localStorage.setItem("mate_pref_flavor", flavor);

    let list = window.MATE_DATA.filter(v =>
      (!flavor || v.flavor === flavor) &&
      (!origin || v.origin === origin)
    );

    if(sort === "price-asc") list.sort((a,b)=>a.price-b.price);
    if(sort === "price-desc") list.sort((a,b)=>b.price-a.price);
    if(sort === "name-asc") list.sort((a,b)=>a.name.localeCompare(b.name));

    render(list);
  }

  $filters.addEventListener("change", applyFilters);
  $clear.addEventListener("click", ()=>{
    $filters.reset();
    applyFilters();
  });

  renderFavs();
  applyFilters();
})();
