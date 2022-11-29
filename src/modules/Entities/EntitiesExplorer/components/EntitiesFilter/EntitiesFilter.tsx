import React, { FC, useState } from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'lib/commonData'
import { DDOTagCategory } from '../../../../../redux/entitiesExplorer/entitiesExplorer.types'
import { FilterItem as IconListFilterItem, SelectType } from 'common/components/Filters/IconListFilter/types'
import { Schema, SchemaCategoryTag } from './schema/types'
import {
  FiltersWrap,
  FilterInfo,
  MobileFilterHeading,
  MobileFilterWrapper,
  MobileFilterHeader,
  HeadingItem,
  DoneButton,
  MobileMenu,
  BurgerMenuButton,
  ButtonIcon,
  ButtonOuter,
  ButtonInner,
} from 'common/components/Filters/Filters.styles'
import IconListFilterDesktop from 'common/components/Filters/IconListFilter/IconListFilterDesktop'
import IconListFilterMobile from 'common/components/Filters/IconListFilter/IconListFilterMobile'
import DateFilterDesktop from 'common/components/Filters/DateFilter/DateFilterDesktop'
import DateFilterMobile from 'common/components/Filters/DateFilter/DateFilterMobile'
import Back from 'assets/icons/Back'
import Filter from 'assets/icons/Filter'
import * as iconListFilterUtils from 'common/components/Filters/IconListFilter/IconListFilter.utils'
import IconButtonImage from 'common/components/Filters/IconListFilter/IconButtonImage'

// TODO - make this 2 separate components - Desktop and Mobile

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

