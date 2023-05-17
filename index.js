const express = require('express');
const router = require('./routes/router');
const migrateTables = require('./environmentScripts/migrateTables');

const port = 8000;
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
