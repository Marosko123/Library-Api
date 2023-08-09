const db = require('../db/db');

class AuthorsDAO {
	async getAuthor(id) {
		const [author] = await db('authors').where({ id });
		return author;
	}

	async updateAuthor(id, data) {
		const [author] = await db('authors').where({ id }).update(data).returning('*');
		return author;
	}

	async getAuthorByNameSurname(name, surname) {
		const [authors] = await db('authors').where({ name }).where({ surname });
		return authors;
	}

	async createAuthor(name, surname, id) {
		const [author] = await db('authors')
			.insert({
				name: name,
				surname: surname,
				id: id,
			})
			.returning('*');

		return author;
	}

	async deleteAuthor(id) {
		await db('authors').where({ id }).del();
	}
}

module.exports = new AuthorsDAO();
