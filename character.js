// Chacha's original Run Chacha identity, with purpose-built rollover poses.
export const FRAME_MS=375;
export function characterFrame(pose,walking,elapsed){
 if(pose==='roll')return 4+Math.min(7,Math.floor(Math.max(0,elapsed)/FRAME_MS));
 if(walking)return 1+Math.floor(elapsed/180)%2;
 if(pose==='sit')return 3;
 if(pose==='sleep')return 5;
 if(pose==='play')return 1+Math.floor(elapsed/160)%2;
 return 0;
}
export function drawCharacter(ctx,image,{x,facing,pose,walking,elapsed,now}){
 const frame=characterFrame(pose,walking,elapsed),cw=image.width/4,ch=image.height/3;
 ctx.save();ctx.translate(x,258);ctx.scale(facing,1);
 if(pose==='play')ctx.translate(0,-Math.abs(Math.sin(now/130))*7);
 const w=166,h=w*ch/cw;
 ctx.drawImage(image,(frame%4)*cw,Math.floor(frame/4)*ch,cw,ch,-w/2,-h+12,w,h);
 ctx.restore();
}
