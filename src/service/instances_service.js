const instancesDAO = require('../dao/instances_DAO');
const publicationsDAO = require('../dao/publications_DAO');
const validator = require('../common/validator');

class InstancesService {
	async getInstance(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		let instance = await instancesDAO.getInstanceById(id);
		if (!instance) {
			throw new Error('Instance Not Found');
		}

		return instance;
	}

	async createInstance(instanceDTO) {
		const { id, type, publisher, year, status, publication_id } = instanceDTO;

		if (!validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (!validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (!type) throw new Error('Invalid Type format');
		if (!publisher) throw new Error('Invalid Publisher format');
		if (year <= 0) throw new Error('Invalid Year format');
		if (!status) throw new Error('Invalid Status format');

		const existingInstance = await instancesDAO.getInstanceById(id);
		if (existingInstance) {
			throw new Error('Instance Already Exists');
		}

		const publication = await publicationsDAO.getPublication(publication_id);
		if (!publication) {
			throw new Error('Publication Not Found');
		}

		const instance = await instancesDAO.createInstance(id, type, publisher, year, status, publication_id);
		if (!instance) {
			throw new Error('Instance Not Created Successfully');
		}

		return instance;
	}

	async updateInstance(id, instanceDTO) {
		const { type, publisher, year, status, publication_id } = instanceDTO;

		if (!validator.isUUID(id)) throw new Error('Invalid UUID format');
		if (publication_id != null && !validator.isUUID(publication_id)) throw new Error('Invalid UUID format');
		if (type === '') throw new Error('Invalid Type format');
		if (publisher === '') throw new Error('Invalid Publisher format');
		if (year <= 0) throw new Error('Invalid Year format');
		if (status === '') throw new Error('Invalid Status format');

		let instance = await instancesDAO.getInstanceById(id);
		if (!instance) throw new Error('Instance Not Found');

		if (publication_id != null) {
			const publication = await publicationsDAO.getPublication(publication_id);
			if (!publication) throw new Error('Publication Not Found');
		}

		if (type) instance = await instancesDAO.updateInstance(id, { type });
		if (publisher) instance = await instancesDAO.updateInstance(id, { publisher });
		if (year) instance = await instancesDAO.updateInstance(id, { year });
		if (status) instance = await instancesDAO.updateInstance(id, { status });
		if (publication_id) instance = await instancesDAO.updateInstance(id, { publication_id });

		return instance;
	}

	async deleteInstance(id) {
		if (!validator.isUUID(id)) {
			throw new Error('Invalid UUID format');
		}

		await instancesDAO.deleteInstance(id);
	}
}

module.exports = new InstancesService();
