import React from 'react'
import { Chart } from './components/CandleChart/Chart'
import StakeChart from './components/AreaChart'
interface Props {
  selectedHeader: string
}

const BondChart: React.FunctionComponent<Props> = ({selectedHeader}) => {
  switch (selectedHeader) {
    case 'price':
      return <Chart data={null} />
    case 'stake':
      return <StakeChart data={null} />
    default:
      return <Chart data={null} />
  }
} 

export default BondChart
