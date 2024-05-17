import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/schemas/task.schema';
import { User } from 'src/schemas/user.schema';

export class TaskDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  due: Date;

  @IsString()
  assignedBy: User;

  @IsNumber()
  priority: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
