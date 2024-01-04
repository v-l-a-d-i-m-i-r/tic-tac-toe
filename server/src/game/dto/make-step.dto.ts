import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, Min } from 'class-validator';

import { BaseGameResponse } from './base-game.dto';
import { BaseResponse } from '../../utils/base-response';

export class MakeStepParams {
  @IsMongoId()
  public gameId: string;
}

export class MakeStepBody {
  @IsInt()
  @Min(0)
  public cell: number;
}

export class MakeStepResponse extends BaseResponse<BaseGameResponse> {
  @ApiProperty({ type: BaseGameResponse })
  public data: BaseGameResponse;
}
