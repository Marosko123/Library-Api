const db = require('../db/db');

class PublicationsDAO {
	async getPublication(id) {
		const [publication] = await db('publications').where({ id });
		return publication;
	}

	async getPublicationByTitle(title) {
		const [publication] = await db('publications').where({ title });
		return publication;
	}

	async getPublicationByIdOrTitle(id, title) {
		const [publication] = await db('publications').where({ id }).orWhere({ title });
		return publication;
	}

	async createPublication(id, title) {
		const [publication] = await db('publications')
			.insert({
				id,
				title,
			})
			.returning('*');
		return publication;
	}

	async updatePublication(id, item) {
		const [publication] = await db('publications').where({ id }).update(item).returning('*');
		return publication;
	}

	async deletePublication(id) {
		await db('publications').where({ id }).del();
	}
}

module.exports = new PublicationsDAO();
