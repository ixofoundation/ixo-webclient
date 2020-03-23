import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import BondChartScreen from '../../../../modules/BondChart/screens/BondChart'
import Trades from '../../../../modules/BondOrders/screens/BondOrders'
import { Events } from '../../../../modules/BondEvents/screens/Events'
import BondsWrapper from '../BondsWrapper/BondsWrapper'
import { BondsHomeSectionNav } from './Overview.styles'

export class Overview extends Component<any> {
  render(): JSX.Element {
    const projectDID = this.props.match.params.projectDID
    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel">
          <BondsHomeSectionNav>
            <NavLink to={`/projects/${projectDID}/bonds`} exact>
              Charts
            </NavLink>
            <NavLink to={`/projects/${projectDID}/bonds/overview/trades`}>
              Trades
            </NavLink>
            <NavLink to={`/projects/${projectDID}/bonds/overview/events`}>
              Events
            </NavLink>
          </BondsHomeSectionNav>

          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/overview/charts`,
              `/projects/${projectDID}/bonds/overview/`,
              `/projects/${projectDID}/bonds`,
            ]}
            component={BondChartScreen}
          />
          <Route
            exact
            path={`/projects/${projectDID}/bonds/overview/trades`}
            component={Trades}
          />
          <Route
            exact
            path={`/projects/${projectDID}/bonds/overview/events`}
            component={Events}
          />
        </div>
      </BondsWrapper>
    )
  }
}
