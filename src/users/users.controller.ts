import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

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
  getAUSer(userId: string) {}

  @Patch(':taskId')
  updateTask(userId: string) {}
}
