import { dropTables } from './drop_tables.js';
import { migrateTables } from './migrate_tables.js';

async function buildAll() {
	await dropTables();
	await migrateTables();

	console.log('\nServer built successfully!\n');
	process.exit(0);
}

buildAll();
