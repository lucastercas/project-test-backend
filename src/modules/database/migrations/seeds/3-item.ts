import * as faker from 'faker/locale/pt_BR';
import Knex from 'knex';
import { IProduct } from 'modules/database/interfaces/product';

export async function seed(knex: Knex): Promise<void> {
  const products = await knex
    .count()
    .from('Product')
    .first();
  if (Number(products.count) !== 1) return;
  for (let i = 0; i < 10; i++) {
    const product: IProduct = {
      name: faker.commerce.productName(),
      description: 'Best Product',
      value: 10
    };

    await knex.insert(product).into('Product');
  }
}
