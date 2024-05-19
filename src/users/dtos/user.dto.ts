import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
