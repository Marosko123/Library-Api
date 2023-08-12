import { execSync } from 'child_process';

export async function migrateTables() {
	try {
		console.log('Migrating tables...');
		execSync('cd ./src/db');
		execSync('npx knex migrate:latest --knexfile ./src/db/knexfile.js');
		console.log('Tables migrated successfully!');
	} catch (error) {
		console.error('Error migrating tables!');
		console.error(error);
	}
}
