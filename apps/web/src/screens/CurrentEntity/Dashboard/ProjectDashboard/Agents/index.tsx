import { FlexBox } from 'components/CoreEntry/App.styles'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useQuery } from 'hooks/window'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ClaimCollectionCategory from '../../components/ClaimCollectionCategory'
import AgentUsers from './AgentUsers'

const Agents: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  return (
    <FlexBox $direction='column' $gap={6} width='100%'>
      <FlexBox width='100%' $gap={2} $flexWrap='wrap'>
        {claimCollections.map((claimCollection: any) => (
          <ClaimCollectionCategory
            key={claimCollection.id}
            claimCollection={claimCollection}
            selected={claimCollection.id === collectionId}
            onSelect={() => {
              const search = new URLSearchParams()
              search.append('collectionId', claimCollection.id)
              navigate({ pathname: location.pathname, search: search.toString() })
            }}
          />
        ))}
      </FlexBox>

      {collectionId && <AgentUsers />}
    </FlexBox>
  )
}

export default Agents
