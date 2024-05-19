import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<IUser> {
    const user = await this.authService.validate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid Email/Password');
    }

    return user;
  }
}
