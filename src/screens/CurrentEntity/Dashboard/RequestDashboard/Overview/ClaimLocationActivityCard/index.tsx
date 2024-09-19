import { Card } from 'screens/CurrentEntity/Components'


import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useMemo, useState } from 'react'
import { useEntitiesQuery } from 'generated/graphql'
import { TEntityModel } from 'types/entities'

const ClaimLocationActivityCard: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)

  const collectionEntityIds = useMemo(() => claimCollections.map((v) => v.entity), [claimCollections])
  const [, setCollectionEntities] = useState<TEntityModel[]>([])

  useEntitiesQuery({
    skip: collectionEntityIds.length === 0,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        id: { in: collectionEntityIds },
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes ?? []
      if (nodes.length > 0) {
        setCollectionEntities(nodes as TEntityModel[])
      }
    },
  })

  return (
    <Card label='Claim location activity' icon={<img src="/assets/images/icon-claim-location.svg"  />}>
      <Flex pos={'relative'} w={'100%'} h={'100%'}>
        {/* <MapImage longitude={cookStove?.longitude} latitude={cookStove?.latitude} /> */}
      </Flex>
    </Card>
  )
}

export default ClaimLocationActivityCard
