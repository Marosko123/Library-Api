import { db } from '../db/db.js';

export class CardsDAO {
	async getCard(id: string) {
		const [card] = await db('cards').where({ id });
		return card;
	}

	async createCard(id: string, user_id: string, magstripe: any, status: any) {
		const [card] = await db('cards')
			.insert({
				id,
				user_id,
				magstripe,
				status
			})
			.returning('*');
		return card;
	}

	async updateCard(id: string, item: any) {
		const [card] = await db('cards').where({ id }).update(item).returning('*');
		return card;
	}

	async deleteCard(id: string) {
		await db('cards').where({ id }).del();
	}
}
