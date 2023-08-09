/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('cards', (table) => {
		table.uuid('id').notNullable().primary();
		table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE');
		table.string('magstripe').notNullable();
		table.string('status').notNullable().defaultTo('active');
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('cards');
};
