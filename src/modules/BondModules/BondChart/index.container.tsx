import React from 'react'
import { Chart } from './components/CandleChart/Chart'
import AreaChart from './components/AreaChart'
import AlphaChart from './components/AlphaChart'

interface Props {
  selectedHeader: string
}

const BondChart: React.FunctionComponent<Props> = ({selectedHeader}) => {
  switch (selectedHeader) {
    case 'price':
      return <Chart data={null} />
    case 'stake':
      return <AreaChart data={null} mainColor={'#85AD5C'} lineColor={'#6FCF97'} />
    case 'raised':
      return <AreaChart data={null} mainColor={'rgba(66, 203, 234, 0.15)'} lineColor={'#42CBEA'} />
    case 'reverse':
      return <AreaChart data={null} mainColor={'rgba(66, 203, 234, 0.15)'} lineColor={'#42CBEA'} />
    case 'alpha':
      return <AlphaChart percentage={12} />
    default:
      return <Chart data={null} />
  }
} 

export default BondChart
