import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './../decorators/public-router.decorator';
import { LogoutService } from '../services/logout/logout.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private logoutService: LogoutService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];
    const isInValidToken = await this.logoutService.isTokenInvalid(token);
    if (!token || isInValidToken) return false;

    return super.canActivate(context) as Promise<boolean>;
  }
}
