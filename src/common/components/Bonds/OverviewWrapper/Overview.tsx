import React, { Component } from 'react'
import BondChartScreen from 'modules/BondChart/BondChart.container'
import BondTable from 'modules/BondTable'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { BondsWrapperConnected as BondsWrapper } from '../BondsWrapper/BondsWrapper'

export class Overview extends Component<any> {
  render(): JSX.Element {
    // const { projectDID, bondDID } = this.props.match.params

    return (
      <BondsWrapper {...this.props.match}>
        <BondChartScreen />
        <BondTable />
        {/* <div className="BondsWrapper_panel">
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/overview/charts`,
              `/projects/${projectDID}/bonds/${bondDID}/overview/`,
              `/projects/${projectDID}/bonds/${bondDID}`,
            ]}
            component={BondChartScreen}
          />
          <Route
            exact
            path={`/projects/${projectDID}/bonds/${bondDID}/overview/trades`}
            component={BondOrders}
          />
          <Route
            exact
            path={`/projects/${projectDID}/bonds/${bondDID}/overview/events`}
            component={BondEvents}
          />
        </div> */}
      </BondsWrapper>
    )
  }
}
