import * as React from 'react'
import DatePicker from './DatePicker'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'
import Back from '../../../assets/icons/Back'
import Down from '../../../assets/icons/Down'
import Reset from 'src/assets/icons/Reset'
import Filter from '../../../assets/icons/Filter'
import CalendarSort from 'src/assets/icons/CalendarSort'

import {
  FiltersWrap,
  FilterInfo,
  Button,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ModalButtons,
  ResetButton,
  ApplyButton,
  Menu,
  MobileMenu,
  MobileButtonWrapper,
  MobileButton,
  MobileFilterHeading,
  MobileFilterWrapper,
  MobileFilterHeader,
  MobileDateHeader,
  DateInput,
  HeadingItem,
  DoneButtonWrapper,
  DoneButton,
  MobileFilterModal,
  BurgerMenuButton,
  MobileDatesMenu,
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  DateDisplay,
} from './Style'

import { getFilterSchema } from '../../../../src/instance-settings'
const schema = getFilterSchema()

interface State {
  showDatePicker: boolean
  checkTitle: string
  categorySelections: any[]
  startDate: any
  endDate: any
  dateText: string
  startDateDisplay: string
  endDateDisplay: string
  mobileFilterMenuOpen: boolean
  mobileDatesMenuOpen: boolean
}

class FilterSortButtons extends React.Component<{}, State> {
  initialCategorySelections = schema.categories.map(category => ({
    category: category.title,
    tags: [],
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
  }
  resetDateDisplay = (): void => {
    this.setState({
      startDateDisplay: null,
      endDateDisplay: null,
      startDate: null,
      endDate: null,
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
    if (this.state.mobileDatesMenuOpen) {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({ mobileDatesMenuOpen: !this.state.mobileDatesMenuOpen })
  }

  getDesktopFilterButtons = (desktopView: boolean): any => {
    if (desktopView) {
      return (
        <>
          {schema.categories.map(filterCategory => {
            const category = filterCategory.title
            return (
              <ButtonWrapper
                key={category}
                className={`button-wrapper ${
                  category === this.state.checkTitle ? 'active' : ''
                }`}
                onClick={(e): void => this.handleClose(e, category)}
              >
                <Button
                  onClick={(): void => this.setId(category)}
                  className={
                    this.state.categorySelections.find(
                      selection => selection.category === category,
                    ).tags.length > 0
                      ? 'itemsSelected'
                      : ''
                  }
                >
                  {this.categoryFilterTitle(category)}
                </Button>

                <FilterModal
                  className="filter-modal"
                  style={{
                    display:
                      category === this.state.checkTitle ? 'block' : 'none',
                  }}
                >
                  <ModalItems>
                    {filterCategory.tags.map(filterTags => {
                      const tag = filterTags.title
                      return (
                        <FilterSelectButton
                          key={tag}
                          onClick={(): void =>
                            this.handleSelectCategoryTag(category, tag)
                          }
                          className={this.tagClassName(category, tag)}
                        >
                          <h3>{tag}</h3>
                          <img
                            alt={tag}
                            src={require('./icons/' + filterTags.icon)}
                          />
                        </FilterSelectButton>
                      )
                    })}
                  </ModalItems>
                  <ModalButtons>
                    <ResetButton
                      onClick={(): void => this.resetCategoryFilter(category)}
                    >
                      Reset
                    </ResetButton>
                    <ApplyButton>Apply</ApplyButton>
                  </ModalButtons>
                </FilterModal>
              </ButtonWrapper>
            )
          })}
        </>
      )
    }
  }

  getMobileFilterButtons = (mobileView: boolean): any => {
    if (mobileView) {
      return (
        <>
          <MobileFilterHeader>
            <HeadingItem onClick={this.toggleMobileFilters}>
              <Back />
            </HeadingItem>
            <HeadingItem onClick={this.resetFilters}>clear</HeadingItem>
          </MobileFilterHeader>
          <MobileFilterWrapper>
            <div>
              <MobileFilterHeading>Filters</MobileFilterHeading>
              {schema.categories.map(filterCategory => {
                const category = filterCategory.title
                return (
                  <MobileButtonWrapper
                    key={category}
                    className={`button-wrapper ${
                      category === this.state.checkTitle ? 'active' : ''
                    }`}
                    onClick={(e): void => this.handleClose(e, category)}
                  >
                    <MobileButton onClick={(): void => this.setId(category)}>
                      <span>{this.categoryFilterTitle(category)}</span>
                      <span className="right-arrow">
                        <Down width="14" fill="#000" />
                      </span>
                    </MobileButton>
                    <MobileFilterModal
                      className="filter-modal"
                      style={{
                        display:
                          category === this.state.checkTitle ? 'grid' : 'none',
                      }}
                    >
                      <MobileFilterHeader>
                        <HeadingItem onClick={this.setId}>
                          <Back />
                        </HeadingItem>
                        <HeadingItem
                          onClick={(): void =>
                            this.resetCategoryFilter(category)
                          }
                        >
                          clear
                        </HeadingItem>
                      </MobileFilterHeader>
                      <MobileFilterWrapper>
                        <MobileFilterHeading className="tag-select-heading">
                          {this.categoryFilterTitle(category)}
                        </MobileFilterHeading>
                        <ModalItems>
                          {filterCategory.tags.map(filterTags => {
                            const tag = filterTags.title
                            return (
                              <FilterSelectButton
                                key={tag}
                                onClick={(): void =>
                                  this.handleSelectCategoryTag(category, tag)
                                }
                                className={this.tagClassName(category, tag)}
                              >
                                <h3>{tag}</h3>
                                <img
                                  alt={tag}
                                  src={require('./icons/' + filterTags.icon)}
                                />
                              </FilterSelectButton>
                            )
                          })}
                        </ModalItems>
                      </MobileFilterWrapper>
                      <DoneButtonWrapper>
                        <DoneButton onClick={this.setId}>Apply</DoneButton>
                      </DoneButtonWrapper>
                    </MobileFilterModal>
                  </MobileButtonWrapper>
                )
              })}
            </div>
            <DoneButton onClick={this.toggleMobileFilters}>Done</DoneButton>
          </MobileFilterWrapper>
        </>
      )
    }
  }

  getDatePickerDesktop = (): JSX.Element => {
    return (
      <>
        <ButtonWrapper>
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
                onClick={(): void =>
                  this.handleDateChange(
                    this.state.startDate,
                    this.state.endDate,
                  )
                }
              >
                Apply
              </ApplyButtonDatePicker>
            </DatePickerModal>
          )}
        </ButtonWrapper>
      </>
    )
  }

  getDatePickerMobile = (): JSX.Element => {
    return (
      <>
        <ButtonWrapper>
          <div className="MobileDatePicker">
            {this.state.showDatePicker && (
              <DatePicker
                onReset={this.resetDateFilter}
                onChange={this.handleDateChange}
                onApply={this.toggleShowDatePicker}
                initialStartDate={this.state.startDate}
                initialEndDate={this.state.endDate}
                initialOrientation="vertical"
              />
            )}
          </div>
        </ButtonWrapper>
      </>
    )
  }

  render(): JSX.Element {
    return (
      <>
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
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

            <MediaQuery minWidth={'577px'}>
              {this.getDatePickerDesktop()}
            </MediaQuery>

            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileDatesMenu
                className={
                  this.state.mobileDatesMenuOpen === true ? 'openDatesMenu' : ''
                }
              >
                <MobileDateHeader>
                  <HeadingItem onClick={this.toggleMobileDates}>
                    <Back />
                  </HeadingItem>
                  <HeadingItem onClick={this.resetDateDisplay}>
                    clear
                  </HeadingItem>
                  <DateDisplay>
                    <DateInput>{this.state.startDateDisplay}</DateInput>
                    <Back fill="#436779" />
                    <DateInput>{this.state.endDateDisplay}</DateInput>
                  </DateDisplay>
                </MobileDateHeader>

                {this.getDatePickerMobile()}
              </MobileDatesMenu>
            </MediaQuery>

            <BurgerMenuButton onClick={this.toggleMobileFilters}>
              <Filter fill="#000" />
              Filters
            </BurgerMenuButton>
            <MediaQuery minWidth={'577px'}>
              <Menu>{this.getDesktopFilterButtons(true)}</Menu>
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <MobileMenu
                className={
                  this.state.mobileFilterMenuOpen === true ? 'openMenu' : ''
                }
              >
                {this.getMobileFilterButtons(true)}
              </MobileMenu>
            </MediaQuery>
            <Button onClick={this.resetFilters}>
              <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
                <Reset fill="#000" />
                Reset
              </MediaQuery>
              <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
                <Reset fill="#000" />
              </MediaQuery>
            </Button>
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default FilterSortButtons
