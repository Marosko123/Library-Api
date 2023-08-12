import { Request, Response } from 'express';
import { AuthorsService } from '../service/authors_service.js';

export class AuthorsController {
	private authorsService: AuthorsService = new AuthorsService();

	async getAuthor(req: Request, res: Response) {
		try {
			const author = await this.authorsService.getAuthor(req.params.authorId);
			res.status(200).json(author);
		} catch (e: any) {
			if (e.message === 'Author Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateAuthor(req: Request, res: Response) {
		try {
			const author = await this.authorsService.updateAuthor(req.params.authorId, req.body);
			res.status(200).json(author);
		} catch (e: any) {
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

	async createAuthor(req: Request, res: Response) {
		try {
			const author = await this.authorsService.createAuthor(req.body);
			res.status(201).json(author);
		} catch (e: any) {
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

	async deleteAuthor(req: Request, res: Response) {
		try {
			await this.authorsService.deleteAuthor(req.params.authorId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
