import { IUser } from 'src/users/interfaces/user.interface';

export interface ITask {
  name: string;
  due: Date;
  assignedBy: IUser;
  priority: number;
  description: string;
  status: string;
}
