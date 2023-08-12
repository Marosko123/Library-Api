import { db } from '../db/db.js';

export class UsersDAO {
	async getUser(id: string) {
		const [user] = await db('users')
			.where({ id })
			.returning('*')
			.then((rows: any) => {
				const formattedRows = rows.map((row: any) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10)
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}

	async updateUser(id: string, data: any) {
		const [user] = await db('users')
			.where({ id })
			.update(data)
			.returning('*')
			.then((rows: any) => {
				const formattedRows = rows.map((row: any) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10)
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}

	async getParentByEmail(email: string) {
		const [users] = await db('users').where({ email }).where({ is_child: false });
		return users;
	}

	async createUser(
		name: string,
		surname: string,
		email: string,
		birth_date: any,
		personal_identificator: any,
		id: string,
		is_child: boolean
	) {
		const [user] = await db('users')
			.insert({
				name,
				surname,
				email,
				birth_date,
				personal_identificator,
				id,
				is_child
			})
			.returning('*')
			.then((rows: any) => {
				const formattedRows = rows.map((row: any) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10)
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}
}
