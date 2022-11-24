import Back from '../../../../assets/icons/Back'
import CalendarSort from '../../../../assets/icons/CalendarSort'
import DatePicker from '../../DatePicker'
import {
  Button,
  MobileDateHeader,
  HeadingItem,
  MobileFilterModal,
  DoneButtonWrapper,
  DateDisplay,
  DateInput,
  DoneButton,
  MobileDatePicker,
  MobileDatesMenu,
} from '../Filters.styles'
import { Props } from './types'

interface MobileProps extends Props {
  startDateDisplay: string
  endDateDisplay: string
}

const DateFilterMobile: React.FunctionComponent<MobileProps> = ({
  startDate,
  endDate,
  startDateDisplay,
  endDateDisplay,
  dateSummary,
  isActive,
  handleFilterDateChange,
  handleFilterToggleShow,
  handleResetFilter,
}) => {
  return (
    <>
      <Button onClick={handleFilterToggleShow}>
        <CalendarSort width='16' fill='#000' />
        {dateSummary}
      </Button>
      {isActive && (
        <MobileDatesMenu className='openDatesMenu'>
          <MobileFilterModal>
            <MobileDateHeader>
              <HeadingItem onClick={handleFilterToggleShow}>
                <Back />
              </HeadingItem>
              <HeadingItem
                onClick={(): void => {
                  handleResetFilter()
                  handleFilterToggleShow()
                }}
              >
                clear
              </HeadingItem>
              <DateDisplay>
                <DateInput>{startDateDisplay}</DateInput>
                <Back fill='#436779' />
                <DateInput>{endDateDisplay}</DateInput>
              </DateDisplay>
            </MobileDateHeader>
            <MobileDatePicker>
              <DatePicker
                initialStartDate={startDate}
                initialEndDate={endDate}
                numberOfMonths={4}
                initialOrientation='verticalScrollable'
                onApply={handleFilterToggleShow}
                onChange={handleFilterDateChange}
                onReset={handleResetFilter}
              />
              <DoneButtonWrapper>
                <DoneButton onClick={handleFilterToggleShow}>Done</DoneButton>
              </DoneButtonWrapper>
            </MobileDatePicker>
          </MobileFilterModal>
        </MobileDatesMenu>
      )}
    </>
  )
}

export default DateFilterMobile
