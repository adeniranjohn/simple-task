import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  due: Date;

  @IsNumber()
  priority: number;

  @IsString()
  description: string;

}
