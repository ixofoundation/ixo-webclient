export function truncateString(str: string, maxLength: number, { ellipsisPos = "center" }: { ellipsisPos?: 'center' | 'left' | 'right' }) {
    if (str.length <= maxLength) {
        return str;
    }

    const ellipsis = '...';
    const charsToShow = maxLength - ellipsis.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    if (ellipsisPos === 'center') {
        return `${str.substring(0, frontChars)}${ellipsis}${str.substring(str.length - backChars)}`;
    }

    if (ellipsisPos === 'left') {
        return `${ellipsis}${str.substring(str.length - charsToShow)}`;
    }

    if (ellipsisPos === 'right') {
        return `${str.substring(0, charsToShow)}${ellipsis}`;
    }

    return `${str.substring(0, frontChars)}${ellipsis}${str.substring(str.length - backChars)}`;
}
