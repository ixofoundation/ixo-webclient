import React from 'react'
import { Container, NavItem, ToolTip } from './SideBar.styles'

interface Props {
  did: string
}

const SideBar: React.FunctionComponent<Props> = ({ did }) => {
  return (
    <Container>
      <NavItem exact={true} to={`/projects/${did}/economy`}>
        <img alt="" src={require('assets/img/sidebar/economy.svg')} />
        <ToolTip>IXO Token</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/relayers`}>
        <img alt="" src={require('assets/img/sidebar/relayers.svg')} />
        <ToolTip>Relayer Network</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/marketplace`}>
        <img alt="" src={require('assets/img/sidebar/marketplace.svg')} />
        <ToolTip>Marketplace</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/carbon`}>
        <img alt="" src={require('assets/img/sidebar/carbon.svg')} />
        <ToolTip>Carbon Costs</ToolTip>
      </NavItem>
    </Container>
  )
}

export default SideBar
