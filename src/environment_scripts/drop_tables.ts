import { db } from '../db/db.js';

export async function dropTables() {
	try {
		console.log('Dropping tables...');
		await db.schema.dropTableIfExists('knex_migrations_lock');
		await db.schema.dropTableIfExists('knex_migrations');
		await db.schema.dropTableIfExists('cards');
		await db.schema.dropTableIfExists('rentals');
		await db.schema.dropTableIfExists('reservations');
		await db.schema.dropTableIfExists('users');
		await db.schema.dropTableIfExists('publications_categories');
		await db.schema.dropTableIfExists('publications_authors');
		await db.schema.dropTableIfExists('categories');
		await db.schema.dropTableIfExists('authors');
		await db.schema.dropTableIfExists('instances');
		await db.schema.dropTableIfExists('publications');
		console.log('Tables dropped successfully!\n');
		process.exit(0);
	} catch (error) {
		console.error('Error dropping tables!');
		console.error(error);
		process.exit(1);
	}
}

dropTables();
