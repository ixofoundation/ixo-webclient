import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import BondChartScreen from '../../../modules/BondChart/screens/BondChart'
import Trades from './trades/Trades'
import { Events } from './events/Events'
import BondsWrapper from '../BondsWrapper'
import styled from 'styled-components'

const BondsHomeSectionNav = styled.div`
  padding: 1rem;
  margin-left: 1.875rem;
  a {
    font-weight: normal;
    font-size: 1.1875rem;
    text-transform: uppercase;
    text-decoration: none;

    color: #ffffff;
    padding: 0.25rem 1.5rem;
    &.active {
      color: #87def6;
    }
    &:hover {
      text-decoration: none;
      color: #87def6;
    }
  }
  @media (max-width: 768px) {
    padding: 1rem 0;
    margin: 0;
    width: initial;
    overflow-x: scroll;
  }
`

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
