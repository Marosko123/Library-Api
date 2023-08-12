import { RentalsDAO } from '../dao/rentals_DAO.js';
import { UsersDAO } from '../dao/users_DAO.js';
import { ReservationsDAO } from '../dao/reservations_DAO.js';
import { PublicationsDAO } from '../dao/publications_DAO.js';
import { InstancesDAO } from '../dao/instances_DAO.js';
import { Validator } from '../common/validator.js';

export class RentalsService {
	private rentalsDAO: RentalsDAO;
	private usersDAO: UsersDAO;
	private reservationsDAO: ReservationsDAO;
	private publicationsDAO: PublicationsDAO;
	private instancesDAO: InstancesDAO;
	private validator: Validator;

	constructor() {
		this.rentalsDAO = new RentalsDAO();
		this.usersDAO = new UsersDAO();
		this.reservationsDAO = new ReservationsDAO();
		this.publicationsDAO = new PublicationsDAO();
		this.instancesDAO = new InstancesDAO();
		this.validator = new Validator();
	}

	async getRental(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let rental = await this.rentalsDAO.getRentalById(id);
		if (!rental) {
			throw new Error('Rental Not Found');
		}

		return rental;
	}

	async createRental(rentalDTO: any) {
		const { id, user_id, publication_id, duration } = rentalDTO;

		if (!this.validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (!this.validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (duration <= 0) throw new Error('Invalid Duration format');

		const start_date = new Date();
		const end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
		const status = start_date < end_date ? 'active' : 'inactive';

		const existingRental = await this.rentalsDAO.getRentalById(id);
		if (existingRental) throw new Error('Rental Already Exists');

		const existingUser = await this.usersDAO.getUser(user_id);
		if (!existingUser) throw new Error('User Not Found');

		const publication = await this.publicationsDAO.getPublication(publication_id);
		if (!publication) throw new Error('Publication Not Found');

		const publication_instance = (await this.instancesDAO.getAvailableInstancesOfPublication(publication_id))[0];
		if (!publication_instance) throw new Error('Publication Instances Not Available');

		// If instance is available, check if it is not already reserved
		const reservation = await this.reservationsDAO.getFirstReservationByPublicationId(publication_id);
		if (reservation && reservation.user_id !== user_id) throw new Error('Publication Already Reserved');

		/* If all the data is valid create rental */
		const rental = await this.rentalsDAO.createRental(
			id,
			user_id,
			publication_instance['id'],
			duration,
			start_date,
			end_date,
			status
		);
		if (!rental) throw new Error('Rental Not Created Successfully');

		this.instancesDAO.updateInstance(publication_instance['id'], { status: 'rented' });

		return rental;
	}

	async updateRental(id: string, rentalDTO: any) {
		const { duration } = rentalDTO;

		if (!this.validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (duration <= 0) throw new Error('Invalid Duration format');

		let rental = await this.rentalsDAO.getRentalById(id);
		if (!rental) throw new Error('Rental Not Found');

		/* If all the data is valid update rental */
		const start_date = rental['start_date'];
		const end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
		const status = start_date < end_date ? 'active' : 'inactive';

		rental = await this.rentalsDAO.updateRental(id, { duration });
		rental = await this.rentalsDAO.updateRental(id, { end_date });
		rental = await this.rentalsDAO.updateRental(id, { status });
		if (!rental) throw new Error('Rental Not Updated Successfully');

		return rental;
	}

	async deleteRental(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await this.rentalsDAO.deleteRental(id);
	}
}
