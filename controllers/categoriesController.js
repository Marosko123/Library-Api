const categoriesService = require('../service/categoriesService');

class CategoriesController {
	async getCategory(req, res) {
		try {
			const category = await categoriesService.getCategory(req.params.categoryId);
			res.status(200).json(category);
		} catch (e) {
			if (e.message === 'Category Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createCategory(req, res) {
		try {
			const category = await categoriesService.createCategory(req.body);
			res.status(201).json(category);
		} catch (e) {
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

	async updateCategory(req, res) {
		try {
			const category = await categoriesService.updateCategory(req.params.categoryId, req.body);
			res.status(200).json(category);
		} catch (e) {
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

	async deleteCategory(req, res) {
		try {
			await categoriesService.deleteCategory(req.params.categoryId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new CategoriesController();
