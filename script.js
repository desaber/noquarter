// Stars and subtle drift
(function(){
  const c = document.getElementById('stars');
  const ctx = c.getContext('2d', { alpha: true });
  let w, h, dpr;
  const stars = [];
  const STAR_COUNT = 180;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = c.width = Math.floor(window.innerWidth * dpr);
    h = c.height = Math.floor(window.innerHeight * dpr);
    c.style.width = window.innerWidth + 'px';
    c.style.height = window.innerHeight + 'px';
  }

  function rand(min, max){ return min + Math.random() * (max - min); }

  function seed(){
    stars.length = 0;
    for(let i=0;i<STAR_COUNT;i++){
      stars.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 1.8) * dpr,
        a: rand(0.25, 0.95),
        s: rand(0.05, 0.22) * dpr,
        t: rand(0, Math.PI * 2)
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    // faint vignette
    const grad = ctx.createRadialGradient(w*0.3, h*0.2, 0, w*0.5, h*0.5, Math.max(w,h));
    grad.addColorStop(0, 'rgba(110,168,255,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    for(const s of stars){
      s.t += 0.01;
      s.y += s.s;
      if(s.y > h + 20) { s.y = -20; s.x = rand(0, w); }
      const tw = (Math.sin(s.t) * 0.12) + 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * tw, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,220,255,${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); seed(); });
  resize(); seed(); draw();
})();

function openJoin(){
  alert('Replace this with your Discord invite or clan signup link in index.html.');
  return false;
}
window.openJoin = openJoin;
