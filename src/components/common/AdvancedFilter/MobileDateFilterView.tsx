import * as React from 'react'
import { schema } from './schema'
import { Back, CalendarSort } from './svgs'
import DatePicker from './DatePicker'

import {
  MobileDateHeader,
  HeadingItem,
  MobileFilterModal,
  DoneButtonWrapper,
  DateDisplay,
  DateInput,
  DoneButton,
  MobileDatePicker,
  Button,
  MobileDatesMenu,
} from './Style'

interface State {
  checkTitle: string
  categorySelections: any[]
  mobileFilterMenuOpen: boolean
  showDatePicker: boolean
  startDate: any
  endDate: any
  startDateDisplay: string
  endDateDisplay: string
  mobileDatesMenuOpen: boolean
  dateText: string
}
class MobileDateFilterView extends React.Component<{}, State> {
  initialCategorySelections = schema.categories.map(category => ({
    category: category.title,
    tags:
      category.selectedTags && category.selectedTags.length
        ? [...category.selectedTags]
        : [],
  }))

  constructor(props) {
    super(props)
    this.state = {
      checkTitle: ' ',
      categorySelections: this.initialCategorySelections,
      mobileFilterMenuOpen: false,
      showDatePicker: false,
      startDate: null,
      endDate: null,
      startDateDisplay: null,
      endDateDisplay: null,
      mobileDatesMenuOpen: false,
      dateText: 'Dates',
    }
  }

  toggleMobileDates = (): void => {
    this.setState({ mobileDatesMenuOpen: !this.state.mobileDatesMenuOpen })
  }

  resetDateDisplay = (): void => {
    this.setState({
      startDateDisplay: null,
      endDateDisplay: null,
    })
    this.resetDateFilter()
  }

  resetDateFilter = (): void => {
    this.setState({
      dateText: 'Dates',
      startDate: null,
      endDate: null,
    })
    this.toggleShowDatePicker()
  }

  handleDateChange = (startDate, endDate): void => {
    const DATE_FORMAT = "D MMM \\'YY"
    if (startDate && endDate) {
      this.setState({
        dateText: ` ${startDate.format(DATE_FORMAT)} - ${endDate.format(
          DATE_FORMAT,
        )} `,
        startDateDisplay: `${startDate.format(DATE_FORMAT)}`,
        endDateDisplay: `${endDate.format(DATE_FORMAT)}`,
        startDate,
        endDate,
      })
    } else if (startDate) {
      this.setState({
        dateText: ` ${startDate.format(DATE_FORMAT)} - Select `,
        startDate,
      })
    }
  }

  toggleShowDatePicker = (): void => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
    })
  }

  showMobileDatePicker = (): void => {
    if (!this.state.showDatePicker) {
      this.setState({
        showDatePicker: true,
      })
    }
  }

  resetDateButtonText = (): void => {
    if (this.state.dateText === 'Dates') {
      this.setState({
        dateText: 'Select',
      })
    }
  }

  getDatesButton = (): JSX.Element => {
    return (
      <Button
        onClick={(): void => {
          this.showMobileDatePicker()
          this.resetDateButtonText()
          this.toggleMobileDates()
        }}
      >
        <CalendarSort width="16" fill="#000" />
        {this.state.dateText}
      </Button>
    )
  }

  render(): JSX.Element {
    return (
      <>
        {this.getDatesButton()}
        <MobileDatesMenu
          className={
            this.state.mobileDatesMenuOpen === true ? 'openDatesMenu' : ''
          }
        >
          <MobileFilterModal className="dateFilterModal">
            <MobileDateHeader>
              <HeadingItem onClick={this.toggleMobileDates}>
                <Back />
              </HeadingItem>
              <HeadingItem
                onClick={(): void => {
                  this.resetDateDisplay()
                  this.toggleMobileDates()
                }}
              >
                clear
              </HeadingItem>
              <DateDisplay>
                <DateInput>{this.state.startDateDisplay}</DateInput>
                <Back fill="#436779" />
                <DateInput>{this.state.endDateDisplay}</DateInput>
              </DateDisplay>
            </MobileDateHeader>
            {this.state.showDatePicker && (
              <MobileDatePicker>
                <DatePicker
                  onReset={this.resetDateFilter}
                  onChange={this.handleDateChange}
                  onApply={this.toggleShowDatePicker}
                  initialStartDate={this.state.startDate}
                  initialEndDate={this.state.endDate}
                  initialOrientation="verticalScrollable"
                />
              </MobileDatePicker>
            )}
            <DoneButtonWrapper>
              <DoneButton onClick={this.toggleMobileDates}>Apply</DoneButton>
            </DoneButtonWrapper>
          </MobileFilterModal>
        </MobileDatesMenu>
      </>
    )
  }
}

export default MobileDateFilterView
