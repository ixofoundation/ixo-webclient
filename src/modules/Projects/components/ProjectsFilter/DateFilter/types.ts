import { Moment } from 'moment'

export interface Props {
  startDate: Moment
  endDate: Moment
  isActive: boolean
  dateSummary: string
  handleFilterToggleShow: () => void
  handleFilterDateChange: (startDate: Moment, endDate: Moment) => void
  handleResetFilter: () => void
}
