import { PublicationsDAO } from '../dao/publications_DAO.js';
import { Validator } from '../common/validator.js';
import { PublicationsAuthorsDAO } from '../dao/publications_authors_DAO.js';
import { PublicationsCategoriesDAO } from '../dao/publications_categories_DAO.js';
import { PublicationsAuthorsService } from './publications_authors_service.js';
import { PublicationsCategoriesService } from './publications_categories_service.js';
import { AuthorsService } from './authors_service.js';
import { CategoriesService } from './categories_service.js';

export class PublicationsService {
	private publicationsDAO: PublicationsDAO;
	private validator: Validator;
	private publicationsAuthorsDAO: PublicationsAuthorsDAO;
	private publicationsCategoriesDAO: PublicationsCategoriesDAO;
	private publicationsAuthorsService: PublicationsAuthorsService;
	private publicationsCategoriesService: PublicationsCategoriesService;
	private authorsService: AuthorsService;
	private categoriesService: CategoriesService;

	constructor() {
		this.publicationsDAO = new PublicationsDAO();
		this.validator = new Validator();
		this.publicationsAuthorsDAO = new PublicationsAuthorsDAO();
		this.publicationsCategoriesDAO = new PublicationsCategoriesDAO();
		this.publicationsAuthorsService = new PublicationsAuthorsService();
		this.publicationsCategoriesService = new PublicationsCategoriesService();
		this.authorsService = new AuthorsService();
		this.categoriesService = new CategoriesService();
	}

	async getPublication(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let publication = await this.publicationsDAO.getPublication(id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		const categories = await this.publicationsCategoriesDAO.getCategoriesByPublicationId(id);
		const authors = await this.publicationsAuthorsDAO.getAuthorsByPublicationId(id);

		publication['categories'] = await this.categoriesService.getCategoriesNamesOfCategories(categories);
		publication['authors'] = await this.authorsService.getAuthorsNamesOfAuthors(authors);

		return publication;
	}

	async createPublication(publicationDTO: any) {
		const { id, title, authors, categories } = publicationDTO;

		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		if (!title) {
			throw new Error('Invalid Title format');
		}

		for (const author of authors) {
			if (!author['name'] || !author['surname']) {
				throw new Error('Invalid Author format');
			}
		}

		for (const category of categories) {
			if (!category) {
				throw new Error('Invalid Category format');
			}
		}

		// If the publication already exists, throw an error
		if (await this.publicationsDAO.getPublicationByIdOrTitle(id, title)) {
			throw new Error('Publication Already Exists');
		}

		const publication = await this.publicationsDAO.createPublication(id, title);
		if (!publication) {
			throw new Error('Publication Not Created Successfully');
		}

		/* If all the data is valid, create the publication */
		publication['authors'] = await this.publicationsAuthorsService.createPublicationAuthors(
			publication.id,
			authors
		);
		publication['categories'] = await this.publicationsCategoriesService.createPublicationCategories(
			publication.id,
			categories
		);

		return publication;
	}

	async updatePublication(id: string, publicationDTO: any) {
		const { title, authors, categories } = publicationDTO;

		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let publication = await this.publicationsDAO.getPublication(id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		if (title) {
			const existingPublication = await this.publicationsDAO.getPublicationByTitle(title);
			if (existingPublication) {
				throw new Error('Publication Already Exists');
			}
		}
		if (authors) {
			for (const author of authors) {
				if (!author['name'] || !author['surname']) {
					throw new Error('Invalid Author format');
				}
			}
		}
		if (categories) {
			for (const category of categories) {
				if (!category) {
					throw new Error('Invalid Category format');
				}
			}
		}

		/* If all the data is valid, update the publication */
		if (title) publication = await this.publicationsDAO.updatePublication(id, { title });
		if (authors)
			publication['authors'] = await this.publicationsAuthorsService.updatePublicationAuthors(id, authors);
		if (categories)
			publication['categories'] = await this.publicationsCategoriesService.updatePublicationCategories(
				id,
				categories
			);

		return publication;
	}

	async deletePublication(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await this.publicationsDAO.deletePublication(id);
	}
}
