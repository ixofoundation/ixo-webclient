import * as React from 'react'
import { Back, Down, Filter, Reset } from '../assets/svgs'
import { FilterSchema } from '../../../../../instance-settings'

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
} from '../ProjectsFilter.style'

interface Props {
  filterSchema: FilterSchema
  checkTitle: string
  mobileFilterMenuOpen: boolean
  onHandleSelectCategoryTag: (category: string, tag: string) => void
  onSetCategoryName: (name: string) => void
  onHandleClose: (e, name: string) => void
  onCategoryFilterTitle: (category: string) => string
  onTagClassName: (category: string, tag: string) => string
  onToggleMobileFilters: () => void
  onMobileFilterText: () => string
  onResetCategoryFilter: (category: string) => void
  onResetFilters: () => void
  onResetDateFilter: () => void
}

class MobileFilterView extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <>
        <BurgerMenuButton onClick={this.props.onToggleMobileFilters}>
          <Filter fill="#000" />
          {this.props.onMobileFilterText()}
        </BurgerMenuButton>
        <MobileMenu
          className={this.props.mobileFilterMenuOpen === true ? 'openMenu' : ''}
        >
          <MobileFilterHeader>
            <HeadingItem onClick={this.props.onToggleMobileFilters}>
              <Back />
            </HeadingItem>
            <HeadingItem onClick={this.props.onResetFilters}>clear</HeadingItem>
          </MobileFilterHeader>
          <MobileFilterWrapper>
            <div>
              <MobileFilterHeading>Filters</MobileFilterHeading>
              {this.props.filterSchema.categories.map(schemaCategory => {
                const category = schemaCategory.name
                return (
                  <MobileButtonWrapper
                    key={category}
                    className={`button-wrapper ${
                      category === this.props.checkTitle ? 'active' : ''
                    }`}
                    onClick={(e): void => this.props.onHandleClose(e, category)}
                  >
                    <MobileButton
                      onClick={(): void =>
                        this.props.onSetCategoryName(category)
                      }
                    >
                      <span>{this.props.onCategoryFilterTitle(category)}</span>
                      <span className="right-arrow">
                        <Down width="14" fill="#000" />
                      </span>
                    </MobileButton>
                    <MobileFilterModal
                      className="filter-modal"
                      style={{
                        display:
                          category === this.props.checkTitle ? 'grid' : 'none',
                      }}
                    >
                      <MobileFilterHeader>
                        <HeadingItem
                          onClick={(): void => {
                            this.props.onSetCategoryName
                          }}
                        >
                          <Back />
                        </HeadingItem>
                        <HeadingItem
                          onClick={(): void =>
                            this.props.onResetCategoryFilter(category)
                          }
                        >
                          clear
                        </HeadingItem>
                      </MobileFilterHeader>
                      <MobileFilterWrapper>
                        <MobileFilterHeading className="tag-select-heading">
                          {this.props.onCategoryFilterTitle(category)}
                        </MobileFilterHeading>
                        <ModalItems>
                          {schemaCategory.tags.map(filterTags => {
                            const tag = filterTags.name
                            return (
                              <FilterSelectButton
                                key={tag}
                                onClick={(): void =>
                                  this.props.onHandleSelectCategoryTag(
                                    category,
                                    tag,
                                  )
                                }
                                className={this.props.onTagClassName(
                                  category,
                                  tag,
                                )}
                              >
                                <h3>{tag}</h3>
                                <img
                                  alt={tag}
                                  src={require('../assets/icons/' +
                                    filterTags.icon)}
                                />
                              </FilterSelectButton>
                            )
                          })}
                        </ModalItems>
                      </MobileFilterWrapper>
                      <DoneButtonWrapper>
                        <DoneButton
                          onClick={(): void => {
                            this.props.onSetCategoryName('')
                          }}
                        >
                          Done
                        </DoneButton>
                      </DoneButtonWrapper>
                    </MobileFilterModal>
                  </MobileButtonWrapper>
                )
              })}
            </div>
            <DoneButton onClick={this.props.onToggleMobileFilters}>
              Done
            </DoneButton>
          </MobileFilterWrapper>
        </MobileMenu>
        <Button
          onClick={(): void => {
            this.props.onResetFilters()
            this.props.onResetDateFilter()
          }}
        >
          <Reset fill="#000" />
        </Button>
      </>
    )
  }
}

export default MobileFilterView
