export class Snow {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.flakes = [];
    this.width = 0;
    this.height = 0;
    
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.initFlakes();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initFlakes() {
    const flakeCount = 200;
    for (let i = 0; i < flakeCount; i++) {
        this.flakes.push(this.createFlake());
    }
  }

  createFlake() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 1 + 0.5,
      wind: Math.random() * 0.5 - 0.25
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.beginPath();
    
    this.flakes.forEach(f => {
      this.ctx.moveTo(f.x, f.y);
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      
      f.y += f.speed;
      f.x += f.wind;
      
      if (f.y > this.height) {
        f.y = -5;
        f.x = Math.random() * this.width;
      }
      if (f.x > this.width) f.x = 0;
      if (f.x < 0) f.x = this.width;
    });
    
    this.ctx.fill();
    requestAnimationFrame(() => this.animate());
  }
}
