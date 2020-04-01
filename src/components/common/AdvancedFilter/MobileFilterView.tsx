import * as React from 'react'
import { schema } from './schema'
import { Back, Down, Filter, Reset } from './svgs'

import {
  MobileButtonWrapper,
  MobileButton,
  MobileFilterHeading,
  MobileFilterWrapper,
  MobileFilterHeader,
  MobileFilterModal,
  ModalItems,
  FilterSelectButton,
  HeadingItem,
  DoneButtonWrapper,
  DoneButton,
  MobileMenu,
  BurgerMenuButton,
  Button,
} from './Style'

interface State {
  checkTitle: string
  categorySelections: any[]
  mobileFilterMenuOpen: boolean
}
class MobileFilterView extends React.Component<{}, State> {
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
      mobileFilterMenuOpen: false,
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

  render(): JSX.Element {
    return (
      <>
        <BurgerMenuButton onClick={this.toggleMobileFilters}>
          <Filter fill="#000" />
          {this.mobileFilterText()}
        </BurgerMenuButton>
        <MobileMenu
          className={this.state.mobileFilterMenuOpen === true ? 'openMenu' : ''}
        >
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
        </MobileMenu>
        <Button onClick={this.resetFilters}>
          <Reset fill="#000" />
        </Button>
      </>
    )
  }
}

export default MobileFilterView
