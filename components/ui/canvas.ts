/**
 * Refactored to ES6 Classes with SSR guards for Next.js production builds.
 */

class Oscillator {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;
  value_: number = 0;

  constructor(e: any = {}) {
    this.init(e);
  }

  init(e: any) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    this.value_ = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value_;
  }

  value() {
    return this.value_;
  }
}

class Node {
  x: number = 0;
  y: number = 0;
  vy: number = 0;
  vx: number = 0;
}

class Line {
  spring: number = 0;
  friction: number = 0;
  nodes: Node[] = [];

  constructor(e: any = {}) {
    this.init(e);
  }

  init(e: any) {
    if (typeof window === "undefined") return;
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = (window as any).E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let n = 0; n < (window as any).E.size; n++) {
      const t = new Node();
      t.x = (window as any).pos.x;
      t.y = (window as any).pos.y;
      this.nodes.push(t);
    }
  }

  update() {
    if (typeof window === "undefined") return;
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += ((window as any).pos.x - t.x) * e;
    t.vy += ((window as any).pos.y - t.y) * e;

    for (let i = 0; i < this.nodes.length; i++) {
      t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * (window as any).E.dampening;
        t.vy += n.vy * (window as any).E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= (window as any).E.tension;
    }
  }

  draw() {
    if (typeof window === "undefined") return;
    const ctx = (window as any).ctx as CanvasRenderingContext2D;
    let e: Node, t: Node, a: number;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(n, i);

    for (a = 1; a < this.nodes.length - 2; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }

    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export const renderCanvas = function () {
  if (typeof window === "undefined") return;

  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvasElement) return;

  const ctx = canvasElement.getContext("2d")!;
  (window as any).ctx = ctx;
  (window as any).pos = { x: 0, y: 0 };
  (window as any).lines = [];
  (window as any).E = {
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };
  (ctx as any).running = true;
  (ctx as any).frame = 1;

  const f = new Oscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  function resizeCanvas() {
    if (typeof window === "undefined") return;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function render() {
    if (typeof window === "undefined" || !(ctx as any).running) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `hsla(${Math.round(f.update())}, 80%, 60%, 0.025)`;
    ctx.lineWidth = 10;

    for (let t = 0; t < (window as any).E.trails; t++) {
      const line = (window as any).lines[t];
      if (line) {
        line.update();
        line.draw();
      }
    }

    (ctx as any).frame++;
    window.requestAnimationFrame(render);
  }

  function onMousemove(e: any) {
    function initLines() {
      (window as any).lines = [];
      for (let i = 0; i < (window as any).E.trails; i++) {
        (window as any).lines.push(
          new Line({
            spring: 0.45 + (i / (window as any).E.trails) * 0.025,
          })
        );
      }
    }

    function handleMove(event: any) {
      if (event.touches) {
        (window as any).pos.x = event.touches[0].pageX;
        (window as any).pos.y = event.touches[0].pageY;
      } else {
        (window as any).pos.x = event.clientX;
        (window as any).pos.y = event.clientY;
      }
    }

    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove, { passive: false });
    
    handleMove(e);
    initLines();
    render();
  }

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
};