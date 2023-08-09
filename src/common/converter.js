class Converter {
	getDate(dateString) {
		try {
			const date = new Date(dateString);
			const formattedDate = date.toISOString().slice(0, 10);
			return formattedDate;
		} catch (e) {
			return null;
		}
	}
}

module.exports = new Converter();
