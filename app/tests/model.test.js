import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,review,dueRoots,validate,streak,dayKey} from '../model.js';
import {roots,units} from '../data.js';
test('correct recalls space out; a mistake resets and returns in ten minutes',()=>{
 const s=fresh(),now=1700000000000;
 for(const [i,days] of [1,3,7,14,30,30].entries()) {review(s,'bio',true,now);assert.equal(s.cards.bio.level,Math.min(i+1,5));assert.equal(s.cards.bio.due,now+days*86400000);}
 review(s,'bio',false,now);assert.equal(s.cards.bio.level,0);assert.equal(dueRoots(s,now+599999).length,0);assert.equal(dueRoots(s,now+600000)[0].id,'bio');
});
test('backup roundtrip and malformed inputs',()=>{const s=fresh();review(s,'spect',true);assert.deepEqual(validate(JSON.parse(JSON.stringify(s))),s);for(const bad of [null,{}, {...s,version:2},{...s,cards:{bio:{level:8,attempts:1,due:0}}},{...s,days:{'2026-02-30':2}},{...s,days:{'2026-10-01':-1}}])assert.throws(()=>validate(bad));});
test('streak allows today to remain unfinished and uses calendar days',()=>{const s=fresh(),now=new Date(2026,9,1,12);s.days['2026-09-30']=2;s.days['2026-09-29']=1;assert.equal(streak(s,now),2);s.days[dayKey(now)]=1;assert.equal(streak(s,now),3);delete s.days['2026-09-30'];assert.equal(streak(s,now),1);});
test('curriculum has unique roots and complete non-overlapping units',()=>{assert.equal(new Set(roots.map(r=>r.id)).size,24);assert.deepEqual(units.flatMap(u=>u.ids).sort(),roots.map(r=>r.id).sort());for(const r of roots)assert.ok(r.words.includes(r.word)&&r.explanation);});
