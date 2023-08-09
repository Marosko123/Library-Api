const rentalsService = require('../service/rentals_service');

class RentalsController {
	async getRental(req, res) {
		try {
			const rental = await rentalsService.getRental(req.params.rentalId);
			res.status(200).json(rental);
		} catch (e) {
			if (e.message === 'Rental Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createRental(req, res) {
		try {
			const rental = await rentalsService.createRental(req.body);
			res.status(201).json(rental);
		} catch (e) {
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

	async updateRental(req, res) {
		try {
			const rental = await rentalsService.updateRental(req.params.rentalId, req.body);
			res.status(200).json(rental);
		} catch (e) {
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

	async deleteRental(req, res) {
		try {
			await rentalsService.deleteRental(req.params.rentalId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new RentalsController();
