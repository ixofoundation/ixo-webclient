import * as React from 'react'
import { RouteProps } from 'react-router'
import { Moment } from 'moment'
import ReactPaginate from 'react-paginate'
import CellCard from './Components/EntityCard/CellCard/CellCard2'
// import ProjectCard from './Components/EntityCard/ProjectCard/ProjectCard'
// import TemplateCard from './Components/EntityCard/TemplateCard/TemplateCard'
// import InvestmentCard from './Components/EntityCard/InvestmentCard/InvestmentCard'
// import OracleCard from './Components/EntityCard/OracleCard/OracleCard'
// import AssetCard from './Components/EntityCard/AssetCard/AssetCard'
import { EntitiesHero } from './Components/EntitiesHero/EntitiesHero'
import { Spinner } from 'components/Spinner/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import {
  Container,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
  Pagination,
} from './EntitiesExplorer.container.styles'
import {
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
  getEntitiesByType,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap } from 'types/entities'
import { Schema as FilterSchema } from './Components/EntitiesFilter/schema/types'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
// @ts-ignore
import detectGrid from 'detect-grid'
import { useEffect, useState } from 'react'
import AssetCollections from './Components/AssetCollections/AssetCollections'
import { useQuery } from 'hooks/window'
import { TEntityDDOTagModel } from 'types/protocol'
import { TEntityModel } from 'api/blocksync/types/entities'
// import { checkIsLaunchpadFromApiListedEntityData } from '../Entities.utils'

const entityFilters = {
  project: 'Project',
  projects: 'Project',
  oracle: 'Oracle',
  oracles: 'Oracle',
  investment: 'Investment',
  investments: 'Investment',
  dao: 'Dao',
  daos: 'Dao',
  protocol: 'Template',
  protocols: 'Template',
  template: 'Template',
  templates: 'Template',
  asset: 'Asset',
  assets: 'Asset',
}

export interface Props extends RouteProps {
  match: any
  type: EntityType
  entities: TEntityModel[]
  entitiesCount: number
  entityTypeMap: EntityTypeStrategyMap
  filteredEntitiesCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: TEntityDDOTagModel[]
  filterCategoriesSummary: string
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  filterItemOffset: number
  isLoadingEntities: boolean
  filterSchema: FilterSchema
  filterSector: string
  filterQuery: string
  filterCategoryTypeName: string
  handleGetEntitiesByType: (entityType: string) => void
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
  // [EntityType.Project]: ProjectCard,
  [EntityType.Dao]: CellCard,
  // [EntityType.Template]: TemplateCard,
  // [EntityType.Oracle]: OracleCard,
  // [EntityType.Investment]: InvestmentCard,
  // [EntityType.Asset]: AssetCard,
}

