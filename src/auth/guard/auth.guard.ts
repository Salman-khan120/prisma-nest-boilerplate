import {
  ExecutionContext,
  Injectable,
  CanActivate,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization: string = request?.headers?.authorization ?? '';

    if (!authorization)
      throw new UnauthorizedException(
        'You are unauthorized for this operation',
      );

    const [, token] = authorization.split(' ');

    Logger.log('Token = >', token);

    return super.canActivate(context);
  }
}
