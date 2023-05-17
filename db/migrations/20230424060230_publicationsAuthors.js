/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('publications_authors', (table) => {
		table.uuid('id').notNullable().primary();
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.uuid('author_id').notNullable().references('authors.id').onDelete('CASCADE');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('publicationsAuthors');
};
