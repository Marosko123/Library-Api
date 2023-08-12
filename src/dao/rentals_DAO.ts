import { db } from '../db/db.js';

export class RentalsDAO {
	async getRentalById(id: string) {
		const [rental] = await db('rentals').where({ id });
		return rental;
	}

	async getRentalsOfUser(user_id: string) {
		const rentals = await db('rentals').where({ user_id });

		rentals.forEach((rental: any) => {
			delete rental.start_date;
			delete rental.end_date;
		});

		return rentals;
	}

	async createRental(
		id: string,
		user_id: string,
		publication_instance_id: string,
		duration: any,
		start_date: any,
		end_date: any,
		status: any
	) {
		const [rental] = await db('rentals')
			.insert({
				id,
				user_id,
				publication_instance_id,
				duration,
				start_date,
				end_date,
				status
			})
			.returning('*');

		return rental;
	}

	async updateRental(id: string, item: any) {
		const [rental] = await db('rentals').where({ id }).update(item).returning('*');
		return rental;
	}

	async deleteRental(id: string) {
		await db('rentals').where({ id }).del();
	}
}
