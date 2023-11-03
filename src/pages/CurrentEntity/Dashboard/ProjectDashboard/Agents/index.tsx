import { FlexBox } from 'components/App/App.styles'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useQuery } from 'hooks/window'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ClaimCollectionCategory from '../../components/ClaimCollectionCategory'
import AgentUsers from './AgentUsers'

const Agents: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  return (
    <FlexBox direction='column' gap={6} width='100%'>
      <FlexBox width='100%' gap={2} flexWrap='wrap'>
        {claimCollections.map((claimCollection: any) => (
          <ClaimCollectionCategory
            key={claimCollection.id}
            claimCollection={claimCollection}
            selected={claimCollection.id === collectionId}
            onSelect={() => {
              const search = new URLSearchParams()
              search.append('collectionId', claimCollection.id)
              history.push({ pathname: history.location.pathname, search: search.toString() })
            }}
          />
        ))}
      </FlexBox>

      {collectionId && <AgentUsers />}
    </FlexBox>
  )
}

export default Agents
