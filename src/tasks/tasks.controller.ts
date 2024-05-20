import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskDTO } from './dtos/task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  Payload,
  RequestUser,
} from 'src/users/interfaces/request.user.interface';
import { UpdateTaskDTO } from './dtos/updateTask.dto';
import { StreamerGateway } from 'src/streamer/streamer.gateway';

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private readonly streamer: StreamerGateway,
  ) {}
  @Post()
  async createTask(@Body() body: TaskDTO, @Req() req: RequestUser) {
    const user: Payload | undefined = req.user;
    return await this.tasksService.createTask(body, user?.id);
  }

  @Get()
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Get(':taskId')
  async getATask(@Param() param: { taskId: string }) {
    const { taskId } = param;
    return await this.tasksService.getTask(taskId);
  }

  @Patch(':taskId')
  async updateTask(
    @Body() updates: UpdateTaskDTO,
    @Param() param: { taskId: string },
  ) {
    const { taskId } = param;
    return await this.tasksService.updateTask(taskId, updates);
  }

  @Delete(':taskId')
  async deleteTask(@Param() param: { taskId: string }) {
    const { taskId } = param;
    return await this.tasksService.deleteTask(taskId);
  }
}
