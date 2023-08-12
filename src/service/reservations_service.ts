import { ReservationsDAO } from '../dao/reservations_DAO.js';
import { UsersDAO } from '../dao/users_DAO.js';
import { PublicationsDAO } from '../dao/publications_DAO.js';
import { Validator } from '../common/validator.js';

export class ReservationsService {
	private reservationsDAO: ReservationsDAO;
	private usersDAO: UsersDAO;
	private publicationsDAO: PublicationsDAO;
	private validator: Validator;

	constructor() {
		this.reservationsDAO = new ReservationsDAO();
		this.usersDAO = new UsersDAO();
		this.publicationsDAO = new PublicationsDAO();
		this.validator = new Validator();
	}

	async getReservation(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let reservation = await this.reservationsDAO.getReservationById(id);
		if (!reservation) {
			throw new Error('Reservation Not Found');
		}

		return reservation;
	}

	async createReservation(reservationDTO: any) {
		const { id, user_id, publication_id } = reservationDTO;

		if (!this.validator.isUUID(id) || !this.validator.isUUID(user_id) || !this.validator.isUUID(publication_id)) {
			throw new Error('Invalid UUID format');
		}

		const existingReservation = await this.reservationsDAO.getReservationById(id);
		if (existingReservation) throw new Error('Reservation Already Exists');

		const existingUser = await this.usersDAO.getUser(user_id);
		if (!existingUser) throw new Error('User Not Found');

		const publication = await this.publicationsDAO.getPublication(publication_id);
		if (!publication) throw new Error('Publication Not Found');

		/* If all the data is valid create reservation */
		const reservation = await this.reservationsDAO.createReservation(id, user_id, publication_id);
		if (!reservation) throw new Error('Reservation Not Created Successfully');

		return reservation;
	}

	async deleteReservation(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await this.reservationsDAO.deleteReservation(id);
	}
}
