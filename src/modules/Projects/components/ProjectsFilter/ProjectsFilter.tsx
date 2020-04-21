import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../lib/commonData'
import DesktopDateFilterView from './desktop/DesktopDateFilterView'
import DesktopFilterView from './desktop/DesktopFilterView'
import MobileDateFilterView from './mobile/MobileDateFilterView'
import MobileFilterView from './mobile/MobileFilterView'
import { FiltersWrap, FilterInfo, Button } from './ProjectsFilter.style'
import { CalendarSort } from './assets/svgs'
import { Category } from '../../types'
import { FilterSchema } from '../../../../instance-settings'

interface State {
  showDatePicker: boolean
  checkTitle: string
  mobileFilterMenuOpen: boolean
  mobileDatesMenuOpen: boolean
}

interface Props {
  filterSchema: FilterSchema
  startDate: any
  startDateFormatted: string
  endDate: any
  endDateFormatted: string
  dateSummary: string
  categories: Category[]
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

class ProjectsFilter extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      showDatePicker: false,
      checkTitle: ' ',
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
        }}
      >
        <CalendarSort width="16" fill="#000" />
        {this.props.dateSummary}
      </Button>
    )
  }

  getMobileDateButton = (): JSX.Element => {
    return (
      <Button
        onClick={(): void => {
          this.showMobileDatePicker()
          this.toggleMobileDates()
        }}
      >
        <CalendarSort width="16" fill="#000" />
        {this.props.dateSummary}
      </Button>
    )
  }

  toggleShowDatePicker = (): void => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
    })
  }

  toggleMobileDates = (): void => {
    this.setState({ mobileDatesMenuOpen: !this.state.mobileDatesMenuOpen })
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
    const numberOfTagsSelected = this.props.categories.find(
      selection => selection.name === category,
    ).tags.length

    return numberOfTagsSelected > 0
      ? `${category} - ${numberOfTagsSelected}`
      : category
  }

  tagClassName = (category: string, tag: string): string => {
    const isPressed = this.props.categories
      .find(selection => selection.name === category)
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
    this.props.categories.forEach(category => {
      totalFilters += category.tags.length
    })
    const buttonText =
      totalFilters > 0 ? `Filters - ${totalFilters}` : 'Filters'
    return buttonText
  }

  render(): JSX.Element {
    return (
      <div data-testid="ProjectsFilter">
        <FiltersWrap>
          <FilterInfo>Projects</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopDateFilterView
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                onGetDesktopDateButton={this.getDesktopDateButton}
                onHandleDateChange={this.props.handleFilterDates}
                showDatePicker={this.state.showDatePicker}
                onToggleShowDatePicker={this.toggleShowDatePicker}
                onResetDateFilter={this.props.handleResetDatesFilter}
              />
            </MediaQuery>

            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopFilterView
                filterSchema={this.props.filterSchema}
                checkTitle={this.state.checkTitle}
                categories={this.props.categories}
                onHandleSelectCategoryTag={this.props.handleFilterCategoryTag}
                onSetCategoryName={this.setCategoryName}
                onHandleClose={this.handleClose}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onTagClassName={this.tagClassName}
                onResetDateFilter={this.props.handleResetDatesFilter}
                onResetCategoryFilter={this.props.handleResetCategoryFilter}
                onResetFilters={this.props.handleResetFilters}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileDateFilterView
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                onGetMobileDateButton={this.getMobileDateButton}
                onHandleDateChange={this.props.handleFilterDates}
                showDatePicker={this.state.showDatePicker}
                startDateDisplay={this.props.startDateFormatted}
                endDateDisplay={this.props.endDateFormatted}
                mobileDatesMenuOpen={this.state.mobileDatesMenuOpen}
                onToggleShowDatePicker={this.toggleShowDatePicker}
                onToggleMobileDates={this.toggleMobileDates}
                onResetDateFilter={this.props.handleResetDatesFilter}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileFilterView
                filterSchema={this.props.filterSchema}
                checkTitle={this.state.checkTitle}
                onHandleSelectCategoryTag={this.props.handleFilterCategoryTag}
                onSetCategoryName={this.setCategoryName}
                onHandleClose={this.handleClose}
                mobileFilterMenuOpen={this.state.mobileFilterMenuOpen}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onTagClassName={this.tagClassName}
                onToggleMobileFilters={this.toggleMobileFilters}
                onMobileFilterText={this.mobileFilterText}
                onResetCategoryFilter={this.props.handleResetCategoryFilter}
                onResetFilters={this.props.handleResetFilters}
                onResetDateFilter={this.props.handleResetDatesFilter}
              />
            </MediaQuery>
          </div>
        </FiltersWrap>
      </div>
    )
  }
}
export default ProjectsFilter
