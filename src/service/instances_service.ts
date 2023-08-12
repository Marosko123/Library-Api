import { InstancesDAO } from '../dao/instances_DAO.js';
import { PublicationsDAO } from '../dao/publications_DAO.js';
import { Validator } from '../common/validator.js';

export class InstancesService {
	private instancesDAO: InstancesDAO;
	private publicationsDAO: PublicationsDAO;
	private validator: Validator;

	constructor() {
		this.instancesDAO = new InstancesDAO();
		this.publicationsDAO = new PublicationsDAO();
		this.validator = new Validator();
	}

	async getInstance(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let instance = await this.instancesDAO.getInstanceById(id);
		if (!instance) {
			throw new Error('Instance Not Found');
		}

		return instance;
	}

	async createInstance(instanceDTO: any) {
		const { id, type, publisher, year, status, publication_id } = instanceDTO;

		if (!this.validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (!this.validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (!type) throw new Error('Invalid Type format');
		if (!publisher) throw new Error('Invalid Publisher format');
		if (year <= 0) throw new Error('Invalid Year format');
		if (!status) throw new Error('Invalid Status format');

		const existingInstance = await this.instancesDAO.getInstanceById(id);
		if (existingInstance) {
			throw new Error('Instance Already Exists');
		}

		const publication = await this.publicationsDAO.getPublication(publication_id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		const instance = await this.instancesDAO.createInstance(id, type, publisher, year, status, publication_id);
		if (!instance) {
			throw new Error('Instance Not Created Successfully');
		}

		return instance;
	}

	async updateInstance(id: string, instanceDTO: any) {
		const { type, publisher, year, status, publication_id } = instanceDTO;

		if (!this.validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (publication_id != null && !this.validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (type === '') throw new Error('Invalid Type format');
		if (publisher === '') throw new Error('Invalid Publisher format');
		if (year <= 0) throw new Error('Invalid Year format');
		if (status === '') throw new Error('Invalid Status format');

		let instance = await this.instancesDAO.getInstanceById(id);
		if (!instance) throw new Error('Instance Not Found');

		if (publication_id != null) {
			const publication = await this.publicationsDAO.getPublication(publication_id);
			if (!publication) throw new Error('Publication Not Found');
		}

		if (type) instance = await this.instancesDAO.updateInstance(id, { type });
		if (publisher) instance = await this.instancesDAO.updateInstance(id, { publisher });
		if (year) instance = await this.instancesDAO.updateInstance(id, { year });
		if (status) instance = await this.instancesDAO.updateInstance(id, { status });
		if (publication_id) instance = await this.instancesDAO.updateInstance(id, { publication_id });

		return instance;
	}

	async deleteInstance(id: string) {
		if (!this.validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await this.instancesDAO.deleteInstance(id);
	}
}
