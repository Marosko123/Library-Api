import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';

export class PublicationsAuthorsDAO {
	async getAuthorsByPublicationId(id: string) {
		const publicationAuthors = await db('publications_authors').where({ publication_id: id });
		return publicationAuthors;
	}

	async createPublicationAuthor(publication_id: string, author_id: string) {
		const id = uuidv4();

		const [publication_author] = await db('publications_authors')
			.insert({
				id,
				publication_id,
				author_id
			})
			.returning('*');
		return publication_author;
	}

	async updatePublicationAuthor(id: string, name: string) {
		const [publicationAuthor] = await db('publications_authors')
			.where({ id })
			.update({
				name
			})
			.returning('*');
		return publicationAuthor;
	}

	async deletePublicationAuthors(publication_id: string) {
		await db('publications_authors').where({ publication_id }).del();
	}
}
