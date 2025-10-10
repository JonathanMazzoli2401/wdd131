(function(){
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name")||"").trim();
    const email = (fd.get("email")||"").trim();
    const flavor = fd.get("prefFlavor") || "";
    const message = (fd.get("message")||"").trim();

    // Simple validation
    if(!name || !email || !message){
      msg.textContent = "Please fill out name, email, and message.";
      msg.style.color = "crimson";
      return;
    }

    if(flavor) localStorage.setItem("mate_pref_flavor", flavor);

    form.reset();
    msg.style.color = "green";
    msg.textContent = "Thanks! We'll get back to you shortly.";
  });

  // Pre-fill preferred flavor if we have it
  const pref = localStorage.getItem("mate_pref_flavor");
  if(pref){
    const select = form.querySelector('select[name="prefFlavor"]');
    if(select) select.value = pref;
  }
})();
