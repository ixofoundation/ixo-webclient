import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

const getSelected = (date: Date, start: Date | undefined, end: Date | undefined) => {
  return start && end
    ? dayjs(date).isAfter(dayjs(start).subtract(1, 'day')) && dayjs(date).isBefore(dayjs(end).add(1, 'day'))
    : false;
}

interface DateRangeDisplayProps {
  startDate: Date;
  endDate: Date;
}

const DateRangeDisplay: React.FC<DateRangeDisplayProps> = ({startDate, endDate}) => {


  return (
    <Calendar
      withCellSpacing={false}
      getDayProps={(date) => {
        return {
          selected: getSelected(date, startDate, endDate),
        };
      }}
    />
  );
}

export default DateRangeDisplay;
