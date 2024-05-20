import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, Task } from 'src/schemas/task.schema';
import { ITask } from './interfaces/task.interface';
import { TaskDTO } from './dtos/task.dto';
import { StreamerGateway } from 'src/streamer/streamer.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly streamer: StreamerGateway,
  ) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskModel
      .find({})
      .populate({
        path: 'assignedBy',
        model: 'User',
        select: 'name email role',
      })
      .populate({
        path: 'assignedTo',
        model: 'User',
        select: 'name email role',
      });
  }

  async getTask(taskId: string): Promise<ITask> {
    const task = await this.taskModel
      .findOne({ _id: taskId })
      .populate({
        path: 'assignedBy',
        model: 'User',
        select: 'name email role',
      })
      .populate({
        path: 'assignedTo',
        model: 'User',
        select: 'name email role',
      });
    if (task) {
      return task;
    } else {
      throw new Error(`Task not found`);
    }
  }

  async updateTask(taskId: string, updates: { status: Status }) {
    return await this.taskModel
      .findByIdAndUpdate(taskId, updates, {
        new: true,
      })
      .populate({
        path: 'assignedBy',
        model: 'User',
        select: 'name email role',
      })
      .populate({
        path: 'assignedTo',
        model: 'User',
        select: 'name email role ',
      });
  }

  async createTask(task: TaskDTO, userId: string) {
    const newTask = await this.taskModel.create({
      ...task,
      assignedBy: userId,
    });
    this.streamer.streamMessage(`Newly created Task`);
    this.streamer.streamTask(newTask);
    return newTask;
  }

  async deleteTask(taskId: string) {
    return await this.taskModel.deleteOne({ _id: taskId });
  }
}
