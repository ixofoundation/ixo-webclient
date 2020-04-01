import * as React from 'react'

import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'
import { CalendarSort } from './svgs'
import { schema } from './schema'
import DesktopFilterView from './DesktopFilterView'
import MobileFilterView from './MobileFilterView'
import MobileDateFilterView from './MobileDateFilterView'
import DesktopDateFilterView from './DesktopDateFilterView'

import {
  FiltersWrap,
  FilterInfo,
  Button,
  ButtonWrapper,
  Menu,
  MobileDatesMenu,
} from './Style'

interface State {
  showDatePicker: boolean
  startDate: any
  endDate: any
  startDateDisplay: string
  endDateDisplay: string
  checkTitle: string
  categorySelections: any[]
  dateText: string
  mobileFilterMenuOpen: boolean
  mobileDatesMenuOpen: boolean
}

class ProjectsFilter extends React.Component<{}, State> {
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
      showDatePicker: false,
      checkTitle: ' ',
      categorySelections: this.initialCategorySelections,
      startDate: null,
      endDate: null,
      dateText: 'Dates',
      mobileFilterMenuOpen: false,
      mobileDatesMenuOpen: false,
      startDateDisplay: null,
      endDateDisplay: null,
    }
  }

  toggleShowDatePicker = (): void => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
    })
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

  changeDateText = (): void => {
    if (this.state.dateText === 'Dates') {
      this.setState({
        dateText: 'Select',
      })
    }
  }

  setId = (title): void => {
    this.setState({
      checkTitle: this.state.checkTitle !== title ? title : ' ',
      showDatePicker: false,
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

  mobileFilterText = (): string => {
    let totalFilters = 0
    this.state.categorySelections.forEach(category => {
      totalFilters += category.tags.length
    })
    const buttonText =
      totalFilters > 0 ? `Filters - ${totalFilters}` : 'Filters'
    return buttonText
  }

  resetFilters = (): void => {
    this.setState({
      categorySelections: this.initialCategorySelections,
      dateText: 'Dates',
      startDate: null,
      endDate: null,
    })
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

  resetDateFilter = (): void => {
    this.setState({
      dateText: 'Dates',
      startDate: null,
      endDate: null,
    })
    this.toggleShowDatePicker()
  }

  resetDateDisplay = (): void => {
    this.setState({
      startDateDisplay: null,
      endDateDisplay: null,
      startDate: null,
      endDate: null,
      dateText: 'Dates',
    })
  }

  tagClassName = (category: string, tag: string): string => {
    const isPressed = this.state.categorySelections
      .find(selection => selection.category === category)
      .tags.includes(tag)

    return isPressed ? 'buttonPressed' : ''
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
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={'577px'}>
              <ButtonWrapper>
                {this.getDatesButton()}

                <DesktopDateFilterView />
              </ButtonWrapper>
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              {this.getDatesButton()}
              <MobileDatesMenu
                className={
                  this.state.mobileDatesMenuOpen === true ? 'openDatesMenu' : ''
                }
              >
                <MobileDateFilterView />
              </MobileDatesMenu>
            </MediaQuery>

            <MediaQuery minWidth={'577px'}>
              <Menu>
                <DesktopFilterView />
              </Menu>
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileFilterView />
            </MediaQuery>
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default ProjectsFilter
