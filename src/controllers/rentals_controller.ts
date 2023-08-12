import { Request, Response } from 'express';
import { RentalsService } from '../service/rentals_service.js';

export class RentalsController {
	private rentalsService: RentalsService = new RentalsService();

	async getRental(req: Request, res: Response) {
		try {
			const rental = await this.rentalsService.getRental(req.params.rentalId);
			res.status(200).json(rental);
		} catch (e: any) {
			if (e.message === 'Rental Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createRental(req: Request, res: Response) {
		try {
			const rental = await this.rentalsService.createRental(req.body);
			res.status(201).json(rental);
		} catch (e: any) {
			if (
				e.message === 'Invalid UUID format' ||
				e.message === 'Invalid Duration format' ||
				e.message === 'Publication Instances Not Available' ||
				e.message === 'Publication Already Reserved'
			) {
				res.status(400).json();
			} else if (e.message === 'Publication Not Found' || e.message === 'User Not Found') {
				res.status(404).json();
			} else if (e.message === 'Rental Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateRental(req: Request, res: Response) {
		try {
			const rental = await this.rentalsService.updateRental(req.params.rentalId, req.body);
			res.status(200).json(rental);
		} catch (e: any) {
			if (e.message === 'Invalid UUID format' || e.message === 'Invalid Duration format') {
				res.status(400).json();
			} else if (e.message === 'Rental Not Found' || e.message === 'Publication Not Found') {
				res.status(404).json();
			} else if (e.message === 'Rental Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteRental(req: Request, res: Response) {
		try {
			await this.rentalsService.deleteRental(req.params.rentalId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
