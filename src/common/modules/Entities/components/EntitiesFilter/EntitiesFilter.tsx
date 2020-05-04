import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../../lib/commonData'
import { Category } from '../../types'
import { FilterItem as IconListFilterItem } from '../../../../components/Filters/IconListFilter/types'
import { Schema, SchemaCategoryTag } from './types'
import {
  FiltersWrap,
  FilterInfo,
  Menu,
  MobileFilterHeading,
  MobileFilterWrapper,
  MobileFilterHeader,
  HeadingItem,
  DoneButton,
  MobileMenu,
  BurgerMenuButton,
  Button,
} from '../../../../components/Filters/Filters.styles'
import IconListFilterDesktop from '../../../../components/Filters/IconListFilter/IconListFilterDesktop'
import IconListFilterMobile from '../../../../components/Filters/IconListFilter/IconListFilterMobile'
import DateFilterDesktop from '../../../../components/Filters/DateFilter/DateFilterDesktop'
import DateFilterMobile from '../../../../components/Filters/DateFilter/DateFilterMobile'
import Back from '../../../../../assets/icons/Back'
import Reset from '../../../../../assets/icons/Reset'
import Filter from '../../../../../assets/icons/Filter'
import { SelectType } from '../../../../components/Filters/IconListFilter/types'
import * as iconListFilterUtils from '../../../../components/Filters/IconListFilter/IconListFilter.utils'

interface State {
  activeFilter: string
  mobileFilterActiveMenu: string
}

