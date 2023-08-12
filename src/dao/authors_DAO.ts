import { db } from '../db/db.js';

export class AuthorsDAO {
	async getAuthor(id: string) {
		const [author] = await db('authors').where({ id });
		return author;
	}

	async updateAuthor(id: string, data: any) {
		const [author] = await db('authors').where({ id }).update(data).returning('*');
		return author;
	}

	async getAuthorByNameSurname(name: string, surname: string) {
		const [authors] = await db('authors').where({ name }).where({ surname });
		return authors;
	}

	async createAuthor(name: string, surname: string, id: string) {
		const [author] = await db('authors')
			.insert({
				name: name,
				surname: surname,
				id: id
			})
			.returning('*');

		return author;
	}

	async deleteAuthor(id: string) {
		await db('authors').where({ id }).del();
	}
}
