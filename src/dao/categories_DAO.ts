import { db } from '../db/db.js';

export class CategoriesDAO {
	async getCategory(id: string) {
		const [category] = await db('categories').where({ id });
		return category;
	}

	async getCategoryByName(name: string) {
		const [category] = await db('categories').where({ name });
		return category;
	}

	async getCategoryByIdOrName(id: string, name: string) {
		const [category] = await db('categories').where({ id }).orWhere({ name });
		return category;
	}

	async createCategory(id: string, name: string) {
		const [category] = await db('categories')
			.insert({
				id,
				name
			})
			.returning('*');
		return category;
	}

	async updateCategory(id: string, name: string) {
		const [category] = await db('categories')
			.where({ id })
			.update({
				name
			})
			.returning('*');
		return category;
	}

	async deleteCategory(id: string) {
		await db('categories').where({ id }).del();
		return;
	}
}
