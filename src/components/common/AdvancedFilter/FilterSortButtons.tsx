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
  constructor(props) {
    super(props)

    this.state = {
      showDatePicker: false,
      checkTitle: ' ',
      categorySelections: filterSchemaIXO.categories.map(category => ({
        category: category.title,
        tags: [],
      })),
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

  handleMultipleSelect = (category: string, tag: string): void => {
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
        this.state.categorySelections.find(
          selection => selection.category == category,
        ),
        {
          category: category,
          tags: [newCategorySelectionTags],
        },
      ],
    })

    /*     const tmp = this.state.selectedButtons
    if (this.state.selectedButtons.includes(button)) {
      this.setState({
        selectedButtons: this.state.selectedButtons.filter(el => el !== button),
      })
    } else {
      tmp.push(button)
      this.setState({
        selectedButtons: tmp,
      })
    } */
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
                {filterCategory.title} - {this.state.categorySelections.length}
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
                  {filterCategory.tags.map(button => {
                    return (
                      <FilterSelectButton
                        key={button.title}
                        onClick={(): void =>
                          this.handleMultipleSelect(
                            filterCategory.title,
                            // filterCategory,
                            button.title,
                          )
                        }
                        className={
                          this.state.categorySelections.includes(button.title)
                            ? 'buttonPressed'
                            : ''
                        }
                      >
                        <h3>{button.title}</h3>
                        <img
                          alt={button.title}
                          src={require('./IXOicons/' + button.icon)}
                        />
                      </FilterSelectButton>
                    )
                  })}
                </ModalItems>
                <ResetButton>Reset</ResetButton>
                <ApplyButton>Apply</ApplyButton>
              </FilterModal>
            </ButtonWrapper>
          )
        })}
        <Button>
          <i className="icon-reset" style={{ padding: 6 }}></i>
          Reset
        </Button>
        {this.state.showDatePicker ? <DatePicker /> : null}
      </PositionController>
    )
  }
}
export default FilterSortButtons
