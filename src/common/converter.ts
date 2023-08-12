export class Converter {
	getDate(dateString: string) {
		try {
			const date = new Date(dateString);
			const formattedDate = date.toISOString().slice(0, 10);

			return formattedDate;
		} catch (e: any) {
			return null;
		}
	}
}
