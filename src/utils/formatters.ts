export function formatJSONDate(jsonDateTimeString: string): string {
	return new Date(jsonDateTimeString).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}

export function formatJSONTime(jsonDateTimeString: string): string {
	return new Date(jsonDateTimeString).toLocaleTimeString();
}

export function formatJSONDateTime(jsonDateTimeString: string): string {
	return new Date(jsonDateTimeString).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}

export function capitalizeFirstLetter(theString: string) {
	return theString.charAt(0).toUpperCase() + theString.slice(1);
}

export function excerpt(theText: string, words: number = 20) {
	const cutOffCount = words;
	const wordCount = theText.split(' ').length - 1;

	if (wordCount > cutOffCount) {
		let count = 0;
		let theIndex = 0;

		for (let i = 0; i < theText.length - 1; i++) {
			if (count < cutOffCount) {
				if (theText[i] === ' ') {
					count++;
				}
			} else {
				theIndex = i;
				break;
			}
		}
		return theText.slice(0, theIndex - 1) + '...';
	} else {
		return theText;
	}
}