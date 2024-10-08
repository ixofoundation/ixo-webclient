import React, { useState } from 'react'
import { Card } from '../Card'
import { Widget } from '../types'




import { ApplyToJoinModal } from 'components/Modals'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { AgentRoles } from 'types/models'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

interface Props {
  widget: Widget
}

const ActionsCard: React.FC<Props> = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { type } = useAppSelector(getEntityById(entityId))
  const [applyToJoinModalOpen, setApplyToJoinModalOpen] = useState(false)

  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)

  const handleSubmit = (collectionId: string, agentRole: AgentRoles) => {
    const search = new URLSearchParams()
    search.append('collectionId', collectionId)
    search.append('agentRole', agentRole)
    navigate({ pathname: pathname, search: search.toString() })
  }

  const showActions = claimCollections?.length > 0

  const actions = [
    ...(type === 'deed/request'
      ? [{ icon: <img src="/assets/images/icon-plus.svg"  />, content: 'Submit Offer', onClick: () => setApplyToJoinModalOpen(true) }]
      : []),
    ...(showActions ? [{ icon: <img src="/assets/images/icon-plus.svg"  />, content: 'Offer', onClick: () => setApplyToJoinModalOpen(true) }] : []),
  ]

  return (
    <>
      <Card icon={<img src="/assets/images/icon-hand-paper.svg"  />} title='Actions' columns={2} items={actions.filter(Boolean)} />
      {applyToJoinModalOpen && (
        <ApplyToJoinModal
          claimCollections={claimCollections}
          open={applyToJoinModalOpen}
          onClose={() => setApplyToJoinModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default ActionsCard