interface Props {
  title: string
  filterSchema: Schema
  startDate: any
  startDateFormatted: string
  endDate: any
  endDateFormatted: string
  dateSummary: string
  categories: Category[]
  categoriesSummary: string
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

class EntitiesFilter extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      activeFilter: '',
      mobileFilterActiveMenu: '',
    }
  }

  filterIsActive = (filterName: string): boolean =>
    this.state.activeFilter === filterName

  toggleFilterShow = (isActive: boolean, filterName: string): void => {
    this.setState({
      activeFilter: isActive ? '' : filterName,
    })
  }

  toggleMobileFilterMenuShow = (menu: string): void => {
    if (this.state.mobileFilterActiveMenu === 'menu') {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({
      mobileFilterActiveMenu:
        this.state.mobileFilterActiveMenu === menu ? '' : menu,
    })
  }

  getCategoryFilterItems = (
    filterName: string,
    ddoTags: SchemaCategoryTag[],
  ): IconListFilterItem[] => {
    return ddoTags.map(ddoTag => ({
      name: ddoTag.name,
      icon: ddoTag.icon,
      isSelected: this.props.categories
        .find(category => category.name === filterName)
        .tags.includes(ddoTag.name),
    }))
  }

  getViewFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    const filterItems = tags.map(tag => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: false,
    }))

    filterItems.find(
      item => item.name === 'My Portfolio',
    ).isSelected = this.props.userEntities
    filterItems.find(item => item.name === 'Global').isSelected =
      !this.props.userEntities &&
      !this.props.featuredEntities &&
      !this.props.popularEntities
    filterItems.find(
      item => item.name === 'Featured',
    ).isSelected = this.props.featuredEntities
    filterItems.find(
      item => item.name === 'Popular',
    ).isSelected = this.props.popularEntities

    return filterItems
  }

  filterViewTag = (name: string, tag: string): void => {
    switch (tag) {
      case 'My Portfolio':
        this.props.handleFilterToggleUserEntities(true)
        break
      case 'Global':
        this.props.handleFilterToggleUserEntities(false)
        break
      case 'Featured':
        this.props.handleFilterToggleFeaturedEntities(true)
        break
      case 'Popular':
        this.props.handleFilterTogglePopularEntities(true)
        break
    }
  }

  resetDateFilter = (): void => {
    this.setState({ activeFilter: '' })
    this.props.handleResetDatesFilter()
  }

  resetCategoryFilter = (category: string): void => {
    this.setState({ activeFilter: '' })
    this.props.handleResetCategoryFilter(category)
  }

  resetViewFilter = (): void => {
    this.setState({ activeFilter: '' })
    this.props.handleFilterToggleUserEntities(true)
  }

  render(): JSX.Element {
    return (
      <div data-testid="EntitiesFilter">
        <FiltersWrap>
          <FilterInfo>{this.props.title}</FilterInfo>
          <div className="filters">
            {this.props.filterSchema.dateCreated && (
              <>
                <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
                  <DateFilterDesktop
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    dateSummary={this.props.dateSummary}
                    isActive={
                      this.state.activeFilter ===
                      this.props.filterSchema.dateCreated.name
                    }
                    handleFilterToggleShow={(): void =>
                      this.toggleFilterShow(
                        this.state.activeFilter ===
                          this.props.filterSchema.dateCreated.name,
                        this.props.filterSchema.dateCreated.name,
                      )
                    }
                    handleFilterDateChange={this.props.handleFilterDates}
                    handleResetFilter={this.resetDateFilter}
                  />
                </MediaQuery>
                <MediaQuery maxWidth={`${deviceWidth.mobile}px`} y>
                  <DateFilterMobile
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    startDateDisplay={this.props.startDateFormatted}
                    endDateDisplay={this.props.endDateFormatted}
                    dateSummary={this.props.dateSummary}
                    isActive={
                      this.state.activeFilter ===
                      this.props.filterSchema.dateCreated.name
                    }
                    handleFilterToggleShow={(): void =>
                      this.toggleFilterShow(
                        this.state.activeFilter ===
                          this.props.filterSchema.dateCreated.name,
                        this.props.filterSchema.dateCreated.name,
                      )
                    }
                    handleFilterDateChange={this.props.handleFilterDates}
                    handleResetFilter={this.resetDateFilter}
                  />
                </MediaQuery>
              </>
            )}
            {this.props.filterSchema.view && (
              <>
                <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
                  <Menu>
                    <IconListFilterDesktop
                      selectType={SelectType.SingleSelect}
                      key="View"
                      name="View"
                      isActive={this.filterIsActive('View')}
                      handleFilterReset={this.resetViewFilter}
                      handleToggleFilterShow={(): void =>
                        this.toggleFilterShow(
                          this.filterIsActive('View'),
                          'View',
                        )
                      }
                      handleFilterItemClick={this.filterViewTag}
                      items={this.getViewFilterItems(
                        this.props.filterSchema.view.tags,
                      )}
                    />
                  </Menu>
                </MediaQuery>
                <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
                  <BurgerMenuButton
                    onClick={(): void =>
                      this.toggleMobileFilterMenuShow('View')
                    }
                  >
                    {iconListFilterUtils.getTitle(
                      'View',
                      this.getViewFilterItems(
                        this.props.filterSchema.view.tags,
                      ),
                      SelectType.SingleSelect,
                    )}
                  </BurgerMenuButton>
                  <MobileMenu
                    className={
                      this.state.mobileFilterActiveMenu === 'View'
                        ? 'openMenu'
                        : ''
                    }
                  >
                    <MobileFilterWrapper>
                      <div>
                        <IconListFilterMobile
                          key="View"
                          name="View"
                          showFilterSubMenu={false}
                          selectType={SelectType.SingleSelect}
                          isActive={this.filterIsActive('View')}
                          handleFilterReset={this.resetViewFilter}
                          handleToggleFilterShow={(): void =>
                            this.toggleMobileFilterMenuShow('View')
                          }
                          handleFilterItemClick={this.filterViewTag}
                          items={this.getViewFilterItems(
                            this.props.filterSchema.view.tags,
                          )}
                        />
                      </div>
                    </MobileFilterWrapper>
                  </MobileMenu>
                </MediaQuery>
              </>
            )}
            {this.props.filterSchema.ddoTags && (
              <>
                <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
                  <Menu>
                    {this.props.filterSchema.ddoTags.map(schemaCategory => {
                      const {
                        name: filterName,
                        tags: schemaTags,
                      } = schemaCategory
                      const isActive = this.filterIsActive(filterName)
                      const items = this.getCategoryFilterItems(
                        filterName,
                        schemaTags,
                      )

                      return (
                        <IconListFilterDesktop
                          selectType={SelectType.MultiSelect}
                          key={filterName}
                          name={filterName}
                          isActive={isActive}
                          handleFilterReset={this.resetCategoryFilter}
                          handleToggleFilterShow={(): void =>
                            this.toggleFilterShow(isActive, filterName)
                          }
                          handleFilterItemClick={
                            this.props.handleFilterCategoryTag
                          }
                          items={items}
                        />
                      )
                    })}
                  </Menu>
                </MediaQuery>
                <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
                  <BurgerMenuButton
                    onClick={(): void =>
                      this.toggleMobileFilterMenuShow('Category')
                    }
                  >
                    <Filter fill="#000" />
                    {this.props.categoriesSummary}
                  </BurgerMenuButton>
                  <MobileMenu
                    className={
                      this.state.mobileFilterActiveMenu === 'Category'
                        ? 'openMenu'
                        : ''
                    }
                  >
                    <MobileFilterHeader>
                      <HeadingItem
                        onClick={(): void =>
                          this.toggleMobileFilterMenuShow('Category')
                        }
                      >
                        <Back />
                      </HeadingItem>
                      <HeadingItem onClick={this.props.handleResetFilters}>
                        clear
                      </HeadingItem>
                    </MobileFilterHeader>
                    <MobileFilterWrapper>
                      <div>
                        <MobileFilterHeading>Filters</MobileFilterHeading>
                        {this.props.filterSchema.ddoTags.map(ddoCategory => {
                          const {
                            name: filterName,
                            tags: schemaTags,
                          } = ddoCategory
                          const isActive = this.filterIsActive(filterName)
                          const items = this.getCategoryFilterItems(
                            filterName,
                            schemaTags,
                          )
                          return (
                            <IconListFilterMobile
                              key={filterName}
                              name={filterName}
                              selectType={SelectType.MultiSelect}
                              showFilterSubMenu={true}
                              isActive={isActive}
                              handleFilterReset={this.resetCategoryFilter}
                              handleToggleFilterShow={(): void =>
                                this.toggleFilterShow(isActive, filterName)
                              }
                              handleFilterItemClick={
                                this.props.handleFilterCategoryTag
                              }
                              items={items}
                            />
                          )
                        })}
                      </div>
                      <DoneButton
                        onClick={(): void =>
                          this.toggleMobileFilterMenuShow('Category')
                        }
                      >
                        Done
                      </DoneButton>
                    </MobileFilterWrapper>
                  </MobileMenu>
                </MediaQuery>
              </>
            )}
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <Button onClick={this.props.handleResetFilters}>
                <Reset fill="#000" /> Reset
              </Button>
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <Button onClick={this.props.handleResetFilters}>
                <Reset fill="#000" />
              </Button>
            </MediaQuery>
          </div>
        </FiltersWrap>
      </div>
    )
  }
}
export default EntitiesFilter
