import * as faker from 'faker/locale/pt_BR';
import Knex from 'knex';
import { IProduct } from 'modules/database/interfaces/IProduct';

export async function seed(knex: Knex): Promise<void> {
  const products = await knex
    .count()
    .from('Product')
    .first();

  // Se tiver 1 ou mais produtos, nao inserir
  if (Number(products.count) !== 0) return;

  for (let i = 0; i < 10; i++) {
    const product: IProduct = {
      name: faker.commerce.productName(),
      description: 'Best Product',
      value: 123.123,
      quantity: 10
    };

    await knex.insert(product).into('Product');
  }
}
