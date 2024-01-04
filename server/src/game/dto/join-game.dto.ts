import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { BaseGameResponse } from './base-game.dto';
import { BaseResponse } from '../../utils/base-response';

export class JoinGameParams {
  @IsMongoId()
  public gameId: string;
}

export class JoinGameResponse extends BaseResponse<BaseGameResponse> {
  @ApiProperty({ type: BaseGameResponse })
  public data: BaseGameResponse;
}
