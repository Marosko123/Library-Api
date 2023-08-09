const dropTables = require('./drop_tables');
const migrateTables = require('./migrate_tables');

async function buildAll() {
	await dropTables();
	await migrateTables();

	console.log('\nServer built successfully!\n');
	process.exit(0);
}

buildAll();
