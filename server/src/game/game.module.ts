import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameMapper } from './game.mapper';
import { GameRepository } from './game.repository';
import { GAMES_COLLECTION_NAME, GameEntity, GameSchema } from './game.schema';
import { GameService } from './game.service';
import { WSModule } from '../ws/ws.module';

@Module({
  imports: [
    WSModule,
    MongooseModule.forFeature([
      {
        name: GameEntity.name,
        schema: GameSchema,
        collection: GAMES_COLLECTION_NAME,
      },
    ]),
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository, GameMapper],
})
export class GameModule {}
