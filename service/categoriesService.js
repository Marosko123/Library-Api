const categoriesDAO = require('../dao/categoriesDAO');
const validator = require('../common/validator');

class CategoriesService {
	async getCategory(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const categorie = await categoriesDAO.getCategory(id);

		if (!categorie) {
			throw new Error('Category Not Found');
		}

		return categorie;
	}

	async getCategoriesNamesOfCategories(categories) {
		let categories_names = [];

		for (const category of categories) {
			const cat = await categoriesDAO.getCategory(category.category_id);

			if (cat) {
				categories_names.push(cat.name);
			}
		}

		return categories_names;
	}

	async createCategory(categoryDTO) {
		const { id, name } = categoryDTO;

		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const existingCategory = await categoriesDAO.getCategoryByIdOrName(id, name);
		if (existingCategory) {
			throw new Error('Category Already Exists');
		}

		const category = await categoriesDAO.createCategory(id, name);
		if (!category) {
			throw new Error('Category Not Created Successfully');
		}

		return category;
	}

	async updateCategory(id, categoryDTO) {
		const { name } = categoryDTO;

		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let category = await categoriesDAO.getCategory(id);
		if (!category) {
			throw new Error('Category Not Found');
		}

		if (name) {
			if (!validator.isString(name)) {
				throw new Error('Invalid Name format');
			}

			const existingCategory = await categoriesDAO.getCategoryByName(name);
			if (existingCategory) {
				throw new Error('Category Already Exists');
			}
		}
		category = await categoriesDAO.updateCategory(id, name);

		return category;
	}

	async deleteCategory(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await categoriesDAO.deleteCategory(id);
	}
}

module.exports = new CategoriesService();
