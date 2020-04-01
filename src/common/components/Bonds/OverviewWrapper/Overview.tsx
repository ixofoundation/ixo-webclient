import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import BondChartScreen from '../../../../modules/BondChart/BondChart.container'
import BondOrders from '../../../../modules/BondOrders/BondOrders.container'
import { BondEvents } from '../../../../modules/BondEvents/BondEvents.container'
import BondsWrapper from '../BondsWrapper/BondsWrapper'
import { BondsHomeSectionNav } from './Overview.styles'

export class Overview extends Component<any> {
  render(): JSX.Element {
    const { projectDID, bondDID } = this.props.match.params

    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel">
          <BondsHomeSectionNav>
            <NavLink to={`/projects/${projectDID}/bonds/${bondDID}`} exact>
              Charts
            </NavLink>
            <NavLink
              to={`/projects/${projectDID}/bonds/${bondDID}/overview/trades`}
            >
              Trades
            </NavLink>
            <NavLink
              to={`/projects/${projectDID}/bonds/${bondDID}/overview/events`}
            >
              Events
            </NavLink>
          </BondsHomeSectionNav>

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
        </div>
      </BondsWrapper>
    )
  }
}
