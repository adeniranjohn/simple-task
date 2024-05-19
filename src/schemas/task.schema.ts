import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  due: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  assignedBy: User;

  @Prop({
    required: true,
    default: 1,
  })
  priority: number;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    default: Status.TODO,
    enum: Object.values(Status),
  })
  status: Status;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
