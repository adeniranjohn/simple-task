import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDTO } from './dtos/user.dto';
import { UpdateUserDTO } from './dtos/updates.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(user: UserDTO) {
    try {
      const hashed = await this.hashedPassword(user.password);
      return await this.userModel.create({ ...user, password: hashed });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers() {
    try {
      return await this.userModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAUser(userId: string) {
    try {
      return await this.userModel.findById(userId).select('-password');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(userId: string, updates: UpdateUserDTO) {
    try {
      return this.userModel.findByIdAndUpdate(userId, updates, { new: true });
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
