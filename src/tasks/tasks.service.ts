import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { ITask } from './interfaces/task.interface';
import { TaskDTO } from './dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskModel.find({});
  }

  async getTask(taskId: string): Promise<ITask> {
    const task = await this.taskModel.findOne({ _id: taskId });
    if (task) {
      return task;
    } else {
      throw new Error(`Task not found`);
    }
  }

  async createTask(task: TaskDTO) {
    return await this.taskModel.create(task);
  }

  async deleteTask(taskId: string) {
    return await this.taskModel.deleteOne({ _id: taskId });
  }
}
