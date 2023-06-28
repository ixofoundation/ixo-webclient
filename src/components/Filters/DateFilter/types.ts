export interface Props {
  startDate: string
  endDate: string
  dateSummary: string
  isActive: boolean
  handleFilterToggleShow: () => void
  handleFilterDateChange: (startDate: string, endDate: string) => void
  handleResetFilter: () => void
}
