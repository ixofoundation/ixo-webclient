import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import EconomyOverview from './EconomyOverview/EconomyOverview'
import SideBar from './Components/SideBar/SideBar'
import EconomyHero from './Components/EconomyHero/EconomyHero'
import EconomyRelayers from './EconomyRelayers/EconomyRelayers'
import EconomyMarketplace from './EconomyMarketplace/EconomyMarketplace'
import EconomyCarbon from './EconomyCarbon/EconomyCarbon'
import EconomyGovernance from './EconomyGovernance/EconomyGovernance'
import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

const DetailContainer = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoWhite};
  display: block;
  flex: 1 1 auto;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`
const ContentContainer = styled.div`
  flex-grow: 1;
  background: ${(props) => props.theme.ixoWhite};
  max-width: 100%;

  @media (min-width: ${deviceWidth.mobile}px) {
    max-width: calc(100% - 75px);
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

class EntityEconomy extends Component {
  render(): JSX.Element {
    return (
      <DetailContainer>
        <div className='d-flex flex-grow-1 w-100'>
          <SideBar />
          <ContentContainer>
            <EconomyHero />
            <Route exact path={`/economy`} component={EconomyOverview} />
            <Route exact path={`/economy/relayers`} component={EconomyRelayers} />
            <Route exact path={`/economy/marketplace`} component={EconomyMarketplace} />
            <Route exact path={`/economy/carbon`} component={EconomyCarbon} />
            <Route exact path={`/economy/governance`} component={EconomyGovernance} />
          </ContentContainer>
        </div>
      </DetailContainer>
    )
  }
}

export default EntityEconomy
