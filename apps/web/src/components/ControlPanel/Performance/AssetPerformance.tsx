import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as FireIcon } from 'assets/images/icon-fire.svg'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useGetAccountTokens } from 'graphql/tokens'

const AssetPerformance: React.FC = () => {
  const adminAccount = useCurrentEntityAdminAccount()

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
