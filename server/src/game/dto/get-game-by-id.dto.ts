import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { BaseGameResponse } from './base-game.dto';
import { BaseResponse } from './list-games-for-player';

export class GetGameByIdParams {
  @IsMongoId()
  public gameId: string;
}

export class GetGameByIdResponse extends BaseResponse<BaseGameResponse> {
  @ApiProperty({ type: BaseGameResponse })
  public data: BaseGameResponse;
}
