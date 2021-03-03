import React from 'react'
import { Container, NavItem, ToolTip } from './SideBar.styles'

interface Props {
  did: string
}

const SideBar: React.FunctionComponent<Props> = ({ did }) => {
  return (
    <Container>
      <NavItem exact={true} to={`/projects/${did}/economy`}>
        <img src={require('assets/img/sidebar/economy.svg')} />
        <ToolTip>Overview</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/relayers`}>
        <img src={require('assets/img/sidebar/relayers.svg')} />
        <ToolTip>Overview</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/marketplace`}>
        <img src={require('assets/img/sidebar/marketplace.svg')} />
        <ToolTip>Overview</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/economy/carbon`}>
        <img src={require('assets/img/sidebar/carbon.svg')} />
        <ToolTip>Overview</ToolTip>
      </NavItem>
    </Container>
  )
}

export default SideBar
