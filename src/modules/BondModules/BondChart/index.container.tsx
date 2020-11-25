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
      return <AreaChart data={null} mainColor={'#85AD5C'} lineColor={'#6FCF97'} backgroundColor='rgba(111, 207, 151, 0.2)' />
    case 'raised':
      return <AreaChart data={null} mainColor={'rgba(66, 203, 234, 0.15)'} lineColor={'#42CBEA'} backgroundColor='rgba(73, 191, 224, 0.2)'/>
    case 'reserve':
      return <AreaChart data={null} mainColor={'rgba(66, 203, 234, 0.15)'} lineColor={'#42CBEA'} backgroundColor='rgba(73, 191, 224, 0.2)' />
    case 'alpha':
      return <AlphaChart percentage={12} />
    default:
      return <Chart data={null} />
  }
}

export default BondChart
