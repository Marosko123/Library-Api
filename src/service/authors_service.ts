import { AuthorsDAO } from '../dao/authors_DAO.js';
import { Validator } from '../common/validator.js';

export class AuthorsService {
	private authorsDAO: AuthorsDAO;
	private validator: Validator;

	constructor() {
		this.authorsDAO = new AuthorsDAO();
		this.validator = new Validator();
	}

	async getAuthor(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const author = await this.authorsDAO.getAuthor(id);

		if (!author) {
			throw new Error('Author Not Found');
		}

		return author;
	}

	async getAuthorsNamesOfAuthors(authors: any) {
		let authors_names = [];

		for (const author of authors) {
			const auth = await this.authorsDAO.getAuthor(author.author_id);

			if (auth) {
				authors_names.push({
					name: auth.name,
					surname: auth.surname
				});
			}
		}
		return authors_names;
	}

	async updateAuthor(id: string, authorsDTO: any) {
		const { name, surname, email, birth_date, personal_identificator, is_child } = authorsDTO;

		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let author = await this.authorsDAO.getAuthor(id);

		if (!author) {
			throw new Error('Author Not Found');
		}

		if (name) {
			author = await this.authorsDAO.updateAuthor(id, { name });
		}
		if (surname) {
			author = await this.authorsDAO.updateAuthor(id, { surname });
		}
		if (email) {
			const isValidEmail = this.validator.isEmail(email);

			if (!isValidEmail) {
				throw new Error('Invalid Data format');
			}

			// const isEmailTaken = await this.authorsDAO.getParentByEmail(email);
			const isEmailTaken = true;

			if (isEmailTaken) {
				throw new Error('Email is already taken');
			}

			author = await this.authorsDAO.updateAuthor(id, { email });
		}
		if (birth_date) {
			author = await this.authorsDAO.updateAuthor(id, { birth_date });
		}
		if (personal_identificator) {
			author = await this.authorsDAO.updateAuthor(id, { personal_identificator });
		}
		if (is_child) {
			author = await this.authorsDAO.updateAuthor(id, { is_child });
		}

		return author;
	}

	async createAuthor(authorsDTO: any) {
		const { name, surname, id } = authorsDTO;

		if (!name || !surname || !id || !this.validator.isUUID(id)) {
			throw new Error('Missing Required Information');
		}

		// If author with given id or name and surname already exists
		if ((await this.authorsDAO.getAuthor(id)) || (await this.authorsDAO.getAuthorByNameSurname(name, surname))) {
			throw new Error('Author Already Exists');
		}

		return await this.authorsDAO.createAuthor(name, surname, id);
	}

	async deleteAuthor(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}
		await this.authorsDAO.deleteAuthor(id);
	}
}
