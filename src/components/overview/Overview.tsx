import React, { Component } from 'react'
import './Overview.scss'
import { Route, NavLink } from 'react-router-dom'
import { Charts } from './charts/Charts'
import Trades from './trades/Trades'
import { Events } from './events/Events'

export class Overview extends Component {
  render() {
    return (
      <div className="AppBody_panel">
        <div className="tablinks">
          <NavLink to={`/`} exact className="tablinks_tablink">
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
    )
  }
}
