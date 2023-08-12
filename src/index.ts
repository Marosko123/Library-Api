import express from 'express';
import { Router } from './routes/router.js';
import { migrateTables } from './environment_scripts/migrate_tables.js';

const port = 8000;

const router = new Router().getRouter();
const app = express();

app.use(express.json());
app.use(router);

async function start() {
	try {
		await migrateTables();
		app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
	} catch (err) {
		console.error('Error starting server:', err);
		process.exit(1);
	}
}

start();
