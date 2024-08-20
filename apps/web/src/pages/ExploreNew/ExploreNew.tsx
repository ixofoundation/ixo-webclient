import { Box, Flex } from '@mantine/core'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useMemo, useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services/entities'
import { TEntityModel } from 'types/entities'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { currentRelayerNode } from 'constants/common'
import { FeaturedEntities } from 'components/FeaturedEntities/FeaturedEntities'
import { EntitiesTable } from 'components/EntitiesTable/EntitiesTable'

const ExploreNew = () => {
  const [requests, setRequests] = useState<TEntityModel[]>([])
  const { setEntities } = useExplorerContext()

  const filteredRequests = useMemo(() => {
    return requests
  }, [requests])

  useEntitiesQuery({
    variables: {
      filter: {
        not: { type: { startsWith: 'asset' } },
        relayerNode: {
          equalTo: currentRelayerNode,
        },
      },
    },
    onCompleted: async (data) => {
      const nodes = data.entities?.nodes ?? []
      if (nodes.length > 0) {
        const updatedNodes = (await populateEntitiesForEntityExplorer(nodes as Entity[])) as TEntityModel[]
        setRequests(updatedNodes)
        setEntities(updatedNodes)
      }
    },
  })

  return (
    <Flex direction='column' w='100%' maw='100vw' h='100%' align='center'>
      <Box w='90%' mt={40} mx='auto'>
        <FeaturedEntities entities={filteredRequests.slice(0, 8)} />
      </Box>
      <Flex w='90%' mt={40} wrap='wrap' gap='md' mx='auto'>
        <EntitiesTable entities={filteredRequests.slice(8)} />
      </Flex>
    </Flex>
  )
}

export default ExploreNew
