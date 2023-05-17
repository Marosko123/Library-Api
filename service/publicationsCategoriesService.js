const publicationsCategoriesDAO = require('../dao/publicationsCategoriesDAO');
const categoriesDAO = require('../dao/categoriesDAO');
const { v4: uuidv4 } = require('uuid');

class PublicationsCategoriesService {
	async createPublicationCategories(publication_id, categories) {
		let publicationCategories = [];

		for (const category of categories) {
			const existingCategory = await categoriesDAO.getCategoryByName(category);
			if (existingCategory) {
				await publicationsCategoriesDAO.createPublicationCategory(publication_id, existingCategory.id);
				publicationCategories.push(existingCategory.name);
			} else {
				const uuid = uuidv4();
				const newCategory = await categoriesDAO.createCategory(uuid, category);
				await publicationsCategoriesDAO.createPublicationCategory(publication_id, newCategory.id);
				publicationCategories.push(newCategory.name);
			}
		}

		return publicationCategories;
	}

	async updatePublicationCategories(publication_id, categories) {
		await publicationsCategoriesDAO.deletePublicationCategories(publication_id);

		return await this.createPublicationCategories(publication_id, categories);
	}
}

module.exports = new PublicationsCategoriesService();
