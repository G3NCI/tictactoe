import { GameEngine } from './engine.js';
import { TicTacToe } from './tictactoe.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const engine = new GameEngine(ctx, canvas);

// Loading screen delay
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("menu").style.display = "block";
  }, 3000);
};

document.getElementById("startBtn").onclick = () => {
  const size = parseInt(document.getElementById("gridSize").value);
  const mode = document.getElementById("mode").value;
  const colorX = document.getElementById("colorX").value;
  const colorO = document.getElementById("colorO").value;
  const volume = parseFloat(document.getElementById("volume").value);

  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("controls").style.display = "block";

  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = volume;
  bgMusic.play();

  const muteIcon = document.getElementById("muteIcon");
  muteIcon.onclick = () => {
    if (bgMusic.muted) {
      bgMusic.muted = false;
      muteIcon.src = "assets/icons/sound_on.png";
    } else {
      bgMusic.muted = true;
      muteIcon.src = "assets/icons/sound_off.png";
    }
  };

  engine.setScene(new TicTacToe(engine, size, mode, colorX, colorO));
  engine.start();
};