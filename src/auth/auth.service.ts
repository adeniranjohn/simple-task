import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { IUser } from 'src/users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async getToken(
    user: IUser,
  ): Promise<{ user: string | undefined; token: string }> {
    const payload = { username: user.username, sub: user._id };
    return {
      user: user._id,
      token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string, password: string): Promise<IUser> {
    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Email/Password');
    const correct = await bcrypt.compare(password, user.password);
    if (correct) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid Email/Password');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email });
  }
}
