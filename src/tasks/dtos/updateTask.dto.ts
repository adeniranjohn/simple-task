import { IsOptional, IsString, IsEnum, IsISO8601 } from 'class-validator';
import { Status } from 'src/schemas/task.schema';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsISO8601({}, { message: 'Due must be in ISO 8601 format' })
  due: Date;

  @IsOptional()
  @IsEnum(Status, {
    message: `Status must be one of the following values: ${Object.values(Status).join(', ')}`,
  })
  status: Status;
}
