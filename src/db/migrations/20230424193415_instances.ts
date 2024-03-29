import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> =>
	knex.schema.createTable('instances', table => {
		table.uuid('id').notNullable().primary();
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.string('status').notNullable();
		table.integer('year').notNullable();
		table.string('publisher').notNullable();
		table.string('type').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('instances');
