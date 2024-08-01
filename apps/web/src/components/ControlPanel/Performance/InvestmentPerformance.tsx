import React from 'react'
import { Card } from '../Card'
import ClockIcon from 'assets/images/icon-clock-2.svg'
import TagIcon from 'assets/images/icon-tag-solid.svg'
import CoinsIcon from 'assets/images/icon-coins-solid.svg'
import HandHoldingUsdIcon from 'assets/images/icon-hand-holding-usd-solid.svg'
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
