import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'modules/app/repositories/ProductRepository';
import { IProduct } from 'modules/database/interfaces/IProduct';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async remove(id: number) {
    const product = this.productRepository.findById(id);
    if (!product) throw new NotFoundException('not-found');

    return this.productRepository.remove(id);
  }

  public async save(model: IProduct) {
    this.productRepository.insert(model);
  }

  public async update(model: IProduct) {
    return this.productRepository.update({ ...model });
  }
}
