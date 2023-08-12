import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> =>
	knex.schema.createTable('rentals', table => {
		table.uuid('id').notNullable().primary();
		table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE');
		table.uuid('publication_instance_id').notNullable().references('instances.id').onDelete('CASCADE');
		table.integer('duration').notNullable();
		table.dateTime('start_date').notNullable();
		table.dateTime('end_date').notNullable();
		table.string('status').notNullable();
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('rentals');
