import React, { Component } from 'react'
import './Overview.css'
import { Route, NavLink } from 'react-router-dom'
import { Charts } from './charts/Charts'
import Trades from './trades/Trades'
import { Events } from './events/Events'
import BondsWrapper from '../BondsWrapper'

export class Overview extends Component {
  render() {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel">
          <div className="tablinks">
            <NavLink to={`/overview`} exact className="tablinks_tablink">
              Charts
            </NavLink>
            <NavLink to={`/overview/trades`} className="tablinks_tablink">
              Trades
            </NavLink>
            <NavLink to={`/overview/events`} className="tablinks_tablink">
              Events
            </NavLink>
          </div>

          <Route
            exact
            path={[`/overview/charts`, '/overview/', '/']}
            component={Charts}
          />
          <Route exact path={`/overview/trades`} component={Trades} />
          <Route exact path={`/overview/events`} component={Events} />
        </div>
      </BondsWrapper>
    )
  }
}
