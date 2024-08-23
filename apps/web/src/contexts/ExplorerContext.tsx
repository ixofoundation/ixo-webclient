import { useDebouncedValue } from '@mantine/hooks'
import { currentRelayerNode } from 'constants/common'
import { useEntitiesQuery } from 'generated/graphql'
import { useQuery } from 'hooks/window'
import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { EntityInterface, setEntitiesLoading, setEntitiesState, setEntitiesStore } from 'redux/entitiesState/slice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getAllEntitiesData } from 'services/entities/entities'

interface ExplorerContextType {
  searchString: string
  setSearchString: React.Dispatch<React.SetStateAction<any>>
  entities: EntityInterface[]
  setEntities: (entities: EntityInterface[]) => void
  entitiesLoading: boolean
  entitiesQueryLoading: boolean
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined)

export const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [searchString, setSearchString] = useState<string>('')
  const [debouncedSearchString] = useDebouncedValue(searchString, 1500)
  const entities = useAppSelector((state) => state.entitiesState.entities)
  const entitiesStore = useAppSelector((state) => state.entitiesState.entitiesStore)
  const entitiesLoading = useAppSelector((state) => state.entitiesState.entitiesLoading)
  const dispatch = useAppDispatch()
  const { getQuery } = useQuery()
  const searchQuery = getQuery('query')

  const searchQueryArray = searchQuery
    ? searchQuery.includes(',')
      ? searchQuery.split(',').map((item: string) => item.trim())
      : [searchQuery]
    : ['project', 'dao', 'oracle']

  const { loading: entitiesQueryLoading } = useEntitiesQuery({
    skip: entities.length > 0 && !searchQuery,
    variables: {
      filter: {
        not: { type: { in: ['asset', 'asset/device'] } },
        relayerNode: {
          equalTo: currentRelayerNode,
        },
        type: {
          in: searchQueryArray,
        },
      },
    },
    onCompleted: async ({ entities }) => {
      const entitiesData = await getAllEntitiesData({ entities: entities?.nodes as unknown as EntityInterface[] })
      dispatch(setEntitiesState(entitiesData as any))
      dispatch(setEntitiesStore(entitiesData as any))
    },
  })

  const setEntities = (entities: EntityInterface[]) => {
    dispatch(setEntitiesState(entities))
  }

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch(setEntitiesLoading(loading))
    },
    [dispatch],
  )

  useEffect(() => {
    const matchesSearch = (entity: any) => {
      if (
        !entity.settings?.Profile ||
        !entity.settings?.Profile?.data ||
        !entity.settings?.Profile?.data?.name ||
        !entity.settings?.Profile?.data?.description
      )
        return false
      const nameMatch = entity.settings?.Profile.data.name.toLowerCase().includes(debouncedSearchString.toLowerCase())
      const descriptionMatch = entity.settings?.Profile.data.description
        .toLowerCase()
        .includes(debouncedSearchString.toLowerCase())
      return nameMatch || descriptionMatch
    }
    setLoading(true)
    if (debouncedSearchString.length > 0) {
      const filteredEntities = entitiesStore.filter(matchesSearch)
      if (JSON.stringify(filteredEntities) !== JSON.stringify(entities)) {
        dispatch(setEntitiesState(filteredEntities))
      }
    } else {
      if (JSON.stringify(entitiesStore) !== JSON.stringify(entities)) {
        dispatch(setEntitiesState(entitiesStore))
      }
    }
    setLoading(false)
  }, [debouncedSearchString, entitiesStore, entities, dispatch, setLoading])

  return (
    <ExplorerContext.Provider
      value={{ searchString, setSearchString, entities, setEntities, entitiesLoading, entitiesQueryLoading }}
    >
      {children}
    </ExplorerContext.Provider>
  )
}

export const useExplorerContext = () => {
  const context = useContext(ExplorerContext)
  if (!context) {
    throw new Error('useExplorerContext must be used within a ExplorerProvider')
  }
  return context
}
