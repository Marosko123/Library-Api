const cardsService = require('../service/cardsService');

class CardsController {
	async getCard(req, res) {
		try {
			const card = await cardsService.getCard(req.params.cardId);
			res.status(200).json(card);
		} catch (e) {
			if (e.message === 'Card Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createCard(req, res) {
		try {
			const card = await cardsService.createCard(req.body);
			res.status(201).json(card);
		} catch (e) {
			if (e.message === 'Invalid UUID format') {
				res.status(400).json();
			} else if (e.message === 'Card Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateCard(req, res) {
		try {
			const card = await cardsService.updateCard(req.params.cardId, req.body);
			res.status(200).json(card);
		} catch (e) {
			if (e.message === 'Invalid UUID format' || e.message === 'Invalid Status') {
				res.status(400).json();
			} else if (e.message === 'Card Not Found' || e.message === 'User Not Found') {
				res.status(404).json();
			} else if (e.message === 'Card Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteCard(req, res) {
		try {
			await cardsService.deleteCard(req.params.cardId);
			res.status(204).json();
		} catch (e) {
			if (e.message === 'Card Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}
}

module.exports = new CardsController();
