import { IsOptional, IsString } from 'class-validator';

export class UpdatesDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  username: string;
}
