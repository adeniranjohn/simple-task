import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (context.getType() === 'http') {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
          throw new UnauthorizedException();
        }

        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('TOKEN_SECRET'),
        });
        request['user'] = payload;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new GatewayTimeoutException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const header = request.headers.get('Authorization');

    if (header) {

      const [type, token] = header.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
  }
}
