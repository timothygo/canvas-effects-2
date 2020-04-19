let WIDTH = 0;
let HEIGHT = 0;

const colors = ["#0F9D58", "#F4B400", "#DB4437", "#4285F4"];

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const particles = [];
  const mouse = { x: 0, y: 0 };

  const resize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    init();
  };

  const update = () => {
    //ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    particles.forEach((particle) => {
      particle.draw(ctx);
      particle.update(mouse);
    });
    requestAnimationFrame(update);
  };

  const init = () => {
    particles.length = 0;

    for (let i = 0; i < 50; i++) {
      let radius = Math.random() * 4 + 2.5;
      let x = WIDTH / 2 - radius / 2;
      let y = HEIGHT / 2 - radius / 2;
      let color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, radius, color));
    }
  };

  resize();
  init();
  update();

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
});

function Particle(x, y, size, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;

  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.radius = Math.floor(Math.random() * (110 - 50) + 50);
  this.prevPos = { x: this.x, y: this.y };
  this.prevMousePos = { x: x, y: y };

  this.draw = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    ctx.moveTo(this.prevPos.x, this.prevPos.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };

  this.update = (mouse) => {
    this.prevPos.x = this.x;
    this.prevPos.y = this.y;
    if (mouse.x > 0 && mouse.y > 0) {
      console.log(mouse);
      this.prevMousePos.x += (mouse.x - this.prevMousePos.x) * 0.05;
      this.prevMousePos.y += (mouse.y - this.prevMousePos.y) * 0.05;
    }
    this.radians += this.velocity;
    this.x = this.prevMousePos.x + Math.cos(this.radians) * this.radius;
    this.y = this.prevMousePos.y + Math.sin(this.radians) * this.radius;
  };
}
