import React from 'react'
import { requireCheckDefault } from 'utils/images'
import { Container, NavItem, ToolTip } from './SideBar.styles'

const SideBar: React.FunctionComponent = () => {
  return (
    <Container>
      <NavItem exact={true} to={`/economy`}>
        <img alt='' src={requireCheckDefault(require('assets/img/sidebar/economy.svg'))} />
        <ToolTip>IXO Token</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/economy/relayers`}>
        <img alt='' src={requireCheckDefault(require('assets/img/sidebar/relayers.svg'))} />
        <ToolTip>Relayer Network</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/economy/marketplace`}>
        <img alt='' src={requireCheckDefault(require('assets/img/sidebar/marketplace.svg'))} />
        <ToolTip>Marketplace</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/economy/carbon`}>
        <img alt='' src={requireCheckDefault(require('assets/img/sidebar/carbon.svg'))} />
        <ToolTip>Carbon Costs</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/economy/governance`}>
        <img alt='' src={requireCheckDefault(require('assets/img/sidebar/economy-governance.svg'))} />
        <ToolTip>Governance</ToolTip>
      </NavItem>
    </Container>
  )
}

export default SideBar
