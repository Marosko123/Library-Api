import { CategoriesDAO } from '../dao/categories_DAO.js';
import { Validator } from '../common/validator.js';

export class CategoriesService {
	private categoriesDAO: CategoriesDAO;
	private validator: Validator;

	constructor() {
		this.categoriesDAO = new CategoriesDAO();
		this.validator = new Validator();
	}

	async getCategory(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const categorie = await this.categoriesDAO.getCategory(id);

		if (!categorie) {
			throw new Error('Category Not Found');
		}

		return categorie;
	}

	async getCategoriesNamesOfCategories(categories: any) {
		let categories_names = [];

		for (const category of categories) {
			const cat = await this.categoriesDAO.getCategory(category.category_id);

			if (cat) {
				categories_names.push(cat.name);
			}
		}

		return categories_names;
	}

	async createCategory(categoryDTO: any) {
		const { id, name } = categoryDTO;

		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const existingCategory = await this.categoriesDAO.getCategoryByIdOrName(id, name);
		if (existingCategory) {
			throw new Error('Category Already Exists');
		}

		const category = await this.categoriesDAO.createCategory(id, name);
		if (!category) {
			throw new Error('Category Not Created Successfully');
		}

		return category;
	}

	async updateCategory(id: string, categoryDTO: any) {
		const { name } = categoryDTO;

		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let category = await this.categoriesDAO.getCategory(id);
		if (!category) {
			throw new Error('Category Not Found');
		}

		if (name) {
			if (!this.validator.isString(name)) {
				throw new Error('Invalid Name format');
			}

			const existingCategory = await this.categoriesDAO.getCategoryByName(name);
			if (existingCategory) {
				throw new Error('Category Already Exists');
			}
		}
		category = await this.categoriesDAO.updateCategory(id, name);

		return category;
	}

	async deleteCategory(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await this.categoriesDAO.deleteCategory(id);
	}
}
