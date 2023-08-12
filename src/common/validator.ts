export class Validator {
	isEmail(email: string) {
		const emailRegex = /\S+@\S+\.\S+/;
		return emailRegex.test(email);
	}

	isString(value: string) {
		return typeof value === 'string';
	}

	isUUID(uuid: string) {
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(uuid);
	}
}
