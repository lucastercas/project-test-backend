import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('OrderProduct', table => {
    table.increments('id').primary();
    table
      .integer('productId')
      .references('id')
      .inTable('Product')
      .notNullable()
      .onDelete('CASCADE');

    table
      .integer('orderId')
      .references('id')
      .inTable('Order')
      .notNullable()
      .onDelete('CASCADE');

    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('OrderProduct');
}
