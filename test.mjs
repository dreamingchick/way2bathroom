import assert from 'node:assert/strict';
import {state,actions,drawChoices,choose,antEvent,END} from './engine.js';
for(const pos of [140,570,600,1200,1460,1750]){const s=state();s.x=pos;let previous=[];for(let i=0;i<100;i++){const a=drawChoices(s);assert.equal(new Set(a.map(v=>v.id)).size,3);assert.deepEqual(a.map(v=>v.kind).sort(),[0,1,2]);assert.ok(!a.every(v=>previous.includes(v.id)));previous=a.map(v=>v.id)}}
for(let m=0;m<5;m++)for(const roll of [.1,.9]){const s=state();s.mood=m;s.x=1740;const a=antEvent(s,()=>roll);assert.ok(a.line);assert.ok(s.x>=140&&s.x<END);assert.equal(s.mood,m)}
{const s=state();s.x=1500;drawChoices(s);s.previous=['mat'];choose(s,'mat',()=>0);assert.equal(s.mat,true);s.x=800;assert.ok(drawChoices(s).every(a=>a.id!=='mat'));s.x=1500;for(let i=0;i<20;i++)assert.ok(drawChoices(s).every(a=>a.id!=='mat'))}
for(let m=0;m<5;m++){const s=state();s.mood=m;for(let t=0;t<120&&s.x<END;t++){const a=drawChoices(s);choose(s,a[0].id,()=>.99);assert.ok(s.x>=140&&s.x<=END)}assert.equal(s.x,END)}
assert.equal(actions.length,24);console.log('PASS: contextual choice categories, unique sets, 10 ant branches, bounds, persistent mat, recovery to finish');

import {characterFrame} from './character.js';
assert.deepEqual(Array.from({length:8},(_,i)=>characterFrame('roll',false,i*375)),[4,5,6,7,8,9,10,11]);
assert.equal(characterFrame('roll',false,5000),11);
assert.equal(characterFrame('stand',false,200),0);
console.log('PASS: full 8-frame rollover progression and terminal recovery pose');
