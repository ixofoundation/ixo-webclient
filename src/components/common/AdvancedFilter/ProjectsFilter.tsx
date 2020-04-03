import * as React from 'react'

import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'

import { schema } from './schema'
import DesktopFilterView from './DesktopFilterView'
import MobileFilterView from './MobileFilterView'
import MobileDateFilterView from './MobileDateFilterView'
import DesktopDateFilterView from './DesktopDateFilterView'

import { FiltersWrap, FilterInfo, Button } from './Style'
import { Reset } from './svgs'

interface State {
  checkTitle: string
  categorySelections: any[]
  showDatePicker: boolean
  startDate: any
  endDate: any
  startDateDisplay: string
  endDateDisplay: string
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
      checkTitle: ' ',
      categorySelections: this.initialCategorySelections,
      showDatePicker: false,
      startDate: null,
      endDate: null,
      dateText: 'Dates',
      mobileFilterMenuOpen: false,
      mobileDatesMenuOpen: false,
      startDateDisplay: null,
      endDateDisplay: null,
    }

    this.resetFilters = this.resetFilters.bind(this)
    this.resetDateFilter = this.resetDateFilter.bind(this)
  }

  setId = (title): void => {
    this.setState({
      checkTitle: this.state.checkTitle !== title ? title : ' ',
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

  handleClose = (e, title): void => {
    const filterModal = e.target
      .closest('.button-wrapper')
      .querySelector('.filter-modal')
    if (filterModal.contains(e.target)) {
      return
    }
    this.setId(title)
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

  resetDateFilter = (): void => {
    this.setState({
      startDate: null,
      endDate: null,
      showDatePicker: !this.state.showDatePicker,
      dateText: 'Dates',
    })
  }

  render(): JSX.Element {
    return (
      <>
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopDateFilterView />
            </MediaQuery>

            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <DesktopFilterView
                checkTitle={this.state.checkTitle}
                categorySelections={this.state.categorySelections}
                onHandleSelectCategoryTag={this.handleSelectCategoryTag}
                onSetId={this.setId}
                onHandleClose={this.handleClose}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onResetCategoryFilter={this.resetCategoryFilter}
                onResetFilters={this.resetFilters}
                onTagClassName={this.tagClassName}
                onResetDateFilter={this.resetDateFilter}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileDateFilterView />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileFilterView
                checkTitle={this.state.checkTitle}
                categorySelections={this.state.categorySelections}
                onHandleSelectCategoryTag={this.handleSelectCategoryTag}
                mobileFilterMenuOpen={this.state.mobileFilterMenuOpen}
                onSetId={this.setId}
                onHandleClose={this.handleClose}
                onCategoryFilterTitle={this.categoryFilterTitle}
                onResetCategoryFilter={this.resetCategoryFilter}
                onResetFilters={this.resetFilters}
                onTagClassName={this.tagClassName}
                onToggleMobileFilters={this.toggleMobileFilters}
                onMobileFilterText={this.mobileFilterText}
                onResetDateFilter={this.resetDateFilter}
              />
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <Button
                onClick={(): void => {
                  this.resetFilters()
                  this.resetDateFilter()
                }}
              >
                <Reset fill="#000" />
              </Button>
            </MediaQuery>
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default ProjectsFilter
