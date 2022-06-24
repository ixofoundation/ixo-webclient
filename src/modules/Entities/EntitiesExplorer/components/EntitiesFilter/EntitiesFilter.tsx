import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'lib/commonData'
import { DDOTagCategory } from '../../types'
import { FilterItem as IconListFilterItem } from 'common/components/Filters/IconListFilter/types'
import { Schema, SchemaCategoryTag } from './schema/types'
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
} from 'common/components/Filters/Filters.styles'
import IconListFilterDesktop from 'common/components/Filters/IconListFilter/IconListFilterDesktop'
import IconListFilterMobile from 'common/components/Filters/IconListFilter/IconListFilterMobile'
import DateFilterDesktop from 'common/components/Filters/DateFilter/DateFilterDesktop'
import DateFilterMobile from 'common/components/Filters/DateFilter/DateFilterMobile'
import Back from 'assets/icons/Back'
import Reset from 'assets/icons/Reset'
import Filter from 'assets/icons/Filter'
import { SelectType } from 'common/components/Filters/IconListFilter/types'
import * as iconListFilterUtils from 'common/components/Filters/IconListFilter/IconListFilter.utils'

// TODO - make this 2 separate components - Desktop and Mobile

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
  categories: DDOTagCategory[]
  categoriesSummary: string
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
  sector: string
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleFilterSector: (tag: string) => void
  handleFilterAddCategoryTag: (category: string, tag: string) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetSectorFilter: () => void
  handleResetFilters: () => void
}

