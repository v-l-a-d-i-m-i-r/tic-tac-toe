import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthUserModel } from '../auth/auth-user.model';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUserModel => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as AuthUserModel;
});
