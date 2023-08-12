import { Request, Response } from 'express';
import { UsersService } from '../service/users_service.js';

export class UsersController {
	private usersService: UsersService;

	constructor() {
		this.usersService = new UsersService();
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await this.usersService.getUser(req.params.userId);
			res.status(200).json(user);
		} catch (e: any) {
			if (e.message === 'User Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const user = await this.usersService.updateUser(req.params.userId, req.body);
			res.status(200).json(user);
		} catch (e: any) {
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

	async createUser(req: Request, res: Response) {
		try {
			const user = await this.usersService.createUser(req.body);
			res.status(201).json(user);
		} catch (e: any) {
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
