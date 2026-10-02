import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,review,dueRoots,validate,streak,dayKey,plan,question,FAST_LEVEL} from '../model.js';
import {roots,units} from '../data.js';
test('correct recalls space out; a mistake resets and returns in ten minutes',()=>{
 const s=fresh(),now=1700000000000;
 for(const [i,days] of [1,3,7,14,30,30].entries()) {review(s,'bio',true,now);assert.equal(s.cards.bio.level,Math.min(i+1,5));assert.equal(s.cards.bio.due,now+days*86400000);}
 review(s,'bio',false,now);assert.equal(s.cards.bio.level,0);assert.equal(dueRoots(s,now+599999).length,0);assert.equal(dueRoots(s,now+600000)[0].id,'bio');
});
test('a correct quick check jumps a familiar root to the fast-track level',()=>{
 const s=fresh(),now=1700000000000;review(s,'port',true,now,FAST_LEVEL);assert.equal(s.cards.port.level,FAST_LEVEL);assert.equal(s.cards.port.due,now+14*86400000);
 review(s,'dict',false,now,FAST_LEVEL);assert.equal(s.cards.dict.level,0);
});
test('backup roundtrip and malformed inputs',()=>{const s=fresh();review(s,'spect',true);assert.deepEqual(validate(JSON.parse(JSON.stringify(s))),s);for(const bad of [null,{}, {...s,version:2},{...s,cards:{bio:{level:8,attempts:1,due:0}}},{...s,days:{'2026-02-30':2}},{...s,days:{'2026-10-01':-1}}])assert.throws(()=>validate(bad));});
test('backups with retired roots still load, minus those cards',()=>{const s=fresh();review(s,'spect',true);s.cards.retired={level:2,attempts:3,due:0};assert.deepEqual(Object.keys(validate(s).cards),['spect']);});
test('streak allows today to remain unfinished and uses calendar days',()=>{const s=fresh(),now=new Date(2026,9,1,12);s.days['2026-09-30']=2;s.days['2026-09-29']=1;assert.equal(streak(s,now),2);s.days[dayKey(now)]=1;assert.equal(streak(s,now),3);delete s.days['2026-09-30'];assert.equal(streak(s,now),1);});
test('curriculum: unique ids, units cover every item once, complete entries',()=>{
 const ids=roots.map(r=>r.id);assert.equal(new Set(ids).size,ids.length);
 assert.deepEqual(units.flatMap(u=>u.ids).sort(),[...ids].sort());
 for(const r of roots){assert.ok(r.source&&r.words.length>=4,r.id);assert.ok(r.hard.length&&r.hard.every(h=>h.word&&h.definition&&h.parts),r.id);
  if(r.impostor)assert.ok(!r.words.includes(r.impostor.word)&&r.impostor.note,r.id);}
});
test('every question type builds four distinct choices containing the answer',()=>{
 for(const r of roots)for(const mode of ['lesson','review','fast'])for(let n=0;n<5;n++)for(const type of plan(r,mode).filter(t=>t!=='learn')){
  const q=question(r,type);assert.equal(q.choices.length,4,`${r.id} ${type}`);assert.equal(new Set(q.choices).size,4,`${r.id} ${type}`);assert.ok(q.choices.includes(q.answer));
 }
});
test('meaning distractors avoid near-synonyms of the answer',()=>{
 const r=roots.find(x=>x.id==='loqu');for(let n=0;n<50;n++){const q=question(r,'meaning');for(const c of q.choices.filter(c=>c!==q.answer))assert.ok(!/say|call|voice|word|sound/.test(c),c);}
});
