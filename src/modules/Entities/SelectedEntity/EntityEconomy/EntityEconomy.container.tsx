import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import EconomyOverview from './EconomyOverview/EconomyOverview'
import {
  DetailContainer,
  ContentContainer,
} from '../EntityImpact/EntityImpact.styles'
import SideBar from './components/SideBar/SideBar'
import EconomyHero from './components/EconomyHero/EconomyHero'
import EconomyRelayers from './EconomyRelayers/EconomyRelayers'
import EconomyMarketplace from './EconomyMarketplace/EconomyMarketplace'
import EconomyCarbon from './EconomyCarbon/EconomyCarbon'
import EconomyGovernance from './EconomyGovernance/EconomyGovernance'

interface Props {
  match: any
}

class EntityEconomy extends Component<Props> {
  render(): JSX.Element {
    const {
      match: {
        params: { projectDID: did },
      },
    } = this.props

    return (
      <DetailContainer>
        <div className="d-flex flex-grow-1">
          <SideBar did={did} />
          <ContentContainer>
            <EconomyHero did={did} />
            <Route
              exact
              path={`/projects/:projectDID/economy`}
              component={EconomyOverview}
            />
            <Route
              exact
              path={`/projects/:projectDID/economy/relayers`}
              component={EconomyRelayers}
            />
            <Route
              exact
              path={`/projects/:projectDID/economy/marketplace`}
              component={EconomyMarketplace}
            />
            <Route
              exact
              path={`/projects/:projectDID/economy/carbon`}
              component={EconomyCarbon}
            />
            <Route
              exact
              path={`/projects/:projectDID/economy/governance`}
              component={EconomyGovernance}
            />
          </ContentContainer>
        </div>
      </DetailContainer>
    )
  }
}

export default EntityEconomy
