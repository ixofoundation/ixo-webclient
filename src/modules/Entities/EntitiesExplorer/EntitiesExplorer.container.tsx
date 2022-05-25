import * as React from 'react'
import { RouteProps } from 'react-router'
import { Moment } from 'moment'
import ReactPaginate from 'react-paginate'
import ProjectCard from './components/EntityCard/ProjectCard/ProjectCard'
import LaunchpadCard from './components/EntityCard/LaunchpadCard/LaunchpadCard'
import CellCard from './components/EntityCard/CellCard/CellCard'
import TemplateCard from './components/EntityCard/TemplateCard/TemplateCard'
import InvestmentCard from './components/EntityCard/InvestmentCard/InvestmentCard'
import OracleCard from './components/EntityCard/OracleCard/OracleCard'
import AssetCard from './components/EntityCard/AssetCard/AssetNewCard'
import { EntitiesHero } from './components/EntitiesHero/EntitiesHero'
import { Spinner } from 'common/components/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import {
  Container,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
  Pagination,
} from './EntitiesExplorer.container.styles'
import {
  getEntities,
  filterToggleUserEntities,
  filterToggleFeaturedEntities,
  filterTogglePopularEntities,
  filterDates,
  resetDatesFilter,
  filterAddCategoryTag,
  resetCategoryFilter,
  resetSectorFilter,
  resetFilters,
  changeEntitiesType,
  filterCategoryTag,
  filterSector,
  filterEntitiesQuery,
  filterItemOffset,
} from './EntitiesExplorer.actions'
import EntitiesFilter from './components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap } from '../types'
import { DDOTagCategory, ExplorerEntity } from './types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import * as entitiesSelectors from './EntitiesExplorer.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import detectGrid from 'detect-grid'
import { useEffect, useState } from 'react'

export interface Props extends RouteProps {
  match: any
  type: EntityType
  entities: ExplorerEntity[]
  entitiesCount: number
  entityTypeMap: EntityTypeStrategyMap
  filteredEntitiesCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: DDOTagCategory[]
  filterCategoriesSummary: string
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  filterItemOffset: number
  isLoadingEntities: boolean
  isLoggedIn: boolean
  filterSchema: FilterSchema
  filterSector: string
  filterQuery: string
  entityCategoryTypeName: string
  handleGetEntities: () => void
  handleChangeEntitiesQuery: (query: string) => void
  handleChangeEntitiesType: (type: EntityType) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleFilterAddCategoryTag: (category: string, tag: string) => void
  handleFilterSector: (category: string) => void
  handleFilterItemOffset: (itemOffset: number) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetSectorFilter: () => void
  handleResetFilters: () => void
}

const EntityCard: any = {
  [EntityType.Project]: ProjectCard,
  [EntityType.Cell]: CellCard,
  [EntityType.Template]: TemplateCard,
  [EntityType.Oracle]: OracleCard,
  [EntityType.Investment]: InvestmentCard,
  [EntityType.Asset]: AssetCard,
}

