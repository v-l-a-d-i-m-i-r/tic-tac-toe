import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpRequest {
  @ApiProperty({ description: 'Name', type: String })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'Email', type: String })
  @IsEmail()
  public email: string;

  @ApiProperty({ description: 'Password', type: String })
  @IsString()
  @MinLength(8)
  public password: string;
}

export class SignUpResponse {
  @ApiProperty({ description: 'Access Token', type: String })
  public accessToken: string;
}
