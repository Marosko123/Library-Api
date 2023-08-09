const rentalsDAO = require('../dao/rentals_DAO');
const usersDAO = require('../dao/users_DAO');
const reservationsDAO = require('../dao/reservations_DAO');
const publicationsDAO = require('../dao/publications_DAO');
const instancesDAO = require('../dao/instances_DAO');
const validator = require('../common/validator');

class RentalsService {
	async getRental(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let rental = await rentalsDAO.getRentalById(id);
		if (!rental) {
			throw new Error('Rental Not Found');
		}

		return rental;
	}

	async createRental(rentalDTO) {
		const { id, user_id, publication_id, duration } = rentalDTO;

		if (!validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (!validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (duration <= 0) throw new Error('Invalid Duration format');

		const start_date = new Date();
		const end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
		const status = start_date < end_date ? 'active' : 'inactive';

		const existingRental = await rentalsDAO.getRentalById(id);
		if (existingRental) throw new Error('Rental Already Exists');

		const existingUser = await usersDAO.getUser(user_id);
		if (!existingUser) throw new Error('User Not Found');

		const publication = await publicationsDAO.getPublication(publication_id);
		if (!publication) throw new Error('Publication Not Found');

		const publication_instance = (await instancesDAO.getAvailableInstancesOfPublication(publication_id))[0];
		if (!publication_instance) throw new Error('Publication Instances Not Available');

		// If instance is available, check if it is not already reserved
		const reservation = await reservationsDAO.getFirstReservationByPublicationId(publication_id);
		if (reservation && reservation.user_id !== user_id) throw new Error('Publication Already Reserved');

		/* If all the data is valid create rental */
		const rental = await rentalsDAO.createRental(
			id,
			user_id,
			publication_instance['id'],
			duration,
			start_date,
			end_date,
			status
		);
		if (!rental) throw new Error('Rental Not Created Successfully');

		instancesDAO.updateInstance(publication_instance['id'], { status: 'rented' });

		return rental;
	}

	async updateRental(id, rentalDTO) {
		const { duration } = rentalDTO;

		if (!validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (duration <= 0) throw new Error('Invalid Duration format');

		let rental = await rentalsDAO.getRentalById(id);
		if (!rental) throw new Error('Rental Not Found');

		/* If all the data is valid update rental */
		const start_date = rental['start_date'];
		const end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
		const status = start_date < end_date ? 'active' : 'inactive';

		rental = await rentalsDAO.updateRental(id, { duration });
		rental = await rentalsDAO.updateRental(id, { end_date });
		rental = await rentalsDAO.updateRental(id, { status });
		if (!rental) throw new Error('Rental Not Updated Successfully');

		return rental;
	}

	async deleteRental(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await rentalsDAO.deleteRental(id);
	}
}

module.exports = new RentalsService();
