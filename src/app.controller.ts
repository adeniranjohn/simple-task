import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  constructor() {}

  @Get()
  home(): string {
    return 'This is a Simple Task Management API';
  }
}
