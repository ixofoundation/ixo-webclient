import * as React from 'react'
import DatePicker from './DatePicker'
import { schema } from './schema'
import { CalendarSort } from './svgs'

import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  Button,
  ButtonWrapper,
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
class DesktopDateFilterView extends React.Component<{}, State> {
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
          this.toggleShowDatePicker()
          this.resetDateButtonText()
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
        <ButtonWrapper>
          {this.getDatesButton()}

          {this.state.showDatePicker && (
            <DatePickerModal>
              <DatePicker
                onReset={this.resetDateFilter}
                onChange={this.handleDateChange}
                onApply={this.toggleShowDatePicker}
                initialStartDate={this.state.startDate}
                initialEndDate={this.state.endDate}
                initialOrientation="horizontal"
              />

              <ResetButtonDatePicker onClick={this.resetDateFilter}>
                Reset
              </ResetButtonDatePicker>
              <ApplyButtonDatePicker
                onClick={(): void => {
                  this.handleDateChange(
                    this.state.startDate,
                    this.state.endDate,
                  )
                  this.toggleShowDatePicker()
                }}
              >
                Apply
              </ApplyButtonDatePicker>
            </DatePickerModal>
          )}
        </ButtonWrapper>
      </>
    )
  }
}

export default DesktopDateFilterView