const EntitiesExplorer: React.FunctionComponent<Props> = (props) => {
  const [assistantPanelActive, setAssistantPanelActive] = useState(false)
  const [currentItems, setCurrentItems] = useState<any[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [selected, setSelected] = useState(0)
  const { getQuery } = useQuery()

  const resetWithDefaultViewFilters = (): void => {
    props.handleResetFilters()
  }

  const handlePageClick = (event: any): void => {
    setSelected(event.selected)
    const newOffset = (event.selected * itemsPerPage) % props.entities.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
    props.handleFilterItemOffset(newOffset)
  }

  const updateItemsPerPage = (): void => {
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

  const renderCards = (data: any): JSX.Element[] => {
    return (
      data &&
      data
        .map((entity: TEntityModel, index: any) => {
          return (
            EntityCard[props.type] &&
            React.createElement(EntityCard[props.type], {
              ...entity,
              key: index,
            })
          )
        })
        .filter(Boolean)
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
      filterCategoryTypeName,
    } = props

    const populateTitle = (): string => {
      const words = []
      if (!filterUserEntities && !filterFeaturedEntities && !filterPopularEntities) {
        words.push('All')
      } else if (filterUserEntities) {
        words.push('My')
      } else if (filterFeaturedEntities) {
        words.push('Featured')
      } else if (filterPopularEntities) {
        words.push('Popular')
      }

      const tags = filterCategories.find((cat) => cat.category === filterCategoryTypeName)?.tags

      if (tags && tags.length > 1) {
        words.push('Selected')
      } else if (tags && tags.length === 1) {
        words.push(tags[0])
      }

      words.push(entityTypeMap[type]?.plural)

      return words.join(' ')
    }

    const renderNoSearchFound = (): JSX.Element => (
      <NoEntitiesContainer>
        <p>There are no {entityTypeMap[props.type]?.plural.toLowerCase()} that match your search criteria</p>
      </NoEntitiesContainer>
    )

    const renderNonAssets = (): JSX.Element => (
      <>
        <div className='row row-eq-height'>{renderCards(currentItems)}</div>
        <Pagination className='d-flex justify-content-center'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            forcePage={selected}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel='Previous'
            renderOnZeroPageCount={null!}
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
          />
        </Pagination>
      </>
    )

    const renderAssets = (): JSX.Element => <AssetCollections />

    if (props.entitiesCount > 0) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
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
              handleFilterToggleUserEntities={props.handleFilterToggleUserEntities}
              handleFilterToggleFeaturedEntities={props.handleFilterToggleFeaturedEntities}
              handleFilterTogglePopularEntities={props.handleFilterTogglePopularEntities}
              handleResetFilters={resetWithDefaultViewFilters}
            />
            {props.filteredEntitiesCount === 0 && renderNoSearchFound()}
            {props.filteredEntitiesCount > 0 && type === EntityType.Asset && renderAssets()}
            {props.filteredEntitiesCount > 0 && type !== EntityType.Asset && renderNonAssets()}
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>No {entityTypeMap[props.type]?.plural.toLowerCase()} were found</p>
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
    let filter: string | undefined = getQuery('filter', true)
    filter = filter && filter.length > 0 ? filter.toLowerCase() : filter

    if (filter && Object.keys(entityFilters).includes(filter)) {
      props.handleChangeEntitiesType(EntityType[entityFilters[filter]])
    }
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

  useEffect(() => {
    props.handleGetEntitiesByType(props.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type])

  console.log({ entities: props.entities, entitiesCount: props.entitiesCount })

  return (
    <Container>
      <div className='d-flex w-100 h-100'>
        <div className='d-flex flex-column flex-grow-1 w-100 h-100'>
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
            <div style={{ height: '100%' }}>
              <Spinner info={`Loading ${props.entityTypeMap[props.type]?.plural}`} />
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
    entities: entitiesSelectors.selectedFilteredEntities2(state),
    entityTypeMap: entitiesSelectors.selectEntityConfig(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount2(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount2(state),
    filterDateFrom: entitiesSelectors.selectFilterDateFrom(state),
    filterDateTo: entitiesSelectors.selectFilterDateTo(state),
    filterDateFromFormatted: entitiesSelectors.selectFilterDateFromFormatted(state),
    filterDateToFormatted: entitiesSelectors.selectFilterDateToFormatted(state),
    filterDateSummary: entitiesSelectors.selectFilterDateSummary(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterCategoriesSummary: entitiesSelectors.selectFilterCategoriesSummary(state),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(state),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    filterItemOffset: entitiesSelectors.selectFilterItemOffset(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    filterQuery: entitiesSelectors.selectFilterQuery(state),
    filterCategoryTypeName: entitiesSelectors.selectFilterCategoryTypeName(state),
    isLoadingEntities: entitiesSelectors.selectIsLoadingEntities2(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetEntitiesByType: (entityType: string): void => dispatch(getEntitiesByType(entityType)),
  handleChangeEntitiesQuery: (query: string): void => dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void => dispatch(changeEntitiesType(type)),
  handleFilterToggleUserEntities: (userEntities: boolean): void => dispatch(filterToggleUserEntities(userEntities)),
  handleFilterTogglePopularEntities: (popularEntities: boolean): void =>
    dispatch(filterTogglePopularEntities(popularEntities)),
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean): void =>
    dispatch(filterToggleFeaturedEntities(featuredEntities)),
  handleFilterDates: (dateFrom: any, dateTo: any): void => dispatch(filterDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void => dispatch(filterCategoryTag(category, tag)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleFilterAddCategoryTag: (category: string, tag: string): void => dispatch(filterAddCategoryTag(category, tag)),
  handleFilterItemOffset: (itemOffset: number): void => dispatch(filterItemOffset(itemOffset)),
  handleResetCategoryFilter: (category: string): void => dispatch(resetCategoryFilter(category)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
  handleResetFilters: (): void => dispatch(resetFilters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesExplorer as any)
