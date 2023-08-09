const db = require('../db/db');

class ReservationsDAO {
	async getReservationById(id) {
		const [reservation] = await db('reservations').where({ id });
		return reservation;
	}

	async getFirstReservationByPublicationId(publication_id) {
		const [reservation] = await db('reservations').where({ publication_id }).orderBy('created_at', 'asc').limit(1);
		return reservation;
	}

	async getReservationsOfUser(user_id) {
		const reservations = await db('reservations').where({ user_id });

		reservations.forEach((reservation) => {
			delete reservation.created_at;
		});

		return reservations;
	}

	async createReservation(id, user_id, publication_id) {
		const [reservation] = await db('reservations')
			.insert({
				id,
				user_id,
				publication_id,
			})
			.returning('*');
		return reservation;
	}

	async updateReservation(id, item) {
		const [reservation] = await db('reservations').where({ id }).update(item).returning('*');
		return reservation;
	}

	async deleteReservation(id) {
		await db('reservations').where({ id }).del();
	}
}

module.exports = new ReservationsDAO();