class EntitiesFilter extends React.Component<Props, State> {
  constructor(props: any) {
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
    if (this.state.mobileFilterActiveMenu !== '') {
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
    return ddoTags.map((ddoTag) => ({
      name: ddoTag.name,
      icon: ddoTag.icon,
      isSelected: this.props.categories
        .find((category) => category.name === filterName)
        .tags.includes(ddoTag.name),
    }))
  }

  getSectorFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    return tags.map((tag) => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: this.props.sector === tag.name,
    }))
  }

  getViewFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    const filterItems = tags.map((tag) => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: false,
    }))

    filterItems.find((item) => item.name === 'My Portfolio').isSelected =
      this.props.userEntities
    filterItems.find((item) => item.name === 'Global').isSelected =
      !this.props.userEntities &&
      !this.props.featuredEntities &&
      !this.props.popularEntities
    filterItems.find((item) => item.name === 'Featured').isSelected =
      this.props.featuredEntities
    filterItems.find((item) => item.name === 'Popular').isSelected =
      this.props.popularEntities

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

  filterCategoryTag = (
    category: string,
    tag: string,
    multiSelect: boolean,
  ): void => {
    if (multiSelect) {
      this.props.handleFilterAddCategoryTag(category, tag)
    } else {
      this.props.handleFilterCategoryTag(category, tag)
    }
  }

  filterSector = (tag: string): void => {
    this.props.handleFilterSector(tag)
  }

  resetSectorFilter = (): void => {
    this.setState({ activeFilter: '' })
    this.props.handleResetSectorFilter()
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
    const {
      title,
      filterSchema,
      startDate,
      endDate,
      dateSummary,
      startDateFormatted,
      endDateFormatted,
      handleFilterDates,
      handleResetFilters,
    } = this.props
    return (
      <div data-testid="EntitiesFilter">
        <FiltersWrap>
          <FilterInfo>{title}</FilterInfo>
          <div className="filters">
            <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
              <DateFilterDesktop
                startDate={startDate}
                endDate={endDate}
                dateSummary={dateSummary}
                isActive={
                  this.state.activeFilter === filterSchema.dateCreated.name
                }
                handleFilterToggleShow={(): void =>
                  this.toggleFilterShow(
                    this.state.activeFilter === filterSchema.dateCreated.name,
                    filterSchema.dateCreated.name,
                  )
                }
                handleFilterDateChange={handleFilterDates}
                handleResetFilter={this.resetDateFilter}
              />
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.desktop - 1}px`}>
              <DateFilterMobile
                startDate={startDate}
                endDate={endDate}
                startDateDisplay={startDateFormatted}
                endDateDisplay={endDateFormatted}
                dateSummary={dateSummary}
                isActive={
                  this.state.activeFilter === filterSchema.dateCreated.name
                }
                handleFilterToggleShow={(): void =>
                  this.toggleFilterShow(
                    this.state.activeFilter === filterSchema.dateCreated.name,
                    filterSchema.dateCreated.name,
                  )
                }
                handleFilterDateChange={handleFilterDates}
                handleResetFilter={this.resetDateFilter}
              />
            </MediaQuery>
            <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
              <Menu>
                <IconListFilterDesktop
                  selectType={SelectType.SingleSelect}
                  key="View"
                  name="View"
                  isActive={this.filterIsActive('View')}
                  handleFilterReset={this.resetViewFilter}
                  handleToggleFilterShow={(): void =>
                    this.toggleFilterShow(this.filterIsActive('View'), 'View')
                  }
                  handleFilterItemClick={this.filterViewTag}
                  items={this.getViewFilterItems(filterSchema.view.tags)}
                />
                {filterSchema.ddoTags.map((schemaCategory) => {
                  const {
                    name: filterName,
                    tags: schemaTags,
                    multiSelect,
                    hidden,
                  } = schemaCategory
                  const isActive = this.filterIsActive(filterName)
                  const items = this.getCategoryFilterItems(
                    filterName,
                    schemaTags,
                  )

                  return (
                    !hidden && (
                      <IconListFilterDesktop
                        selectType={
                          multiSelect
                            ? SelectType.MultiSelect
                            : SelectType.SingleSelect
                        }
                        key={filterName}
                        name={filterName}
                        isActive={isActive}
                        handleFilterReset={this.resetCategoryFilter}
                        handleToggleFilterShow={(): void =>
                          this.toggleFilterShow(isActive, filterName)
                        }
                        handleFilterItemClick={(category, tag): void =>
                          this.filterCategoryTag(category, tag, multiSelect)
                        }
                        items={items}
                      />
                    )
                  )
                })}

                {!filterSchema.sector.hidden && (
                  <IconListFilterDesktop
                    selectType={
                      filterSchema.sector.multiSelect
                        ? SelectType.MultiSelect
                        : SelectType.SingleSelect
                    }
                    key={filterSchema.sector.name}
                    name={filterSchema.sector.name}
                    isActive={this.filterIsActive(filterSchema.sector.name)}
                    handleFilterReset={this.resetSectorFilter}
                    handleToggleFilterShow={(): void =>
                      this.toggleFilterShow(
                        this.filterIsActive(filterSchema.sector.name),
                        filterSchema.sector.name,
                      )
                    }
                    handleFilterItemClick={(category, tag): void => {
                      this.filterSector(tag)
                    }}
                    items={this.getSectorFilterItems(filterSchema.sector.tags)}
                  />
                )}
              </Menu>
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.desktop - 1}px`}>
              <BurgerMenuButton
                onClick={(): void => this.toggleMobileFilterMenuShow('View')}
              >
                {iconListFilterUtils.getTitle(
                  'View',
                  this.getViewFilterItems(filterSchema.view.tags),
                  SelectType.SingleSelect,
                )}
              </BurgerMenuButton>
              <MobileMenu
                className={
                  this.state.mobileFilterActiveMenu === 'View' ? 'openMenu' : ''
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
                      items={this.getViewFilterItems(filterSchema.view.tags)}
                    />
                  </div>
                </MobileFilterWrapper>
              </MobileMenu>
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
                  <HeadingItem onClick={handleResetFilters}>clear</HeadingItem>
                </MobileFilterHeader>
                <MobileFilterWrapper>
                  <div>
                    <MobileFilterHeading>Filters</MobileFilterHeading>
                    {filterSchema.ddoTags.map((ddoCategory) => {
                      const {
                        name: filterName,
                        tags: schemaTags,
                        multiSelect,
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
                          selectType={
                            multiSelect
                              ? SelectType.MultiSelect
                              : SelectType.SingleSelect
                          }
                          showFilterSubMenu={true}
                          isActive={isActive}
                          handleFilterReset={this.resetCategoryFilter}
                          handleToggleFilterShow={(): void =>
                            this.toggleFilterShow(isActive, filterName)
                          }
                          handleFilterItemClick={(category, tag): void =>
                            this.filterCategoryTag(category, tag, multiSelect)
                          }
                          items={items}
                        />
                      )
                    })}

                    {!filterSchema.sector.hidden && (
                      <IconListFilterMobile
                        selectType={
                          filterSchema.sector.multiSelect
                            ? SelectType.MultiSelect
                            : SelectType.SingleSelect
                        }
                        key={filterSchema.sector.name}
                        name={filterSchema.sector.name}
                        showFilterSubMenu={true}
                        isActive={this.filterIsActive(filterSchema.sector.name)}
                        handleToggleFilterShow={(): void =>
                          this.toggleFilterShow(
                            this.filterIsActive(filterSchema.sector.name),
                            filterSchema.sector.name,
                          )
                        }
                        handleFilterReset={this.resetSectorFilter}
                        handleFilterItemClick={(category, tag): void => {
                          this.filterSector(tag)
                        }}
                        items={this.getSectorFilterItems(
                          filterSchema.sector.tags,
                        )}
                      />
                    )}
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
            <Button onClick={handleResetFilters}>
              <Reset fill="#000" />
              Reset
            </Button>
          </div>
        </FiltersWrap>
      </div>
    )
  }
}
export default EntitiesFilter
