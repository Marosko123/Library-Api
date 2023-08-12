import { execSync } from 'child_process';
import readline from 'readline-sync';

const migrationName = readline.question('Enter the name of the migration: ');

try {
	console.log(`Creating migration: ${migrationName}`);
	execSync(`cd ./src/db`);
	execSync(`npx knex migrate:make ${migrationName} --migrations-directory ./src/db/migrations`);
	console.log('Migration created successfully!\n');
	process.exit(0);
} catch (error) {
	console.error('Error creating migration!');
	console.error(error);
	process.exit(1);
}
