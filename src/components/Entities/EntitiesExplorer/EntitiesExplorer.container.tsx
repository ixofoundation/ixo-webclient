import * as React from 'react'
import { RouteProps } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import CellCard from './Components/EntityCard/CellCard/CellCard2'
// import ProjectCard from './Components/EntityCard/ProjectCard/ProjectCard'
// import TemplateCard from './Components/EntityCard/TemplateCard/TemplateCard'
// import InvestmentCard from './Components/EntityCard/InvestmentCard/InvestmentCard'
import OracleCard from './Components/EntityCard/OracleCard/OracleCard2'
// import AssetCard from './Components/EntityCard/AssetCard/AssetCard'
import { EntitiesHero } from './Components/EntitiesHero/EntitiesHero'
import { Spinner } from 'components/Spinner/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import {
  Container,
  EntitiesBody,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
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
import { useEffect, useState } from 'react'
import AssetCollections from './Components/AssetCollections/AssetCollections'
import { useQuery } from 'hooks/window'
import { TEntityDDOTagModel } from 'types/protocol'
import { TEntityModel } from 'api/blocksync/types/entities'
// import { checkIsLaunchpadFromApiListedEntityData } from '../Entities.utils'

// const entityFilters = {
//   project: 'Project',
//   projects: 'Project',
//   oracle: 'Oracle',
//   oracles: 'Oracle',
//   investment: 'Investment',
//   investments: 'Investment',
//   dao: 'Dao',
//   daos: 'Dao',
//   protocol: 'Template',
//   protocols: 'Template',
//   template: 'Template',
//   templates: 'Template',
//   asset: 'Asset',
//   assets: 'Asset',
// }

export interface Props extends RouteProps {
  match: any
  type: EntityType
  entities: TEntityModel[]
  entitiesCount: number
  entityTypeMap: EntityTypeStrategyMap
  filteredEntitiesCount: number
  filterDateFrom: string
  filterDateFromFormatted: string
  filterDateTo: string
  filterDateToFormatted: string
  filterDateRange: { dateFrom: string; dateTo: string }
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
  handleChangeEntitiesType: (type: string) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleFilterDates: (dateFrom: string, dateTo: string) => void
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
  // [EntityType.Protocol]: TemplateCard,
  [EntityType.Oracle]: OracleCard,
  // [EntityType.Investment]: InvestmentCard,
  // [EntityType.Asset]: AssetCard,
}

const EntitiesExplorer: React.FunctionComponent<Props> = (props) => {
  const { getQuery } = useQuery()
  const [assistantPanelActive, setAssistantPanelActive] = useState(false)
  const itmesCount = 3
  const [offset, setOffest] = useState(1)
  const entities = React.useMemo(() => props.entities.slice(0, offset * itmesCount), [offset, props.entities])

  const resetWithDefaultViewFilters = (): void => {
    props.handleResetFilters()
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
      <InfiniteScroll
        dataLength={entities.length} //This is important field to render the next data
        next={() => {
          setTimeout(() => {
            setOffest((offset) => offset + 1)
          }, 1000 * 3)
        }}
        hasMore={entities.length < props.entities.length}
        loader={<h4 style={{ width: '100%' }}>Loading...</h4>}
        endMessage={
          <p style={{ width: '100%', textAlign: 'center', gridColumn: 'span 3' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget='root'
      >
        {renderCards(entities)}
      </InfiniteScroll>
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
            <EntitiesBody>
              {props.filteredEntitiesCount === 0 && renderNoSearchFound()}
              {props.filteredEntitiesCount > 0 && type === EntityType.Asset && renderAssets()}
              {props.filteredEntitiesCount > 0 && type !== EntityType.Asset && renderNonAssets()}
            </EntitiesBody>
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
      document?.querySelector('body')?.classList?.add('overflow-hidden')
    } else {
      document?.querySelector('body')?.classList.remove('overflow-hidden')
    }

    setAssistantPanelActive(!assistantPanelActive)
  }

  useEffect(() => {
    const type: string | undefined = getQuery('type')
    if (type) {
      props.handleChangeEntitiesType(type)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.handleGetEntitiesByType(props.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type])

  return (
    <Container>
      <div className='d-flex w-100 h-100'>
        <div className='d-flex flex-column flex-grow-1 w-100 h-100'>
          <EntitiesHero
            type={props.type}
            filterSector={props.filterSector}
            showSearch={true}
            filterQuery={props.filterQuery}
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
    filterDateRange: entitiesSelectors.selectFilterDateRange(state),
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
  handleFilterDates: (dateFrom: string, dateTo: string): void => dispatch(filterDates(dateFrom, dateTo)),
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
