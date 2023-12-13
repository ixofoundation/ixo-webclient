import { EntitiesHero } from './Components/EntitiesHero/EntitiesHero'
import { Spinner } from 'components/Spinner/Spinner'
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
  filterSector as filterSectorAction,
  getEntitiesFromGraphqlAction,
  updateEntityPropertyAction,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, TEntityModel } from 'types/entities'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useCallback, useEffect } from 'react'
import AssetCollections from './Components/Assets/Collections'
import { useQuery } from 'hooks/window'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { createEntityCard, withEntityData } from 'components'
import { useEntitiesQuery } from 'generated/graphql'
import { selectAccountAddress, selectAccountCWClient } from 'redux/account/account.selectors'
import { apiEntityToEntity } from 'utils/entities'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/configs/configs.selectors'

const relayerNode = process.env.REACT_APP_RELAYER_NODE

const EntitiesExplorer = () => {
  // Selectors
  const accountAddress = useAppSelector(selectAccountAddress)
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const filterQuery = useAppSelector(entitiesSelectors.selectFilterQuery)
  const filterSchema = useAppSelector(entitiesSelectors.selectFilterSchema)
  const filterSector = useAppSelector(entitiesSelectors.selectFilterSector)
  const filteredEntitiesCount = useAppSelector(entitiesSelectors.selectFilteredEntitiesCount)
  const cwClient = useAppSelector(selectAccountCWClient)
  const typeFromProps = useAppSelector(entitiesSelectors.selectSelectedEntitiesType)
  const entities = useAppSelector(entitiesSelectors.selectedFilteredEntities)

  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const { getQuery } = useQuery()
  const type: string | undefined = getQuery('type')
  const sector: string | undefined = getQuery('sector')

  const dispatch = useAppDispatch()

  const handleChangeEntitiesQuery = (query: string) => {
    dispatch(filterEntitiesQuery(query))
  }
  const handleChangeEntitiesType = useCallback((type: EntityType) => dispatch(changeEntitiesType(type)),[dispatch])
  const handleChangeSector = useCallback((sector: string) => dispatch(filterSectorAction(sector)), [dispatch])
  const updateEntities = useCallback((entities: any) => dispatch(getEntitiesFromGraphqlAction(entities)), [dispatch])
  const updateEntityProperties = useCallback((id: string, key: string, data: any, merge: boolean) =>
  dispatch(updateEntityPropertyAction(id, key, data, merge)), [dispatch])

  const tabletColumns = isTablet ? 2 : 3
  const columns = isMobile ? 1 : tabletColumns

  const { data, loading, refetch } = useEntitiesQuery({
    skip: entities.length > 0,
    fetchPolicy: 'cache-first',
    variables: {
      filter: {
        or: [
          {
            relayerNode: {
              equalTo: relayerNode,
            },
            entityVerified: {
              equalTo: true,
            },
          },
          {
            id: {
              equalTo: relayerNode,
            },
            entityVerified: {
              equalTo: true,
            },
          },
          {
            and: [
              {
                relayerNode: {
                  equalTo: relayerNode,
                },
              },
              {
                entityVerified: {
                  equalTo: true,
                },
              },
            ],
          },
          {
            and: [
              {
                entityVerified: {
                  in: [false, true],
                },
              },
              {
                owner: {
                  equalTo: accountAddress,
                },
              },
            ],
          },
        ],
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes ?? []
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

  const renderEntities = (): JSX.Element => {
    if (type === EntityType.Asset) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
            <EntitiesFilter filterSchema={filterSchema} />
            <EntitiesBody><AssetCollections /></EntitiesBody>
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
              {filteredEntitiesCount === 0 && (
                <NoEntitiesContainer>
                  <p>There are no {entityTypeMap[type as any]?.plural.toLowerCase()} that match your search criteria</p>
                </NoEntitiesContainer>
              )}
              {filteredEntitiesCount > 0 && (
                <InfiniteScroll
                  dataLength={entities.length} //This is important field to render the next data
                  //  TODO refetch next data
                  next={() => refetch()}
                  hasMore={hasMore}
                  columns={columns}
                >
                  {entities
                    .map((entity: TEntityModel) => {
                      const EntityCard = createEntityCard(type as EntityType)
                      const WrappedEntityCard = withEntityData(EntityCard)
                      return <WrappedEntityCard key={entity.id} {...entity} />
                    })
                    .filter(Boolean)}
                </InfiniteScroll>
              )}
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
    if (type !== typeFromProps) {
      handleChangeEntitiesType(type as any)
    }
  }, [type, handleChangeEntitiesType, typeFromProps])

  useEffect(() => {
    if (sector) {
      handleChangeSector(sector)
    }
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

export default EntitiesExplorer
