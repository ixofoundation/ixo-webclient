import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as TagIcon } from 'assets/images/icon-tag-solid.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as HandHoldingUsdIcon } from 'assets/images/icon-hand-holding-usd-solid.svg'
import BigNumber from 'bignumber.js'

const InvestmentPerformance: React.FC = () => {
  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <TagIcon />,
          content: `Current Price: ${(1200.42).toLocaleString()} ${'USDC'}`, // TODO:
        },
        {
          icon: <CoinsIcon />,
          content: `Total Supply: ${new BigNumber('1200000').toFormat()} ${'XBOND'}`, // TODO:
        },
        {
          icon: <HandHoldingUsdIcon />,
          content: `Outcome Payment: ${new BigNumber('1500000').toFormat()} ${'USDC'}`, // TODO:
        },
      ]}
    />
  )
}

export default InvestmentPerformance
