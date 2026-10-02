import {roots,units} from './data.js';
import {KEY,DAILY_GOAL,FAST_LEVEL,fresh,byId,dayKey,review,dueRoots,streak,validate,shuffled,plan,question} from './model.js';
let state=fresh(), session=null, installPrompt=null;
const main=document.querySelector('#main');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const trackOf=Object.fromEntries(units.flatMap(u=>u.ids.map(id=>[id,u.track])));
const kindName=r=>r.kind==='prefix'?'prefix':'root';
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
function fieldNote(){
 const noted=roots.filter(r=>r.note), r=noted[Math.floor(Date.now()/86400000)%noted.length];
 return `<p class="eyebrow">FIELD NOTE · ${escape(r.root.toUpperCase())}</p><h3>${r.root} <span class="gloss">‘${r.meaning}’</span></h3><p>${r.note}</p>`;
}
function home(){
 const learned=Object.keys(state.cards).length, due=dueRoots(state).length, today=state.days[dayKey()]||0;
 const next=units.findIndex(u=>u.ids.some(id=>!state.cards[id]));
 main.innerHTML=`<section class="hero"><div><p class="eyebrow">LATIN & GREEK INSIDE ENGLISH</p><h1>You know the words.<br><em>Meet the pieces.</em></h1><p class="lead">Short daily sessions on the roots inside English: quick checks on the ones you already use, then the ones behind <i>obloquy</i>, <i>egregious</i> and <i>tergiversate</i>.</p>${button(next<0?'Practice your roots →':`${next===0?'Start':'Continue'}: ${units[next].title} →`,next<0?'practice':`lesson:${next}`)}<p class="small">${next<0?'Every unit explored. Reviews keep them sharp.':units[next].fast?'One question per root. Skip ahead by answering correctly.':`${units[next].track} · ${units[next].subtitle}`}</p></div><div class="root-art" aria-hidden="true"><span class="orbit o1">cad<br><small>fall</small></span><span class="orbit o2">loqu<br><small>speak</small></span><span class="orbit o3">greg<br><small>flock</small></span><div class="plant">✳</div><div class="seed">every word has a history</div><div class="art-line"></div></div></section>
 <section class="stats" aria-label="Learning stats"><div><span class="stat-icon">☀</span><strong>${streak(state)}</strong><span>day streak</span></div><div><span class="stat-icon">❋</span><strong>${learned}<small> / ${roots.length}</small></strong><span>roots & prefixes</span></div><div><span class="stat-icon">◷</span><strong>${Math.min(today,DAILY_GOAL)}<small> / ${DAILY_GOAL}</small></strong><span>reviews today${today>=DAILY_GOAL?' · done':''}</span></div></section>
 <div class="section-heading"><div><p class="eyebrow">FROM FAMILIAR TO OBSCURE</p><h2>Your path</h2></div><span class="pill">${units.length} units</span></div>
 <div class="home-grid"><section class="units">${units.map((u,i)=>{const seen=u.ids.filter(id=>state.cards[id]).length,done=seen===u.ids.length;return `<button class="unit ${i===next?'current':''} ${u.fast?'fast':''}" data-action="lesson:${i}"><span class="unit-number">${done?'✓':String(i+1).padStart(2,'0')}</span><span><small>${u.track.toUpperCase()}${u.fast?' · QUICK CHECK':''} · ${seen}/${u.ids.length}</small><strong>${u.title}</strong><span>${u.subtitle}</span></span><span class="unit-arrow">${done?'↻':'→'}</span></button>`;}).join('')}</section><aside><div class="review-card"><span class="large-icon">↻</span><h2>${due?`${due} due for review.`:'Nothing due yet.'}</h2><p>Reviews rotate through rare words and false friends, so remembering a single example isn’t enough.</p>${button(due?'Review now →':'Practice anyway →',due?'review':'practice','secondary')}</div><div class="note-card">${fieldNote()}</div></aside></div>`;
}
function start(ids,mode){
 if(!ids.length)return;
 const cards=ids.map(byId);
 session={cards,mode,index:0,steps:plan(cards[0],mode),step:0,q:null,revealed:false,answered:false,correct:0,total:0,missed:new Set()};
 location.hash='study';render();window.scrollTo(0,0);
}
const stageLabel={learn:'NEW',meaning:'MEANING',shared:'COMMON THREAD',word:'RARE WORD',impostor:'FALSE FRIEND'};
function study(){
 const s=session,r=s.cards[s.index];
 if(!r){main.innerHTML=`<section class="completion"><span class="completion-icon">✺</span><p class="eyebrow">SESSION COMPLETE</p><h1>${s.correct===s.total?'Clean sweep.':'Done for now.'}</h1><p>${s.correct} of ${s.total} answers right across ${s.cards.length} ${s.cards.length===1?'item':'items'}.</p><p>${s.missed.size?'Missed items return in ten minutes.':s.mode==='fast'?'These roots are scheduled two weeks out. Reviews will test them with rarer words.':'Your next reviews are scheduled.'}</p><div class="chips">${s.cards.map(r=>`<span class="${s.missed.has(r.id)?'missed':''}">${r.root} · ${r.meaning}</span>`).join('')}</div>${button('Back to your path →','home')}</section>`;return;}
 const type=s.steps[s.step],count=s.cards.length;
 main.innerHTML=`<section class="study"><div class="study-top">${button('← Leave session','home','text-button')}<span>${s.mode==='fast'?'QUICK CHECK':kindName(r).toUpperCase()} ${s.index+1} OF ${count}</span></div><progress max="${count}" value="${s.index}" aria-label="Session progress"></progress><p class="eyebrow">${stageLabel[type]}</p><div id="exercise"></div></section>`;
 const ex=document.querySelector('#exercise');
 if(type==='learn'){
  ex.innerHTML=`<button class="flashcard" data-action="flip" aria-label="${s.revealed?'Meaning shown':'Reveal meaning'}"><span class="pill">${r.origin.toUpperCase()} ${kindName(r).toUpperCase()}</span><h1>${r.root}</h1>${s.revealed?`<h2>${r.meaning}</h2><p class="source">${r.source}</p><p>${r.words.join(' · ')}</p>${r.cognate?`<p class="small">Related: ${r.cognate}.</p>`:''}${r.note?`<p class="small">${r.note}</p>`:''}`:`<p>${r.words.slice(0,4).join(' · ')}</p><p class="small">What do these share? Guess, then tap to check.</p>`}</button>${s.revealed?button('Test it →','next'):''}`;return;
 }
 const q=s.q||(s.q=question(r,type));
 const prompt={
  meaning:[`What does <em>${r.root}</em> mean?`,`A ${r.origin} ${kindName(r)}.`],
  shared:[`<em>${q.words?.join(' · ')}</em>`,`These words share a ${r.origin} ${kindName(r)}. What does it mean?`],
  word:[`What does <em>${q.hard?.word}</em> mean?`,s.mode==='lesson'?`It contains ${r.root.split(' ')[0]} ‘${r.meaning}’.`:'Work it out from its parts.'],
  impostor:[`Which word is <em>not</em> from ${r.root.split(' ')[0]} ‘${r.meaning}’?`,'Three of these contain it. One only looks as if it does.']
 }[type];
 ex.innerHTML=`<h1 class="question">${prompt[0]}</h1><p class="muted">${prompt[1]}</p><div class="answers">${q.choices.map((c,i)=>`<button class="answer ${s.answered&&c===q.answer?'correct':''} ${s.answered&&i===s.selected&&c!==q.answer?'incorrect':''}" data-action="answer:${i}" ${s.answered?'disabled':''}><span>${i+1}</span>${c}</button>`).join('')}</div>${s.answered?`<div class="feedback" role="status"><strong>${q.choices[s.selected]===q.answer?'Right.':'Not quite.'}</strong>${feedback(r,q)}</div>${button(s.index===count-1&&s.step===s.steps.length-1?'Finish session →':'Continue →','next')}`:''}`;
}
function feedback(r,q){
 const root=`<b>${r.root}</b> ‘${r.meaning}’, from ${r.source}`;
 if(q.type==='word') return `<p><b>${q.hard.word}</b>: ${q.hard.definition}.<br><span class="parts">${q.hard.parts}.</span></p>`;
 if(q.type==='impostor') return `<p><b>${r.impostor.word}</b>: ${r.impostor.note}</p>`;
 const extra=session.mode==='fast'?`<p class="parts">Harder: <b>${r.hard[0].word}</b>, ${r.hard[0].definition} (${r.hard[0].parts}).</p>${r.impostor?`<p class="parts">False friend: <b>${r.impostor.word}</b>. ${r.impostor.note}</p>`:''}`:'';
 return `<p>${root}. Also in ${r.words.join(', ')}.</p>${extra}`;
}
function answer(index){const s=session;if(!s||s.answered||!s.q||!s.q.choices[index])return;const r=s.cards[s.index];s.selected=index;s.answered=true;s.total++;if(s.q.choices[index]===s.q.answer)s.correct++;else s.missed.add(r.id);study();}
function next(){const s=session;if(!s)return;
 if(s.steps[s.step]==='learn'){if(!s.revealed)return;}else if(!s.answered)return;
 s.step++;
 if(s.step===s.steps.length){const id=s.cards[s.index].id;review(state,id,!s.missed.has(id),Date.now(),s.mode==='fast'?FAST_LEVEL:0);s.index++;s.step=0;if(s.index===s.cards.length)state.sessions++;else s.steps=plan(s.cards[s.index],s.mode);save();}
 s.answered=false;s.revealed=false;s.q=null;study();window.scrollTo(0,0);
}
function rootCard(r){
 const card=state.cards[r.id];
 return `<article class="root-card"><div><span class="eyebrow">${trackOf[r.id]}</span><span class="level">${card?`Level ${card.level}/5`:'New'}</span></div><h2>${r.root}</h2><h3>${r.meaning}</h3><p class="source">${r.source}</p><p class="examples">${r.words.join(' · ')}</p><details><summary>Rare words${r.impostor?' & a false friend':''}</summary><dl>${r.hard.map(h=>`<dt>${h.word}</dt><dd>${h.definition}. <span class="parts">${h.parts}.</span></dd>`).join('')}${r.impostor?`<dt class="impostor">Not related: ${r.impostor.word}</dt><dd>${r.impostor.note}</dd>`:''}</dl>${r.cognate?`<p>Related: ${r.cognate}.</p>`:''}${r.note?`<p>${r.note}</p>`:''}</details>${button('Practice this one →',`root:${r.id}`,'text-button')}</article>`;
}
function library(){const tracks=[...new Set(units.map(u=>u.track))];main.innerHTML=`<section class="page-heading"><p class="eyebrow">REFERENCE</p><h1>The library.</h1><p class="lead">${roots.length} roots and prefixes, with rare words and false friends.</p></section><div class="filters"><label class="search"><span>Search roots, meanings and words</span><input id="search" type="search" placeholder="Try “fall”, “greg”, or “obloquy”…"></label><label>Track<select id="track"><option>All</option>${tracks.map(t=>`<option>${t}</option>`).join('')}</select></label></div><div id="root-list" class="root-list"></div>`;
 const refresh=()=>{const q=document.querySelector('#search').value.toLowerCase().trim(),track=document.querySelector('#track').value;const list=roots.filter(r=>(track==='All'||trackOf[r.id]===track)&&[r.root,r.meaning,r.source,...r.words,...r.hard.map(h=>h.word),r.impostor?.word||''].join(' ').toLowerCase().includes(q));document.querySelector('#root-list').innerHTML=list.map(rootCard).join('')||'<p>Nothing matches. Try another word or track.</p>';};document.querySelector('#search').addEventListener('input',refresh);document.querySelector('#track').addEventListener('change',refresh);refresh();}
