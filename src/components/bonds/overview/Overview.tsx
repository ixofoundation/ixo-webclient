import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Charts } from './charts/Charts'
import Trades from './trades/Trades'
import { Events } from './events/Events'
import BondsWrapper from '../BondsWrapper'

export class Overview extends Component {
  render(): JSX.Element {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel">
          <div className="tablinks">
            <NavLink to="/bonds" exact className="tablinks_tablink">
              Charts
            </NavLink>
            <NavLink to="/bonds/overview/trades" className="tablinks_tablink">
              Trades
            </NavLink>
            <NavLink to="/bonds/overview/events" className="tablinks_tablink">
              Events
            </NavLink>
          </div>

          <Route
            exact
            path={['/bonds/overview/charts', '/bonds/overview/', '/bonds']}
            component={Charts}
          />
          <Route exact path="/bonds/overview/trades" component={Trades} />
          <Route exact path="/bonds/overview/events" component={Events} />
        </div>
      </BondsWrapper>
    )
  }
}
