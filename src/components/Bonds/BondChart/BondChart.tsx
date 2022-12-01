import React from 'react'
import AlphaChart from './Charts/AlphaChart/AlphaChart'
import PriceHistory from './Charts/PriceHistory/PriceHistory'
import StakeHistory from './Charts/StakeHistory/StakeHistory'

interface Props {
  selectedHeader: string
  isDark: boolean
}

const BondChart: React.FunctionComponent<Props> = ({ selectedHeader, isDark }) => {
  switch (selectedHeader) {
    case 'price':
      return <PriceHistory isDark={isDark} />
    case 'stake':
      return <StakeHistory isDark={isDark} />
    case 'raised':
      return <></>
    case 'reserve':
      return <></>
    case 'alpha':
      return <AlphaChart isDark={isDark} />
    default:
      return <></>
  }
}

export default BondChart
