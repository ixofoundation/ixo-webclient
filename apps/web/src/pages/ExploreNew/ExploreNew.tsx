import { Box, Flex } from '@mantine/core'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useMemo, useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services/entities'
import { TEntityModel } from 'types/entities'

import { RequestOverviewCard } from 'components/RequestOverviewCard'
import { Link } from 'react-router-dom'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { currentRelayerNode } from 'constants/common'

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
    <Flex w='100%' h='100%' justify='center'>
      <Flex w='90%' mt={40} wrap='wrap' gap='md'>
        {filteredRequests.map((request) => (
          <Box key={request.id} mb={3}>
            <Link to={`/entity/${request.id}`}>
              <RequestOverviewCard entity={request} />
            </Link>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

export default ExploreNew
