photo=function(file){
 if(!file)return;
 const input=document.getElementById('p42file');if(input)input.value='';
 const url=URL.createObjectURL(file),img=new Image();
 img.onerror=()=>{URL.revokeObjectURL(url);alert('Unable to open this photo. Please choose another image.');};
 img.onload=()=>{URL.revokeObjectURL(url);const d=document.createElement('dialog');d.className='crop4817';d.innerHTML=`<h2>Adjust profile photo</h2><p>Drag to reposition · Pinch or slide to zoom</p><canvas width="480" height="480" aria-label="Circular photo preview"></canvas><label>Zoom <input type="range" min="1" max="4" step="0.01" value="1" aria-label="Zoom"></label><div class="cropactions"><button type="button">Cancel</button><button type="button" class="primary">Save photo</button></div>`;document.body.append(d);
 const c=d.querySelector('canvas'),ctx=c.getContext('2d'),slider=d.querySelector('input'),base=480/Math.min(img.naturalWidth,img.naturalHeight);let z=1,x=0,y=0;const pointers=new Map();
 function bounds(){const w=img.naturalWidth*base*z,h=img.naturalHeight*base*z;x=Math.max(-(w-480)/2,Math.min((w-480)/2,x));y=Math.max(-(h-480)/2,Math.min((h-480)/2,y));}
 function draw(){bounds();const w=img.naturalWidth*base*z,h=img.naturalHeight*base*z;ctx.fillStyle='#151517';ctx.fillRect(0,0,480,480);ctx.drawImage(img,(480-w)/2+x,(480-h)/2+y,w,h);}
 function zoom(v){v=Math.max(1,Math.min(4,v));x*=v/z;y*=v/z;z=v;slider.value=z;draw();}
 slider.oninput=()=>zoom(+slider.value);c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);};
 c.onpointermove=e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId),other=[...pointers].find(([id])=>id!==e.pointerId)?.[1],k=480/c.getBoundingClientRect().width;pointers.set(e.pointerId,[e.clientX,e.clientY]);if(other){const a=Math.hypot(old[0]-other[0],old[1]-other[1]),b=Math.hypot(e.clientX-other[0],e.clientY-other[1]);if(a>0)zoom(z*b/a);x+=(e.clientX-old[0])*k/2;y+=(e.clientY-old[1])*k/2;}else{x+=(e.clientX-old[0])*k;y+=(e.clientY-old[1])*k;}draw();};
 c.onpointerup=c.onpointercancel=c.onlostpointercapture=e=>pointers.delete(e.pointerId);c.addEventListener('wheel',e=>{e.preventDefault();zoom(z*Math.exp(-e.deltaY*.002));},{passive:false});
 const [cancel,confirm]=d.querySelectorAll('button');cancel.onclick=()=>d.close();confirm.onclick=()=>{const out=document.createElement('canvas');out.width=out.height=240;out.getContext('2d').drawImage(c,0,0,240,240);(db.profile??={}).photo=out.toDataURL('image/jpeg',.8);save();d.close();render();};d.addEventListener('close',()=>d.remove(),{once:true});draw();d.showModal();
 };img.src=url;
};
