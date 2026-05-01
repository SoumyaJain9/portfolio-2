function Oscillator(e: any) { (this as any).init(e || {}); }
(Oscillator as any).prototype = {
  init(e: any) { this.phase = e.phase||0; this.offset = e.offset||0; this.frequency = e.frequency||0.001; this.amplitude = e.amplitude||1; },
  update() { this.phase += this.frequency; return (this.value_ = this.offset + Math.sin(this.phase) * this.amplitude); },
  value() { return this.value_; }
};

function Line(e: any) { (this as any).init(e || {}); }
(Line as any).prototype = {
  init(e: any) {
    this.spring = e.spring + 0.1*Math.random() - 0.05;
    this.friction = (window as any).E.friction + 0.01*Math.random() - 0.005;
    this.nodes = [];
    for (let n=0; n<(window as any).E.size; n++) {
      const t = new (Node as any)();
      t.x = (window as any).pos.x;
      t.y = (window as any).pos.y;
      this.nodes.push(t);
    }
  },
  update() {
    let e = this.spring, t = this.nodes[0];
    t.vx += ((window as any).pos.x - t.x) * e;
    t.vy += ((window as any).pos.y - t.y) * e;
    for (let n, i=0, a=this.nodes.length; i<a; i++) {
      t = this.nodes[i];
      if (i>0) {
        n = this.nodes[i-1];
        t.vx += (n.x-t.x)*e; t.vy += (n.y-t.y)*e;
        t.vx += n.vx*(window as any).E.dampening;
        t.vy += n.vy*(window as any).E.dampening;
      }
      t.vx *= this.friction; t.vy *= this.friction;
      t.x += t.vx; t.y += t.vy; e *= (window as any).E.tension;
    }
  },
  draw() {
    const ctx = (window as any).ctx;
    let e, t, n=this.nodes[0].x, i=this.nodes[0].y;
    ctx.beginPath(); ctx.moveTo(n,i);
    for (let a=1, o=this.nodes.length-2; a<o; a++) {
      e=this.nodes[a]; t=this.nodes[a+1];
      n=0.5*(e.x+t.x); i=0.5*(e.y+t.y);
      ctx.quadraticCurveTo(e.x,e.y,n,i);
    }
    e=this.nodes[a]; t=this.nodes[a+1];
    ctx.quadraticCurveTo(e.x,e.y,t.x,t.y);
    ctx.stroke(); ctx.closePath();
  }
};

function Node(this: any) { this.x=0; this.y=0; this.vy=0; this.vx=0; }

export const renderCanvas = function() {
  const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d")!;
  (window as any).ctx = ctx;
  (window as any).pos = {};
  (window as any).lines = [];
  (window as any).E = { friction:0.5, trails:80, size:50, dampening:0.025, tension:0.99 };
  (ctx as any).running = true;
  (ctx as any).frame = 1;

  const f = new (Oscillator as any)({ phase:Math.random()*2*Math.PI, amplitude:85, frequency:0.0015, offset:285 });

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function render() {
    if (!(ctx as any).running) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `hsla(${Math.round(f.update())},80%,60%,0.025)`;
    ctx.lineWidth = 10;
    for (let t=0; t<(window as any).E.trails; t++) {
      (window as any).lines[t].update();
      (window as any).lines[t].draw();
    }
    (ctx as any).frame++;
    window.requestAnimationFrame(render);
  }

  function onMousemove(e: any) {
    function initLines() {
      (window as any).lines = [];
      for (let i=0; i<(window as any).E.trails; i++)
        (window as any).lines.push(new (Line as any)({ spring: 0.45+(i/(window as any).E.trails)*0.025 }));
    }
    function handleMove(e: any) {
      if (e.touches) {
        (window as any).pos.x = e.touches[0].pageX;
        (window as any).pos.y = e.touches[0].pageY;
      } else {
        (window as any).pos.x = e.clientX;
        (window as any).pos.y = e.clientY;
      }
      e.preventDefault();
    }
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    handleMove(e);
    initLines();
    render();
  }

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
};