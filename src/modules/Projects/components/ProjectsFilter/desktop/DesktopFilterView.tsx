import * as React from 'react'
import { Category } from '../../../types'
import { FilterSchema } from '../../../../../instance-settings'

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
} from '../ProjectsFilter.style'
import { Reset } from '../assets/svgs'

interface Props {
  filterSchema: FilterSchema
  checkTitle: string
  categories: Category[]
  onHandleSelectCategoryTag: (category: string, tag: string) => void
  onSetCategoryName: (name: string) => void
  onHandleClose: (e, name: string) => void
  onCategoryFilterTitle: (category: string) => string
  onTagClassName: (category: string, tag: string) => string
  onResetCategoryFilter: (category: string) => void
  onResetFilters: () => void
  onResetDateFilter: () => void
}
class DesktopFilterView extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <>
        <Menu>
          {this.props.filterSchema.categories.map(schemaCategory => {
            const category = schemaCategory.name
            return (
              <ButtonWrapper
                key={category}
                className={`button-wrapper ${
                  category === this.props.checkTitle ? 'active' : ''
                }`}
                onClick={(e): void => this.props.onHandleClose(e, category)}
              >
                <Button
                  onClick={(): void => this.props.onSetCategoryName(category)}
                  className={
                    this.props.categories.find(
                      selection => selection.name === category,
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
                    {schemaCategory.tags.map(filterTags => {
                      const tag = filterTags.name
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
                            src={require('../assets/icons/' + filterTags.icon)}
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
                        this.props.onSetCategoryName('')
                      }}
                    >
                      Done
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
