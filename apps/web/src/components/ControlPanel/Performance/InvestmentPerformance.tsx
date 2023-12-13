import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as TagIcon } from 'assets/images/icon-tag-solid.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as HandHoldingUsdIcon } from 'assets/images/icon-hand-holding-usd-solid.svg'
import BigNumber from 'bignumber.js'
import { useCurrentEntityBondLinkedEntity } from 'hooks/currentEntity'
import { useGetBondDid } from 'graphql/bonds'
import { serializeCoin } from 'utils/conversions'
import { useMapBondDetail } from 'hooks/bond'

const InvestmentPerformance: React.FC = () => {
  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''
  const { data: bondDetail } = useGetBondDid(bondDid)
  const { currentPrice, currentSupply, token, outcomePayment } = useMapBondDetail(bondDetail)

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <TagIcon />,
          content: `Current Price: ${currentPrice ? serializeCoin(currentPrice).toUpperCase() : '--'}`,
        },
        {
          icon: <CoinsIcon />,
          content: `Total Supply: ${new BigNumber(currentSupply).toFormat()} ${token.toUpperCase()}`, // TODO:
        },
        {
          icon: <HandHoldingUsdIcon />,
          content: `Outcome Payment: ${new BigNumber(outcomePayment).toFormat()} ${token.toUpperCase()}`, // TODO:
        },
      ]}
    />
  )
}

export default InvestmentPerformance
