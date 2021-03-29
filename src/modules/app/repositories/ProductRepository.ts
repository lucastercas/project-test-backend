import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IProduct } from 'modules/database/interfaces/IProduct';
import { Product } from 'modules/database/models/Product';
import { Page, Transaction } from 'objection';

@Injectable()
export class ProductRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Product>> {
    let query = Product.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`);
      });
    }
    return query;
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
