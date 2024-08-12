import { Flex, Grid } from '@mantine/core'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useMemo, useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services/entities'
import { TEntityModel } from 'types/entities'

import { RequestOverviewCard } from 'components/RequestOverviewCard'
import { Link } from 'react-router-dom'
import { useRequestsContext } from 'contexts/RequestsContext'
import ProtocolCard from 'components/ProtocolCard/ProtocolCard'

const Requests = () => {
  const { searchString } = useRequestsContext()
  const [requests, setRequests] = useState<TEntityModel[]>([])

  const filteredRequests = useMemo(() => {
    return searchString.length > 0 ? requests.filter((entity) => entity.profile?.name.includes(searchString)) : requests
  }, [searchString, requests])

  useEntitiesQuery({
    variables: {
      filter: {
        type: {
          in: ['protocol/project', 'protocol/request', 'protocol/dao'],
        },
      },
    },
    onCompleted: async (data) => {
      const nodes = data.entities?.nodes ?? []
      if (nodes.length > 0) {
        const updatedNodes = (await populateEntitiesForEntityExplorer(nodes as Entity[])) as TEntityModel[]
        const removeEmptyProtocols = updatedNodes.filter((node) => node.profile?.name !== '')
        setRequests(removeEmptyProtocols)
      }
    },
  })

  return (
    <Flex w='100%' h='100%' justify={'center'}>
      <Flex w='90%' mt={40}>
        <Grid w='100%'>
          {filteredRequests.map((request) => (
            <Grid.Col key={request.id} span={4}>
              <Link to={`/entity/${request.id}`}>
                <ProtocolCard entity={request} />
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}

export default Requests
