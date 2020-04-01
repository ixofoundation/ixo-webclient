import * as React from 'react'
import { schema } from './schema'

import DatePicker from './DatePicker'

import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  Button,
  ButtonWrapper,
} from './Style'
import { CalendarSort } from './svgs'

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

  setId = (title): void => {
    this.setState({
      checkTitle: this.state.checkTitle !== title ? title : ' ',
    })
  }

  handleClose = (e, title): void => {
    const filterModal = e.target
      .closest('.button-wrapper')
      .querySelector('.filter-modal')
    if (filterModal.contains(e.target)) {
      return
    }
    this.setId(title)
  }

  handleSelectCategoryTag = (category: string, tag: string): void => {
    const currentCategorySelectionTags = this.state.categorySelections.find(
      selection => selection.category === category,
    ).tags

    let newCategorySelectionTags

    if (currentCategorySelectionTags.includes(tag)) {
      newCategorySelectionTags = [
        ...currentCategorySelectionTags.filter(val => val !== tag),
      ]
    } else {
      newCategorySelectionTags = [...currentCategorySelectionTags, tag]
    }

    this.setState({
      categorySelections: [
        ...this.state.categorySelections.filter(
          selection => selection.category !== category,
        ),
        {
          category: category,
          tags: [...newCategorySelectionTags],
        },
      ],
    })
  }

  categoryFilterTitle = (category: string): string => {
    const numberOfTagsSelected = this.state.categorySelections.find(
      selection => selection.category === category,
    ).tags.length

    return numberOfTagsSelected > 0
      ? `${category} - ${numberOfTagsSelected}`
      : category
  }

  resetCategoryFilter = (category: string): void => {
    this.setState({
      categorySelections: [
        ...this.state.categorySelections.filter(
          selection => selection.category !== category,
        ),
        {
          category: category,
          tags: [],
        },
      ],
    })
  }

  tagClassName = (category: string, tag: string): string => {
    const isPressed = this.state.categorySelections
      .find(selection => selection.category === category)
      .tags.includes(tag)

    return isPressed ? 'buttonPressed' : ''
  }

  resetFilters = (): void => {
    this.setState({
      categorySelections: this.initialCategorySelections,
    })
  }
  toggleMobileFilters = (): void => {
    if (this.state.mobileFilterMenuOpen) {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({ mobileFilterMenuOpen: !this.state.mobileFilterMenuOpen })
  }

  toggleMobileDates = (): void => {
    this.setState({ mobileDatesMenuOpen: !this.state.mobileDatesMenuOpen })
  }

  resetDateDisplay = (): void => {
    this.setState({
      startDateDisplay: null,
      endDateDisplay: null,
      startDate: null,
      endDate: null,
    })
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

  changeDateText = (): void => {
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
          this.changeDateText()
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
