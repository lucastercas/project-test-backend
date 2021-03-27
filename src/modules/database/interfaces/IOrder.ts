import { IUser } from './IUser';

export interface IOrder {
  id?: number;
  userId: number;
  user?: IUser;
}
