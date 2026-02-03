export function aiMove(board, size) {
  // Simple AI: pick first empty cell
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) return i;
  }
  return null;
}