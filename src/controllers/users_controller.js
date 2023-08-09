const usersService = require('../service/users_service');

class UsersController {
	async getUser(req, res) {
		try {
			const user = await usersService.getUser(req.params.userId);
			res.status(200).json(user);
		} catch (e) {
			if (e.message === 'User Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateUser(req, res) {
		try {
			const user = await usersService.updateUser(req.params.userId, req.body);
			res.status(200).json(user);
		} catch (e) {
			if (e.message === 'User Not Found') {
				res.status(404).json();
			} else if (e.message === 'Invalid Data format') {
				res.status(400).json();
			} else if (e.message === 'Email is already taken' || e.message === 'User already exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createUser(req, res) {
		try {
			const user = await usersService.createUser(req.body);
			res.status(201).json(user);
		} catch (e) {
			if (e.message === 'Missing Required Information') {
				res.status(400).json();
			} else if (e.message === 'Email is already taken') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}
}

module.exports = new UsersController();
