import React from 'react'
import RightIcon from 'assets/icons/Right'
import { Route } from 'react-router-dom'

import { Container, SingleNav, Title } from './EconomyHero.styles'

interface Props {
  did: string
}

const EconomyHero: React.FunctionComponent<Props> = ({ did }) => {
  const renderNavs = (): JSX.Element => {
    return (
      <>
        <SingleNav to="/">
          INTERNET OF IMPACT
          <RightIcon />
        </SingleNav>
        <SingleNav to={`/projects/${did}/economy`}>
          Economy
          <RightIcon />
        </SingleNav>
        <SingleNav to={`#`}>
          <Route path={`/projects/${did}/economy/governance`} exact>
            Governance
          </Route>
          <Route path={`/projects/${did}/economy/carbon`} exact>
            Carbon Costs
          </Route>
          <Route path={`/projects/${did}/economy/marketplace`} exact>
            Marketplace
          </Route>
          <Route path={`/projects/${did}/economy/relayers`} exact>
            Launchpad
          </Route>
          <Route path={`/projects/${did}/economy`} exact>
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
        <Route path={`/projects/${did}/economy/governance`} exact>
          Impact Hub Governance
        </Route>
        <Route path={`/projects/${did}/economy/carbon`} exact>
          Carbon Costs
        </Route>
        <Route path={`/projects/${did}/economy/marketplace`} exact>
          Marketplace
        </Route>
        <Route path={`/projects/${did}/economy/relayers`} exact>
          Launchpad
        </Route>
        <Route path={`/projects/${did}/economy`} exact>
          IXO STAKING TOKENS
        </Route>
      </Title>
    </Container>
  )
}

export default EconomyHero
