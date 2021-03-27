import { Injectable } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';

@Injectable()
export class ProductRepository {
  public async list() {
    const query = Product.query()
      .select('*')
      .page(1, 5);
    return query;
  }

  public async remove(id: number) {
    await Product.query()
      .del()
      .where({ id });
  }

  public async findById(id: number) {
    return Product.query()
      .where({ id })
      .first();
  }

  public async insert(model: IProduct) {
    return Product.query().insert(model);
  }
}
