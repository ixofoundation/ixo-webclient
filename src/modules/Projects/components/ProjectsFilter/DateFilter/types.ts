import { Moment } from 'moment'

export interface Props {
  startDate: Moment
  endDate: Moment
  dateSummary: string
  isActive: boolean
  handleFilterToggleShow: () => void
  handleFilterDateChange: (startDate: Moment, endDate: Moment) => void
  handleResetFilter: () => void
}
