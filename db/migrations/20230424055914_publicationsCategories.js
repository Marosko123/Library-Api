/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('publications_categories', (table) => {
		table.uuid('id').notNullable().primary();
		table.uuid('publication_id').notNullable().references('publications.id').onDelete('CASCADE');
		table.uuid('category_id').notNullable().references('categories.id').onDelete('CASCADE');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('publicationsCategories');
};
