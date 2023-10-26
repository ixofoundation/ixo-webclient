import * as React from 'react'
import { RouteProps } from 'react-router'
import CellCard from './Components/EntityCard/CellCard/CellCard'
import ProjectCard from './Components/EntityCard/ProjectCard/ProjectCard'
import OracleCard from './Components/EntityCard/OracleCard/OracleCard'
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
  filterSector,
  getEntitiesFromGraphqlAction,
  updateEntityPropertyAction,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap, TEntityDDOTagModel, TEntityModel } from 'types/entities'
import { Schema as FilterSchema } from './Components/EntitiesFilter/schema/types'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useEffect } from 'react'
import AssetCollections from './Components/Assets/Collections'
import { useQuery } from 'hooks/window'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import ProtocolCard from './Components/EntityCard/ProtocolCard'
import InvestmentCard from './Components/EntityCard/InvestmentCard'
import { useEntitiesQuery } from 'generated/graphql'
import { selectAccountAddress, selectAccountCWClient } from 'redux/account/account.selectors'
import { apiEntityToEntity } from 'utils/entities'

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
  [EntityType.Investment]: InvestmentCard,
  // [EntityType.Asset]: AssetCard,
}

const mapStateToProps = (state: RootState) => {
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
    accountAddress: selectAccountAddress(state),
    cwClient: selectAccountCWClient(state),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  handleChangeEntitiesQuery: (query: string): void => dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void => dispatch(changeEntitiesType(type)),
  handleChangeSector: (sector: string): void => dispatch(filterSector(sector)),
  updateEntities: (entities: any): void => dispatch(getEntitiesFromGraphqlAction(entities)),
  updateEntityProperties: (id: string, key: string, data: any, merge: boolean) =>
    dispatch(updateEntityPropertyAction(id, key, data, merge)),
})

type EntitiesExplorerProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const EntitiesExplorer = ({
  accountAddress,
  updateEntityProperties,
  updateEntities,
  handleChangeSector,
  entityTypeMap,
  filterQuery,
  filterSchema,
  filterSector,
  filteredEntitiesCount,
  handleChangeEntitiesQuery,
  handleChangeEntitiesType,
  cwClient,
  type: typeFromProps,
  entities,
}: EntitiesExplorerProps) => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const { getQuery } = useQuery()
  const type: string | undefined = getQuery('type')
  const sector: string | undefined = getQuery('sector')
  const relayerNode = process.env.REACT_APP_RELAYER_NODE

  const { data, loading, refetch } = useEntitiesQuery({
    variables: {
      filter: {
        not: { type: { startsWith: 'asset' } },
        or: [
          { relayerNode: { equalTo: relayerNode }, entityVerified: { equalTo: true } },
          { id: { equalTo: relayerNode }, entityVerified: { equalTo: true } },
          { and: [{ relayerNode: { equalTo: relayerNode } }, { entityVerified: { equalTo: true } }] },
          {
            ...(accountAddress && {
              and: [{ entityVerified: { equalTo: false } }, { owner: { equalTo: accountAddress } }],
            }),
          },
        ],
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes || []
      if (nodes.length > 0) {
        updateEntities(nodes)
        for (const entity of nodes) {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            updateEntityProperties(entity.id, key, data, merge)
          })
        }
      }
    },
  })

  const hasMore = Boolean(data?.entities?.pageInfo.hasNextPage)

  const renderCards = (data: any): JSX.Element[] => {
    return data
      ?.map((entity: TEntityModel, index: number) => {
        return (
          EntityCard[(type?.startsWith('protocol/') ? 'protocol' : type) as any] &&
          React.createElement(EntityCard[type as any], {
            ...entity,
            key: `card-${index}`,
          })
        )
      })
      .filter(Boolean)
  }

  const renderEntities = (): JSX.Element => {
    const renderNoSearchFound = (): JSX.Element => (
      <NoEntitiesContainer>
        <p>There are no {entityTypeMap[type as any]?.plural.toLowerCase()} that match your search criteria</p>
      </NoEntitiesContainer>
    )

    const renderNonAssets = (): JSX.Element => (
      <InfiniteScroll
        dataLength={entities.length} //This is important field to render the next data
        // TODO: fetch next 10 records
        next={() => {
          refetch()
        }}
        hasMore={hasMore}
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
            <EntitiesFilter filterSchema={filterSchema} />
            <EntitiesBody>{renderAssets()}</EntitiesBody>
          </div>
        </EntitiesContainer>
      )
    }

    if (entities.length > 0) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
            <EntitiesFilter filterSchema={filterSchema} />
            <EntitiesBody>
              {filteredEntitiesCount === 0 && renderNoSearchFound()}
              {filteredEntitiesCount > 0 && renderNonAssets()}
            </EntitiesBody>
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>No {entityTypeMap[type as any]?.plural.toLowerCase()} were found</p>
        </ErrorContainer>
      )
    }
  }

  useEffect(() => {
    if (type) {
      handleChangeEntitiesType(type as any)
    }
  }, [type, handleChangeEntitiesType])

  useEffect(() => {
    handleChangeSector(sector || '')
  }, [sector, handleChangeSector])

  return (
    <Container>
      <div className='d-flex w-100 h-100'>
        <div className='d-flex flex-column flex-grow-1 w-100 h-100'>
          <EntitiesHero
            type={typeFromProps as EntityType}
            filterSector={filterSector}
            showSearch={true}
            filterQuery={filterQuery}
            handleChangeQuery={handleChangeEntitiesQuery}
          />
          {entityTypeMap && loading && (
            <div style={{ height: '100%' }}>
              <Spinner info={`Loading ${entityTypeMap[type as any]?.plural}`} />
            </div>
          )}
          {renderEntities()}
        </div>
      </div>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesExplorer as any)
