(()=>{
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease='cubic-bezier(.2,.8,.2,1)';
function animate(el,frames,duration=280,delay=0){if(!el||reduced()||!el.animate)return;return el.animate(frames,{duration,delay,easing:ease});}
const nav=document.querySelector('.bottom'), indicator=document.createElement('span');indicator.className='motion-indicator';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);
function position(){const b=nav.querySelector('button.active[data-page]');if(!b||!nav.clientWidth){indicator.style.opacity=0;return;}indicator.style.width=b.offsetWidth+'px';indicator.style.height=b.offsetHeight+'px';indicator.style.transform=`translate(${b.offsetLeft}px,${b.offsetTop}px)`;indicator.style.opacity=1;}
let lastPage=page;const order=['Today','Trends','History','Profile','Settings'];const oldRender=render;
render=function(){const before=lastPage;oldRender();lastPage=page;position();if(before!==page){if(!document.documentElement.classList.contains('tab-slide4829')){animate($('view'),[{opacity:.75},{opacity:1}],180);drawCharts();}}};
function drawCharts(){document.querySelectorAll('#view svg polyline').forEach(p=>{try{const n=p.getTotalLength();animate(p,[{strokeDasharray:`${n} ${n}`,strokeDashoffset:n},{strokeDasharray:`${n} ${n}`,strokeDashoffset:0}],650)}catch{}});}
window.addEventListener('resize',position);position();
const oldSwitch=switchLog;switchLog=function(i){const before=logTab;const count=tabs.length;const next=(i+count)%count;const direction=next===(before+1)%count?1:next===(before+count-1)%count?-1:next>before?1:-1;oldSwitch(i);if(before!==logTab){const body=$('logbody');body.scrollTop=0;for(const el of [$('logtitle'),body]){el.getAnimations?.().forEach(a=>a.cancel());animate(el,[{opacity:.35,transform:`translateX(${direction*48}px)`},{opacity:1,transform:'translateX(0)'}],300);}}};
// Native dialog lifecycle stays intact; all existing and future dialogs get motion.
const proto=HTMLDialogElement.prototype,show=proto.showModal,close=proto.close;const closing=new WeakSet();
proto.showModal=function(...args){const result=show.apply(this,args);if(this.id==='drawer47')return result;animate(this,this.id==='overlay'?[{opacity:0,transform:'translateY(45px) scale(.97)'},{opacity:1,transform:'none'}]:[{opacity:0,transform:'translateY(12px) scale(.94)'},{opacity:1,transform:'none'}],320);return result;};
// Close immediately to preserve save/switch-dialog semantics; animate a noninteractive visual copy.
proto.close=function(...args){if(this.id==='drawer47')return close.apply(this,args);if(this.open&&!reduced()&&!closing.has(this)){const r=this.getBoundingClientRect();const ghost=this.cloneNode(true);ghost.removeAttribute('id');ghost.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));ghost.removeAttribute('open');ghost.setAttribute('aria-hidden','true');ghost.inert=true;const cs=getComputedStyle(this);Object.assign(ghost.style,{display:'block',position:'fixed',margin:'0',inset:'auto',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',maxWidth:'none',maxHeight:'none',boxSizing:'border-box',background:cs.background,border:cs.border,borderRadius:cs.borderRadius,padding:cs.padding,color:cs.color,zIndex:'9998',pointerEvents:'none',overflow:'hidden'});document.body.append(ghost);const a=animate(ghost,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(18px) scale(.96)'}],170);if(a)a.finished.then(()=>ghost.remove(),()=>ghost.remove());else ghost.remove();}return close.apply(this,args);};
// Startup: reveal the already rendered dashboard exactly once, behind the flying wordmark.
const logo=document.querySelector('aside .logo');
if(!reduced()&&logo){
 const splash=document.createElement('div');splash.id='motion-splash';splash.setAttribute('aria-hidden','true');
 const mark=logo.cloneNode();mark.removeAttribute('class');splash.append(mark);document.body.append(splash);
 logo.style.visibility='hidden';
 let done=false;
 const reveal=()=>{if(done)return;done=true;logo.style.visibility='';splash.remove();position();};
 const finish=()=>{if(done)return;const a=mark.getBoundingClientRect(),b=logo.getBoundingClientRect();
 if(!a.width||!b.width||!mark.animate){reveal();return;}
 const options={duration:650,easing:ease,fill:'forwards'};
 const flight=mark.animate([{transform:'none'},{transform:`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-a.height/2}px) scale(${b.width/a.width})`}],options);
 splash.animate([{backgroundColor:'#09090b'},{backgroundColor:'transparent'}],options);
 flight.finished.then(reveal,reveal);
 };
 setTimeout(finish,420);setTimeout(reveal,1800);
}
})();
