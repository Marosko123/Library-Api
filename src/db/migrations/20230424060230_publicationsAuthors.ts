import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex: Knex): Promise<void> =>
	knex.schema.createTable('publications_authors', table => {
		table.uuid('id').notNullable().primary();
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.uuid('author_id').notNullable().references('authors.id').onDelete('CASCADE');
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex: Knex): Promise<void> => knex.schema.dropTableIfExists('publicationsAuthors');
