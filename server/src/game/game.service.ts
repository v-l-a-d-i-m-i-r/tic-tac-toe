import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CELLS_LENGTH, checkWinner } from './game.calculator';
import { GameStep, GameModel, GameState, GameSymbol } from './game.model';
import { GameRepository } from './game.repository';
import { Errors } from '../const/errors';

@Injectable()
export class GameService {
  public constructor(private readonly gameRepository: GameRepository) {}

  public async listGames(): Promise<GameModel[]> {
    return this.gameRepository.listGames();
  }

  public async createGame({ playerId }: CreateGameInput): Promise<GameModel> {
    return this.gameRepository.createGame({ creatorId: playerId, state: GameState.ReadyForGuest });
  }

  public async getGameById({ id }: GetGameByIdInput): Promise<GameModel> {
    const game = await this.gameRepository.getGameById(id);

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  public async joinGame({ gameId, playerId }: JoinGameInput): Promise<GameModel> {
    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NotFoundException(Errors.gameNotFound);
    }

    if (game.state !== GameState.ReadyForGuest) {
      throw new BadRequestException(Errors.canNotJoinGameWithState(game.state));
    }

    if (game.creatorId === playerId) {
      throw new BadRequestException(Errors.canNotBeGuestAndCreator);
    }

    return this.gameRepository.updateGameById(gameId, { guestId: playerId, state: GameState.ReadyForCreatorStep });
  }

  public async makeStep({ gameId, playerId, cell }: MakeStepInput): Promise<GameModel> {
    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NotFoundException(Errors.gameNotFound);
    }

    if (![GameState.ReadyForCreatorStep, GameState.ReadyForGuestStep].includes(game.state)) {
      throw new BadRequestException(Errors.gameIsNotReadyForStep);
    }

    const isPlayerCreator = playerId === game.creatorId;
    const isPlayerGuest = playerId === game.guestId;

    if (!isPlayerCreator && !isPlayerGuest) {
      throw new BadRequestException(Errors.notGuestOrCreator);
    }

    if (isPlayerCreator && game.state !== GameState.ReadyForCreatorStep) {
      throw new BadRequestException(Errors.canNotMakeStepAsCreator);
    }

    if (isPlayerGuest && game.state !== GameState.ReadyForGuestStep) {
      throw new BadRequestException(Errors.canNotMakeStepAsGuest);
    }

    const isCellAvailable = game.steps.every((step) => step.cell !== cell);
    if (!isCellAvailable) {
      throw new BadRequestException(Errors.cellIsNotAvailableForStep);
    }

    const step: GameStep = {
      playerId,
      symbol: isPlayerCreator ? GameSymbol.X : GameSymbol.O,
      createdAt: new Date().toISOString(),
      cell,
    };
    const steps = [...game.steps, step];

    let state: GameState = isPlayerCreator ? GameState.ReadyForGuestStep : GameState.ReadyForCreatorStep;

    const winnerSymbol = checkWinner(steps);

    if (winnerSymbol === GameSymbol.X) {
      state = GameState.XWon;
    }

    if (winnerSymbol === GameSymbol.O) {
      state = GameState.OWon;
    }

    if (steps.length === CELLS_LENGTH) {
      state = GameState.WinWin;
    }

    return this.gameRepository.updateGameById(gameId, { state, steps });
  }
}

type CreateGameInput = {
  playerId: string;
};

type GetGameByIdInput = {
  id: string;
};

type JoinGameInput = {
  gameId: string;
  playerId: string;
};

type MakeStepInput = {
  gameId: string;
  playerId: string;
  cell: number;
};
