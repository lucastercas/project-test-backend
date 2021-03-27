import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.string('description', 150).notNullable();
    table.integer('value').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Product');
}
