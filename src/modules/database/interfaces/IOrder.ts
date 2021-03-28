import { OrderProduct } from '../models/OrderProduct';
// import { IOrderProduct } from './IOrderProduct';
import { IUser } from './IUser';

export interface IOrder {
  id?: number;
  userId: number;
  user?: IUser;
  products?: OrderProduct[];
}
