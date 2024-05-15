import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Post()
    createTask() {}
  
    @Get()
    getTasks() {}
  
    @Get(':taskId')
    getATask(taskId: string) {}
  
    @Patch(':taskId')
    updateTask(taskId: string) {}
}
