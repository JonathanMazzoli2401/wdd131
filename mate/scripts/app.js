// Shared app behaviors: active nav + footer year + resume panel
(function(){
  const map = {
    "index.html":"home",
    "varieties.html":"varieties",
    "brew.html":"brew",
    "contact.html":"contact"
  };
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('nav a[data-nav]').forEach(a=>{
    const key = map[here] || "home";
    if(a.dataset.nav === key){ a.setAttribute("aria-current","page"); }
  });
  const y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();

  const resume = document.getElementById("resumeText");
  if(resume){
    const strength = localStorage.getItem("mate_strength");
    const ratio = localStorage.getItem("mate_ratio");
    const favs = JSON.parse(localStorage.getItem("mate_favs")||"[]");
    const flavor = localStorage.getItem("mate_pref_flavor");
    const parts = [];
    if(strength && ratio) parts.push(`last brew: ${strength} (${ratio})`);
    if(flavor) parts.push(`preferred flavor: ${flavor}`);
    if(favs.length) parts.push(`favorites: ${favs.length} variety(ies)`);
    if(parts.length) resume.textContent = `Welcome back — ${parts.join(" · ")}.`;
  }
})();
