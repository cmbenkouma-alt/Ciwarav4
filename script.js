const audio=document.getElementById('radioPlayer');
const status=document.getElementById('status');
const playIcon=document.getElementById('playIcon');
const playText=document.getElementById('playText');
const barPlay=document.getElementById('barPlay');
const buttons=document.querySelectorAll('[data-play]');
const STREAMS=['http://ciwarafm.radiostream321.com/','https://ciwarafm.radiostream321.com/','http://ciwarafm.radiostream321.com/stream','https://ciwarafm.radiostream321.com/stream'];
let streamIndex=0;
function update(playing){if(playIcon)playIcon.textContent=playing?'Ⅱ':'▶';if(playText)playText.textContent=playing?'METTRE EN PAUSE':'ÉCOUTER EN DIRECT';if(barPlay)barPlay.textContent=playing?'Ⅱ':'▶';if(status)status.textContent=playing?'🔴 Radio Ciwara 105.5 FM — EN DIRECT':'Prêt à écouter la radio';document.body.classList.toggle('playing',playing)}
async function playStream(){if(streamIndex>=STREAMS.length){if(status)status.textContent='Flux indisponible dans ce navigateur — ouverture de RadioStream321…';window.open('http://ciwarafm.radiostream321.com/','_blank','noopener');return}const url=STREAMS[streamIndex++];try{audio.src=url;audio.load();if(status)status.textContent='Connexion au direct…';await audio.play();update(true)}catch(e){playStream()}}
function toggle(){if(audio.paused){streamIndex=0;playStream()}else{audio.pause();update(false)}}
buttons.forEach(b=>b.addEventListener('click',toggle));
audio.addEventListener('playing',()=>update(true));
audio.addEventListener('pause',()=>update(false));
audio.addEventListener('waiting',()=>{if(status)status.textContent='Connexion au direct…'});
const hamburger=document.getElementById('hamburger'),nav=document.getElementById('nav');if(hamburger&&nav)hamburger.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
function tick(){const c=document.getElementById('clock');if(c)c.textContent=new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}tick();setInterval(tick,30000);const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

const RSS_URL='https://www.maliweb.net/rss/latest-posts';
const RSS_PROXY='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(RSS_URL)+'&count=7';
const FALLBACK_IMG='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="#a5163e"/><text x="50%" y="50%" fill="white" font-family="Arial" font-size="42" font-weight="700" text-anchor="middle">CIWARA INFOS</text></svg>');
function firstImage(html=''){const m=html.match(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/i);return m?m[1]:''}
function cleanText(html=''){const d=document.createElement('div');d.innerHTML=html;return(d.textContent||'').replace(/\s+/g,' ').trim()}
function safeUrl(url){if(!url)return '';try{return new URL(url,RSS_URL).href}catch(e){return ''}}
function renderNews(items){const box=document.getElementById('rssNews');if(!box)return;if(!items.length){box.innerHTML='<div class="rss-loading">Aucune actualité RSS disponible pour le moment.</div>';return}const cards=items.map((item,i)=>{const image=safeUrl(item.thumbnail)||safeUrl(item.enclosure?.link)||safeUrl(firstImage(item.content||item.description||''))||FALLBACK_IMG;const title=cleanText(item.title||'Actualité Ciwara');const desc=cleanText(item.description||item.content||'').slice(0,180);const date=item.pubDate?new Date(item.pubDate).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'}):'';const href=safeUrl(item.link)||'#';if(i===0)return `<a class="rss-card" href="${href}" target="_blank" rel="noopener"><img src="${image}" alt="" loading="eager" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"><div class="body"><span class="rss-meta">À LA UNE · ${date}</span><h3>${title}</h3><p>${desc}</p></div></a>`;return `<a class="rss-item" href="${href}" target="_blank" rel="noopener"><img src="${image}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"><div><small>${date}</small><h3>${title}</h3></div></a>`});box.innerHTML=`<div>${cards[0]}</div><div class="rss-list">${cards.slice(1).join('')}</div>`}
async function loadRSS(){const box=document.getElementById('rssNews');if(!box)return;try{const r=await fetch(RSS_PROXY,{cache:'no-store'});if(!r.ok)throw new Error('RSS HTTP '+r.status);const data=await r.json();if(data.status!=='ok')throw new Error('RSS unavailable');renderNews((data.items||[]).slice(0,7))}catch(e){box.innerHTML='<div class="rss-loading">Le flux RSS est momentanément indisponible. Réessayez dans quelques instants.</div>'}}
loadRSS();setInterval(loadRSS,15*60*1000);
