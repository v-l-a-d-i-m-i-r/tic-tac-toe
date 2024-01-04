import { Injectable } from '@nestjs/common';

import { GameModel } from './game.model';
import { GameEntity } from './game.schema';

@Injectable()
export class GameMapper {
  public mapEntityToModel(entity: GameEntity): GameModel {
    return {
      id: entity._id.toHexString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      creatorId: entity.creatorId.toHexString(),
      guestId: entity.guestId?.toHexString(),
      state: entity.state,
      steps: entity.steps.map((logEntity) => ({
        playerId: logEntity.playerId.toHexString(),
        cell: logEntity.cell,
        symbol: logEntity.symbol,
        createdAt: logEntity.createdAt.toISOString(),
      })),
    };
  }

  public mapEntityToModelIfExists(entity: GameEntity | null): GameModel | null {
    if (!entity) {
      return null;
    }

    return this.mapEntityToModel(entity);
  }
}
