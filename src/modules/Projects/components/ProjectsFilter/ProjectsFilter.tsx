import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../lib/commonData'
import { Category } from '../../types'
import { FilterItem as IconListFilterItem } from './IconListFilter/types'
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
} from './ProjectsFilter.styles'
import IconListFilterDesktop from './IconListFilter/IconListFilterDesktop'
import IconListFilterMobile from './IconListFilter/IconListFilterMobile'
import DateFilterDesktop from './DateFilter/DateFilterDesktop'
import DateFilterMobile from './DateFilter/DateFilterMobile'
import Back from '../../../../assets/icons/Back'
import Reset from '../../../../assets/icons/Reset'
import Filter from '../../../../assets/icons/Filter'

interface State {
  activeFilter: string
  mobileFilterMenuOpen: boolean
}

interface Props {
  filterSchema: Schema
  startDate: any
  startDateFormatted: string
  endDate: any
  endDateFormatted: string
  dateSummary: string
  categories: Category[]
  categoriesSummary: string
  userProjects: boolean
  featuredProjects: boolean
  popularProjects: boolean
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

class ProjectsFilter extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      activeFilter: '',
      mobileFilterMenuOpen: false,
    }
  }

  filterIsActive = (filterName: string): boolean =>
    this.state.activeFilter === filterName

  toggleFilterShow = (isActive: boolean, filterName: string): void => {
    this.setState({
      activeFilter: isActive ? '' : filterName,
    })
  }

  toggleMobileFilterMenu = (): void => {
    if (this.state.mobileFilterMenuOpen) {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({ mobileFilterMenuOpen: !this.state.mobileFilterMenuOpen })
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

    if (this.props.userProjects) {
      filterItems.find(item => item.name === 'My Portfolio').isSelected = true
    } else {
      filterItems.find(item => item.name === 'Global').isSelected = true
    }

    if (this.props.featuredProjects) {
      filterItems.find(item => item.name === 'Featured').isSelected = true
    }

    if (this.props.popularProjects) {
      filterItems.find(item => item.name === 'Popular').isSelected = true
    }

    return filterItems
  }

  resetDateFilter = (): void => {
    this.setState({ activeFilter: '' })
    this.props.handleResetDatesFilter()
  }

  resetCategoryFilter = (filterName: string): void => {
    this.setState({ activeFilter: '' })
    this.props.handleResetCategoryFilter(filterName)
  }

  render(): JSX.Element {
    return (
      <div data-testid="ProjectsFilter">
        <FiltersWrap>
          <FilterInfo>Projects</FilterInfo>
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
              <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
                <Menu>
                  <IconListFilterDesktop
                    key={'View'}
                    name={'View'}
                    isActive={this.filterIsActive('View')}
                    handleFilterReset={this.props.handleResetCategoryFilter}
                    handleToggleFilterShow={(): void =>
                      this.toggleFilterShow(this.filterIsActive('View'), 'View')
                    }
                    handleFilterItemClick={this.props.handleFilterCategoryTag}
                    items={this.getViewFilterItems(
                      this.props.filterSchema.view.tags,
                    )}
                  />
                </Menu>
              </MediaQuery>
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
                          key={filterName}
                          name={filterName}
                          isActive={isActive}
                          handleFilterReset={
                            this.props.handleResetCategoryFilter
                          }
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
                    <Button onClick={this.props.handleResetFilters}>
                      <Reset fill="#000" />
                      Reset
                    </Button>
                  </Menu>
                </MediaQuery>
                <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
                  <BurgerMenuButton onClick={this.toggleMobileFilterMenu}>
                    <Filter fill="#000" />
                    {this.props.categoriesSummary}
                  </BurgerMenuButton>
                  <MobileMenu
                    className={
                      this.state.mobileFilterMenuOpen ? 'openMenu' : ''
                    }
                  >
                    <MobileFilterHeader>
                      <HeadingItem onClick={this.toggleMobileFilterMenu}>
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
                              isActive={isActive}
                              handleFilterReset={
                                this.props.handleResetCategoryFilter
                              }
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
                      <DoneButton onClick={this.toggleMobileFilterMenu}>
                        Done
                      </DoneButton>
                    </MobileFilterWrapper>
                  </MobileMenu>
                  <Button onClick={this.props.handleResetFilters}>
                    <Reset fill="#000" />
                  </Button>
                </MediaQuery>
              </>
            )}
          </div>
        </FiltersWrap>
      </div>
    )
  }
}
export default ProjectsFilter
