const usersDAO = require('../dao/usersDAO');
const validator = require('../common/validator');
const converter = require('../common/converter');
const rentalsDAO = require('../dao/rentalsDAO');
const reservationsDAO = require('../dao/reservationsDAO');

class UsersService {
	async getUser(id) {
		const isValidUUID = validator.isUUID(id);

		if (!isValidUUID) {
			throw new Error('Invalid UUID format');
		}

		const user = await usersDAO.getUser(id);

		if (!user) {
			throw new Error('User Not Found');
		}

		const rentals = await rentalsDAO.getRentalsOfUser(id);
		if (rentals.length > 0) user.rentals = rentals;

		const reservations = await reservationsDAO.getReservationsOfUser(id);
		if (rentals.length > 0) user.reservations = reservations;

		return user;
	}

	async updateUser(id, usersDTO) {
		const isValidUUID = validator.isUUID(id);
		const { name, surname, email, birth_date, personal_identificator, is_child } = usersDTO;

		if (!isValidUUID) {
			throw new Error('Invalid UUID format');
		}

		let user = await usersDAO.getUser(id);

		if (!user) {
			throw new Error('User Not Found');
		}

		if (name) {
			user = await usersDAO.updateUser(id, { name });
		}
		if (surname) {
			user = await usersDAO.updateUser(id, { surname });
		}
		if (email) {
			const isValidEmail = validator.isEmail(email);

			if (!isValidEmail) {
				throw new Error('Invalid Data format');
			}

			const isEmailTaken = await usersDAO.getParentByEmail(email);

			if (isEmailTaken) {
				throw new Error('Email is already taken');
			}

			user = await usersDAO.updateUser(id, { email });
		}
		if (birth_date) {
			user = await usersDAO.updateUser(id, { birth_date });
		}
		if (personal_identificator) {
			user = await usersDAO.updateUser(id, { personal_identificator });
		}
		if (is_child) {
			user = await usersDAO.updateUser(id, { is_child });
		}

		return user;
	}

	async createUser(usersDTO) {
		let { name, surname, email, birth_date, personal_identificator, id, is_child } = usersDTO;

		const isValidUUID = validator.isUUID(id);
		const isValidEmail = validator.isEmail(email);
		birth_date = converter.getDate(birth_date);

		if (
			!name ||
			!surname ||
			!email ||
			!birth_date ||
			!personal_identificator ||
			!id ||
			!isValidUUID ||
			!isValidEmail
		) {
			throw new Error('Missing Required Information');
		}

		// If user with given id already exists
		if (await usersDAO.getUser(id)) {
			throw new Error('User already exists');
		}

		const isEmailTaken = await usersDAO.getParentByEmail(email);
		if (isEmailTaken) {
			if (!is_child) {
				throw new Error('Email is already taken');
			}
		}

		return await usersDAO.createUser(name, surname, email, birth_date, personal_identificator, id, is_child);
	}
}

module.exports = new UsersService();