const EntitiesExplorer: React.FunctionComponent<Props> = (props) => {
  const [assistantPanelActive, setAssistantPanelActive] = useState(false)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [selected, setSelected] = useState(0)

  const resetWithDefaultViewFilters = (): void => {
    props.handleResetFilters()
  }

  const handlePageClick = (event): void => {
    setSelected(event.selected)
    const newOffset = (event.selected * itemsPerPage) % props.entities.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    )
    setItemOffset(newOffset)
    props.handleFilterItemOffset(newOffset)
  }

  const updateItemsPerPage = (): void => {
    console.log('updateItemsPerPage')
    const grid = document.querySelector('.cards-container')
    if (grid) {
      const rows = detectGrid(grid)
      if (rows.length > 1) {
        const itemsPerRow = rows[0].length

        switch (itemsPerRow) {
          case 4:
            setItemsPerPage(12)
            break
          case 3:
            setItemsPerPage(9)
            break
          case 2:
          case 1:
            setItemsPerPage(6)
            break
          default:
            break
        }
      }
    }
  }

  const renderCards = (): JSX.Element[] => {
    return (
      currentItems &&
      currentItems.map((entity: ExplorerEntity, index) => {
        // launchPad checking
        const isLaunchPad =
          entity.ddoTags
            .find((ddoTag) => ddoTag.name === 'Project Type')
            ?.tags.some((tag) => tag === 'Candidate') &&
          entity.ddoTags
            .find((ddoTag) => ddoTag.name === 'Stage')
            ?.tags.some((tag) => tag === 'Selection') &&
          entity.ddoTags
            .find((ddoTag) => ddoTag.name === 'Sector')
            ?.tags.some((tag) => tag === 'Campaign')

        if (isLaunchPad) {
          return React.createElement(LaunchpadCard, {
            ...entity,
            key: index,
          })
        }

        return React.createElement(EntityCard[props.type], {
          ...entity,
          key: index,
        })
      })
    )
  }

  const renderEntities = (): JSX.Element => {
    const {
      entityTypeMap,
      type,
      filterUserEntities,
      filterFeaturedEntities,
      filterPopularEntities,
      filterCategories,
      entityCategoryTypeName,
    } = props
    const populateTitle = (): string => {
      const words = []
      if (
        !filterUserEntities &&
        !filterFeaturedEntities &&
        !filterPopularEntities
      ) {
        words.push('All')
      } else if (filterUserEntities) {
        words.push('My')
      } else if (filterFeaturedEntities) {
        words.push('Featured')
      } else if (filterPopularEntities) {
        words.push('Popular')
      }

      const tags = filterCategories.find(
        (cat) => cat.name === entityCategoryTypeName,
      ).tags

      if (tags && tags.length > 1) {
        words.push('Selected')
      } else if (tags && tags.length === 1) {
        words.push(tags[0])
      }

      words.push(entityTypeMap[type].plural)

      return words.join(' ')
    }
    if (props.entitiesCount > 0) {
      return (
        <EntitiesContainer className="container-fluid">
          <div className="container">
            <EntitiesFilter
              title={populateTitle()}
              filterSchema={props.filterSchema}
              startDate={props.filterDateFrom}
              startDateFormatted={props.filterDateFromFormatted}
              endDate={props.filterDateTo}
              endDateFormatted={props.filterDateToFormatted}
              dateSummary={props.filterDateSummary}
              categories={props.filterCategories}
              categoriesSummary={props.filterCategoriesSummary}
              userEntities={props.filterUserEntities}
              featuredEntities={props.filterFeaturedEntities}
              popularEntities={props.filterPopularEntities}
              sector={props.filterSector}
              handleFilterDates={props.handleFilterDates}
              handleResetDatesFilter={props.handleResetDatesFilter}
              handleFilterCategoryTag={props.handleFilterCategoryTag}
              handleFilterSector={props.handleFilterSector}
              handleFilterAddCategoryTag={props.handleFilterAddCategoryTag}
              handleResetCategoryFilter={props.handleResetCategoryFilter}
              handleResetSectorFilter={props.handleResetSectorFilter}
              handleFilterToggleUserEntities={
                props.handleFilterToggleUserEntities
              }
              handleFilterToggleFeaturedEntities={
                props.handleFilterToggleFeaturedEntities
              }
              handleFilterTogglePopularEntities={
                props.handleFilterTogglePopularEntities
              }
              handleResetFilters={resetWithDefaultViewFilters}
            />
            {props.filteredEntitiesCount > 0 ? (
              <>
                <div className="row row-eq-height cards-container">
                  {renderCards()}
                </div>
                {/* {currentItems && ( */}
                <Pagination className="d-flex justify-content-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    forcePage={selected}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </Pagination>
                {/* )} */}
              </>
            ) : (
              <NoEntitiesContainer>
                <p>
                  There are no {entityTypeMap[props.type].plural.toLowerCase()}{' '}
                  that match your search criteria
                </p>
              </NoEntitiesContainer>
            )}
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>No {entityTypeMap[props.type].plural.toLowerCase()} were found</p>
        </ErrorContainer>
      )
    }
  }

  const assistantPanelToggle = (): void => {
    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('noScroll')
    } else {
      document?.querySelector('body')?.classList.remove('noScroll')
    }

    setAssistantPanelActive(!assistantPanelActive)
  }

  useEffect(() => {
    props.handleGetEntities()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateItemsPerPage)
    return (): void => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  useEffect(() => {
    // Fetch items from another resources.
    if (props.entities.length > 0) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(props.entities.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(props.entities.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, props.entities])

  useEffect(() => {
    if (props.entities.length > 0) {
      // setItemOffset(0)
      // setSelected(0)
    }
  }, [props.entities])

  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      updateItemsPerPage()
    }
  }, [currentItems])

  useEffect(() => {
    setItemOffset(props.filterItemOffset)
    setSelected(Math.floor(props.filterItemOffset / itemsPerPage))
  }, [props.filterItemOffset, itemsPerPage])

  return (
    <Container>
      <div className="d-flex w-100 h-100">
        <div className="d-flex flex-column flex-grow-1 w-100 h-100">
          <EntitiesHero
            type={props.type}
            filterSector={props.filterSector}
            showSearch={true}
            filterQuery={props.filterQuery}
            handleChangeEntitiesType={props.handleChangeEntitiesType}
            handleChangeQuery={props.handleChangeEntitiesQuery}
            assistantPanelToggle={assistantPanelToggle}
          />
          {props.entityTypeMap && props.isLoadingEntities && (
            <div style={{ height: 'calc(100% - 200px)' }}>
              <Spinner
                info={`Loading ${props.entityTypeMap[props.type].plural}`}
              />
            </div>
          )}
          {!props.isLoadingEntities && renderEntities()}
        </div>
      </div>
    </Container>
  )
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    entities: entitiesSelectors.selectedFilteredEntities(state),
    entityTypeMap: entitiesSelectors.selectEntityConfig(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount(state),
    filterDateFrom: entitiesSelectors.selectFilterDateFrom(state),
    filterDateTo: entitiesSelectors.selectFilterDateTo(state),
    filterDateFromFormatted: entitiesSelectors.selectFilterDateFromFormatted(
      state,
    ),
    filterDateToFormatted: entitiesSelectors.selectFilterDateToFormatted(state),
    filterDateSummary: entitiesSelectors.selectFilterDateSummary(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterCategoriesSummary: entitiesSelectors.selectFilterCategoriesSummary(
      state,
    ),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(
      state,
    ),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    filterItemOffset: entitiesSelectors.selectFilterItemOffset(state),
    isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    filterQuery: entitiesSelectors.selectFilterQuery(state),
    isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
    entityCategoryTypeName: entitiesSelectors.selectEntityCategoryTypeName(
      state,
    ),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetEntities: (): void => dispatch(getEntities()),
  handleChangeEntitiesQuery: (query: string): void =>
    dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void =>
    dispatch(changeEntitiesType(type)),
  handleFilterToggleUserEntities: (userEntities: boolean): void =>
    dispatch(filterToggleUserEntities(userEntities)),
  handleFilterTogglePopularEntities: (popularEntities: boolean): void =>
    dispatch(filterTogglePopularEntities(popularEntities)),
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean): void =>
    dispatch(filterToggleFeaturedEntities(featuredEntities)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterCategoryTag(category, tag)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleFilterAddCategoryTag: (category: string, tag: string): void =>
    dispatch(filterAddCategoryTag(category, tag)),
  handleFilterItemOffset: (itemOffset: number): void =>
    dispatch(filterItemOffset(itemOffset)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetCategoryFilter(category)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
  handleResetFilters: (): void => dispatch(resetFilters()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntitiesExplorer as any)
