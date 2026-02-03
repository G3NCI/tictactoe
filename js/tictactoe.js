import { aiMove } from './ai.js';

export class TicTacToe {
  constructor(engine, size, mode, colorX, colorO) {
    this.engine = engine;
    this.size = size;
    this.mode = mode;
    this.board = Array(size * size).fill(null);
    this.current = "X";
    this.cellSize = this.engine.canvas.width / size;
    this.scores = { X: 0, O: 0 };
    this.winner = null;
    this.colorX = colorX;
    this.colorO = colorO;

    this.engine.canvas.addEventListener("click", this.handleClick.bind(this));
    document.getElementById("restart").onclick = () => this.restart();
    document.getElementById("quit").onclick = () => location.reload();
  }

  playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  handleClick(e) {
    if (this.winner) return;
    const rect = this.engine.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const idx = row * this.size + col;

    if (!this.board[idx]) {
      this.board[idx] = this.current;
      this.playSound("clickSound");

      if (this.checkWin(this.current)) {
        this.winner = this.current;
        this.scores[this.current]++;
        this.playSound("winSound");
      } else if (this.board.every(c => c !== null)) {
        this.winner = "Draw";
        this.playSound("loseSound");
      } else {
        this.current = this.current === "X" ? "O" : "X";

        if (this.mode === "ai" && this.current === "O") {
          const move = aiMove(this.board, this.size);
          if (move !== null) {
            this.board[move] = "O";
            if (this.checkWin("O")) {
              this.winner = "O";
              this.scores["O"]++;
              this.playSound("winSound");
            } else if (this.board.every(c => c !== null)) {
              this.winner = "Draw";
              this.playSound("loseSound");
            } else {
              this.current = "X";
            }
          }
        }
      }
    }
  }

  checkWin(player) {
    const b = this.board;
    const s = this.size;
    for (let r = 0; r < s; r++) {
      if (b.slice(r * s, r * s + s).every(c => c === player)) return true;
    }
    for (let c = 0; c < s; c++) {
      if (Array.from({ length: s }, (_, i) => b[i * s + c]).every(c => c === player)) return true;
    }
    if (Array.from({ length: s }, (_, i) => b[i * s + i]).every(c => c === player)) return true;
    if (Array.from({ length: s }, (_, i) => b[i * s + (s - 1 - i)]).every(c => c === player)) return true;
    return false;
  }

  restart() {
    this.board.fill(null);
    this.current = "X";
    this.winner = null;
    this.playSound("restartSound");
  }

  update() {}

  render(ctx) {
    // Grid
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 2;
    for (let i = 1; i < this.size; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.cellSize, 0);
      ctx.lineTo(i * this.cellSize, this.engine.canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * this.cellSize);
      ctx.lineTo(this.engine.canvas.width, i * this.cellSize);
      ctx.stroke();
    }

    // Marks
    ctx.font = `${this.cellSize / 2}px monospace`;
    this.board.forEach((cell, i) => {
      if (cell) {
        const x = (i % this.size) * this.cellSize + this.cellSize / 3;
        const y = Math.floor(i / this.size) * this.cellSize + this.cellSize / 1.5;
        ctx.fillStyle = cell === "X" ? this.colorX : this.colorO;
        ctx.fillText(cell, x, y);
      }
    });

    // HUD
    ctx.fillStyle = "#fff";
    ctx.font = "20px monospace";
    ctx.fillText(`Turn: ${this.current}`, 20, 20);

    // Scoreboard
    document.getElementById("scoreboard").innerText =
      `Score — X: ${this.scores.X} | O: ${this.scores.O}`;

    // Winner banner
    if (this.winner) {
      ctx.fillStyle = "#ff0";
      ctx.font = "30px monospace";
      ctx.fillText(
        this.winner === "Draw" ? "It's a Draw!" : `${this.winner} Wins!`,
        this.engine.canvas.width / 2 - 100,
        this.engine.canvas.height - 20
      );
    }
  }
}