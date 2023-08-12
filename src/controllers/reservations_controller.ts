import { Request, Response } from 'express';
import { ReservationsService } from '../service/reservations_service.js';

export class ReservationsController {
	private reservationsService: ReservationsService = new ReservationsService();

	async getReservation(req: Request, res: Response) {
		try {
			const reservation = await this.reservationsService.getReservation(req.params.reservationId);
			res.status(200).json(reservation);
		} catch (e: any) {
			if (e.message === 'Reservation Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createReservation(req: Request, res: Response) {
		try {
			const reservation = await this.reservationsService.createReservation(req.body);
			res.status(201).json(reservation);
		} catch (e: any) {
			if (e.message === 'Invalid UUID format') {
				res.status(400).json();
			} else if (
				e.message === 'Publication Not Found' ||
				e.message === 'Publication Instances Not Available' ||
				e.message === 'User Not Found'
			) {
				res.status(404).json();
			} else if (e.message === 'Reservation Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateReservation(req: Request, res: Response) {
		try {
			// const reservation = await this.reservationsService.updateReservation(req.params.reservationId, req.body);
			// res.status(200).json(reservation);
			res.status(200).json('Not Implemented');
		} catch (e: any) {
			if (e.message === 'Invalid UUID format' || e.message === 'Invalid Duration format') {
				res.status(400).json();
			} else if (e.message === 'Reservation Not Found' || e.message === 'Publication Not Found') {
				res.status(404).json();
			} else if (e.message === 'Reservation Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteReservation(req: Request, res: Response) {
		try {
			await this.reservationsService.deleteReservation(req.params.reservationId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
