import { UsersDAO } from '../dao/users_DAO.js';
import { Validator } from '../common/validator.js';
import { Converter } from '../common/converter.js';
import { RentalsDAO } from '../dao/rentals_DAO.js';
import { ReservationsDAO } from '../dao/reservations_DAO.js';

export class UsersService {
	private usersDAO: UsersDAO;
	private rentalsDAO: RentalsDAO;
	private reservationsDAO: ReservationsDAO;
	private validator: Validator;
	private converter: Converter;

	constructor() {
		this.usersDAO = new UsersDAO();
		this.rentalsDAO = new RentalsDAO();
		this.reservationsDAO = new ReservationsDAO();
		this.validator = new Validator();
		this.converter = new Converter();
	}

	async getUser(id: string) {
		const isValidUUID = this.validator.isUUID(id);

		if (!isValidUUID) {
			throw new Error('Invalid UUID format');
		}

		const user = await this.usersDAO.getUser(id);

		if (!user) {
			throw new Error('User Not Found');
		}

		const rentals = await this.rentalsDAO.getRentalsOfUser(id);
		if (rentals.length > 0) user.rentals = rentals;

		const reservations = await this.reservationsDAO.getReservationsOfUser(id);
		if (rentals.length > 0) user.reservations = reservations;

		return user;
	}

	async updateUser(id: string, usersDTO: any) {
		const isValidUUID = this.validator.isUUID(id);
		const { name, surname, email, birth_date, personal_identificator, is_child } = usersDTO;

		if (!isValidUUID) {
			throw new Error('Invalid UUID format');
		}

		let user = await this.usersDAO.getUser(id);

		if (!user) {
			throw new Error('User Not Found');
		}

		if (name) {
			user = await this.usersDAO.updateUser(id, { name });
		}
		if (surname) {
			user = await this.usersDAO.updateUser(id, { surname });
		}
		if (email) {
			const isValidEmail = this.validator.isEmail(email);

			if (!isValidEmail) {
				throw new Error('Invalid Data format');
			}

			const isEmailTaken = await this.usersDAO.getParentByEmail(email);

			if (isEmailTaken) {
				throw new Error('Email is already taken');
			}

			user = await this.usersDAO.updateUser(id, { email });
		}
		if (birth_date) {
			user = await this.usersDAO.updateUser(id, { birth_date });
		}
		if (personal_identificator) {
			user = await this.usersDAO.updateUser(id, { personal_identificator });
		}
		if (is_child) {
			user = await this.usersDAO.updateUser(id, { is_child });
		}

		return user;
	}

	async createUser(usersDTO: any) {
		let { name, surname, email, birth_date, personal_identificator, id, is_child } = usersDTO;

		const isValidUUID = this.validator.isUUID(id);
		const isValidEmail = this.validator.isEmail(email);
		birth_date = this.converter.getDate(birth_date);

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
		if (await this.usersDAO.getUser(id)) {
			throw new Error('User already exists');
		}

		const isEmailTaken = await this.usersDAO.getParentByEmail(email);
		if (isEmailTaken) {
			if (!is_child) {
				throw new Error('Email is already taken');
			}
		}

		return await this.usersDAO.createUser(name, surname, email, birth_date, personal_identificator, id, is_child);
	}
}
