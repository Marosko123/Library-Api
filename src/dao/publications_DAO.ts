import { db } from '../db/db.js';

export class PublicationsDAO {
	async getPublication(id: string) {
		const [publication] = await db('publications').where({ id });
		return publication;
	}

	async getPublicationByTitle(title: string) {
		const [publication] = await db('publications').where({ title });
		return publication;
	}

	async getPublicationByIdOrTitle(id: string, title: string) {
		const [publication] = await db('publications').where({ id }).orWhere({ title });
		return publication;
	}

	async createPublication(id: string, title: string) {
		const [publication] = await db('publications')
			.insert({
				id,
				title
			})
			.returning('*');
		return publication;
	}

	async updatePublication(id: string, item: any) {
		const [publication] = await db('publications').where({ id }).update(item).returning('*');
		return publication;
	}

	async deletePublication(id: string) {
		await db('publications').where({ id }).del();
	}
}
