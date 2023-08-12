import { Request, Response } from 'express';
import { CategoriesService } from '../service/categories_service.js';

export class CategoriesController {
	private categoriesService: CategoriesService;

	constructor() {
		this.categoriesService = new CategoriesService();
	}

	async getCategory(req: Request, res: Response) {
		try {
			const category = await this.categoriesService.getCategory(req.params.categoryId);
			res.status(200).json(category);
		} catch (e: any) {
			if (e.message === 'Category Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createCategory(req: Request, res: Response) {
		try {
			const category = await this.categoriesService.createCategory(req.body);
			res.status(201).json(category);
		} catch (e: any) {
			if (e.message === 'Invalid UUID format') {
				res.status(400).json();
			} else if (e.message === 'Category Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateCategory(req: Request, res: Response) {
		try {
			const category = await this.categoriesService.updateCategory(req.params.categoryId, req.body);
			res.status(200).json(category);
		} catch (e: any) {
			if (e.message === 'Invalid UUID format' || e.message === 'Invalid Name format') {
				res.status(400).json();
			} else if (e.message === 'Category Not Found') {
				res.status(404).json();
			} else if (e.message === 'Category Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteCategory(req: Request, res: Response) {
		try {
			await this.categoriesService.deleteCategory(req.params.categoryId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
