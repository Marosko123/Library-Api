import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> =>
	knex.schema.createTable('reservations', table => {
		table.uuid('id').notNullable().primary();
		table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE');
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('reservations');
