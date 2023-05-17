const authorsDAO = require('../dao/authorsDAO');
const validator = require('../common/validator');

class AuthorsService {
	async getAuthor(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		const author = await authorsDAO.getAuthor(id);

		if (!author) {
			throw new Error('Author Not Found');
		}

		return author;
	}

	async getAuthorsNamesOfAuthors(authors) {
		let authors_names = [];

		for (const author of authors) {
			const auth = await authorsDAO.getAuthor(author.author_id);

			if (auth) {
				authors_names.push({
					name: auth.name,
					surname: auth.surname,
				});
			}
		}
		return authors_names;
	}

	async updateAuthor(id, authorsDTO) {
		const { name, surname, email, birth_date, personal_identificator, is_child } = authorsDTO;

		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let author = await authorsDAO.getAuthor(id);

		if (!author) {
			throw new Error('Author Not Found');
		}

		if (name) {
			author = await authorsDAO.updateAuthor(id, { name });
		}
		if (surname) {
			author = await authorsDAO.updateAuthor(id, { surname });
		}
		if (email) {
			const isValidEmail = validator.isEmail(email);

			if (!isValidEmail) {
				throw new Error('Invalid Data format');
			}

			const isEmailTaken = await authorsDAO.getParentByEmail(email);

			if (isEmailTaken) {
				throw new Error('Email is already taken');
			}

			author = await authorsDAO.updateAuthor(id, { email });
		}
		if (birth_date) {
			author = await authorsDAO.updateAuthor(id, { birth_date });
		}
		if (personal_identificator) {
			author = await authorsDAO.updateAuthor(id, { personal_identificator });
		}
		if (is_child) {
			author = await authorsDAO.updateAuthor(id, { is_child });
		}

		return author;
	}

	async createAuthor(authorsDTO) {
		const { name, surname, id } = authorsDTO;

		if (!name || !surname || !id || !validator.isUUID(id)) {
			throw new Error('Missing Required Information');
		}

		// If author with given id or name and surname already exists
		if ((await authorsDAO.getAuthor(id)) || (await authorsDAO.getAuthorByNameSurname(name, surname))) {
			throw new Error('Author Already Exists');
		}

		return await authorsDAO.createAuthor(name, surname, id);
	}

	async deleteAuthor(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}
		await authorsDAO.deleteAuthor(id);
	}
}

module.exports = new AuthorsService();
