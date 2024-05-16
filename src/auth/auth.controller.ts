import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ user: string | undefined; token: string; }> {
    const { email, password } = body;
    return await this.authService.validate(email, password);
  }

  @Post('register')
  register() {}
}
