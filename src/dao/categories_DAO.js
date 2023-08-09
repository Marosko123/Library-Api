const db = require('../db/db');

class CategoriesDAO {
	async getCategory(id) {
		const [category] = await db('categories').where({ id });
		return category;
	}

	async getCategoryByName(name) {
		const [category] = await db('categories').where({ name });
		return category;
	}

	async getCategoryByIdOrName(id, name) {
		const [category] = await db('categories').where({ id }).orWhere({ name });
		return category;
	}

	async createCategory(id, name) {
		const [category] = await db('categories')
			.insert({
				id,
				name,
			})
			.returning('*');
		return category;
	}

	async updateCategory(id, name) {
		const [category] = await db('categories')
			.where({ id })
			.update({
				name,
			})
			.returning('*');
		return category;
	}

	async deleteCategory(id) {
		await db('categories').where({ id }).del();
		return;
	}
}

module.exports = new CategoriesDAO();
