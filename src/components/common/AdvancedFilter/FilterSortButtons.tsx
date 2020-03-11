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
} from './Style'

import { getFilterSchema } from '../../../../src/instance-settings'
import CalendarSort from 'src/assets/icons/CalendarSort'
import Reset from 'src/assets/icons/Reset'

const schema = getFilterSchema()

class FilterSortButtons extends React.Component<
  {},
  { showDatePicker: boolean; checkTitle: string; categorySelections: any[] }
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
    }
  }

  toggleShowDatePicker = (e): void => {
    e.preventDefault()
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkTitle: ' ',
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
    return (
      <>
        <FiltersWrap>
          <FilterInfo>All Projects</FilterInfo>
          <div className="filters">
            <Button onClick={this.toggleShowDatePicker}>
              <CalendarSort width="16" fill="#000" />
              Dates
            </Button>
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
              <Reset fill="#000" />
              Reset
            </Button>
            {this.state.showDatePicker ? <DatePicker /> : null}
          </div>
        </FiltersWrap>
      </>
    )
  }
}
export default FilterSortButtons
