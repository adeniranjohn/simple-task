import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from 'src/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from 'src/users/dtos/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = body;
    const user: IUser = await this.authService.validate(email, password);
    const token: string = await this.jwtService.signAsync({
      email: user.email,
      name: user.name,
      id: user._id,
      role: user.role,
    });
    return { token };
  }

  @Post('register')
  async register(@Body() body: UserDTO) {
    try {
      const user = body;
      return await this.userService.register(user);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
