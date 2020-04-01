import * as React from 'react'
import { schema } from './schema'

import {
  Button,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ModalButtons,
  ResetButton,
  ApplyButton,
  Menu,
} from './Style'
import { Reset } from './svgs'

interface State {
  checkTitle: string
  categorySelections: any[]
}
class DesktopFilterView extends React.Component<{}, State> {
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

  render(): JSX.Element {
    return (
      <>
        <Menu>
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
                    <ApplyButton onClick={this.setId}>Apply</ApplyButton>
                  </ModalButtons>
                </FilterModal>
              </ButtonWrapper>
            )
          })}
          <Button onClick={this.resetFilters}>
            <Reset fill="#000" />
            Reset
          </Button>
        </Menu>
      </>
    )
  }
}

export default DesktopFilterView
