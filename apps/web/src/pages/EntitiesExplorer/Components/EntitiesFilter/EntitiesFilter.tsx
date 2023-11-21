import React, { FC, useMemo, useState } from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { FilterItem as IconListFilterItem, SelectType } from 'components/Filters/IconListFilter/types'
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
} from 'components/Filters/Filters.styles'
import IconListFilterDesktop from 'components/Filters/IconListFilter/IconListFilterDesktop'
import IconListFilterMobile from 'components/Filters/IconListFilter/IconListFilterMobile'
import DateFilterDesktop from 'components/Filters/DateFilter/DateFilterDesktop'
import DateFilterMobile from 'components/Filters/DateFilter/DateFilterMobile'
import Back from 'assets/icons/Back'
import Filter from 'assets/icons/Filter'
import * as iconListFilterUtils from 'utils/filters'
import IconButtonImage from 'components/Filters/IconListFilter/IconButtonImage'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  selectFilterCategories,
  selectFilterCategoriesSummary,
  selectFilterCategoryTypeName,
  selectFilterDateFrom,
  selectFilterDateFromFormatted,
  selectFilterDateSummary,
  selectFilterDateTo,
  selectFilterDateToFormatted,
  selectFilterFeaturedEntities,
  selectFilterPopularEntities,
  selectFilterSector,
  selectFilterUserEntities,
  selectSelectedEntitiesType,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import {
  filterAddCategoryTag,
  filterCategoryTag,
  filterDates,
  filterToggleFeaturedEntities,
  filterTogglePopularEntities,
  filterToggleUserEntities,
  resetCategoryFilter,
  resetDatesFilter,
  resetFilters,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { selectEntityConfig, selectEntityConfigByGivenType } from 'redux/configs/configs.selectors'
import { Schema as FilterSchema } from 'pages/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'hooks/window'

// TODO - make this 2 separate components - Desktop and Mobile

interface Props {
  filterSchema: Schema
}

const EntitiesFilter: FC<Props> = () => {
  const navigate = useNavigate()
  const { query } = useQuery()
  const dispatch = useAppDispatch()
  const startDate = useAppSelector(selectFilterDateFrom)
  const endDate = useAppSelector(selectFilterDateTo)
  const startDateFormatted = useAppSelector(selectFilterDateFromFormatted)
  const endDateFormatted = useAppSelector(selectFilterDateToFormatted)
  const dateSummary = useAppSelector(selectFilterDateSummary)
  const categories = useAppSelector(selectFilterCategories)
  const userEntities = useAppSelector(selectFilterUserEntities)
  const featuredEntities = useAppSelector(selectFilterFeaturedEntities)
  const popularEntities = useAppSelector(selectFilterPopularEntities)
  const sector = useAppSelector(selectFilterSector)
  const categoriesSummary = useAppSelector(selectFilterCategoriesSummary)
  const categoryTypeName = useAppSelector(selectFilterCategoryTypeName)
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const type = useAppSelector(selectSelectedEntitiesType)
  const filterSchema: FilterSchema | undefined = useAppSelector(selectEntityConfigByGivenType(type))?.filterSchema

  const [activeFilter, setActiveFilter] = useState<string>('')
  const [mobileFilterActiveMenu, setMobileFilterActiveMenu] = useState<string>('')

  const title = useMemo(() => {
    const words = []
    if (!userEntities && !featuredEntities && !popularEntities) {
      words.push('All')
    } else if (userEntities) {
      words.push('My')
    } else if (featuredEntities) {
      words.push('Featured')
    } else if (popularEntities) {
      words.push('Popular')
    }

    const tags = categories.find((cat) => cat.category === categoryTypeName)?.tags

    if (tags && tags.length > 1) {
      words.push('Selected')
    } else if (tags && tags.length === 1) {
      words.push(tags[0])
    }

    words.push(entityTypeMap[type]?.plural)

    return words.join(' ')
  }, [categories, categoryTypeName, entityTypeMap, featuredEntities, popularEntities, type, userEntities])

  const resetIsActive = (): boolean => {
    return categories.filter((category) => category.tags.length).length > 0 || !!startDate || !endDate
  }

  const filterIsActive = (filterName: string): boolean => activeFilter === filterName

  const toggleFilterShow = (isActive: boolean, filterName: string) => (): void => {
    setActiveFilter(isActive ? '' : filterName)
  }

  const toggleMobileFilterMenuShow = (menu: string) => (): void => {
    if (mobileFilterActiveMenu !== '') {
      document.querySelector('body')!.classList.remove('overflow-hidden')
    } else {
      document.querySelector('body')!.classList.add('overflow-hidden')
    }

    setMobileFilterActiveMenu(mobileFilterActiveMenu === menu ? '' : menu)
  }

  const getCategoryFilterItems = (filterName: string, ddoTags: SchemaCategoryTag[]): IconListFilterItem[] => {
    return ddoTags.map((ddoTag) => ({
      name: ddoTag.name,
      icon: ddoTag.icon,
      isSelected: !!categories.find((category) => category.category === filterName)?.tags.includes(ddoTag.name),
    }))
  }

  const getSectorFilterItems = (tags: SchemaCategoryTag[]): IconListFilterItem[] => {
    return tags.map((tag) => ({
      name: tag.name,
      icon: tag.icon,
      isSelected: sector === tag.name,
    }))
  }

  const getViewFilterItems = (tags: undefined | SchemaCategoryTag[]): IconListFilterItem[] => {
    const filterItems = (tags ?? []).map((tag) => ({
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
        dispatch(filterToggleUserEntities(true))
        break
      case 'Global':
        dispatch(filterToggleUserEntities(false))
        break
      case 'Featured':
        dispatch(filterToggleFeaturedEntities(true))
        break
      case 'Popular':
        dispatch(filterTogglePopularEntities(true))
        break
    }
  }

  const handleFilterCategoryTag = (category: string, tag: string, multiSelect: boolean): void => {
    if (multiSelect) {
      dispatch(filterAddCategoryTag(category, tag))
    } else {
      dispatch(filterCategoryTag(category, tag))
    }
  }

  const handleFilterSector = (sector: string): void => {
    query.set('sector', sector)
    navigate({ search: query.toString() }, { replace: true})
  }

  const handleResetSectorFilter = (): void => {
    setActiveFilter('')
    query.delete('sector')
    navigate({ search: query.toString() }, { replace: true})
  }

  const handleResetDateFilter = (): void => {
    setActiveFilter('')
    dispatch(resetDatesFilter())
  }

  const handleResetCategoryFilter = (category: string): void => {
    setActiveFilter('')
    dispatch(resetCategoryFilter(category))
  }

  const resetViewFilter = (): void => {
    setActiveFilter('')
    dispatch(filterToggleUserEntities(userEntities))
  }

  const handleFilterDates = (startDate: string, endDate: string) => {
    dispatch(filterDates(startDate, endDate))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  if (!filterSchema) {
    return null
  }

  return (
    <div data-testid='EntitiesFilter'>
      <FiltersWrap>
        <FilterInfo>{title}</FilterInfo>
        <div className='filters'>
          {/* Desktop */}
          <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
            {/* <Menu> */}
            <IconListFilterDesktop
              selectType={SelectType.SingleSelect}
              key='View'
              name='View'
              isActive={filterIsActive('View')}
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
                    handleFilterReset={handleResetCategoryFilter}
                    handleToggleFilterShow={toggleFilterShow(isActive, filterName)}
                    handleFilterItemClick={(category, tag): void => handleFilterCategoryTag(category, tag, multiSelect)}
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
              handleResetFilter={handleResetDateFilter}
            />

            {!filterSchema.sector.hidden && (
              <IconListFilterDesktop
                selectType={filterSchema.sector.multiSelect ? SelectType.MultiSelect : SelectType.SingleSelect}
                key={filterSchema.sector.name}
                name={filterSchema.sector.name}
                isActive={filterIsActive(filterSchema.sector.name)}
                handleFilterReset={handleResetSectorFilter}
                handleToggleFilterShow={toggleFilterShow(
                  filterIsActive(filterSchema.sector.name),
                  filterSchema.sector.name,
                )}
                handleFilterItemClick={(category, tag): void => {
                  handleFilterSector(tag)
                }}
                items={getSectorFilterItems(filterSchema.sector.tags)}
              />
            )}
            {/* </Menu> */}
          </MediaQuery>

          {/* Mobile */}
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
                        handleFilterReset={handleResetCategoryFilter}
                        handleToggleFilterShow={toggleFilterShow(isActive, filterName)}
                        handleFilterItemClick={(category, tag): void =>
                          handleFilterCategoryTag(category, tag, multiSelect)
                        }
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
                      handleFilterReset={handleResetSectorFilter}
                      handleFilterItemClick={(category, tag): void => {
                        handleFilterSector(tag)
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
              handleResetFilter={handleResetDateFilter}
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
