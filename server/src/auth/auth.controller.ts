import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInRequest, SignInResponse } from './dto/sign-in.dto';
import { SignUpRequest, SignUpResponse } from './dto/sign-up.dto';
import { LoggerService } from '../logger/logger.service';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  public constructor(
    private authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  @ApiOperation({ description: 'Sign Up' })
  @ApiResponse({ type: SignUpResponse })
  public async signUp(@Body() body: SignUpRequest): Promise<SignUpResponse> {
    try {
      const accessToken = await this.authService.signUp(body);

      return { accessToken };
    } catch (error) {
      this.logger.error('AuthController.signUp', error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  @ApiOperation({ description: 'Sign In' })
  @ApiResponse({ type: SignInResponse })
  public async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    try {
      const accessToken = await this.authService.signIn(body);

      return { accessToken };
    } catch (error) {
      this.logger.error('AuthController.signIn', error);
      throw error;
    }
  }
}
