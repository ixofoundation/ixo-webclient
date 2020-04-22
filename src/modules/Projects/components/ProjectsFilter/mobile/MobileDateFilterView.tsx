import * as React from 'react'
import { Back } from '../assets/svgs'
import DatePicker from '../../../../../common/components/DatePicker'

import {
  MobileDateHeader,
  HeadingItem,
  MobileFilterModal,
  DoneButtonWrapper,
  DateDisplay,
  DateInput,
  DoneButton,
  MobileDatePicker,
  MobileDatesMenu,
} from '../ProjectsFilter.style'

interface Props {
  startDate: any
  endDate: any
  showDatePicker: boolean
  startDateDisplay: any
  endDateDisplay: any
  mobileDatesMenuOpen: boolean
  onHandleDateChange: (startDate: any, endDate: any) => void
  onGetMobileDateButton: () => JSX.Element
  onToggleShowDatePicker: () => void
  onToggleMobileDates: () => void
  onResetDateFilter: () => void
}

class MobileDateFilterView extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  getDatePicker = (): JSX.Element => {
    const datePickerOpen = this.props.showDatePicker
    return (
      <>
        {datePickerOpen && (
          <MobileDatePicker>
            <DatePicker
              onReset={this.props.onResetDateFilter}
              onChange={this.props.onHandleDateChange}
              onApply={this.props.onToggleShowDatePicker}
              initialStartDate={this.props.startDate}
              initialEndDate={this.props.endDate}
              initialOrientation="verticalScrollable"
            />
          </MobileDatePicker>
        )}
      </>
    )
  }

  render(): JSX.Element {
    return (
      <>
        {this.props.onGetMobileDateButton()}
        <MobileDatesMenu
          className={
            this.props.mobileDatesMenuOpen === true ? 'openDatesMenu' : ''
          }
        >
          <MobileFilterModal className="dateFilterModal">
            <MobileDateHeader>
              <HeadingItem onClick={this.props.onToggleMobileDates}>
                <Back />
              </HeadingItem>
              <HeadingItem
                onClick={(): void => {
                  this.props.onResetDateFilter()
                  this.props.onToggleMobileDates()
                }}
              >
                clear
              </HeadingItem>
              <DateDisplay>
                <DateInput>{this.props.startDateDisplay}</DateInput>
                <Back fill="#436779" />
                <DateInput>{this.props.endDateDisplay}</DateInput>
              </DateDisplay>
            </MobileDateHeader>
            {this.getDatePicker()}
            <DoneButtonWrapper>
              <DoneButton onClick={this.props.onToggleMobileDates}>
                Done
              </DoneButton>
            </DoneButtonWrapper>
          </MobileFilterModal>
        </MobileDatesMenu>
      </>
    )
  }
}

export default MobileDateFilterView
