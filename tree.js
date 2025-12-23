export class MatrixTree {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.chars = "01"; // Matrix binary style
    this.points = [];
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    
    // Christmas light colors
    this.lightColors = [
      "#ff0055", // Red
      "#ffd700", // Gold
      "#00bfff", // Blue
      "#ff69b4", // Pink
      "#ffffff", // White
      "#00ff41"  // Green (matrix)
    ];
    
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.initPoints();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initPoints() {
    this.points = [];
    // Create a cone shape using layers
    const layers = 60;
    for (let y = 0; y < layers; y++) {
      const levelY = -0.8 + (y / layers) * 1.6;
      const radius = (y / layers) * 0.5; // Wider at bottom
      
      const itemsInLayer = 1 + y * 6; // More items at bottom
      
      for (let i = 0; i < itemsInLayer; i++) {
        const angle = (i / itemsInLayer) * Math.PI * 2;
        
        // Randomly assign some points as "lights"
        const isLight = Math.random() > 0.85;
        const lightColor = isLight ? this.lightColors[Math.floor(Math.random() * this.lightColors.length)] : null;
        
        this.points.push({
          x: Math.cos(angle) * radius,
          y: levelY,
          z: Math.sin(angle) * radius,
          char: this.chars[Math.floor(Math.random() * this.chars.length)],
          speed: Math.random() * 0.02 + 0.01,
          isLight: isLight,
          lightColor: lightColor,
          twinklePhase: Math.random() * Math.PI * 2 // For smooth twinkling
        });
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Rotate scene
    this.rotation += 0.01;
    
    // Perspective settings
    const fov = 300;
    const time = Date.now() * 0.003; // For smooth animation
    
    this.points.forEach(p => {
      // Rotate around Y axis
      const rx = p.x * Math.cos(this.rotation) - p.z * Math.sin(this.rotation);
      const rz = p.x * Math.sin(this.rotation) + p.z * Math.cos(this.rotation);
      
      // Project 3D to 2D
      const scale = fov / (fov + rz * 300 + 400); 
      const x2d = rx * 600 * scale + this.width / 2;
      const y2d = p.y * 600 * scale + this.height / 2 - 50; // Move tree up a bit

      // Draw
      const fontSize = Math.floor(14 * scale);
      this.ctx.font = `${fontSize}px 'Fira Code'`;
      
      // Color logic
      if (p.isLight) {
        // Twinkling light effect
        const twinkle = Math.sin(time + p.twinklePhase) * 0.5 + 0.5;
        this.ctx.fillStyle = p.lightColor;
        this.ctx.globalAlpha = 0.5 + twinkle * 0.5;
        
        // Draw a bigger character for lights
        this.ctx.font = `bold ${Math.floor(18 * scale)}px 'Fira Code'`;
        this.ctx.fillText("●", x2d, y2d);
        
        // Add glow effect
        this.ctx.shadowColor = p.lightColor;
        this.ctx.shadowBlur = 10 * twinkle;
      } else {
        // Regular matrix green
        this.ctx.globalAlpha = scale;
        this.ctx.fillStyle = `rgba(0, 255, 65, ${scale})`;
        this.ctx.shadowBlur = 0;
        
        // Random character change
        if (Math.random() > 0.95) {
          p.char = Math.random() > 0.5 ? "0" : "1";
        }
        
        this.ctx.fillText(p.char, x2d, y2d);
      }
      
      // Reset
      this.ctx.globalAlpha = 1;
      this.ctx.shadowBlur = 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}

