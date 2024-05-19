import {
  BadRequestException,
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
  async updateUser(userId: string, updates: UpdateUserDTO) {
    try {
      return await this.userService.updateUser(userId, updates);
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
        return await this.userService.deleteUser(param.userId);
      } else {
        throw new BadRequestException(`User can only delete itself`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
