import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> => {
	return knex.schema.createTable('categories', table => {
		table.uuid('id').notNullable().primary();
		table.string('name').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('categories');
