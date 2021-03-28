import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/IOrder';
import { Order } from 'modules/database/models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { UserRepository } from '../repositories/UserRepository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {}

  public async remove(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('not-found');

    // To-Do: Checar se a ordem eh do usuario atual antes de remover

    return this.orderRepository.remove(id);
  }

  public async save(model: IOrder): Promise<Order> {
    const user = await this.userRepository.findById(model.userId);
    if (!user) throw new NotFoundException(`Usuario ${model.userId} nao encontrado`);

    const order = await this.orderRepository.insert(model);

    try {
      for (const productOrder of model.products) {
        const product = await this.productRepository.findById(productOrder.productId);
        if (product.quantity < productOrder.quantity) {
          throw new BadRequestException(`Quantidade do produto ${productOrder.productId} invalida`);
        }
        await order.$relatedQuery('products').insert(productOrder);
      }
    } catch (e) {
      this.orderRepository.remove(order.id);
      throw e;
    }

    return this.orderRepository.findById(order.id);
  }

  public async update(model: IOrder) {
    return this.orderRepository.update(model);
  }
}
