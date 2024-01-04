export enum GameState {
  ReadyForGuest = 'readyForGuest',
  ReadyForCreatorStep = 'readyForCreatorStep',
  ReadyForGuestStep = 'readyForGuestStep',
  XWon = 'xWon',
  OWon = 'oWon',
  WinWin = 'winWin',
}

export enum GameSymbol {
  X = 'X',
  O = 'O',
}

export class GameStep {
  public playerId: string;
  public cell: number;
  public symbol: GameSymbol;
  public createdAt: string;
}

export class GameModel {
  public id: string;
  public createdAt: string;
  public updatedAt: string;
  public creatorId: string;
  public guestId?: string;
  public state: GameState;
  public steps: GameStep[];
}
