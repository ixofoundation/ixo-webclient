import React from 'react'
import AlphaChart from './components/AlphaChart'
import PriceHistory from './components/PriceHistory/index'
import StakeHistory from './components/StakeHistory/index'

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
