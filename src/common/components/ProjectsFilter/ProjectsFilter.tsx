import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'
import DesktopDateFilterView from './DesktopDateFilterView'
import DesktopFilterView from './DesktopFilterView'
import MobileDateFilterView from './MobileDateFilterView'
import MobileFilterView from './MobileFilterView'
import { FiltersWrap, FilterInfo, Button } from './ProjectsFilter.style'
import { CalendarSort } from './svgs'

interface Schema {
  ['@context']: string
  ['@type']: string
  categories: Category[]
}

interface Category {
  ['@type']: string
  name: string
  tags: Tag[]
  selectedTags?: string[]
}

interface Tag {
  ['@type']: string
  name: string
  icon: string
  color?: string
}

interface State {
  startDate: any
  endDate: any
  showDatePicker: boolean
  dateText: string
  startDateDisplay: string
  endDateDisplay: string
  checkTitle: string
  categorySelections: any[]
  mobileFilterMenuOpen: boolean
  mobileDatesMenuOpen: boolean
}
interface Props {
  schema: Schema
}

class ProjectsFilter extends React.Component<Props, State> {
  initialCategorySelections = this.props.schema.categories.map(category => ({
    category: category.name,
    tags:
      category.selectedTags && category.selectedTags.length
        ? [...category.selectedTags]
        : [],
  }))

  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      showDatePicker: false,
      dateText: 'Dates',
      startDateDisplay: null,
      endDateDisplay: null,
      checkTitle: ' ',
      categorySelections: this.initialCategorySelections,
      mobileFilterMenuOpen: false,
      mobileDatesMenuOpen: false,
    }
  }

  getDesktopDateButton = (): JSX.Element => {
    return (
      <Button
        data-testid="DesktopDateButton"
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

  getMobileDateButton = (): JSX.Element => {
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

  toggleShowDatePicker = (): void => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
    })
  }

  handleDateChange = (startDate: any, endDate: any): void => {
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

  toggleMobileDates = (): void => {
    this.setState({ mobileDatesMenuOpen: !this.state.mobileDatesMenuOpen })
  }

  resetDateButtonText = (): void => {
    if (this.state.dateText === 'Dates') {
      this.setState({
        dateText: 'Select',
      })
    }
  }

  resetDateFilter = (): void => {
    this.setState({
      startDate: null,
      endDate: null,
      startDateDisplay: null,
      endDateDisplay: null,
      showDatePicker: false,
      dateText: 'Dates',
    })
  }

  resetDateDisplay = (): void => {
    this.setState({
      startDateDisplay: null,
      endDateDisplay: null,
    })
    this.resetDateFilter()
  }

  showMobileDatePicker = (): void => {
    if (!this.state.showDatePicker) {
      this.setState({
        showDatePicker: true,
      })
    }
  }

  setCategoryName = (name: string): void => {
    this.setState({
      checkTitle: this.state.checkTitle !== name ? name : ' ',
    })
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

  handleClose = (e, name: string): void => {
    const filterModal = e.target
      .closest('.button-wrapper')
      .querySelector('.filter-modal')
    if (filterModal.contains(e.target)) {
      return
    }
    this.setCategoryName(name)
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

  toggleMobileFilters = (): void => {
    if (this.state.mobileFilterMenuOpen) {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({ mobileFilterMenuOpen: !this.state.mobileFilterMenuOpen })
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
    })
  }

  render(): JSX.Element {
    return (
      <div data-testid="ProjectsFilter">
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopDateFilterView
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onGetDesktopDateButton={this.getDesktopDateButton}
                onHandleDateChange={this.handleDateChange}
                showDatePicker={this.state.showDatePicker}
                onToggleShowDatePicker={this.toggleShowDatePicker}
                dateText={this.state.dateText}
                onResetDateButtonText={this.resetDateButtonText}
                onResetDateFilter={this.resetDateFilter}
              />
            </MediaQuery>

            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopFilterView
                checkTitle={this.state.checkTitle}
                categorySelections={this.state.categorySelections}
                onHandleSelectCategoryTag={this.handleSelectCategoryTag}
                onSetCategoryName={this.setCategoryName}
                onHandleClose={this.handleClose}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onTagClassName={this.tagClassName}
                onResetDateFilter={this.resetDateFilter}
                onResetCategoryFilter={this.resetCategoryFilter}
                onResetFilters={this.resetFilters}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileDateFilterView
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onGetMobileDateButton={this.getMobileDateButton}
                onHandleDateChange={this.handleDateChange}
                showDatePicker={this.state.showDatePicker}
                dateText={this.state.dateText}
                startDateDisplay={this.state.startDateDisplay}
                endDateDisplay={this.state.endDateDisplay}
                mobileFilterMenuOpen={this.state.mobileFilterMenuOpen}
                mobileDatesMenuOpen={this.state.mobileDatesMenuOpen}
                onToggleShowDatePicker={this.toggleShowDatePicker}
                onToggleMobileDates={this.toggleMobileDates}
                onShowMobileDatePicker={this.showMobileDatePicker}
                onResetDateDisplay={this.resetDateDisplay}
                onResetDateFilter={this.resetDateFilter}
                onResetDateButtonText={this.resetDateButtonText}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileFilterView
                checkTitle={this.state.checkTitle}
                categorySelections={this.state.categorySelections}
                onHandleSelectCategoryTag={this.handleSelectCategoryTag}
                onSetCategoryName={this.setCategoryName}
                onHandleClose={this.handleClose}
                mobileFilterMenuOpen={this.state.mobileFilterMenuOpen}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onTagClassName={this.tagClassName}
                onToggleMobileFilters={this.toggleMobileFilters}
                onMobileFilterText={this.mobileFilterText}
                onResetCategoryFilter={this.resetCategoryFilter}
                onResetFilters={this.resetFilters}
                onResetDateFilter={this.resetDateFilter}
              />
            </MediaQuery>
          </div>
        </FiltersWrap>
      </div>
    )
  }
}
export default ProjectsFilter
