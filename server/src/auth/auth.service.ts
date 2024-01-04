import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthUserModel } from './auth-user.model';
import { Errors } from '../const/errors';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(input: SignUpInput): Promise<string> {
    const { email, password } = input;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ email, passwordHash });
    const accessToken = this.jwtService.signAsync({ id: user.id, email: user.email });

    return accessToken;
  }

  public async signIn(input: SignInInput): Promise<string> {
    const { email, password } = input;

    const user = await this.userService.findUserByEmail({ email });
    if (!user) {
      throw new UnauthorizedException(Errors.incorrectEmailOrPassword);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(Errors.incorrectEmailOrPassword);
    }

    const authUser: AuthUserModel = { id: user.id, email: user.email };

    const accessToken = this.jwtService.signAsync(authUser);

    return accessToken;
  }
}

type SignInInput = {
  email: string;
  password: string;
};

type SignUpInput = {
  email: string;
  password: string;
};
