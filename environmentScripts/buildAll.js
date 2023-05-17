const dropTables = require('./dropTables');
const migrateTables = require('./migrateTables');

async function buildAll() {
	await dropTables();
	await migrateTables();

	console.log('\nServer built successfully!\n');
	process.exit(0);
}

buildAll();
