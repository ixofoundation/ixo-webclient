import moment from 'moment';
import { Timestamp } from './time';

export function isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}


export const DateFormat = {
    DD_MM_YYYY: 'DD MM YYYY',
    MM_DD_YYYY: 'MM DD YYYY',
    YYYY_MM_DD: 'YYYY MM DD',
} as const;

type DateFormatType = typeof DateFormat[keyof typeof DateFormat];

interface FormatDateInput {
    dateString: string;
    format: DateFormatType;
}

export function formatDate({ dateString, format }: FormatDateInput): string {
    if (!isValidDate(dateString)) {
        throw new Error('Invalid date string');
    }
    return moment(dateString).format(format);
}

