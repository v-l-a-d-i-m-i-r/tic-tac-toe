import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GameState, GameSymbol } from './game.model';

export const GAMES_COLLECTION_NAME = 'games';

@Schema({ _id: false })
class GameStepEntity {
  @Prop({ type: Types.ObjectId })
  public playerId: Types.ObjectId;

  @Prop({ type: Number })
  public cell: number;

  @Prop({ type: String, enum: Object.values(GameSymbol)})
  public symbol: GameSymbol;

  @Prop({ type: Date })
  public createdAt: Date;
}

const GameStepSchema = SchemaFactory.createForClass(GameStepEntity);

@Schema({ collection: GAMES_COLLECTION_NAME, timestamps: true })
export class GameEntity {
  public _id: Types.ObjectId;
  public createdAt: Date;
  public updatedAt: Date;

  @Prop({ type: Types.ObjectId })
  public creatorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: false })
  public guestId?: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(GameState) })
  public state: GameState;

  @Prop({ type: [GameStepSchema], default: [] })
  public steps: GameStepEntity[];
}

export type GameDocument = HydratedDocument<GameEntity>;
export const GameSchema = SchemaFactory.createForClass(GameEntity);
