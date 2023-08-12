import { Request, Response } from 'express';
import { InstancesService } from '../service/instances_service.js';

export class InstancesController {
	private instancesService: InstancesService;

	constructor() {
		this.instancesService = new InstancesService();
	}

	async getInstance(req: Request, res: Response) {
		try {
			const instance = await this.instancesService.getInstance(req.params.instanceId);
			res.status(200).json(instance);
		} catch (e: any) {
			if (e.message === 'Instance Not Found') {
				res.status(404).json();
			} else {
				console.error(e);
				res.status(500).json({ error: e.message });
			}
		}
	}

	async createInstance(req: Request, res: Response) {
		try {
			const instance = await this.instancesService.createInstance(req.body);
			res.status(201).json(instance);
		} catch (e: any) {
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

	async updateInstance(req: Request, res: Response) {
		try {
			const instance = await this.instancesService.updateInstance(req.params.instanceId, req.body);
			res.status(200).json(instance);
		} catch (e: any) {
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

	async deleteInstance(req: Request, res: Response) {
		try {
			await this.instancesService.deleteInstance(req.params.instanceId);
			res.status(204).json();
		} catch (e: any) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}
}
