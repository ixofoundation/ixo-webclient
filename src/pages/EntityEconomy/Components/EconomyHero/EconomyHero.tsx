import React from 'react'
import RightIcon from 'assets/icons/Right'
import { Route } from 'react-router-dom'

import { Container, SingleNav, Title } from './EconomyHero.styles'

const EconomyHero: React.FunctionComponent = () => {
  const renderNavs = (): JSX.Element => {
    return (
      <>
        <SingleNav to='/'>
          INTERNET OF IMPACT
          <RightIcon />
        </SingleNav>
        <SingleNav to={`/economy`}>
          Economy
          <RightIcon />
        </SingleNav>
        <SingleNav to={`#`}>
          <Route path={`/economy/governance`} exact>
            Governance
          </Route>
          <Route path={`/economy/carbon`} exact>
            Carbon Costs
          </Route>
          <Route path={`/economy/marketplace`} exact>
            Marketplace
          </Route>
          <Route path={`/economy/relayers`} exact>
            Launchpad
          </Route>
          <Route path={`/economy`} exact>
            IXO STAKING TOKENS
          </Route>
          <RightIcon />
        </SingleNav>
      </>
    )
  }

  return (
    <Container>
      <div>{renderNavs()}</div>
      <Title>
        <Route path={`/economy/governance`} exact>
          Impact Hub Governance
        </Route>
        <Route path={`/economy/carbon`} exact>
          Carbon Costs
        </Route>
        <Route path={`/economy/marketplace`} exact>
          Marketplace
        </Route>
        <Route path={`/economy/relayers`} exact>
          Launchpad
        </Route>
        <Route path={`/economy`} exact>
          IXO STAKING TOKENS
        </Route>
      </Title>
    </Container>
  )
}

export default EconomyHero
