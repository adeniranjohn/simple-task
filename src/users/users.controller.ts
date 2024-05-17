import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/updates.dto';
import { IUser } from './interfaces/user.interface';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() user: UserDTO) {
    try {
      return await this.userService.register(user);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Get()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':userId')
  async getAUser(userId: string): Promise<IUser> {
    try {
      return await this.userService.getAUser(userId);
    } catch (error) {
      throw new NotFoundException(`User not found`);
    }
  }

  @Patch(':userId')
  async updateUser(userId: string, updates: UpdateUserDTO) {
    try {
      return await this.userService.updateUser(userId, updates);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Must be an Admin
  @Delete(':userId')
  async deleteUser(userId: string) {
    try {
      return await this.userService.deleteUser(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
