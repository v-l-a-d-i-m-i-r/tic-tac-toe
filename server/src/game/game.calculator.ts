import { GameStep, GameSymbol } from './game.model';

const CELLS_IN_ROW = 3;
export const CELLS_LENGTH = Math.pow(CELLS_IN_ROW , 2);

export function checkWinner(steps: GameStep[]): GameSymbol | null {
  const emptyBoardAsLine: (GameSymbol | null )[] = Array(CELLS_LENGTH).fill(null);

  for (const step of steps) {
    const { cell, symbol } = step;
    emptyBoardAsLine[cell] = symbol;
  }

  const board: (GameSymbol | null)[][] = [];
  for (let i = 0; i < emptyBoardAsLine.length; i += CELLS_IN_ROW) {
    board.push(emptyBoardAsLine.slice(i, i + CELLS_IN_ROW));
  }

  // Check each row for a winner
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }

  // Check each column for a winner
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Check the diagonals for a winner
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }

  if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
    return board[2][0];
  }

  // No winner yet
  return null;
}
