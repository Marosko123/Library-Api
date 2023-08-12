import { PublicationsCategoriesDAO } from '../dao/publications_categories_DAO.js';
import { CategoriesDAO } from '../dao/categories_DAO.js';
import { v4 as uuidv4 } from 'uuid';

export class PublicationsCategoriesService {
	private publicationsCategoriesDAO: PublicationsCategoriesDAO;
	private categoriesDAO: CategoriesDAO;

	constructor() {
		this.publicationsCategoriesDAO = new PublicationsCategoriesDAO();
		this.categoriesDAO = new CategoriesDAO();
	}

	async createPublicationCategories(publication_id: string, categories: any) {
		let publicationCategories = [];

		for (const category of categories) {
			const existingCategory = await this.categoriesDAO.getCategoryByName(category);
			if (existingCategory) {
				await this.publicationsCategoriesDAO.createPublicationCategory(publication_id, existingCategory.id);
				publicationCategories.push(existingCategory.name);
			} else {
				const uuid = uuidv4();
				const newCategory = await this.categoriesDAO.createCategory(uuid, category);
				await this.publicationsCategoriesDAO.createPublicationCategory(publication_id, newCategory.id);
				publicationCategories.push(newCategory.name);
			}
		}

		return publicationCategories;
	}

	async updatePublicationCategories(publication_id: string, categories: any) {
		await this.publicationsCategoriesDAO.deletePublicationCategories(publication_id);

		return await this.createPublicationCategories(publication_id, categories);
	}
}
