import { Box, Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useQuery } from 'hooks/window'
import ClaimForm from '../ClaimForm'
import OfferForm from '../OfferForm'
import TaskCard from 'components/TaskCard/TaskCard'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { useGetIid } from 'graphql/iid'
import { useWallet } from '@ixo-webclient/wallet-connector'

const Tasks = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { claim } = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const collectionId = getQuery('collectionId')
  const agentRole = getQuery('agentRole')
  const {wallet} = useWallet()
  const { data: iid } = useGetIid(wallet?.did ?? '')
  const { claimTableData: tasks, loading } = useClaimTableData({ entityId })


  if (claimId && claim) {
    return <ClaimForm claimId={claimId} />
  }

  if (collectionId && agentRole) {
    return <OfferForm claimCollectionId={collectionId} agentRole={agentRole} />
  }

  return (
    <Flex w='100%' justify={'flex-start'} gap='md' p='md'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} iid={iid} />
      ))}
    </Flex>
  )
}

export default Tasks
