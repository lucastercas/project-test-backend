import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/IOrder';
import { IOrderProduct } from 'modules/database/interfaces/IOrderProduct';
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

  public async list(currentUser: ICurrentUser) {
    return this.orderRepository.list(currentUser);
  }

  public async remove(id: number, currentUser: ICurrentUser) {
    const order = await this.orderRepository.findById(id, currentUser);
    if (!order) throw new NotFoundException('not-found');

    if (order.userId !== currentUser.id) throw new UnauthorizedException('Sem autorizacao para o recurso');

    return this.orderRepository.remove(id);
  }

  public async save(model: IOrder, products: IOrderProduct[], currentUser: ICurrentUser): Promise<Order> {
    const user = await this.userRepository.findById(model.userId);
    if (!user) throw new NotFoundException(`Usuario ${model.userId} nao encontrado`);

    if (user.id !== currentUser.id) throw new UnauthorizedException('Sem autorizacao para o recurso');

    const order = await this.orderRepository.insert(model);

    try {
      for (const productOrder of products) {
        console.log('Tentanto inserir: ', productOrder);
        const product = await this.productRepository.findById(productOrder.productId);
        if (product.quantity < productOrder.quantity) {
          throw new BadRequestException(`Quantidade do produto ${productOrder.productId} invalida`);
        }
        await order
          .$relatedQuery('products')
          .insert({ quantity: productOrder.quantity, productId: productOrder.productId });
      }
    } catch (e) {
      this.orderRepository.remove(order.id);
      throw e;
    }

    return this.orderRepository.findById(order.id, currentUser);
  }

  public async update(model: IOrder, currentUser: ICurrentUser) {
    if (model.userId !== currentUser.id) throw new UnauthorizedException();
    return this.orderRepository.update(model);
  }
}
