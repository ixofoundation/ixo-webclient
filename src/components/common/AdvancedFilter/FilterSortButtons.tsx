import * as React from 'react'
import DatePicker from './DatePicker'
import filterSchemaIXO from '../../../lib/json/filterSchemaIXO.json'
import {
  PositionController,
  Button,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ResetButton,
  ApplyButton,
} from './Style'

class FilterSortButtons extends React.Component<
  {},
  { showDatePicker: boolean; checkTitle: string; categorySelections: any[] }
> {
  initialCategorySelections = filterSchemaIXO.categories.map(category => ({
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
      <PositionController>
        <Button onClick={this.toggleShowDatePicker}>
          <i className="icon-calendar-sort" style={{ padding: 6 }}></i>
          Dates
        </Button>

        {filterSchemaIXO.categories.map(filterCategory => {
          return (
            <ButtonWrapper
              key={filterCategory['title']}
              className={`button-wrapper ${
                filterCategory['title'] === this.state.checkTitle
                  ? 'active'
                  : ''
              }`}
              onClick={(e): void =>
                this.handleClose(e, filterCategory['title'])
              }
            >
              <Button onClick={(): void => this.setId(filterCategory['title'])}>
                {this.categoryFilterTitle(filterCategory.title)}
              </Button>
              <FilterModal
                className="filter-modal"
                style={{
                  display:
                    filterCategory['title'] === this.state.checkTitle
                      ? 'block'
                      : 'none',
                }}
              >
                <ModalItems>
                  {filterCategory.tags.map(tag => {
                    return (
                      <FilterSelectButton
                        key={tag.title}
                        onClick={(): void =>
                          this.handleSelectCategoryTag(
                            filterCategory.title,
                            tag.title,
                          )
                        }
                        className={this.tagClassName(
                          filterCategory.title,
                          tag.title,
                        )}
                      >
                        <h3>{tag.title}</h3>
                        <img
                          alt={tag.title}
                          src={require('./IXOicons/' + tag.icon)}
                        />
                      </FilterSelectButton>
                    )
                  })}
                </ModalItems>
                <ResetButton
                  onClick={(): void =>
                    this.resetCategoryFilter(filterCategory.title)
                  }
                >
                  Reset
                </ResetButton>
                <ApplyButton>Apply</ApplyButton>
              </FilterModal>
            </ButtonWrapper>
          )
        })}
        <Button onClick={this.resetFilters}>
          <i className="icon-reset" style={{ padding: 6 }}></i>
          Reset
        </Button>
        {this.state.showDatePicker ? <DatePicker /> : null}
      </PositionController>
    )
  }
}
export default FilterSortButtons
