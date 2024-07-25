import { useWallet } from '@ixo-webclient/wallet-connector'
import { Box, Flex } from '@mantine/core'
import TaskCard from 'components/TaskCard/TaskCard'
import { useGetIid } from 'graphql/iid'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { useQuery } from 'hooks/window'
import { Link, useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import ClaimForm from '../ClaimForm'
import OfferForm from '../OfferForm'

const Tasks = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { claim } = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const collectionId = getQuery('collectionId')
  const agentRole = getQuery('agentRole')
  const { wallet } = useWallet()
  const { data: iid } = useGetIid(wallet?.did ?? '')
  const { claimTableData: tasks, loading } = useClaimTableData({ entityId })

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (claimId && claim) {
    return <ClaimForm claimId={claimId} />
  }

  if (collectionId && agentRole) {
    return <OfferForm claimCollectionId={collectionId} agentRole={agentRole} />
  }

  return (
    <Flex w='100%' justify={'flex-start'} gap='md' p='md'>
      {tasks.map((task) => (
        <Link to={task.collection.id} key={task.id}>
          <TaskCard key={task.id} task={task} iid={iid} />
        </Link>
      ))}
    </Flex>
  )
}

export default Tasks
