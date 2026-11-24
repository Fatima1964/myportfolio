const projects = [
 ['Rawafid Online Academy','All ages','Live English, Arabic, Quran, and Islamic studies classes tailored to each learner.','https://rawafidacademy.netlify.app/'],
 ['Reading Adventures Hub','Elementary','Stories, vocabulary, comprehension checks, and reflection for readers in Grades 1–6.','https://readingadventureshub.netlify.app/'],
 ['SpeakUp','Elementary','Weekly speaking missions give students a prompt, a recording space, and feedback from their teacher.','https://rawafidspeakup.netlify.app/'],
 ['SpeakUp Middle','Middle school','Students build speaking portfolios. Teachers review recordings, recognize outstanding work, and reopen missions for a follow-up.'],
 ['Rawafid Writing Hub','Elementary','A writing portfolio for Grades 1–6, keeping student work together for teacher review.','https://rawafidwritinghub.netlify.app/'],
 ['Rawafid English Lab','Middle school','Real-world English and media tasks for students in Grades 7–9.','https://rawafidenglishlab.netlify.app/'],
 ['Rawafid Kindergarten Hub','Kindergarten','One starting point for kindergarten songs, school activities, and home practice.','https://rawafidkindergartenhub.netlify.app/'],
 ['Today at School','Kindergarten','KG1 families revisit classroom learning through audio and video.','https://today-at-school-kg1--rawafidkindergartenhub.netlify.app/'],
 ['Home School Connection · KG2','Kindergarten','Home activities and a sticker board connect classroom practice with family participation.','https://school-home-connection-kg2--rawafidkindergartenhub.netlify.app/'],
 ['Home School Connection · KG3','Kindergarten','Teachers assign workbook pages for families to practise at home.','https://school-home-connection-kg3--rawafidkindergartenhub.netlify.app/'],
 ['KG1 Songs','Kindergarten','A collection of classroom songs for families to revisit together.','https://kg1-songs--rawafidkindergartenhub.netlify.app/'],
 ['Class Pets','Elementary','A classroom pet space where children earn items and care for animals.'],
 ['Writing Academy','Elementary','Eight writing paths take learners from building sentences to editing their work.'],
 ['WordSteps','Elementary','Vocabulary missions, feedback, and grade-level practice for English learners.'],
 ['Middle School ESL','Middle school','A self-learning project for students who need foundational English lessons before grade-level tasks.'],
 ['Rawafid Connect','All ages','A bilingual parent communication project for school announcements and targeted messages.'],
 ['Rawafid Nexus','All ages','A school learning platform project connecting assignments, teacher feedback, and student portfolios.']
];
const stage = document.querySelector('#stage');
let expanded=false;
const more=document.querySelector("#more-projects");
const doodleObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(entry.intersectionRatio>=0.7)entry.target.dataset.drawn='true';
  else if(!entry.isIntersecting)delete entry.target.dataset.drawn;
 }
},{threshold:[0,.7]});
doodleObserver.observe(document.querySelector('.inktitle'));
function addTitleDoodle(heading){
 const ink=document.createElement('span');
 ink.className='project-ink';
 ink.textContent=heading.textContent;
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.setAttribute('viewBox','0 0 200 64');
 svg.setAttribute('preserveAspectRatio','none');
 svg.setAttribute('aria-hidden','true');
 const path=document.createElementNS(ns,'path');
 path.setAttribute('d','M42 56 C12 54 2 43 5 30 C10 8 63 2 111 4 C162 5 198 14 196 33 C194 51 152 60 104 60 C81 61 66 60 53 61');
 path.setAttribute('pathLength','1');
 svg.append(path);ink.append(svg);heading.replaceChildren(ink);
 doodleObserver.observe(ink);
}
function renderProjects(){
 const visible = projects.filter(([,group])=>stage.value==='All learners'||group===stage.value);
 more.hidden=visible.length<=6;
 more.textContent=expanded?'Show fewer projects':'Show all '+visible.length+' projects';
 more.setAttribute('aria-expanded',String(expanded));
 document.querySelector('#projects').replaceChildren(...(expanded?visible:visible.slice(0,6)).map(([name,group,description,url])=>{
  const item=document.createElement('article'); item.className='project';
  if(name==='Rawafid Online Academy'){
   item.classList.add('featured-site');
   const art=document.createElement('img');art.src='art/academy.webp';art.alt='Airplane illustration from the academy website';art.loading='lazy';item.append(art);
  }
  for(const [tag,value] of [['small',group],['h3',name],['p',description]]){
   const el=document.createElement(tag);el.textContent=value;if(tag==='h3')addTitleDoodle(el);item.append(el);
  }
  if(url){const link=document.createElement('a');link.href=url;link.className='projectlink';link.textContent='Visit website';link.setAttribute('aria-label','Visit '+name);item.append(link);}
  return item;
 }));
}
stage.addEventListener('change',()=>{expanded=false;renderProjects();});
more.onclick=()=>{expanded=!expanded;renderProjects();};renderProjects();
document.querySelectorAll('.strip span').forEach((strip,index)=>{
 const words=index?['Storytelling','Speaking missions','Classroom design','English learning']:['Books','Writing','Learning design','Teaching'];
 for(let i=0;i<8;i++)for(const word of words){const label=document.createElement('b');label.textContent=word+'　✧';strip.append(label);}
});
const navigation=document.querySelector('header nav');
const groups=[...navigation.querySelectorAll('.navgroup')];
function showNavigation(active){
 for(const group of groups){
  group.querySelector('button').setAttribute('aria-expanded',String(group===active));
  group.querySelector('.navcard').hidden=group!==active;
 }
}
for(const group of groups){
 const trigger=group.querySelector('button');
 group.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')showNavigation(group);});
 trigger.addEventListener('click',event=>{
  const open=trigger.getAttribute('aria-expanded')==='true';
  showNavigation(open && !(event.detail && matchMedia('(hover:hover)').matches)?null:group);
 });
 group.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!group.contains(document.activeElement))showNavigation(null);});
}
navigation.addEventListener('keydown',event=>{
 if(event.key==='Escape'){const trigger=navigation.querySelector('[aria-expanded=true]');showNavigation(null);trigger?.focus();}
});
navigation.addEventListener('focusout',event=>{if(!event.target.closest('.navgroup')?.contains(event.relatedTarget))showNavigation(null);});
document.addEventListener('pointerdown',event=>{if(!navigation.contains(event.target))showNavigation(null);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))showNavigation(null);});
const demoStates=[
 ['Teacher view','A first recording is ready','A teacher listens to the response and asks the student to try the same mission again.','Flag for follow-up'],
 ['Student view','The mission is open again','The student sees the flagged mission beside their current work and submits another response.','Simulate a new attempt'],
 ['Teacher view','Two recordings, one mission','The teacher reviews the new attempt alongside the original recording and feedback.','Replay example']
];
let step=0;
function showStep(){
 const values=demoStates[step];
 ['role','state-title','state-copy','advance'].forEach((id,index)=>document.getElementById(id).textContent=values[index]);
 document.querySelectorAll('#steps li').forEach((item,index)=>{if(index===step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
}
document.getElementById('advance').onclick=()=>{step=(step+1)%demoStates.length;showStep();};
showStep();
const wall=document.querySelector('#walltrack');
const tiles=[
 [0,'academy'],[1,'reading'],[5,'english'],
 [6,'kindergarten'],[2,'speaking'],[4,'writing'],
 [7,'today'],[8,'kg2'],[9,'kg3'],[10,'songs']
];
for(const [index,art] of tiles){
 const [name,group,,url]=projects[index];
 const tile=document.createElement('a');tile.href=url;
 const img=document.createElement('img');img.src='art/screens/'+art+'.webp';img.alt='';img.loading='lazy';
 const title=document.createElement('strong');title.textContent=name;addTitleDoodle(title);

 tile.append(img,title);wall.append(tile);
}
const backward=document.querySelector('#wallprev'),forward=document.querySelector('#wallnext');
function wallEdges(){backward.disabled=wall.scrollLeft<=2;forward.disabled=wall.scrollLeft+wall.clientWidth>=wall.scrollWidth-2;}
for(const [button,direction] of [[backward,-1],[forward,1]])button.onclick=()=>wall.scrollBy({left:direction*wall.clientWidth*.75,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
wall.addEventListener('scroll',wallEdges);new ResizeObserver(wallEdges).observe(wall);wallEdges();

const flightLane=document.querySelector('.flight-lane');
// Scale the glide to the footer while keeping the curves tangent at each join.
function sizeFlightPath(){
 const w=flightLane.clientWidth,h=flightLane.clientHeight;
 const point=(x,y)=>[x*w,y*h].join(' ');
 const route=[
  'M '+point(.66,.15),
  'C '+[point(.80,.12),point(.94,.28),point(.89,.49)].join(' '),
  'S '+[point(.59,.90),point(.39,.78)].join(' '),
  'S '+[point(.05,.60),point(.13,.41)].join(' '),
  'S '+[point(.43,.16),point(.58,.29)].join(' '),
  'S '+[point(.93,.54),point(1.16,.30)].join(' ')
 ].join(' ');
 flightLane.style.setProperty('--glide-path','path("'+route+'")');
}
sizeFlightPath();
new ResizeObserver(sizeFlightPath).observe(flightLane);
new IntersectionObserver(([entry])=>{
 flightLane.classList.toggle('in-view',entry.isIntersecting);
},{threshold:0.15}).observe(flightLane);
