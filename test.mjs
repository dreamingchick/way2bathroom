import assert from 'node:assert/strict';
import {createState,choose,antEvent} from './engine.js';
for(let mood=0;mood<5;mood++)for(const roll of [.1,.9]){const s=createState(()=>0);s.mood=mood;s.pos=4;const r=antEvent(s,()=>roll);assert.ok(r.line.length>0);assert.ok(r.seconds>=1);assert.ok(s.pos>=0&&s.pos<=4);assert.equal(s.ants,1);assert.equal(s.mood,mood)}
{const s=createState(()=>0);for(let i=0;i<100;i++){choose(s,i%3,()=>.99);assert.ok(s.pos>=0&&s.pos<=5);if(s.pos===5)break}assert.equal(s.pos,5)}
{const s=createState(()=>0);s.pos=0;s.mood=2;antEvent(s,()=>.9);assert.equal(s.pos,0);assert.throws(()=>choose(s,9))}
console.log('PASS: ant branches, dialogue, bounds, mood snapshot, progress recovery, input validation');
