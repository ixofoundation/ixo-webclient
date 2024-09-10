import { Box, Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useQuery } from 'hooks/window'
import ClaimForm from '../ClaimForm'
import OfferForm from '../OfferForm'
import ClaimTable from './ClaimTable'

const Claims = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { claim } = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const collectionId = getQuery('collectionId')
  const agentRole = getQuery('agentRole')

  if (claimId && claim) {
    return <ClaimForm claimId={claimId} />
  }

  if (collectionId && agentRole) {
    return <OfferForm claimCollectionId={collectionId} agentRole={agentRole} />
  }

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <ClaimTable />
      </Box>
    </Flex>
  )
}

export default Claims
