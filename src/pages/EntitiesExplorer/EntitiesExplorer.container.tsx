import * as React from 'react'
import { RouteProps } from 'react-router'
import CellCard from './Components/EntityCard/CellCard/CellCard'
import ProjectCard from './Components/EntityCard/ProjectCard/ProjectCard'
// import TemplateCard from './Components/EntityCard/TemplateCard/TemplateCard'
// import InvestmentCard from './Components/EntityCard/InvestmentCard/InvestmentCard'
import OracleCard from './Components/EntityCard/OracleCard/OracleCard'
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
import { changeEntitiesType, filterEntitiesQuery, filterSector } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap, TEntityDDOTagModel, TEntityModel } from 'types/entities'
import { Schema as FilterSchema } from './Components/EntitiesFilter/schema/types'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useEffect, useState } from 'react'
import AssetCollections from './Components/Assets/Collections'
import { useQuery } from 'hooks/window'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import ProtocolCard from './Components/EntityCard/ProtocolCard'

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
  handleChangeEntitiesQuery: (query: string) => void
  handleChangeEntitiesType: (type: string) => void
  handleChangeSector: (sector: string) => void
}

const EntityCard: any = {
  [EntityType.Project]: ProjectCard,
  [EntityType.Dao]: CellCard,
  [EntityType.Protocol]: ProtocolCard,
  [EntityType.Oracle]: OracleCard,
  // [EntityType.Investment]: InvestmentCard,
  // [EntityType.Asset]: AssetCard,
}

const EntitiesExplorer: React.FunctionComponent<Props> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const { getQuery } = useQuery()
  const type: string | undefined = getQuery('type')
  const sector: string | undefined = getQuery('sector')
  const itemsCount = 6
  const [scrollOffset, setScrollOffest] = useState(1)
  const entities = React.useMemo(
    () => props.entities.slice(0, scrollOffset * itemsCount),
    [scrollOffset, props.entities],
  )

  const renderCards = (data: any): JSX.Element[] => {
    return data
      ?.map((entity: TEntityModel, index: number) => {
        return (
          EntityCard[props.type.startsWith('protocol/') ? 'protocol' : props.type] &&
          React.createElement(EntityCard[props.type], {
            ...entity,
            key: `card-${index}`,
          })
        )
      })
      .filter(Boolean)
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
        columns={!isMobile ? (!isTablet ? 3 : 2) : 1}
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

  useEffect(() => {
    if (type) {
      props.handleChangeEntitiesType(type)
    }
    // eslint-disable-next-line
  }, [type])

  useEffect(() => {
    props.handleChangeSector(sector || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sector])

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
    entities: entitiesSelectors.selectedFilteredEntities(state),
    entityTypeMap: entitiesSelectors.selectEntityConfig(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(state),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    filterItemOffset: entitiesSelectors.selectFilterItemOffset(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    filterQuery: entitiesSelectors.selectFilterQuery(state),
    filterCategoryTypeName: entitiesSelectors.selectFilterCategoryTypeName(state),
    isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleChangeEntitiesQuery: (query: string): void => dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void => dispatch(changeEntitiesType(type)),
  handleChangeSector: (sector: string): void => dispatch(filterSector(sector)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesExplorer as any)
