import { STOVE_PERIODS } from 'types/stove'

export const datesFromPeriod = (period: STOVE_PERIODS) => {
  const now = new Date()
  const fromDate = new Date()
  // to make offset by one in future as graphps is from current midnight (future) for past day
  now.setDate(now.getDate() + 1)

  switch (period) {
    case STOVE_PERIODS.daily:
      fromDate.setDate(now.getDate() - 1)
      break
    case STOVE_PERIODS.weekly:
      fromDate.setDate(now.getDate() - 7)
      break
    case STOVE_PERIODS.monthly:
      fromDate.setMonth(now.getMonth() - 1)
      break
    case STOVE_PERIODS.yearly:
      fromDate.setFullYear(now.getFullYear() - 1)
      break
    default:
      fromDate.setFullYear(2000)
      break
  }

  return {
    endDate: now,
    endDateISOString: now.toISOString().slice(0, 10),
    startDate: fromDate,
    startDateISOString: fromDate.toISOString().slice(0, 10),
  }
}
