import React from 'react'
import { Card } from '../Card'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { IconClaim } from 'components/IconPaths'

const ClaimsCard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))

  const items = entity?.claim
    ? Object.values(entity?.claim).map((claim) => ({
        content: claim.template?.title ?? '',
        onClick: () => {
          const search = new URLSearchParams()
          search.append('claimId', claim.id)
          navigate({ pathname: location.pathname, search: search.toString() })
        },
      }))
    : []

  return <Card icon={IconClaim} title='Claims' columns={1} items={items} />
}

export default ClaimsCard
