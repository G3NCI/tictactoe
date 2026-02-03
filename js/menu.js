import { TicTacToe } from './tictactoe.js';

export class Menu {
  constructor(engine) {
    this.engine = engine;
    window.addEventListener("keydown", (e) => {
      if (e.key === "3") this.engine.setScene(new TicTacToe(this.engine, 3));
      if (e.key === "4") this.engine.setScene(new TicTacToe(this.engine, 4));
      if (e.key === "5") this.engine.setScene(new TicTacToe(this.engine, 5));
      if (e.key === "6") this.engine.setScene(new TicTacToe(this.engine, 6));
    });
  }
  update() {}
  render(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "24px monospace";
    ctx.fillText("Fancy Tic Tac Toe", 200, 100);
    ctx.fillText("Press 3: 3x3 Grid", 200, 160);
    ctx.fillText("Press 4: 4x4 Grid", 200, 200);
    ctx.fillText("Press 5: 5x5 Grid", 200, 240);
    ctx.fillText("Press 6: 6x6 Grid", 200, 280);
  }
}