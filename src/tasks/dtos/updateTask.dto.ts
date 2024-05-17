import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Status } from 'src/schemas/task.schema';
import { User } from 'src/schemas/user.schema';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  assignedBy: User;

  @IsDate()
  due: Date;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
