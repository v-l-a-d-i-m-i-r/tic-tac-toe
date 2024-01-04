import { ApiProperty } from '@nestjs/swagger';

import { BaseGameResponse } from './base-game.dto';
import { BaseResponse } from '../../utils/base-response';

export class ListGamesResponse extends BaseResponse<BaseGameResponse[]> {
  @ApiProperty({ type: BaseGameResponse, isArray: true })
  public data: BaseGameResponse[];
}
export { BaseResponse };
