import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsISO8601({}, { message: 'Due must be in ISO 8601 format' })
  due: Date;

  @IsNumber()
  priority: number;

  @IsString()
  description: string;
}
