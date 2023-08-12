import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> => {
	return knex.schema.createTable('publications_categories', table => {
		table.uuid('id').notNullable().primary();
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.uuid('category_id').notNullable().references('categories.id').onDelete('CASCADE');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('publicationsCategories');
