const db = require('../db/db');

class PublicationsAuthorsDAO {
	async getAuthorsByPublicationId(id) {
		const publicationAuthors = await db('publications_authors').where({ publication_id: id });
		return publicationAuthors;
	}

	async createPublicationAuthor(publication_id, author_id) {
		const { v4: uuidv4 } = require('uuid');
		const id = uuidv4();

		const [publication_author] = await db('publications_authors')
			.insert({
				id,
				publication_id,
				author_id,
			})
			.returning('*');
		return publication_author;
	}

	async updatePublicationAuthor(id, name) {
		const [publicationAuthor] = await db('publications_authors')
			.where({ id })
			.update({
				name,
			})
			.returning('*');
		return publicationAuthor;
	}

	async deletePublicationAuthors(publication_id) {
		await db('publications_authors').where({ publication_id }).del();
	}
}

module.exports = new PublicationsAuthorsDAO();