const EntitiesFilter: FC<Props> = ({
  categories,
  sector,
  userEntities,
  featuredEntities,
  popularEntities,
  title,
  filterSchema,
  startDate,
  endDate,
  dateSummary,
  startDateFormatted,
  endDateFormatted,
  handleFilterDates,
  handleResetFilters,
  categoriesSummary,
  handleFilterToggleUserEntities,
  handleFilterToggleFeaturedEntities,
  handleFilterTogglePopularEntities,
  handleFilterAddCategoryTag,
  handleFilterCategoryTag,
  handleFilterSector,
  handleResetSectorFilter,
  handleResetDatesFilter,
  handleResetCategoryFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('')
  const [mobileFilterActiveMenu, setMobileFilterActiveMenu] = useState<string>('')

  const resetIsActive = (): boolean => {
    return categories.filter((category) => category.tags.length).length > 0
  }

  const filterIsActive = (filterName: string): boolean => activeFilter === filterName

  const toggleFilterShow = (isActive: boolean, filterName: string) => (): void => {
    setActiveFilter(isActive ? '' : filterName)
  }

  const toggleMobileFilterMenuShow = (menu: string) => (): void => {
    if (mobileFilterActiveMenu !== '') {
      document.querySelector('body')!.classList.remove('noScroll')
    } else {
      document.querySelector('body')!.classList.add('noScroll')
    }

    setMobileFilterActiveMenu(mobileFilterActiveMenu === menu ? '' : menu)
  }

  const getCategoryFilterItems = (filterName: string, ddoTags: SchemaCategoryTag[]): IconListFilterItem[] => {
    return ddoTags.map((ddoTag) => ({
      name: ddoTag.name,
      icon: ddoTag.icon,
      isSelected: categories.find((category) => category.name === filterName)!.tags.includes(ddoTag.name),
    }))
  }

  const getSectorFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    return tags.map((tag) => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: sector === tag.name,
    }))
  }

  const getViewFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    const filterItems = tags.map((tag) => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: false,
    }))

    filterItems.find((item) => item.name === 'My Portfolio')!.isSelected = userEntities
    filterItems.find((item) => item.name === 'Global')!.isSelected =
      !userEntities && !featuredEntities && !popularEntities
    filterItems.find((item) => item.name === 'Featured')!.isSelected = featuredEntities
    filterItems.find((item) => item.name === 'Popular')!.isSelected = popularEntities

    return filterItems
  }

  const filterViewTag = (name: string, tag: string): void => {
    switch (tag) {
      case 'My Portfolio':
        handleFilterToggleUserEntities(true)
        break
      case 'Global':
        handleFilterToggleUserEntities(false)
        break
      case 'Featured':
        handleFilterToggleFeaturedEntities(true)
        break
      case 'Popular':
        handleFilterTogglePopularEntities(true)
        break
    }
  }

  const filterCategoryTag = (category: string, tag: string, multiSelect: boolean): void => {
    if (multiSelect) {
      handleFilterAddCategoryTag(category, tag)
    } else {
      handleFilterCategoryTag(category, tag)
    }
  }

  const filterSector = (tag: string): void => {
    handleFilterSector(tag)
  }

  const resetSectorFilter = (): void => {
    setActiveFilter('')
    handleResetSectorFilter()
  }

  const resetDateFilter = (): void => {
    setActiveFilter('')
    handleResetDatesFilter()
  }

  const resetCategoryFilter = (category: string): void => {
    setActiveFilter('')
    handleResetCategoryFilter(category)
  }

  const resetViewFilter = (): void => {
    setActiveFilter('')
    handleFilterToggleUserEntities(true)
  }

  return (
    <div data-testid='EntitiesFilter'>
      <FiltersWrap>
        <FilterInfo>{title}</FilterInfo>
        <div className='filters'>
          <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
            {/* <Menu> */}
            <IconListFilterDesktop
              selectType={SelectType.SingleSelect}
              key='View'
              name='View'
              isActive={filterIsActive('View')}
              handleFilterReset={resetViewFilter}
              handleToggleFilterShow={toggleFilterShow(filterIsActive('View'), 'View')}
              handleFilterItemClick={filterViewTag}
              items={getViewFilterItems(filterSchema.view.tags)}
              primaryButton
              renderIcon
            />
            {filterSchema.ddoTags.map((schemaCategory) => {
              const { name: filterName, tags: schemaTags, multiSelect, hidden } = schemaCategory
              const isActive = filterIsActive(filterName)
              const items = getCategoryFilterItems(filterName, schemaTags)

              return (
                !hidden && (
                  <IconListFilterDesktop
                    selectType={multiSelect ? SelectType.MultiSelect : SelectType.SingleSelect}
                    key={filterName}
                    name={filterName}
                    isActive={isActive}
                    handleFilterReset={resetCategoryFilter}
                    handleToggleFilterShow={toggleFilterShow(isActive, filterName)}
                    handleFilterItemClick={(category, tag): void => filterCategoryTag(category, tag, multiSelect)}
                    items={items}
                  />
                )
              )
            })}
            <DateFilterDesktop
              startDate={startDate}
              endDate={endDate}
              dateSummary={dateSummary}
              isActive={activeFilter === filterSchema.dateCreated.name}
              handleFilterToggleShow={toggleFilterShow(
                activeFilter === filterSchema.dateCreated.name,
                filterSchema.dateCreated.name,
              )}
              handleFilterDateChange={handleFilterDates}
              handleResetFilter={resetDateFilter}
            />

            {!filterSchema.sector.hidden && (
              <IconListFilterDesktop
                selectType={filterSchema.sector.multiSelect ? SelectType.MultiSelect : SelectType.SingleSelect}
                key={filterSchema.sector.name}
                name={filterSchema.sector.name}
                isActive={filterIsActive(filterSchema.sector.name)}
                handleFilterReset={resetSectorFilter}
                handleToggleFilterShow={toggleFilterShow(
                  filterIsActive(filterSchema.sector.name),
                  filterSchema.sector.name,
                )}
                handleFilterItemClick={(category, tag): void => {
                  filterSector(tag)
                }}
                items={getSectorFilterItems(filterSchema.sector.tags)}
              />
            )}
            {/* </Menu> */}
          </MediaQuery>

          <MediaQuery maxWidth={`${deviceWidth.desktop - 1}px`}>
            <BurgerMenuButton onClick={toggleMobileFilterMenuShow('View')} className='contained'>
              <ButtonInner>
                <IconButtonImage icon={iconListFilterUtils.getTitleIcon(getViewFilterItems(filterSchema.view.tags))!} />
                {iconListFilterUtils.getTitle(
                  'View',
                  getViewFilterItems(filterSchema.view.tags),
                  SelectType.SingleSelect,
                )}
              </ButtonInner>
            </BurgerMenuButton>
            <MobileMenu className={mobileFilterActiveMenu === 'View' ? 'openMenu' : ''}>
              <MobileFilterWrapper>
                <div>
                  <IconListFilterMobile
                    key='View'
                    name='View'
                    showFilterSubMenu={false}
                    selectType={SelectType.SingleSelect}
                    isActive={filterIsActive('View')}
                    handleFilterReset={resetViewFilter}
                    handleToggleFilterShow={toggleMobileFilterMenuShow('View')}
                    handleFilterItemClick={filterViewTag}
                    items={getViewFilterItems(filterSchema.view.tags)}
                  />
                </div>
              </MobileFilterWrapper>
            </MobileMenu>
            <BurgerMenuButton onClick={toggleMobileFilterMenuShow('Category')}>
              <ButtonInner>
                <Filter fill='#000' />
                {categoriesSummary}
              </ButtonInner>
            </BurgerMenuButton>
            <MobileMenu className={mobileFilterActiveMenu === 'Category' ? 'openMenu' : ''}>
              <MobileFilterHeader>
                <HeadingItem onClick={toggleMobileFilterMenuShow('Category')}>
                  <Back />
                </HeadingItem>
                <HeadingItem onClick={handleResetFilters}>clear</HeadingItem>
              </MobileFilterHeader>
              <MobileFilterWrapper>
                <div>
                  <MobileFilterHeading>Filters</MobileFilterHeading>
                  {filterSchema.ddoTags.map((ddoCategory) => {
                    const { name: filterName, tags: schemaTags, multiSelect } = ddoCategory
                    const isActive = filterIsActive(filterName)
                    const items = getCategoryFilterItems(filterName, schemaTags)
                    return (
                      <IconListFilterMobile
                        key={filterName}
                        name={filterName}
                        selectType={multiSelect ? SelectType.MultiSelect : SelectType.SingleSelect}
                        showFilterSubMenu={true}
                        isActive={isActive}
                        handleFilterReset={resetCategoryFilter}
                        handleToggleFilterShow={toggleFilterShow(isActive, filterName)}
                        handleFilterItemClick={(category, tag): void => filterCategoryTag(category, tag, multiSelect)}
                        items={items}
                      />
                    )
                  })}

                  {!filterSchema.sector.hidden && (
                    <IconListFilterMobile
                      selectType={filterSchema.sector.multiSelect ? SelectType.MultiSelect : SelectType.SingleSelect}
                      key={filterSchema.sector.name}
                      name={filterSchema.sector.name}
                      showFilterSubMenu={true}
                      isActive={filterIsActive(filterSchema.sector.name)}
                      handleToggleFilterShow={toggleFilterShow(
                        filterIsActive(filterSchema.sector.name),
                        filterSchema.sector.name,
                      )}
                      handleFilterReset={resetSectorFilter}
                      handleFilterItemClick={(category, tag): void => {
                        filterSector(tag)
                      }}
                      items={getSectorFilterItems(filterSchema.sector.tags)}
                    />
                  )}
                </div>
                <DoneButton onClick={toggleMobileFilterMenuShow('Category')}>Done</DoneButton>
              </MobileFilterWrapper>
            </MobileMenu>

            <DateFilterMobile
              startDate={startDate}
              endDate={endDate}
              startDateDisplay={startDateFormatted}
              endDateDisplay={endDateFormatted}
              dateSummary={dateSummary}
              isActive={activeFilter === filterSchema.dateCreated.name}
              handleFilterToggleShow={toggleFilterShow(
                activeFilter === filterSchema.dateCreated.name,
                filterSchema.dateCreated.name,
              )}
              handleFilterDateChange={handleFilterDates}
              handleResetFilter={resetDateFilter}
            />
          </MediaQuery>

          <ButtonOuter onClick={handleResetFilters} disabled={!resetIsActive()}>
            <ButtonInner>
              <ButtonIcon iconSize={16} className='icon-reset' />
              Reset
            </ButtonInner>
          </ButtonOuter>
        </div>
      </FiltersWrap>
    </div>
  )
}

export default EntitiesFilter
