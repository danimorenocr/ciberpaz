const canvas = document.getElementById('background-animation');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let lines = [];
const colors = ['rgba(0, 198, 255, 0.5)', 'rgba(0, 114, 255, 0.5)', 'rgba(0, 255, 204, 0.5)'];

function createLine() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 200 + 100,
    speed: Math.random() * 2 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
  };
}

for (let i = 0; i < 15; i++) {
  lines.push(createLine());
}

function drawLine(line) {
  ctx.strokeStyle = line.color; // Usando el color rgba con opacidad
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(line.x, line.y);
  ctx.lineTo(
    line.x + Math.cos(line.angle) * line.length,
    line.y + Math.sin(line.angle) * line.length
  );
  ctx.stroke();
}

function updateLine(line) {
  line.x += Math.cos(line.angle) * line.speed;
  line.y += Math.sin(line.angle) * line.speed;

  if (
    line.x > canvas.width ||
    line.y > canvas.height ||
    line.x < 0 ||
    line.y < 0
  ) {
    const index = lines.indexOf(line);
    lines.splice(index, 1);
    lines.push(createLine());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach((line) => {
    drawLine(line);
    updateLine(line);
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  lines = [];
  for (let i = 0; i < 15; i++) {
    lines.push(createLine());
  }
});
