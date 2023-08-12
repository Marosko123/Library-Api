import { CardsDAO } from '../dao/cards_DAO.js';
import { Validator } from '../common/validator.js';
import { UsersDAO } from '../dao/users_DAO.js';

export class CardsService {
	private cardsDAO: CardsDAO;
	private usersDAO: UsersDAO;
	private validator: Validator;

	constructor() {
		this.cardsDAO = new CardsDAO();
		this.usersDAO = new UsersDAO();
		this.validator = new Validator();
	}

	async getCard(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const card = await this.cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		return card;
	}

	async createCard(cardDTO: any) {
		const { id, user_id, magstripe, status } = cardDTO;

		if (!this.validator.isUUID(id) || !this.validator.isUUID(user_id)) {
			throw new Error('Invalid UUID format');
		}

		const existingCard = await this.cardsDAO.getCard(id);
		if (existingCard) {
			throw new Error('Card Already Exists');
		}

		const card = await this.cardsDAO.createCard(id, user_id, magstripe, status);
		if (!card) {
			throw new Error('Card Not Created Successfully');
		}

		return card;
	}

	async updateCard(id: string, cardDTO: any) {
		const { status, user_id } = cardDTO;

		if (!this.validator.isUUID(id) || (user_id && !this.validator.isUUID(user_id))) {
			throw new Error('Invalid UUID format');
		}

		let card = await this.cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		if (status && !['active', 'inactive', 'expired'].includes(status)) {
			throw new Error('Invalid Status');
		}

		if (status) {
			card = await this.cardsDAO.updateCard(id, { status });
		}

		if (user_id) {
			const user = await this.usersDAO.getUser(user_id);
			if (!user) {
				throw new Error('User Not Found');
			}
			card = await this.cardsDAO.updateCard(id, { user_id });
		}

		return card;
	}

	async deleteCard(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let card = await this.cardsDAO.getCard(id);
		if (!card) {
			throw new Error('Card Not Found');
		}

		await this.cardsDAO.deleteCard(id);
	}
}
