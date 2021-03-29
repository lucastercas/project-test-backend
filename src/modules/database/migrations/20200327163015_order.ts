import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('Order', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('id')
      .inTable('User')
      .notNullable()
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Order');
}
