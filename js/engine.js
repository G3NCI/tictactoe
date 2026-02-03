export class GameEngine {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lastTime = 0;
    this.scene = null;

    // Particle system for animated background
    this.particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6
    }));
  }

  setScene(scene) {
    this.scene = scene;
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  drawBackground() {
    // Gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, "#111");
    gradient.addColorStop(1, "#222");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Particle stars
    this.ctx.fillStyle = "#ffcc00";
    this.particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();

      // Move particles
      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x < 0 || p.x > this.canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.dy *= -1;
    });
  }

  loop(timestamp) {
    const delta = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    // Draw background first
    this.drawBackground();

    // Update and render current scene
    if (this.scene) {
      this.scene.update(delta);
      this.scene.render(this.ctx);
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}