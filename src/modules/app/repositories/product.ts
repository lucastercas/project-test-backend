import { Injectable } from '@nestjs/common';
import { Product } from 'modules/database/models/product';

@Injectable()
export class ProductRepository {
  public async list() {
    const query = Product.query()
      .select('*')
      .page(1, 5);
    return query;
  }
}
