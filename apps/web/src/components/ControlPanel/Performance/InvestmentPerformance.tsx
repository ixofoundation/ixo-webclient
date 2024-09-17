import React from 'react'
import { Card } from '../Card'








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
      icon={<img src="/assets/images/icon-clock-2.svg"  />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <img src="/assets/images/icon-tag-solid.svg"  />,
          content: `Current Price: ${currentPrice ? serializeCoin(currentPrice).toUpperCase() : '--'}`,
        },
        {
          icon: <img src="/assets/images/icon-coins-solid.svg"  />,
          content: `Total Supply: ${new BigNumber(currentSupply).toFormat()} ${token.toUpperCase()}`, // TODO:
        },
        {
          icon: <img src="/assets/images/icon-hand-holding-usd-solid.svg"  />,
          content: `Outcome Payment: ${new BigNumber(outcomePayment).toFormat()} ${token.toUpperCase()}`, // TODO:
        },
      ]}
    />
  )
}

export default InvestmentPerformance
