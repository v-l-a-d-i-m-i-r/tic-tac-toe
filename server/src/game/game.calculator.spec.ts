import { checkWinner } from "./game.calculator";
import { GameStep, GameSymbol } from "./game.model";

describe('checkWinner', () => {
  it('should return the winner when there is a winning row', () => {
    const steps = [
      { cell: 0, symbol: GameSymbol.X },
      { cell: 1, symbol: GameSymbol.X },
      { cell: 2, symbol: GameSymbol.X },
    ] as GameStep[];

    const winner = checkWinner(steps);
    expect(winner).toBe(GameSymbol.X);
  });

  it('should return the winner when there is a winning column', () => {
    const steps = [
      { cell: 0, symbol: GameSymbol.O },
      { cell: 3, symbol: GameSymbol.O },
      { cell: 6, symbol: GameSymbol.O },
    ] as GameStep[];

    const winner = checkWinner(steps);
    expect(winner).toBe(GameSymbol.O);
  });

  it('should return the winner when there is a winning diagonal', () => {
    const steps = [
      { cell: 0, symbol: GameSymbol.O },
      { cell: 4, symbol: GameSymbol.O },
      { cell: 8, symbol: GameSymbol.O },
    ] as GameStep[];

    const winner = checkWinner(steps);
    expect(winner).toBe(GameSymbol.O);
  });

  it('should return null when there is empty board', () => {
    const steps = [];

    const winner = checkWinner(steps);
    expect(winner).toBeNull();
  });


  it('should return null when there is no winner yet', () => {
    const steps = [
      { cell: 0, symbol: GameSymbol.O },
    ] as GameStep[];

    const winner = checkWinner(steps);
    expect(winner).toBeNull();
  });
});
