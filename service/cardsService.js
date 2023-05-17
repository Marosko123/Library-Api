const cardsDAO = require('../dao/cardsDAO');
const validator = require('../common/validator');
const usersDAO = require('../dao/usersDAO');

class CardsService {
	async getCard(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const card = await cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		return card;
	}

	async createCard(cardDTO) {
		const { id, user_id, magstripe, status } = cardDTO;

		if (!validator.isUUID(id) || !validator.isUUID(user_id)) {
			throw new Error('Invalid UUID format');
		}

		const existingCard = await cardsDAO.getCard(id);
		if (existingCard) {
			throw new Error('Card Already Exists');
		}

		const card = await cardsDAO.createCard(id, user_id, magstripe, status);
		if (!card) {
			throw new Error('Card Not Created Successfully');
		}

		return card;
	}

	async updateCard(id, cardDTO) {
		const { status, user_id } = cardDTO;

		if (!validator.isUUID(id) || (user_id && !validator.isUUID(user_id))) {
			throw new Error('Invalid UUID format');
		}

		let card = await cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		if (status && !['active', 'inactive', 'expired'].includes(status)) {
			throw new Error('Invalid Status');
		}

		if (status) {
			card = await cardsDAO.updateCard(id, { status });
		}

		if (user_id) {
			const user = await usersDAO.getUser(user_id);
			if (!user) {
				throw new Error('User Not Found');
			}
			card = await cardsDAO.updateCard(id, { user_id });
		}

		return card;
	}

	async deleteCard(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let card = await cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		await cardsDAO.deleteCard(id);
	}
}

module.exports = new CardsService();
