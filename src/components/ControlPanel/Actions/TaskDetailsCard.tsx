import { useWallet } from 'wallet-connector'
import TaskCard from 'components/TaskCard/TaskCard'
import { useGetIid } from 'graphql/iid'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

function TaskDetailsCard() {
  const { id: taskCollectionId, entityId = '' } = useParams<{ id: string; entityId: string }>()

  const { claimTableData: tasks = [] } = useClaimTableData({ entityId })
  const { wallet } = useWallet()
  const entity = useAppSelector(getEntityById(entityId))

  const { data: iid } = useGetIid(wallet?.did ?? '')

  const task = useMemo(() => {
    return tasks?.find((task) => task.collection.id === taskCollectionId)
  }, [taskCollectionId, tasks])

  if (!task || !iid) {
    return null
  }
  return (
    <TaskCard
      task={task}
      iid={iid}
      entity={entity}
      buttonProps={{
        children: 'Submit New Claim',
        w: '100%',
        p: '10px 20px',
      }}
      w='100%'
    />
  )
}

export default TaskDetailsCard
