import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/updates.dto';
import { IUser } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RequestUser } from './interfaces/request.user.interface';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':userId')
  async getAUser(@Param() param: { userId: string }): Promise<IUser> {
    try {
      const { userId } = param;
      return await this.userService.getAUser(userId);
    } catch (error) {
      throw new NotFoundException(`User not found`);
    }
  }

  @Patch(':userId')
  async updateUser(
    @Req() req: RequestUser,
    @Param() param: { userId: string },
    @Body() updates: UpdateUserDTO,
  ) {
    try {
      if (req.user.id === param.userId) {
        return await this.userService.updateUser(req.user.id, updates);
      } else {
        throw new Error(`You can only update logged in User`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':userId')
  async deleteUser(
    @Req() req: RequestUser,
    @Param() param: { userId: string },
  ) {
    try {
      if (req.user.id === param.userId) {
        return await this.userService.deleteUser(req.user.id);
      } else {
        throw new BadRequestException(`User can only delete itself`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
