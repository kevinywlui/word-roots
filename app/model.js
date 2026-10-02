import {roots} from './data.js';
export const KEY = 'root-quest-v1';
export const DAILY_GOAL = 10;
export const FAST_LEVEL = 4;
const DAY = 86400000, INTERVALS = [0,1,3,7,14,30];
export const fresh = () => ({version:1,cards:{},days:{},sessions:0});
export const byId = id => roots.find(r=>r.id===id);
export function dayKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
// `floor` lets a correct fast-track answer jump a familiar root straight to a long interval.
export function review(state,id,correct,now=Date.now(),floor=0) {
 const old=state.cards[id] || {level:0,attempts:0};
 const level=correct ? Math.min(Math.max(old.level+1,floor),5) : 0;
 state.cards[id]={level,attempts:old.attempts+1,due:now+(correct?INTERVALS[level]*DAY:600000)};
 const key=dayKey(new Date(now)); state.days[key]=(state.days[key]||0)+1;
}
export function dueRoots(state,now=Date.now()) {return roots.filter(r=>state.cards[r.id]?.due<=now);}
export function streak(state,date=new Date()) {
 const cursor=new Date(date); let count=0;
 if(!state.days[dayKey(cursor)]) cursor.setDate(cursor.getDate()-1);
 while(state.days[dayKey(cursor)]) {count++;cursor.setDate(cursor.getDate()-1);}
 return count;
}
// Cards for roots no longer in the curriculum are dropped rather than rejected, so old backups still load.
export function validate(value) {
 if(!value || value.version!==1 || !value.cards || !value.days || !Number.isSafeInteger(value.sessions) || value.sessions<0) throw Error('This is not a valid Root Quest backup.');
 const result=fresh(); result.sessions=value.sessions;
 for(const [id,c] of Object.entries(value.cards)) {
  if(!c || !Number.isInteger(c.level) || c.level<0 || c.level>5 || !Number.isSafeInteger(c.attempts) || c.attempts<1 || !Number.isFinite(c.due) || c.due<0 || c.due>8640000000000000) throw Error('The backup contains invalid review data.');
  if(byId(id)) result.cards[id]={level:c.level,attempts:c.attempts,due:c.due};
 }
 for(const [day,count] of Object.entries(value.days)) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isSafeInteger(count) || count<0 || !Number.isFinite(Date.parse(day)) || new Date(day).toISOString().slice(0,10)!==day) throw Error('The backup contains invalid activity data.');
  result.days[day]=count;
 }
 return result;
}

export function shuffled(items,rand=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
const pick=(items,rand)=>items[Math.floor(rand()*items.length)];
// Near-synonyms that would make two glosses both defensible answers.
const SAME=[['see','look','view','show','appear'],['say','speak','call','voice','word','sound'],['carry','bear'],['go','step','run','follow'],['birth','born','kind'],['cut','kill','death'],['rule','power','first'],['loosen','release','dissolve'],['write','draw'],['pull','stretch'],['good','well'],['bad','badly'],['know','wise','wisdom','reason','study'],['trust','believe','faith','belief','opinion'],['fold','turn'],['in','into','on','upon','over'],['thoroughly','completely']];
const senses=gloss=>new Set(gloss.toLowerCase().split(/[^a-z]+/).filter(Boolean).flatMap(w=>[w,...SAME.filter(g=>g.includes(w)).map(g=>g[0])]));
const STOP=new Set(['about','another','being','especially','having','other','something','someone','their','there','thing','things','which','without','person','people','part','parts','state','quality']);
const stems=text=>new Set(text.toLowerCase().split(/[^a-z]+/).filter(w=>w.length>=5&&!STOP.has(w)).map(w=>w.slice(0,5)));
const overlaps=(a,b)=>[...a].some(x=>b.has(x));

// Question types: meaning (gloss a root), shared (find what three words share),
// word (infer a rare word), impostor (spot the false friend).
export function plan(r,mode,rand=Math.random){
 if(mode==='fast') return ['meaning'];
 const second=r.impostor?['word','impostor']:['word'];
 if(mode==='lesson') return ['learn','word',r.impostor?'impostor':'shared'];
 return [pick(['meaning','shared'],rand),pick(second,rand)];
}
export function question(r,type,rand=Math.random){
 const peers=roots.filter(x=>x.id!==r.id&&x.kind===r.kind);
 if(type==='meaning'||type==='shared'){
  const mine=senses(r.meaning);
  const pool=[...new Set(peers.map(x=>x.meaning).filter(m=>!overlaps(senses(m),mine)))];
  const words=shuffled(r.words,rand).slice(0,3);
  return {type,answer:r.meaning,choices:shuffled([r.meaning,...shuffled(pool,rand).slice(0,3)],rand),words};
 }
 if(type==='word'){
  const hard=pick(r.hard,rand),mine=stems(hard.definition);
  const pool=[...new Set(roots.filter(x=>x.id!==r.id).flatMap(x=>x.hard.map(h=>h.definition)).filter(d=>!overlaps(stems(d),mine)))];
  return {type,hard,answer:hard.definition,choices:shuffled([hard.definition,...shuffled(pool,rand).slice(0,3)],rand)};
 }
 if(type==='impostor'){
  const real=shuffled(r.words.filter(w=>w.toLowerCase()!==r.impostor.word.toLowerCase()),rand).slice(0,3);
  return {type,answer:r.impostor.word,choices:shuffled([r.impostor.word,...real],rand)};
 }
 throw Error(`Unknown question type: ${type}`);
}
