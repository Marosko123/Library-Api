const authorsDAO = require('../dao/authorsDAO');
const publicationsAuthorsDAO = require('../dao/publicationsAuthorsDAO');
const { v4: uuidv4 } = require('uuid');

class PublicationsAuthorsService {
	async createPublicationAuthors(publication_id, authors) {
		let publicationAuthors = [];

		for (const author of authors) {
			const existingAuthor = await authorsDAO.getAuthorByNameSurname(author['name'], author['surname']);
			if (existingAuthor) {
				await publicationsAuthorsDAO.createPublicationAuthor(publication_id, existingAuthor.id);
				publicationAuthors.push({
					name: existingAuthor.name,
					surname: existingAuthor.surname,
				});
			} else {
				const uuid = uuidv4();
				const newAuthor = await authorsDAO.createAuthor(author['name'], author['surname'], uuid);
				await publicationsAuthorsDAO.createPublicationAuthor(publication_id, newAuthor.id);
				publicationAuthors.push({
					name: newAuthor.name,
					surname: newAuthor.surname,
				});
			}
		}

		return publicationAuthors;
	}

	async updatePublicationAuthors(publication_id, authors) {
		await publicationsAuthorsDAO.deletePublicationAuthors(publication_id);

		return await this.createPublicationAuthors(publication_id, authors);
	}
}

module.exports = new PublicationsAuthorsService();
