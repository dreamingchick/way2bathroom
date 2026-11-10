export const moodNames=['느긋함','신남','경계','삐침','졸림'];
export const places=['방석','방문','거실 입구','거실','욕실 앞','욕실 안'];
export function createState(rng=Math.random){return {pos:0,mood:Math.floor(rng()*5),trust:50,turn:0,ants:0,lastAnt:-3,lastChoice:-1,repeat:0,stalls:0};}
export function choose(s,choice,rng=Math.random){
if(!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Invalid choice');
s.turn++;s.repeat=s.lastChoice===choice?s.repeat+1:0;s.lastChoice=choice;
const base=[[.8,.65,.5],[.55,.7,.8],[.75,.45,.3],[.65,.4,.35],[.45,.8,.55]][s.mood][choice];
const success=rng()<Math.max(.15,Math.min(.95,base+(s.trust-50)/250-s.repeat*.12))||s.stalls>=3;
let title,text,line,seconds;
if(success){s.pos=Math.min(5,s.pos+1);s.stalls=0;s.trust=Math.min(100,s.trust+5);title='한 걸음 앞으로';text='챠챠가 느릿느릿 따라옵니다.';line=['알았어… 천천히 가.','간식 약속, 기억하고 있어.','그 장난감도 같이 씻는 거야?'][choice];seconds=2}
else{s.stalls++;const retreat=rng()<.25&&s.pos>0; if(retreat)s.pos--;s.trust=Math.max(0,s.trust-3);title=retreat?'다시 익숙한 곳으로':'여기서 잠깐 쉴게';text=retreat?'챠챠가 한 지점 뒤로 돌아갑니다.':'챠챠가 배를 보이고 뒹굴거립니다.';line=['내 이름은 들었어. 가겠다고는 안 했어.','간식은 여기서 먹어도 되잖아.','놀자는 뜻 아니었어?'][choice];seconds=retreat?4:3}
if(rng()<.3)s.mood=Math.floor(rng()*5);
return {title,text,line,seconds};
}
const antRows=[
[['개미 배웅','고개만 돌려 개미를 배웅합니다.','너도 어디 가니… 난 천천히 갈 건데.',2,0],['바닥 관찰','턱을 바닥에 대고 관찰합니다.','가까이서 보니까… 제법 바쁘네.',4,0]],
[['작은 친구','앞발을 통통 구르며 놉니다.','작은 친구다! 같이 놀자!',4,0],['개미 따라가기','개미가 가는 쪽으로 따라갑니다.','어디 가? 나도 갈래!',5,2]],
[['깜짝이야','코를 가까이 댔다가 움찔합니다.','방금… 나한테 온 거야?',3,0],['길 양보','개미를 피해 뒤로 물러납니다.','이 길은 네가 먼저 써.',4,-1]],
[['못 본 척','고개를 돌리고 이동을 준비합니다.','흥. 너한테도 관심 없어.',1,0],['새로운 말동무','개미 앞에 눌러앉습니다.','적어도 얘는 씻으란 말은 안 하네.',5,0]],
[['졸린 눈','눈으로 따라가다 하품합니다.','하나… 둘… 한 마리였나…',3,0],['작은 낮잠','엎드려 개미를 보다가 졸기 시작합니다.','지나가면… 깨워 줘…',6,0]]
];
export function antEvent(s,rng=Math.random){const mood=s.mood;const [title,text,line,seconds,move]=antRows[mood][rng()<.7?0:1];s.ants++;s.lastAnt=s.turn;const delta=move===2?(rng()<.5?1:-1):move;s.pos=Math.max(0,Math.min(4,s.pos+delta));return {title:'🐜 '+title,text:text+(move===2?(delta>0?' 욕실 쪽으로 한 지점 이동합니다.':' 방 쪽으로 한 지점 돌아갑니다.') :''),line,seconds};}
