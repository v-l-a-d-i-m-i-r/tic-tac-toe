import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';

import { GameMapper } from './game.mapper';
import { GameModel, GameState } from './game.model';
import { GameDocument, GameEntity } from './game.schema';

@Injectable()
export class GameRepository {
  public constructor(
    @InjectModel(GameEntity.name)
    private readonly gameModel: Model<GameDocument>,
    private readonly gameMapper: GameMapper,
  ) {}

  public async createGame({ creatorId, state }: CreateGameInput): Promise<GameModel> {
    const game = await this.gameModel.create({
      creatorId: new Types.ObjectId(creatorId),
      state,
    });

    return this.gameMapper.mapEntityToModel(game);
  }

  public async listGames(): Promise<GameModel[]> {
    const filter = {};

    const games = await this.gameModel.find(filter);
    return games.map((game) => this.gameMapper.mapEntityToModel(game));
  }

  public async getGameById(gameId: string): Promise<GameModel | null> {
    const filter = {
      _id: new Types.ObjectId(gameId),
    };

    const game = await this.gameModel.findOne(filter);
    return this.gameMapper.mapEntityToModelIfExists(game);
  }

  public async updateGameById(gameId: string, dataToSet: Partial<GameModel>): Promise<GameModel> {
    const filter = {
      _id: new Types.ObjectId(gameId),
    };

    const set: UpdateQuery<GameDocument> = {};

    if (dataToSet.state) {
      set.state = dataToSet.state;
    }

    if (dataToSet.guestId) {
      set.guestId = new Types.ObjectId(dataToSet.guestId);
    }

    if (dataToSet.steps) {
      set.steps = dataToSet.steps.map((step) => ({
        playerId: new Types.ObjectId(step.playerId),
        symbol: step.symbol,
        createdAt: new Date(step.createdAt),
        cell: step.cell,
      }));
    }

    const game = await this.gameModel.findOneAndUpdate(filter, { $set: set }, { new: true });

    if (!game) {
      throw new Error('Game not found');
    }

    return this.gameMapper.mapEntityToModel(game);
  }
}

type CreateGameInput = {
  creatorId: string;
  state: GameState;
};