function progress(){const explored=Object.keys(state.cards).length,mastered=Object.values(state.cards).filter(c=>c.level>=4).length;
 main.innerHTML=`<section class="page-heading"><p class="eyebrow">ON THIS DEVICE</p><h1>Your progress.</h1><p class="lead">Stored locally. Export a backup to move it.</p></section><section class="stats"><div><strong>${explored}</strong><span>explored</span></div><div><strong>${mastered}</strong><span>at level 4+</span></div><div><strong>${state.sessions}</strong><span>sessions</span></div></section><section class="settings-card"><h2>How scheduling works</h2><p>Correct answers move an item through reviews after 1, 3, 7, 14 and 30 days. A mistake brings it back after 10 minutes. Every question for an item must be right for it to advance.</p><p>Familiar roots get one quick check. Answer correctly and they jump to the 14-day interval; later reviews test them with rarer words and false friends.</p><p>The daily goal is ${DAILY_GOAL} completed reviews. Your streak counts days with at least one.</p><h3>Next up</h3><p>${dueRoots(state).length} due now. ${explored?`Next scheduled review: ${escape(nextDue())}.`:'Start a unit to schedule your first reviews.'}</p></section><section class="settings-card"><h2>Backups</h2><p>Export a backup to move to another device or to restore progress if browser data is cleared. Devices don’t sync automatically.</p><div class="actions">${button('Export progress ↓','export','secondary')}<label class="file-button">Import backup ↑<input id="import" type="file" accept="application/json,.json"></label></div><div id="import-preview"></div></section><section class="settings-card"><h2>Install</h2><p id="offline-status">${navigator.serviceWorker?.controller?'Offline app is ready.':'Open online once to prepare offline study.'} On Android, use your browser menu’s “Install app” or “Add to Home screen” option.</p>${installPrompt?button('Install Root Quest','install','secondary'):''}</section>`;
 document.querySelector('#import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try {if(file.size>1000000)throw Error('Please choose a backup smaller than 1 MB.');const incoming=validate(JSON.parse(await file.text()));document.querySelector('#import-preview').innerHTML=`<p>This backup has ${Object.keys(incoming.cards).length} items and ${incoming.sessions} completed sessions. Importing replaces progress on this device.</p><button class="primary" id="confirm-import">Replace with this backup</button>`;document.querySelector('#confirm-import').onclick=()=>{state=incoming;save();progress();notify('Your progress has been imported.');};}catch(error){notify(error.message);}});
}
function nextDue(){const times=Object.values(state.cards).map(c=>c.due).filter(d=>d>Date.now());return times.length?new Date(Math.min(...times)).toLocaleString(): 'everything explored is due now';}
main.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(!el)return;const [action,arg]=el.dataset.action.split(/:(.*)/);
 if(action==='home')goHome();
 if(action==='lesson')start(units[Number(arg)].ids,units[Number(arg)].fast?'fast':'lesson');
 if(action==='root')start([arg],'lesson');
 if(action==='review')start(dueRoots(state).slice(0,DAILY_GOAL).map(r=>r.id),'review');
 if(action==='practice'){const learned=roots.filter(r=>state.cards[r.id]);start(shuffled(learned.length?learned:roots.slice(0,3)).slice(0,6).map(r=>r.id),'review');}
 if(action==='flip'){session.revealed=!session.revealed;study();}
 if(action==='answer')answer(Number(arg));
 if(action==='next')next();
 if(action==='export'){const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`root-quest-${dayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Backup exported. Keep it somewhere safe.');}
 if(action==='install'&&installPrompt){installPrompt.prompt();installPrompt=null;}
});
// Number keys pick an answer; Enter continues once answered.
document.addEventListener('keydown',e=>{if(location.hash!=='#study'||!session||e.altKey||e.ctrlKey||e.metaKey)return;
 if(/^[1-4]$/.test(e.key)&&!session.answered&&session.q){e.preventDefault();answer(Number(e.key)-1);}
 else if(e.key==='Enter'&&(session.answered||session.revealed)&&!e.target.closest?.('button')){e.preventDefault();next();}
});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(location.hash==='#progress')progress();});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>notify('Offline setup failed. You can keep studying online and retry on your next visit.'));
render();
