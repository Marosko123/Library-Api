async function migrateTables() {
	try {
		console.log('Migrating tables...');
		require('child_process').execSync('cd ./db');
		require('child_process').execSync('npx knex migrate:latest --knexfile ./db/knexfile.js');
		console.log('Tables migrated successfully!');
	} catch (error) {
		console.error('Error migrating tables!');
		console.error(error);
	}
}

module.exports = migrateTables;
