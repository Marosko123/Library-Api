const db = require('../db/db');

class UsersDAO {
	async getUser(id) {
		const [user] = await db('users')
			.where({ id })
			.returning('*')
			.then((rows) => {
				const formattedRows = rows.map((row) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10),
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}

	async updateUser(id, data) {
		const [user] = await db('users')
			.where({ id })
			.update(data)
			.returning('*')
			.then((rows) => {
				const formattedRows = rows.map((row) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10),
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}

	async getParentByEmail(email) {
		const [users] = await db('users').where({ email }).where({ is_child: false });
		return users;
	}

	async createUser(name, surname, email, birth_date, personal_identificator, id, is_child) {
		const [user] = await db('users')
			.insert({
				name: name,
				surname: surname,
				email: email,
				birth_date: birth_date,
				personal_identificator: personal_identificator,
				id: id,
				is_child: is_child,
			})
			.returning('*')
			.then((rows) => {
				const formattedRows = rows.map((row) => {
					return {
						...row,
						birth_date: new Date(row.birth_date).toISOString().slice(0, 10),
					};
				});
				return formattedRows;
			});

		if (user) delete user.is_child;

		return user;
	}
}

module.exports = new UsersDAO();
