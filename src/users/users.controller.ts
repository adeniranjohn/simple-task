import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  createUser() {}

  @Get()
  getUsers() {}

  @Get(':taskId')
  getAUSer(userId: string) {}

  @Patch(':taskId')
  updateTask(userId: string) {}
}
