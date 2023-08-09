const db = require('../db/db');

class PublicationsCategoriesDAO {
	async getCategoriesByPublicationId(id) {
		const publicationCategories = await db('publications_categories').where({ publication_id: id });
		return publicationCategories;
	}

	async createPublicationCategory(publication_id, category_id) {
		const { v4: uuidv4 } = require('uuid');
		const id = uuidv4();

		const [publicationcategory] = await db('publications_categories')
			.insert({
				id,
				publication_id,
				category_id,
			})
			.returning('*');
		return publicationcategory;
	}

	async deletePublicationCategories(publication_id) {
		await db('publications_categories').where({ publication_id }).del();
	}
}

module.exports = new PublicationsCategoriesDAO();
