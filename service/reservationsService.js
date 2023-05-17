const reservationsDAO = require('../dao/reservationsDAO');
const usersDAO = require('../dao/usersDAO');
const publicationsDAO = require('../dao/publicationsDAO');
const validator = require('../common/validator');

class ReservationsService {
	async getReservation(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let reservation = await reservationsDAO.getReservationById(id);
		if (!reservation) {
			throw new Error('Reservation Not Found');
		}

		return reservation;
	}

	async createReservation(reservationDTO) {
		const { id, user_id, publication_id } = reservationDTO;

		if (!validator.isUUID(id) || !validator.isUUID(user_id) || !validator.isUUID(publication_id)) {
			throw new Error('Invalid UUID format');
		}

		const existingReservation = await reservationsDAO.getReservationById(id);
		if (existingReservation) throw new Error('Reservation Already Exists');

		const existingUser = await usersDAO.getUser(user_id);
		if (!existingUser) throw new Error('User Not Found');

		const publication = await publicationsDAO.getPublication(publication_id);
		if (!publication) throw new Error('Publication Not Found');

		/* If all the data is valid create reservation */
		const reservation = await reservationsDAO.createReservation(id, user_id, publication_id);
		if (!reservation) throw new Error('Reservation Not Created Successfully');

		return reservation;
	}

	async deleteReservation(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await reservationsDAO.deleteReservation(id);
	}
}

module.exports = new ReservationsService();
