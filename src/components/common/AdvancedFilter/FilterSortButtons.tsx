import * as React from 'react'
import DatePicker from './DatePicker'

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
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
} from './Style'

import { getFilterSchema } from '../../../../src/instance-settings'

const schema = getFilterSchema()

class FilterSortButtons extends React.Component<
  {},
  {
    showDatePicker: boolean
    checkTitle: string
    categorySelections: any[]
    startDate: ''
    endDate: ''
    dateText: string
  }
> {
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
      startDate: '',
      endDate: '',
      dateText: 'Dates',
    }
  }

  toggleShowDatePicker = (e): void => {
    e.preventDefault()
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
    })
  }

  handleDateChange = (startDate, endDate): void => {
    endDate
      ? this.setState({
          startDate: startDate.format('DD-MMM-YYYY'),
          endDate: endDate.format('DD-MMM-YYYY'),
        })
      : this.setState({
          startDate: startDate.format('DD-MMM-YYYY'),
        })
  }

  changeDateText = (): void => {
    console.log('CLICKED')
    const { startDate, endDate } = this.state
    const dateString = `${startDate} - ${endDate}`
    !startDate && !endDate
      ? this.setState({
          dateText: 'Select',
        })
      : this.setState({
          dateText: dateString,
        })
  }

  setId = (title): void => {
    this.setState({
      checkTitle: title,
      showDatePicker: false,
    })
    if (this.state.checkTitle === title) {
      this.setState({
        checkTitle: ' ',
      })
    }
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

  tagClassName = (category: string, tag: string): string => {
    const isPressed = this.state.categorySelections
      .find(selection => selection.category === category)
      .tags.includes(tag)

    return isPressed ? 'buttonPressed' : ''
  }

  render(): JSX.Element {
    const { startDate, endDate, dateText } = this.state
    startDate
      ? this.setState({ dateText: ` ${startDate} - select ` })
      : this.setState({ dateText })
    startDate && endDate
      ? this.setState({ dateText: ` ${startDate} - ${endDate} ` })
      : this.setState({ dateText: ` ${startDate} - select` })

    return (
      <>
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <Button
              onClick={(e): void => {
                this.toggleShowDatePicker(e)
                this.changeDateText()
              }}
            >
              <i className="icon-calendar-sort" style={{ padding: 6 }}></i>
              {dateText}
            </Button>
            <ApplyButtonDatePicker
              onClick={this.changeDateText}
            ></ApplyButtonDatePicker>
            <ResetButtonDatePicker></ResetButtonDatePicker>
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
            <Button onClick={this.resetFilters}>
              <i className="icon-reset" style={{ padding: 6 }}></i>
              Reset
            </Button>
            {this.state.showDatePicker ? (
              <DatePicker onChange={this.handleDateChange} />
            ) : null}
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default FilterSortButtons
