import React from 'react'
import { RootState } from '../../../common/redux/types'
import { Chart } from '../components/Chart'
import { connect } from 'react-redux'
import * as selectors from '../BondChart.selectors'

interface Props {
  data: any
}

const BondChartScreen: React.FunctionComponent<Props> = ({ data }) => (
  <Chart data={data} />
)

const mapStateToProps = (state: RootState) => ({
  data: selectors.selectChartData(state),
})

export default connect(mapStateToProps, {})(BondChartScreen)
