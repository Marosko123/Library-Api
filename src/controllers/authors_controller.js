const authorsService = require('../service/authors_service');

class AuthorsController {
	async getAuthor(req, res) {
		try {
			const author = await authorsService.getAuthor(req.params.authorId);
			res.status(200).json(author);
		} catch (e) {
			if (e.message === 'Author Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateAuthor(req, res) {
		try {
			const author = await authorsService.updateAuthor(req.params.authorId, req.body);
			res.status(200).json(author);
		} catch (e) {
			if (e.message === 'Author Not Found') {
				res.status(404).json();
			} else if (e.message === 'Invalid Data format') {
				res.status(400).json();
			} else if (e.message === 'Email is already taken') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createAuthor(req, res) {
		try {
			const author = await authorsService.createAuthor(req.body);
			res.status(201).json(author);
		} catch (e) {
			if (e.message === 'Missing Required Information') {
				res.status(400).json();
			} else if (e.message === 'Author Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteAuthor(req, res) {
		try {
			await authorsService.deleteAuthor(req.params.authorId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new AuthorsController();
