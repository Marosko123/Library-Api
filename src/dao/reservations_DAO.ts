import { db } from '../db/db.js';

export class ReservationsDAO {
	async getReservationById(id: string) {
		const [reservation] = await db('reservations').where({ id });
		return reservation;
	}

	async getFirstReservationByPublicationId(publication_id: string) {
		const [reservation] = await db('reservations').where({ publication_id }).orderBy('created_at', 'asc').limit(1);
		return reservation;
	}

	async getReservationsOfUser(user_id: string) {
		const reservations = await db('reservations').where({ user_id });

		reservations.forEach((reservation: any) => {
			delete reservation.created_at;
		});

		return reservations;
	}

	async createReservation(id: string, user_id: string, publication_id: string) {
		const [reservation] = await db('reservations')
			.insert({
				id,
				user_id,
				publication_id
			})
			.returning('*');
		return reservation;
	}

	async updateReservation(id: string, item: any) {
		const [reservation] = await db('reservations').where({ id }).update(item).returning('*');
		return reservation;
	}

	async deleteReservation(id: string) {
		await db('reservations').where({ id }).del();
	}
}
