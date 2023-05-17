const readline = require('readline-sync');

const migrationName = readline.question('Enter the name of the migration: ');

try {
	console.log(`Creating migration: ${migrationName}`);
	require('child_process').execSync(`cd ./db`);
	require('child_process').execSync(`npx knex migrate:make ${migrationName} --migrations-directory ./db/migrations`);
	console.log('Migration created successfully!\n');
	process.exit(0);
} catch (error) {
	console.error('Error creating migration!');
	console.error(error);
	process.exit(1);
}
