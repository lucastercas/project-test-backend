import { IProduct } from './product';
import { IUser } from './user';

export interface IOrder {
  userId: number;
  itemId: number;

  user?: IUser;
  item?: IProduct;
}
