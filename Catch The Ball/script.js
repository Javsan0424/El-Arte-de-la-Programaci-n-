// 🎮 Juego: Catch the Ball
// Explicación: Mueves una barra con el mouse para atrapar una bola que cae.
// Si la atrapas, ganas puntos. Si no, se reinicia el juego.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🔧 Ajustes del lienzo
canvas.width = 400;
canvas.height = 600;

// 🏀 Configuración de la bola
let ball = {
  x: Math.random() * 380 + 10, // Posición aleatoria inicial (evita los bordes)
  y: 0,
  radius: 15,
  speed: 3,
  color: "red",
};

// 🧍 Control del jugador (la barra)
let catcher = {
  width: 80,
  height: 10,
  x: canvas.width / 2 - 40, // Centrado al inicio
  y: canvas.height - 40,
  color: "white",
};

let initialLives = 3;
let lives = initialLives;

let score = 0;
let mouseX = canvas.width / 2;

// 🖱 Evento: mover el mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
});

// ⚙️ Actualizar posición y lógica
function update() {
  // Mueve la bola
  ball.y += ball.speed;

  // Actualiza la posición del catcher
  catcher.x = mouseX - catcher.width / 2;

  // 🧮 Detección de colisión (bola vs catcher)
  if (
    ball.y + ball.radius >= catcher.y &&
    ball.x >= catcher.x &&
    ball.x <= catcher.x + catcher.width
  ) {
    score++;
    resetBall();
    // Aumenta un poco la dificultad cada 5 puntos
    if (score % 5 === 0) ball.speed += 0.5;
  }

  // 🚫 Si la bola cae fuera del canvas
  if (ball.y > canvas.height) {
    lives--;
    if (lives > 0) {
      resetBall();
    } else {
      alert(`💀 Game Over! Score: ${score}`);
      lives = initialLives;
      score = 0;
      ball.speed = 3;
      resetBall();
    }
  }
}

// 🔁 Reinicia la bola desde arriba
function resetBall() {
  ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
  ball.y = 0;
}

// 🎨 Dibujar todo en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja la bola
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();

  // Dibuja el catcher
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);

  // Dibuja el score
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  // Dibuja las vidas
  drawLives(20, 40, lives);
}

function drawHeart(x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(
    x, y,
    x - size / 2, y,
    x - size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight)/2,
    x, y + (size + topCurveHeight)/1.5,
    x, y + size
  );
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight)/1.5,
    x + size / 2, y + (size + topCurveHeight)/2,
    x + size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + topCurveHeight
  );
  ctx.fillStyle = "red";
  ctx.fill();
}

// Dibuja todas las vidas
function drawLives(x, y, lives, size = 20) {
  for (let i = 0; i < lives; i++) {
    drawHeart(x + i * (size + 5), y, size);
  }
}

// 🌀 Bucle del juego
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
