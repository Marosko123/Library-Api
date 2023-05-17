const db = require('../db/db');

class CardsDAO {
	async getCard(id) {
		const [card] = await db('cards').where({ id });
		return card;
	}

	async createCard(id, user_id, magstripe, status) {
		const [card] = await db('cards')
			.insert({
				id,
				user_id,
				magstripe,
				status,
			})
			.returning('*');
		return card;
	}

	async updateCard(id, item) {
		const [card] = await db('cards').where({ id }).update(item).returning('*');
		return card;
	}

	async deleteCard(id) {
		await db('cards').where({ id }).del();
	}
}

module.exports = new CardsDAO();
