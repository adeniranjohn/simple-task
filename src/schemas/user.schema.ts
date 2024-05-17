import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Role {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    default: Role.USER,
    enum: Role,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
