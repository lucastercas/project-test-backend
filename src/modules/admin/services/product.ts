import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'modules/app/repositories/product';
import { IProduct } from 'modules/database/interfaces/product';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public async remove(id: number) {
    this.productRepository.remove(id);
  }

  public async save(model: IProduct) {
    this.productRepository.insert(model);
  }
}
