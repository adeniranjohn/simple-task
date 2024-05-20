import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from 'src/schemas/user.schema';
import { UserDTO } from './dtos/user.dto';
import { UpdateUserDTO } from './dtos/updates.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(user: UserDTO) {
    try {
      const hashed = await this.hashedPassword(user.password);
      return await this.userModel.create({
        ...user,
        role: Role.USER,
        password: hashed,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers() {
    try {
      return await this.userModel.find({}).select('name email role');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAUser(userId: string): Promise<IUser> {
    try {
      const user: IUser | null = await this.userModel
        .findOne({ _id: userId })
        .select('name email role');
      if (user) {
        return user;
      } else {
        throw new NotFoundException(`User does not exist`);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(userId: string, updates: UpdateUserDTO) {
    try {
      console.log(updates);
      return await this.userModel
        .findByIdAndUpdate(userId, updates, {
          new: true,
        })
        .select('-password');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(userId: string) {
    try {
      return this.userModel.deleteOne({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changePassword(userId: string, newPassword: string, password: string) {
    console.log(newPassword);
    console.log(password);
  }

  async hashedPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 12);
    return hashed;
  }
}
