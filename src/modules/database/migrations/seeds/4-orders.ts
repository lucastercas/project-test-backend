import Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/IOrder';
import { IOrderProduct } from 'modules/database/interfaces/IOrderProduct';
import { IProduct } from 'modules/database/interfaces/IProduct';
import { IUser } from 'modules/database/interfaces/IUser';

export async function seed(knex: Knex) {
  const orderProductCount = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orderProductCount.count) > 0) return;

  const user: IUser = await knex
    .select('*')
    .from('User')
    .where({ roles: 'user' })
    .first();

  const product: IProduct = await knex
    .select('*')
    .from('Product')
    .first();

  const order: IOrder = {
    userId: user.id
  };

  const result = await knex
    .insert(order)
    .into('Order')
    .returning('id');

  const orderProduct: IOrderProduct = {
    orderId: result[0],
    productId: product.id,
    quantity: 123
  };

  await knex.insert(orderProduct).into('OrderProduct');
}
