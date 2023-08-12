export const knexfile: any = {
	development: {
		client: 'postgresql',
		connection:
			process.env.DATABASE_NAME == null
				? {
						database: 'dbs_assignment_5',
						user: 'postgres',
						password: '123456'
				  }
				: {
						database: process.env.DATABASE_NAME,
						user: process.env.DATABASE_USER,
						host: process.env.DATABASE_HOST,
						password: process.env.DATABASE_PASSWORD,
						port: process.env.DATABASE_PORT
				  },
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
