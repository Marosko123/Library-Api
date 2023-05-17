const reservationsService = require('../service/reservationsService');

class ReservationsController {
	async getReservation(req, res) {
		try {
			const reservation = await reservationsService.getReservation(req.params.reservationId);
			res.status(200).json(reservation);
		} catch (e) {
			if (e.message === 'Reservation Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createReservation(req, res) {
		try {
			const reservation = await reservationsService.createReservation(req.body);
			res.status(201).json(reservation);
		} catch (e) {
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

	async updateReservation(req, res) {
		try {
			const reservation = await reservationsService.updateReservation(req.params.reservationId, req.body);
			res.status(200).json(reservation);
		} catch (e) {
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

	async deleteReservation(req, res) {
		try {
			await reservationsService.deleteReservation(req.params.reservationId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new ReservationsController();
