/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users', (table) => {
		table.uuid('id').notNullable().primary();
		table.string('name').notNullable();
		table.string('surname').notNullable();
		table.string('email').notNullable();
		table.date('birth_date').notNullable();
		table.string('personal_identificator').notNullable();
		table.boolean('is_child').notNullable().defaultTo(false);
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
