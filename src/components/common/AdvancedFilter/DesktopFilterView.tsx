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

interface Props {
  checkTitle: string
  categorySelections: any[]
  onHandleSelectCategoryTag: (category: string, tag: string) => void
  onSetId: (title: string) => void
  onHandleClose: (e, title: string) => void
  onCategoryFilterTitle: (category: string) => string
  onResetCategoryFilter: (category: string) => void
  onTagClassName: (category: string, tag: string) => string
  onResetFilters: () => void
  onResetDateFilter: () => void
}
class DesktopFilterView extends React.Component<Props, {}> {
  initialCategorySelections = schema.categories.map(category => ({
    category: category.title,
    tags:
      category.selectedTags && category.selectedTags.length
        ? [...category.selectedTags]
        : [],
  }))

  constructor(props) {
    super(props)
    this.state = {}
    this.onResetFilters = this.onResetFilters.bind(this)
  }

  onResetFilters = (): void => {
    console.log('Reset Hit')
    this.setState({
      categorySelections: this.initialCategorySelections,
    })
    this.props.onResetFilters()
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
                  category === this.props.checkTitle ? 'active' : ''
                }`}
                onClick={(e): void => this.props.onHandleClose(e, category)}
              >
                <Button
                  onClick={(): void => this.props.onSetId(category)}
                  className={
                    this.props.categorySelections.find(
                      selection => selection.category === category,
                    ).tags.length > 0
                      ? 'itemsSelected'
                      : ''
                  }
                >
                  {this.props.onCategoryFilterTitle(category)}
                </Button>

                <FilterModal
                  className="filter-modal"
                  style={{
                    display:
                      category === this.props.checkTitle ? 'block' : 'none',
                  }}
                >
                  <ModalItems>
                    {filterCategory.tags.map(filterTags => {
                      const tag = filterTags.title
                      return (
                        <FilterSelectButton
                          key={tag}
                          onClick={(): void =>
                            this.props.onHandleSelectCategoryTag(category, tag)
                          }
                          className={this.props.onTagClassName(category, tag)}
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
                      onClick={(): void =>
                        this.props.onResetCategoryFilter(category)
                      }
                    >
                      Reset
                    </ResetButton>
                    <ApplyButton
                      onClick={(): void => {
                        this.props.onSetId('')
                      }}
                    >
                      Apply
                    </ApplyButton>
                  </ModalButtons>
                </FilterModal>
              </ButtonWrapper>
            )
          })}
          <Button
            onClick={(): void => {
              this.props.onResetFilters()
              this.props.onResetDateFilter()
            }}
          >
            <Reset fill="#000" />
            Reset
          </Button>
        </Menu>
      </>
    )
  }
}

export default DesktopFilterView
