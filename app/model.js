import {roots} from './data.js';
export const KEY = 'root-quest-v1';
export const fresh = () => ({version:1,cards:{},days:{},sessions:0});
export function dayKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function review(state,id,correct,now=Date.now()) {
 const old=state.cards[id] || {level:0,attempts:0};
 const level=correct ? Math.min(old.level+1,5) : 0;
 const days=[0,1,3,7,14,30];
 state.cards[id]={level,attempts:old.attempts+1,due:now+(correct?days[level]*86400000:600000)};
 const key=dayKey(new Date(now)); state.days[key]=(state.days[key]||0)+1;
}
export function dueRoots(state,now=Date.now()) {return roots.filter(r=>state.cards[r.id]?.due<=now);}
export function streak(state,date=new Date()) {
 const cursor=new Date(date); let count=0;
 if(!state.days[dayKey(cursor)]) cursor.setDate(cursor.getDate()-1);
 while(state.days[dayKey(cursor)]) {count++;cursor.setDate(cursor.getDate()-1);}
 return count;
}
export function validate(value) {
 if(!value || value.version!==1 || !value.cards || !value.days || !Number.isSafeInteger(value.sessions) || value.sessions<0) throw Error('This is not a valid Root Quest backup.');
 const result=fresh(); result.sessions=value.sessions;
 for(const [id,c] of Object.entries(value.cards)) {
  if(!roots.some(r=>r.id===id) || !c || !Number.isInteger(c.level) || c.level<0 || c.level>5 || !Number.isSafeInteger(c.attempts) || c.attempts<1 || !Number.isFinite(c.due) || c.due<0 || c.due>8640000000000000) throw Error('The backup contains invalid review data.');
  result.cards[id]={level:c.level,attempts:c.attempts,due:c.due};
 }
 for(const [day,count] of Object.entries(value.days)) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isSafeInteger(count) || count<0 || !Number.isFinite(Date.parse(day)) || new Date(day).toISOString().slice(0,10)!==day) throw Error('The backup contains invalid activity data.');
  result.days[day]=count;
 }
 return result;
}
