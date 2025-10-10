(function(){
  const form = document.getElementById("calcForm");
  const out = document.getElementById("calcResult");

  // Load previous
  const saved = JSON.parse(localStorage.getItem("mate_calc") || "{}");
  if(saved.capacity) document.getElementById("capacity").value = saved.capacity;
  if(saved.strength) document.getElementById("strength").value = saved.strength;

  const ratios = { soft: 12, medium: 10, bitter: 8 };

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const capacity = Number(fd.get("capacity"));
    const strength = fd.get("strength");
    const divisor = ratios[strength] || 10;

    const yerba = capacity / divisor; // grams approximated as ml/divisor
    const text = `Use about <strong>${yerba.toFixed(0)} g</strong> of yerba with <strong>${capacity} ml</strong> water (${strength} ratio 1:${divisor}).`;
    out.innerHTML = text;

    localStorage.setItem("mate_calc", JSON.stringify({capacity, strength}));
    localStorage.setItem("mate_strength", strength);
    localStorage.setItem("mate_ratio", `1:${divisor}`);
  });
})();
