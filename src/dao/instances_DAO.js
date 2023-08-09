const db = require('../db/db');

class InstancesDAO {
	async getInstanceById(id) {
		const [instance] = await db('instances').where({ id });
		return instance;
	}

	async getAvailableInstancesOfPublication(publication_id) {
		const instances = await db('instances').where({ publication_id }).where({ status: 'available' });
		return instances;
	}

	async createInstance(id, type, publisher, year, status, publication_id) {
		const [instance] = await db('instances')
			.insert({
				id,
				type,
				publisher,
				year,
				status,
				publication_id,
			})
			.returning('*');
		return instance;
	}

	async updateInstance(id, item) {
		const [instance] = await db('instances').where({ id }).update(item).returning('*');
		return instance;
	}

	async deleteInstance(id) {
		await db('instances').where({ id }).del();
	}
}

module.exports = new InstancesDAO();
