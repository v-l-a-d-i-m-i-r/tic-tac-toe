import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthUserModel } from '../auth/auth-user.model';
import { extractTokenFromHeader } from '../utils/extract-token-from-header';
import { JWT_SECRET } from '../config/config';

@Injectable()
class HTTPBearerAuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      })) as AuthUserModel;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export function HTTPBearerAuth(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(HTTPBearerAuthGuard));
}
