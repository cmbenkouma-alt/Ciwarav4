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
