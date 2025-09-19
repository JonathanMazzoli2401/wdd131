// Footer fields
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

/**
 * Wind Chill (metric: °C and km/h)
 * WCI = 13.12 + 0.6215*T - 11.37*v^0.16 + 0.3965*T*v^0.16
 * Valid for T <= 10°C and v > 4.8 km/h
 */
function calculateWindChill(Tc, vKmh){
  return 13.12 + (0.6215 * Tc) - (11.37 * Math.pow(vKmh, 0.16)) + (0.3965 * Tc * Math.pow(vKmh, 0.16));
}

(function applyWindChill(){
  const t = Number(document.querySelector("#temp-value")?.textContent ?? NaN);
  const v = Number(document.querySelector("#wind-value")?.textContent ?? NaN);
  const out = document.querySelector("#windchill");
  if (!out || isNaN(t) || isNaN(v)) return;

  if (t <= 10 && v > 4.8){
    out.textContent = `${calculateWindChill(t, v).toFixed(1)} °C`;
  } else {
    out.textContent = "N/A";
  }
})();
