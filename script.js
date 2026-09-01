const audio=document.getElementById("radioPlayer");
const status=document.getElementById("status");
const playIcon=document.getElementById("playIcon");
const playText=document.getElementById("playText");
const barPlay=document.getElementById("barPlay");
const buttons=document.querySelectorAll("[data-play]");
function update(playing){
  playIcon.textContent=playing?"Ⅱ":"▶";
  playText.textContent=playing?"METTRE EN PAUSE":"ÉCOUTER EN DIRECT";
  barPlay.textContent=playing?"Ⅱ":"▶";
  status.textContent=playing?"🔴 Radio Ciwara 105.5 FM — EN DIRECT":"Prêt à écouter la radio";
  document.body.classList.toggle("playing",playing);
}
async function toggle(){
  if(audio.paused){
    try{await audio.play();update(true)}
    catch(e){
      status.textContent="Le direct ne démarre pas. Ouvrez le lecteur mobile.";
      try {
        if (typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert("Le lecteur intégré ne peut pas démarrer ce flux dans ce navigateur. Utilisez le lecteur mobile Radio Ciwara.");
        }
      } catch (err) {}
    }
  }else{audio.pause();update(false)}
}
buttons.forEach(b=>b.addEventListener("click",toggle));
audio.addEventListener("playing",()=>update(true));
audio.addEventListener("pause",()=>update(false));
audio.addEventListener("waiting",()=>status.textContent="Connexion au direct…");
audio.addEventListener("error",()=>{update(false);status.textContent="Flux momentanément indisponible";});
const hamburger=document.getElementById("hamburger"),nav=document.getElementById("nav");
hamburger.addEventListener("click",()=>{nav.classList.toggle("open")});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
function tick(){document.getElementById("clock").textContent=new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
tick();setInterval(tick,30000);document.getElementById("year").textContent=new Date().getFullYear();

/* ================================
   ESPACE PUBLICITÉS
   Trois bannières indépendantes
================================ */
(function addAdvertisingSpace(){
  if(document.getElementById("publicites")) return;
  const contact=document.querySelector("section.contact");
  if(!contact) return;

  const section=document.createElement("section");
  section.id="publicites";
  section.className="ads-section";
  section.innerHTML=`
    <div class="wrap">
      <div class="section-head ads-heading">
        <div><span class="red-label">ESPACE PUBLICITÉS</span><h2>Nos annonceurs</h2></div>
        <span class="ads-note">Votre visibilité sur Ciwara Médias</span>
      </div>
      <div class="ads-grid">
        <a class="ad-card" href="tel:75228622" aria-label="Contacter Karim Konaré dit Dolo Karamoko">
          <img src="dolo-banner.svg" alt="Karim Konaré dit Dolo Karamoko — géomancien et astrologue — Dolo Émission">
        </a>
        <a class="ad-card" href="tel:+22374150891" aria-label="Contacter Alimentation Baradji et Frères">
          <img src="baradji-banner.svg" alt="Alimentation Baradji et Frères — alimentation générale">
        </a>
        <a class="ad-card" href="#contact" aria-label="Transport et logistique">
          <img src="transport-banner.svg" alt="Transport et logistique — sécurité, rapidité, fiabilité">
        </a>
      </div>
    </div>`;
  contact.parentNode.insertBefore(section,contact);

  const style=document.createElement("style");
  style.textContent=`
    .ads-section{background:#f8f5f2;padding:64px 0;border-top:1px solid #e6e0dc;border-bottom:1px solid #e6e0dc}
    .ads-heading{margin-bottom:24px}
    .ads-note{font-size:10px;color:#777;font-weight:700}
    .ads-grid{display:grid;grid-template-columns:1fr;gap:18px}
    .ad-card{display:block;background:#fff;border:1px solid #e6e0dc;box-shadow:0 12px 30px rgba(0,0,0,.08);overflow:hidden;transition:transform .2s ease,box-shadow .2s ease}
    .ad-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(0,0,0,.12)}
    .ad-card img{display:block;width:100%;height:auto;aspect-ratio:1536/555;object-fit:cover}
    @media(max-width:720px){.ads-section{padding:45px 0}.ads-grid{gap:14px}.ads-note{display:none}}
  `;
  document.head.appendChild(style);
})();
