import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import useCurrentEntity from 'hooks/currentEntity'
import { TEntityClaimModel } from 'types/entities'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'hooks/window'

const ClaimsCard: React.FC = () => {
  const history = useHistory()
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')

  const { claim } = useCurrentEntity()
  const claims: TEntityClaimModel[] = Object.values(claim)

  return (
    <Card
      icon={<ClaimIcon />}
      title='Claims'
      columns={1}
      items={claims.map((item) => ({
        content: item.template?.title ?? '',
        active: claimId === item.id,
        onClick: () => {
          const search = new URLSearchParams()
          search.append('claimId', item.id)
          history.push({ pathname: history.location.pathname, search: search.toString() })
        },
      }))}
    />
  )
}

export default ClaimsCard
