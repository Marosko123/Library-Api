import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';

export class PublicationsCategoriesDAO {
	async getCategoriesByPublicationId(id: string) {
		const publicationCategories = await db('publications_categories').where({ publication_id: id });
		return publicationCategories;
	}

	async createPublicationCategory(publication_id: string, category_id: string) {
		const id = uuidv4();

		const [publicationcategory] = await db('publications_categories')
			.insert({
				id,
				publication_id,
				category_id
			})
			.returning('*');
		return publicationcategory;
	}

	async deletePublicationCategories(publication_id: string) {
		await db('publications_categories').where({ publication_id }).del();
	}
}
