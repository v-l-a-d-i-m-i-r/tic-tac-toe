import { ApiProperty } from '@nestjs/swagger';
import { GameState, GameSymbol } from '../game.model';


export class BaseGameStepResponse {
  @ApiProperty({ description: 'Player Id', type: String })
  public playerId: string;

  @ApiProperty({ description: 'Cell', type: Number })
  public cell: number;

  @ApiProperty({ description: 'Symbol', type: String, enum: GameSymbol })
  public symbol: GameSymbol;

  @ApiProperty({ description: 'Created At', type: String })
  public createdAt: string;
}
export class BaseGameResponse {
  @ApiProperty({ description: 'Id', type: String })
  public id: string;

  @ApiProperty({ description: 'Created At', type: String })
  public createdAt: string;

  @ApiProperty({ description: 'Updated At', type: String })
  public updatedAt: string;

  @ApiProperty({ description: 'Creator Id', type: String })
  public creatorId: string;

  @ApiProperty({ description: 'Guest Id', type: String })
  public guestId?: string;

  @ApiProperty({ description: 'Id', type: String, enum: GameState })
  public state: GameState;

  @ApiProperty({ description: 'Steps', type: BaseGameStepResponse, isArray: true })
  public steps: BaseGameStepResponse[];
}
