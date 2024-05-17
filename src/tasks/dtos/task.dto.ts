import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Role, User } from 'src/schemas/user.schema';

export class TaskDTO {
  @IsString()
  name: string;

  @IsDate()
  due: Date;

  @IsString()
  assignedBy: User;

  @IsNumber()
  priority: number;

  @IsString()
  description: string;

  @IsEnum(Role)
  status: Role;
}
