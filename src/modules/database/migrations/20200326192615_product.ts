import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.string('description', 250).notNullable();
    table.float('value').notNullable();
    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Product');
}
