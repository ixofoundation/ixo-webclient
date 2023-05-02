import * as React from 'react'
import { RouteProps } from 'react-router'
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
  changeEntitiesType,
  filterEntitiesQuery,
  getEntitiesByType,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap } from 'types/entities'
import { Schema as FilterSchema } from './Components/EntitiesFilter/schema/types'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useEffect, useState } from 'react'
import AssetCollections from './Components/Assets/Collections'
import { useQuery } from 'hooks/window'
import { TEntityDDOTagModel } from 'types/protocol'
import { TEntityModel } from 'api/blocksync/types/entities'
import { InfiniteScroll } from 'components/InfiniteScroll'
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
  filterCategories: TEntityDDOTagModel[]
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
  const itemsCount = 6
  const [scrollOffset, setScrollOffest] = useState(1)
  const entities = React.useMemo(
    () => props.entities.slice(0, scrollOffset * itemsCount),
    [scrollOffset, props.entities],
  )

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
    const { entityTypeMap, type } = props

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
            setScrollOffest((scrollOffset) => scrollOffset + 1)
          }, 1000 * 3)
        }}
        hasMore={entities.length < props.entities.length}
        columns={3}
      >
        {renderCards(entities)}
      </InfiniteScroll>
    )

    const renderAssets = (): JSX.Element => <AssetCollections />

    if (type === EntityType.Asset) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
            <EntitiesFilter filterSchema={props.filterSchema} />
            <EntitiesBody>{renderAssets()}</EntitiesBody>
          </div>
        </EntitiesContainer>
      )
    }

    if (props.entitiesCount > 0) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
            <EntitiesFilter filterSchema={props.filterSchema} />
            <EntitiesBody>
              {props.filteredEntitiesCount === 0 && renderNoSearchFound()}
              {props.filteredEntitiesCount > 0 && renderNonAssets()}
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
    filterCategories: entitiesSelectors.selectFilterCategories(state),
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
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesExplorer as any)
