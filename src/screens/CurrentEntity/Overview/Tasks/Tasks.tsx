import { useWallet } from 'wallet-connector'
import { Box, Flex } from '@mantine/core'
import TaskCard from 'components/TaskCard/TaskCard'
import { useGetIid } from 'graphql/iid'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { useQuery } from 'hooks/window'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import ClaimForm from '../ClaimForm'
import OfferForm from '../OfferForm'
import { useState } from 'react'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { get } from 'lodash'

const Tasks = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const collectionId = getQuery('collectionId')
  const agentRole = getQuery('agentRole')
  const { wallet } = useWallet()
  const { data: iid } = useGetIid(wallet?.did ?? '')
  const { claimTableData: tasks, loading } = useClaimTableData({ entityId })
  const { setKeyValue, resetKeyValue, keyValue } = useKeyValueViewerContext()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  console.log({ entityId })

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (claimId && entity.claim) {
    return <ClaimForm claimId={claimId} />
  }

  if (collectionId && agentRole) {
    return <OfferForm claimCollectionId={collectionId} agentRole={agentRole} />
  }

  const handleRowClick = (entry: any) => {
    setKeyValue({ type: 'claim', data: entry })

    if (selectedId === get(entry, 'collection.id' ?? 'id')) {
      resetKeyValue()
      setSelectedId(null)
    } else {
      setSelectedId(get(entry, 'collection.id' ?? 'id'))
    }
  }

  return (
    <Flex w='100%' justify={'flex-start'} gap='md' p='md'>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          iid={iid}
          onClick={() => handleRowClick(task)}
          active={Boolean(selectedId === task?.collection?.id && keyValue)}
          entity={entity}
          w={350}
        />
      ))}
    </Flex>
  )
}

export default Tasks
