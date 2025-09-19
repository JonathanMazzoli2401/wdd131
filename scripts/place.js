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

/* ---- Bind to both mobile and wide cards ---- */
function applyWindChill(tempSel, windSel, outSel){
  const t = Number(document.querySelector(tempSel)?.textContent ?? NaN);
  const v = Number(document.querySelector(windSel)?.textContent ?? NaN);
  const out = document.querySelector(outSel);
  if (!out || isNaN(t) || isNaN(v)) return;

  if (t <= 10 && v > 4.8){
    out.textContent = `${calculateWindChill(t, v).toFixed(1)} °C`;
  } else {
    out.textContent = "N/A";
  }
}

// Wide overlay card
applyWindChill("#temp-value", "#wind-value", "#windchill");

// Mobile stacked card
applyWindChill("#temp-value-m", "#wind-value-m", "#windchill-m");