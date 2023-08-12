import { AuthorsDAO } from '../dao/authors_DAO.js';
import { PublicationsAuthorsDAO } from '../dao/publications_authors_DAO.js';
import { v4 as uuidv4 } from 'uuid';

export class PublicationsAuthorsService {
	private authorsDAO: AuthorsDAO;
	private publicationsAuthorsDAO: PublicationsAuthorsDAO;

	constructor() {
		this.authorsDAO = new AuthorsDAO();
		this.publicationsAuthorsDAO = new PublicationsAuthorsDAO();
	}

	async createPublicationAuthors(publication_id: string, authors: any) {
		let publicationAuthors = [];

		for (const author of authors) {
			const existingAuthor = await this.authorsDAO.getAuthorByNameSurname(author['name'], author['surname']);
			if (existingAuthor) {
				await this.publicationsAuthorsDAO.createPublicationAuthor(publication_id, existingAuthor.id);
				publicationAuthors.push({
					name: existingAuthor.name,
					surname: existingAuthor.surname
				});
			} else {
				const uuid = uuidv4();
				const newAuthor = await this.authorsDAO.createAuthor(author['name'], author['surname'], uuid);
				await this.publicationsAuthorsDAO.createPublicationAuthor(publication_id, newAuthor.id);
				publicationAuthors.push({
					name: newAuthor.name,
					surname: newAuthor.surname
				});
			}
		}

		return publicationAuthors;
	}

	async updatePublicationAuthors(publication_id: string, authors: any) {
		await this.publicationsAuthorsDAO.deletePublicationAuthors(publication_id);

		return await this.createPublicationAuthors(publication_id, authors);
	}
}
