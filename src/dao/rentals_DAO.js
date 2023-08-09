const db = require('../db/db');

class RentalsDAO {
	async getRentalById(id) {
		const [rental] = await db('rentals').where({ id });
		return rental;
	}

	async getRentalsOfUser(user_id) {
		const rentals = await db('rentals').where({ user_id });

		rentals.forEach((rental) => {
			delete rental.start_date;
			delete rental.end_date;
		});

		return rentals;
	}

	async createRental(id, user_id, publication_instance_id, duration, start_date, end_date, status) {
		const [rental] = await db('rentals')
			.insert({
				id,
				user_id,
				publication_instance_id,
				duration,
				start_date,
				end_date,
				status,
			})
			.returning('*');

		return rental;
	}

	async updateRental(id, item) {
		const [rental] = await db('rentals').where({ id }).update(item).returning('*');
		return rental;
	}

	async deleteRental(id) {
		await db('rentals').where({ id }).del();
	}
}

module.exports = new RentalsDAO();
