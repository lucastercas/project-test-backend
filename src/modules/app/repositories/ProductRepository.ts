import { Injectable } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/IProduct';
import { Product } from 'modules/database/models/Product';
import { Page } from 'objection';

@Injectable()
export class ProductRepository {
  public async list(): Promise<Page<Product>> {
    return Product.query()
      .select('*')
      .page(1, 5);
  }

  public async findById(id: number): Promise<Product> {
    return Product.query()
      .where({ id })
      .first();
  }

  public async remove(id: number) {
    await Product.query()
      .del()
      .where({ id });
  }

  public async insert(model: IProduct): Promise<Product> {
    return Product.query().insert(model);
  }

  public async update(model: IProduct): Promise<Product> {
    return Product.query().updateAndFetchById(model.id, <Product>model);
  }
}
