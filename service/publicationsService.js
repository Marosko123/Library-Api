const publicationsDAO = require('../dao/publicationsDAO');
const validator = require('../common/validator');
const publicationsAuthorsDAO = require('../dao/publicationsAuthorsDAO');
const publicationsCategoriesDAO = require('../dao/publicationsCategoriesDAO');
const publicationsAuthorsService = require('./publicationsAuthorsService');
const publicationsCategoriesService = require('./publicationsCategoriesService');
const authorsService = require('./authorsService');
const categoriesService = require('./categoriesService');

class PublicationsService {
	async getPublication(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let publication = await publicationsDAO.getPublication(id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		const categories = await publicationsCategoriesDAO.getCategoriesByPublicationId(id);
		const authors = await publicationsAuthorsDAO.getAuthorsByPublicationId(id);

		publication['categories'] = await categoriesService.getCategoriesNamesOfCategories(categories);
		publication['authors'] = await authorsService.getAuthorsNamesOfAuthors(authors);

		return publication;
	}

	async createPublication(publicationDTO) {
		const { id, title, authors, categories } = publicationDTO;

		if (!validator.isUUID(id)) {
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
		if (await publicationsDAO.getPublicationByIdOrTitle(id, title)) {
			throw new Error('Publication Already Exists');
		}

		const publication = await publicationsDAO.createPublication(id, title);
		if (!publication) {
			throw new Error('Publication Not Created Successfully');
		}

		/* If all the data is valid, create the publication */
		publication['authors'] = await publicationsAuthorsService.createPublicationAuthors(publication.id, authors);
		publication['categories'] = await publicationsCategoriesService.createPublicationCategories(
			publication.id,
			categories
		);

		return publication;
	}

	async updatePublication(id, publicationDTO) {
		const { title, authors, categories } = publicationDTO;

		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let publication = await publicationsDAO.getPublication(id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		if (title) {
			const existingPublication = await publicationsDAO.getPublicationByTitle(title);
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
		if (title) publication = await publicationsDAO.updatePublication(id, { title });
		if (authors) publication['authors'] = await publicationsAuthorsService.updatePublicationAuthors(id, authors);
		if (categories)
			publication['categories'] = await publicationsCategoriesService.updatePublicationCategories(id, categories);

		return publication;
	}

	async deletePublication(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await publicationsDAO.deletePublication(id);
	}
}

module.exports = new PublicationsService();
