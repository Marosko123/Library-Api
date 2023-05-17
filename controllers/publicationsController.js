const publicationsService = require('../service/publicationsService');

class PublicationsController {
	async getPublication(req, res) {
		try {
			const publication = await publicationsService.getPublication(req.params.publicationId);
			res.status(200).json(publication);
		} catch (e) {
			if (e.message === 'Publication Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createPublication(req, res) {
		try {
			const publication = await publicationsService.createPublication(req.body);
			res.status(201).json(publication);
		} catch (e) {
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

	async updatePublication(req, res) {
		try {
			const publication = await publicationsService.updatePublication(req.params.publicationId, req.body);
			res.status(200).json(publication);
		} catch (e) {
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

	async deletePublication(req, res) {
		try {
			await publicationsService.deletePublication(req.params.publicationId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new PublicationsController();
