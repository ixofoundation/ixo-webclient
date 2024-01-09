import React, { useState } from 'react'
import { Card } from '../Card'
import { Widget } from '../types'
import { ReactComponent as HandPaperIcon } from 'assets/images/icon-hand-paper.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ApplyToJoinModal } from 'components/Modals'
import { useAppSelector } from 'redux/hooks'
import { selectAllDeedOffersForEntityId } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { TEntityModel } from 'types/entities'
import { AgentRoles } from 'types/models'

interface Props {
  widget: Widget
}

const ActionsCard: React.FC<Props> = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { entityId } = useParams<{ entityId: string }>()
  const deedOffers: TEntityModel[] = useAppSelector(selectAllDeedOffersForEntityId(entityId))
  const [applyToJoinModalOpen, setApplyToJoinModalOpen] = useState(false)

  const handleSubmit = (collectionId: string, agentRole: AgentRoles) => {
    const search = new URLSearchParams()
    search.append('collectionId', collectionId)
    search.append('agentRole', agentRole)
    navigate({ pathname: pathname, search: search.toString() })
  }

  return (
    <>
      <Card
        icon={<HandPaperIcon />}
        title='Actions'
        columns={2}
        items={[
          {
            icon: <PlusIcon />,
            content: 'Offer',
            onClick: () => setApplyToJoinModalOpen(true),
          },
        ]}
      />
      {applyToJoinModalOpen && (
        <ApplyToJoinModal
          offers={deedOffers}
          open={applyToJoinModalOpen}
          onClose={() => setApplyToJoinModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default ActionsCard
