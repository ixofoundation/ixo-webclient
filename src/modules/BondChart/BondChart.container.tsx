import React from 'react'
import { RootState } from '../../common/redux/types'
import { Chart } from './components/Chart/Chart'
import { connect } from 'react-redux'
import * as selectors from './BondChart.selectors'

interface Props {
  data: any
}

const BondChart: React.FunctionComponent<Props> = ({ data }) => (
  <Chart data={data} />
)

const mapStateToProps = (state: RootState): any => ({
  data: selectors.selectChartData(state),
})

export default connect(mapStateToProps, {})(BondChart)
