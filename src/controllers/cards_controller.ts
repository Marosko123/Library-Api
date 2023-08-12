import { Request, Response } from 'express';
import { CardsService } from '../service/cards_service.js';

export class CardsController {
	private cardsService: CardsService;

	constructor() {
		this.cardsService = new CardsService();
	}

	async getCard(req: Request, res: Response) {
		try {
			const card = await this.cardsService.getCard(req.params.cardId);
			res.status(200).json(card);
		} catch (e: any) {
			if (e.message === 'Card Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createCard(req: Request, res: Response) {
		try {
			const card = await this.cardsService.createCard(req.body);
			res.status(201).json(card);
		} catch (e: any) {
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

	async updateCard(req: Request, res: Response) {
		try {
			const card = await this.cardsService.updateCard(req.params.cardId, req.body);
			res.status(200).json(card);
		} catch (e: any) {
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

	async deleteCard(req: Request, res: Response) {
		try {
			await this.cardsService.deleteCard(req.params.cardId);
			res.status(204).json();
		} catch (e: any) {
			if (e.message === 'Card Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}
}
