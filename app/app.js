import {roots,units} from './data.js';
import {KEY,fresh,dayKey,review,dueRoots,streak,validate} from './model.js';
let state=fresh(), session=null, installPrompt=null;
const main=document.querySelector('#main');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function notify(message){document.querySelector('#notice').textContent=message;}
try {const saved=localStorage.getItem(KEY); if(saved) state=validate(JSON.parse(saved));} catch {notify('Saved progress could not be loaded. You can restore a backup in Your progress.');}
function save(){try {localStorage.setItem(KEY,JSON.stringify(state));}catch {notify('Progress could not be saved on this device. Export a backup before closing.');}}
function button(label,action,style='primary'){return `<button class="${style}" data-action="${action}">${label}</button>`;}
function goHome(){location.hash='home';render();}
function render(){
 const page=location.hash.slice(1)||'home';
 document.querySelectorAll('nav a').forEach(a=>{a.classList.toggle('active',a.hash===`#${page}`); if(a.hash===`#${page}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(page==='study'&&session) return study();
 if(page==='library') return library();
 if(page==='progress') return progress();
 home();
}
function home(){
 const learned=Object.keys(state.cards).length, due=dueRoots(state).length, today=state.days[dayKey()]||0;
 const next=units.findIndex(u=>u.ids.some(id=>!state.cards[id]));
 main.innerHTML=`<section class="hero"><div><p class="eyebrow">YOUR DAILY DOSE OF DISCOVERY</p><h1>Little roots.<br><em>Big discoveries.</em></h1><p class="lead">Find the stories hiding inside English words.<br>A few minutes today. A new way to see tomorrow.</p>${button(next<0?'Practice your roots ↗':'Let’s grow your vocabulary ↗',next<0?'practice':`lesson:${next}`)}<p class="small">${next<0?'Keep your word families fresh':'3 roots · a short lesson · one step forward'}</p></div><div class="root-art" aria-hidden="true"><span class="orbit o1">spect<br><small>see</small></span><span class="orbit o2">bio<br><small>life</small></span><span class="orbit o3">graph<br><small>write</small></span><div class="plant">✳</div><div class="seed">a word grows here</div><div class="art-line"></div></div></section>
 <section class="stats" aria-label="Learning stats"><div><span class="stat-icon">☀</span><strong>${streak(state)}</strong><span>day streak</span></div><div><span class="stat-icon">❋</span><strong>${learned}<small> / 24</small></strong><span>roots explored</span></div><div><span class="stat-icon">◷</span><strong>${Math.min(today,6)}<small> / 6</small></strong><span>daily reviews${today>=6?' · complete!':''}</span></div></section>
 <div class="section-heading"><div><p class="eyebrow">ONE ROOT AT A TIME</p><h2>Your learning path</h2></div><span class="pill">8 little adventures</span></div>
 <div class="home-grid"><section class="units">${units.map((u,i)=>{let done=u.ids.every(id=>state.cards[id]);return `<button class="unit ${i===next?'current':''}" data-action="lesson:${i}"><span class="unit-number">${done?'✓':String(i+1).padStart(2,'0')}</span><span><small>${i<4?'LATIN':'GREEK'} · UNIT ${i+1}</small><strong>${u.title}</strong><span>${u.subtitle}</span></span><span class="unit-arrow">${done?'↻':'→'}</span></button>`;}).join('')}</section><aside><div class="review-card"><span class="large-icon">↻</span><h2>A little repetition.<br>A lasting connection.</h2><p>${due?`${due} roots are ready for another look.`:'Your reviews will appear here when they’re due.'}</p>${button(due?'Review now →':'Practice anytime →',due?'review':'practice','secondary')}</div><div class="note-card"><p class="eyebrow">THE WORD DETECTIVE</p><h3>Words leave clues.</h3><p><b>tele</b> means far. <b>scope</b> means look. Put them together, and a telescope helps you look far away.</p><span>That’s the power of roots. ✧</span></div></aside></div>`;
}
function start(ids,mode){
 const selected=ids.map(id=>roots.find(r=>r.id===id));
 session={cards:selected,mode,index:0,stage:mode==='lesson'?'learn':'meaning',revealed:false,answered:false,correct:0,missed:new Set(),choices:null};
 location.hash='study';render();window.scrollTo(0,0);
}
function shuffled(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
function study(){
 const s=session,r=s.cards[s.index];
 if(!r){main.innerHTML=`<section class="completion"><span class="completion-icon">✺</span><p class="eyebrow">A LITTLE WISER THAN BEFORE</p><h1>Look at you grow.</h1><p>You explored ${s.cards.length} roots and answered ${s.correct} of ${s.cards.length*2} questions correctly.</p><p>${s.missed.size?'The tricky roots will come back sooner for another look.':'Your next reviews are scheduled. Let those connections settle in.'}</p><div class="chips">${s.cards.map(r=>`<span>${r.root} · ${r.meaning}</span>`).join('')}</div>${button('Back to your path →','home')}</section>`;return;}
 const count=s.cards.length;
 main.innerHTML=`<section class="study"><div class="study-top">${button('← Leave lesson','home','text-button')}<span>ROOT ${s.index+1} OF ${count}</span></div><progress max="${count}" value="${s.index}" aria-label="Lesson progress"></progress><p class="eyebrow">${s.stage==='learn'?'MEET YOUR NEXT ROOT':s.stage==='meaning'?'MAKE THE CONNECTION':'WORD DETECTIVE'}</p><div id="exercise"></div></section>`;
 const ex=document.querySelector('#exercise');
 if(s.stage==='learn'){
 ex.innerHTML=`<button class="flashcard" data-action="flip" aria-label="${s.revealed?'Root meaning shown':'Reveal root meaning'}"><span class="pill">${r.origin} ROOT</span><h1>${r.root}</h1>${s.revealed?`<h2>${r.meaning}</h2><p>${r.words.join(' · ')}</p><span class="small">${r.explanation}</span>`:'<p>Tap to uncover its meaning ↻</p>'}</button>${s.revealed?button('Try it out →','try'):''}`;return;
 }
 const answer=s.stage==='meaning'?r.meaning:r.definition;
 if(!s.choices){const pool=roots.filter(x=>x.id!==r.id).map(x=>s.stage==='meaning'?x.meaning:x.definition).filter(x=>x!==answer);s.choices=shuffled([answer,...shuffled([...new Set(pool)]).slice(0,3)]);}
 ex.innerHTML=`<h1 class="question">${s.stage==='meaning'?`What does <em>${r.root}</em> mean?`:`What does <em>${r.word}</em> mean?`}</h1><p class="muted">${s.stage==='meaning'?`A root from ${r.origin}. Choose its meaning.`:`Use the root ${r.root} (${r.meaning}) as your clue.`}</p><div class="answers">${s.choices.map((c,i)=>`<button class="answer ${s.answered&&c===answer?'correct':''} ${s.answered&&i===s.selected&&c!==answer?'incorrect':''}" data-action="answer:${i}" ${s.answered?'disabled':''}><span>${i+1}</span>${c}</button>`).join('')}</div>${s.answered?`<div class="feedback" role="status"><strong>${s.choices[s.selected]===answer?'Nicely connected.':'A new connection to remember.'}</strong><p>${s.stage==='meaning'?`${r.root} means “${r.meaning}.” Look for it in ${r.words.join(', ')}.`:r.explanation}</p></div>${button(s.index===count-1&&s.stage==='word'?'Finish session →':'Continue →','next')}`:''}`;
}
function answer(index){const s=session;if(!s||s.answered||!s.choices[index])return;const r=s.cards[s.index];s.selected=index;s.answered=true;const right=s.choices[index]===(s.stage==='meaning'?r.meaning:r.definition);if(right)s.correct++;else s.missed.add(r.id);study();}
function next(){const s=session;if(!s.answered)return;
 if(s.stage==='meaning')s.stage='word';else {review(state,s.cards[s.index].id,!s.missed.has(s.cards[s.index].id));s.index++;s.stage=s.mode==='lesson'?'learn':'meaning';if(s.index===s.cards.length)state.sessions++;save();}
 s.answered=false;s.revealed=false;s.choices=null;study();window.scrollTo(0,0);
}
function library(){main.innerHTML=`<section class="page-heading"><p class="eyebrow">A COLLECTION OF CONNECTIONS</p><h1>Your root library.</h1><p class="lead">Small pieces. A whole world of words.</p></section><div class="filters"><label class="search"><span>Search roots and words</span><input id="search" type="search" placeholder="Try “bio”, “water”, or “transport”…"></label><label>Origin<select id="origin"><option>All roots</option><option>Latin</option><option>Greek</option></select></label></div><div id="root-list" class="root-list"></div>`;
 const refresh=()=>{const q=document.querySelector('#search').value.toLowerCase().trim(),origin=document.querySelector('#origin').value;const list=roots.filter(r=>(origin==='All roots'||r.origin===origin)&&[r.root,r.meaning,...r.words].join(' ').toLowerCase().includes(q));document.querySelector('#root-list').innerHTML=list.map(r=>`<article class="root-card"><div><span class="eyebrow">${r.origin}</span><span class="level">${state.cards[r.id]?`Level ${state.cards[r.id].level}/5`:'New root'}</span></div><h2>${r.root}</h2><h3>${r.meaning}</h3><p class="examples">${r.words.join(' · ')}</p><details><summary>Follow the word clue</summary><p>${r.explanation}</p></details>${button('Practice this root →',`root:${r.id}`,'text-button')}</article>`).join('')||'<p>No roots found. Try another word or origin.</p>';};document.querySelector('#search').addEventListener('input',refresh);document.querySelector('#origin').addEventListener('change',refresh);refresh();}
function progress(){const explored=Object.keys(state.cards).length,mastered=Object.values(state.cards).filter(c=>c.level>=4).length;
 main.innerHTML=`<section class="page-heading"><p class="eyebrow">EVERY CONNECTION COUNTS</p><h1>A growing vocabulary.</h1><p class="lead">Your progress lives here, on this device.</p></section><section class="stats"><div><strong>${explored}</strong><span>roots explored</span></div><div><strong>${mastered}</strong><span>roots at level 4+</span></div><div><strong>${state.sessions}</strong><span>sessions completed</span></div></section><section class="settings-card"><h2>A rhythm that remembers.</h2><p>Correct answers move a root through reviews after 1, 3, 7, 14, and 30 days. A mistake brings it back after 10 minutes. Complete both questions for a root to save its review.</p><p>Your daily goal is 6 completed root reviews. Your streak counts days with at least one completed review.</p><h3>Next up</h3><p>${dueRoots(state).length} roots due now. ${explored?`Next scheduled review: ${escape(nextDue())}.`:'Start a lesson to schedule your first reviews.'}</p></section><section class="settings-card"><h2>Take your progress with you.</h2><p>Export a backup to move to another device or restore your progress if browser data is cleared. Devices don’t sync automatically.</p><div class="actions">${button('Export progress ↓','export','secondary')}<label class="file-button">Import backup ↑<input id="import" type="file" accept="application/json,.json"></label></div><div id="import-preview"></div></section><section class="settings-card"><h2>Make room for a daily habit.</h2><p id="offline-status">${navigator.serviceWorker?.controller?'Offline app is ready.':'Open online once to prepare offline study.'} On Android, use your browser menu’s “Install app” or “Add to Home screen” option.</p>${installPrompt?button('Install Root Quest','install','secondary'):''}</section>`;
 document.querySelector('#import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try {if(file.size>1000000)throw Error('Please choose a backup smaller than 1 MB.');const incoming=validate(JSON.parse(await file.text()));document.querySelector('#import-preview').innerHTML=`<p>This backup has ${Object.keys(incoming.cards).length} roots and ${incoming.sessions} completed sessions. Importing replaces progress on this device.</p><button class="primary" id="confirm-import">Replace with this backup</button>`;document.querySelector('#confirm-import').onclick=()=>{state=incoming;save();progress();notify('Your progress has been imported.');};}catch(error){notify(error.message);}});
}
function nextDue(){const times=Object.values(state.cards).map(c=>c.due).filter(d=>d>Date.now());return times.length?new Date(Math.min(...times)).toLocaleString(): 'all explored roots are ready now';}
main.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(!el)return;const [action,arg]=el.dataset.action.split(':');
 if(action==='home')goHome();
 if(action==='lesson')start(units[Number(arg)].ids,'lesson');
 if(action==='root')start([arg],'lesson');
 if(action==='review')start(dueRoots(state).slice(0,6).map(r=>r.id),'review');
 if(action==='practice'){const learned=roots.filter(r=>state.cards[r.id]);start(shuffled(learned.length?learned:roots.slice(0,3)).slice(0,6).map(r=>r.id),'review');}
 if(action==='flip'){session.revealed=!session.revealed;study();}
 if(action==='try'){session.stage='meaning';study();}
 if(action==='answer')answer(Number(arg));
 if(action==='next')next();
 if(action==='export'){const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`root-quest-${dayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Backup exported. Keep it somewhere safe.');}
 if(action==='install'&&installPrompt){installPrompt.prompt();installPrompt=null;}
});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(location.hash==='#progress')progress();});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>notify('Offline setup failed. You can keep studying online and retry on your next visit.'));
render();
