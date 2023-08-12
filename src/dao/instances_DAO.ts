import { db } from '../db/db.js';

export class InstancesDAO {
	async getInstanceById(id: string) {
		const [instance] = await db('instances').where({ id });
		return instance;
	}

	async getAvailableInstancesOfPublication(publication_id: string) {
		const instances = await db('instances').where({ publication_id }).where({ status: 'available' });
		return instances;
	}

	async createInstance(id: string, type: any, publisher: any, year: any, status: any, publication_id: any) {
		const [instance] = await db('instances')
			.insert({
				id,
				type,
				publisher,
				year,
				status,
				publication_id
			})
			.returning('*');
		return instance;
	}

	async updateInstance(id: string, item: any) {
		const [instance] = await db('instances').where({ id }).update(item).returning('*');
		return instance;
	}

	async deleteInstance(id: string) {
		await db('instances').where({ id }).del();
	}
}
