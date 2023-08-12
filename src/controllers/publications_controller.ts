import { Request, Response } from 'express';
import { PublicationsService } from '../service/publications_service.js';

export class PublicationsController {
	private publicationsService: PublicationsService = new PublicationsService();

	async getPublication(req: Request, res: Response) {
		try {
			const publication = await this.publicationsService.getPublication(req.params.publicationId);
			res.status(200).json(publication);
		} catch (e: any) {
			if (e.message === 'Publication Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createPublication(req: Request, res: Response) {
		try {
			const publication = await this.publicationsService.createPublication(req.body);
			res.status(201).json(publication);
		} catch (e: any) {
			if (
				e.message === 'Invalid UUID format' ||
				e.message === 'Invalid Title format' ||
				e.message === 'Invalid Author format' ||
				e.message === 'Invalid Category format' ||
				e.message === 'Publication Already Exists'
			) {
				res.status(400).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updatePublication(req: Request, res: Response) {
		try {
			const publication = await this.publicationsService.updatePublication(req.params.publicationId, req.body);
			res.status(200).json(publication);
		} catch (e: any) {
			if (e.message === 'Invalid UUID format') {
				res.status(400).json();
			} else if (e.message === 'Publication Not Found') {
				res.status(404).json();
			} else if (e.message === 'Publication Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deletePublication(req: Request, res: Response) {
		try {
			await this.publicationsService.deletePublication(req.params.publicationId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
