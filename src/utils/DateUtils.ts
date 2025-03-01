class DateUtils {
	static getFormattedDate(date: Date) {
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const dayName = days[date.getDay()];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${dayName}, ${month} ${day}, ${year}`;
	}

	static formatDateString(dateString: string) {
		if (dateString != undefined) {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
			}).format(date);
		}
	}
}

export default DateUtils;
