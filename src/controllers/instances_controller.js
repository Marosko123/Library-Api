const instancesService = require('../service/instances_service');

class InstancesController {
	async getInstance(req, res) {
		try {
			const instance = await instancesService.getInstance(req.params.instanceId);
			res.status(200).json(instance);
		} catch (e) {
			if (e.message === 'Instance Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createInstance(req, res) {
		try {
			const instance = await instancesService.createInstance(req.body);
			res.status(201).json(instance);
		} catch (e) {
			if (
				e.message === 'Invalid UUID format' ||
				e.message === 'Invalid Type format' ||
				e.message === 'Invalid Publisher format' ||
				e.message === 'Invalid Year format' ||
				e.message === 'Invalid Status format'
			) {
				res.status(400).json();
			} else if (e.message === 'Publication Not Found') {
				res.status(404).json();
			} else if (e.message === 'Instance Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async updateInstance(req, res) {
		try {
			const instance = await instancesService.updateInstance(req.params.instanceId, req.body);
			res.status(200).json(instance);
		} catch (e) {
			if (
				e.message === 'Invalid UUID format' ||
				e.message === 'Invalid Type format' ||
				e.message === 'Invalid Publisher format' ||
				e.message === 'Invalid Year format' ||
				e.message === 'Invalid Status format'
			) {
				res.status(400).json();
			} else if (e.message === 'Instance Not Found' || e.message === 'Publication Not Found') {
				res.status(404).json();
			} else if (e.message === 'Instance Already Exists') {
				res.status(409).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async deleteInstance(req, res) {
		try {
			await instancesService.deleteInstance(req.params.instanceId);
			res.status(204).json();
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}

module.exports = new InstancesController();
