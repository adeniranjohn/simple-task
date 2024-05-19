import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, Task } from 'src/schemas/task.schema';
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

  async updateTask(taskId: string, updates: { status: Status }) {
    return await this.taskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
  }

  async createTask(task: TaskDTO, userId: string) {
    return await this.taskModel.create({ ...task, assignedBy: userId });
  }

  async deleteTask(taskId: string) {
    return await this.taskModel.deleteOne({ _id: taskId });
  }
}
