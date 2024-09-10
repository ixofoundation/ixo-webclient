import React from 'react'
import { Card } from '../Card'

import ClockIcon from 'assets/images/icon-clock-2.svg'

import FireIcon from 'assets/images/icon-fire.svg'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useGetAccountTokens } from 'graphql/tokens'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const AssetPerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAccount = useCurrentEntityAdminAccount(accounts)

  const { data: accountTokens } = useGetAccountTokens(adminAccount)
  const carbonTokens = React.useMemo(() => {
    if (accountTokens['CARBON']) {
      const carbon = accountTokens['CARBON']
      const claimable = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.amount, 0)
      const produced = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.minted, 0)
      const retired = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.retired, 0)
      return { retired, produced, claimable }
    }

    return { retired: 0, produced: 0, claimable: 0 }
  }, [accountTokens])

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <FireIcon />,
          content: `${carbonTokens.produced.toLocaleString()} kg CO₂ emissions saved`,
        },
      ]}
    />
  )
}

export default AssetPerformance
