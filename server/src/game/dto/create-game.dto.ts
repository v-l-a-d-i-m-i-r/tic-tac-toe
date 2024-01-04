import { ApiProperty } from '@nestjs/swagger';

import { BaseGameResponse } from './base-game.dto';
import { BaseResponse } from './list-games-for-player';

export class CreateGameResponse extends BaseResponse<BaseGameResponse> {
  @ApiProperty({ type: BaseGameResponse })
  public data: BaseGameResponse;
}
