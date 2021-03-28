import { Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/IOrder';
import { Order } from 'modules/database/models/Order';

@Injectable()
export class OrderRepository {
  public async list(currentUser: ICurrentUser): Promise<Order[]> {
    const orders = await Order.query()
      .select('*')
      .where({ userId: currentUser.id });

    await Promise.all(
      orders.map(async order => {
        order.products = await order.$relatedQuery('products');
      })
    );

    return orders;
  }

  public async findById(id: number, currentUser: ICurrentUser) {
    const order = await Order.query()
      .where({ id, userId: currentUser.id })
      .first();
    if (!order) throw new NotFoundException(`Order com id ${id} nao encontrada`);

    order.products = await order.$relatedQuery('products');
    console.log('Produtos: ', order.products);
    return order;
  }

  public async remove(id: number) {
    await Order.query()
      .del()
      .where({ id });
  }

  public async insert(model: IOrder) {
    return Order.query().insert(model);
  }

  public async update(model: IOrder): Promise<Order> {
    return Order.query().updateAndFetchById(model.id, <Order>model);
  }
}
