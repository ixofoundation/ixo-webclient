import * as React from 'react'
import { Container, NavItem, ToolTip } from './SideBar.styles'

interface Props {
  match: any
  location: any
  did: string
  showAgentLinks: boolean
}

const ProjectSidebar: React.FunctionComponent<Props> = ({
  did,
}) => {
  return (
    <Container>
      <NavItem exact={true} to={`/projects/${did}/detail`}>
        <img src={ require('assets/img/sidebar/global.png') } alt="global" />
        <ToolTip>Dashboard</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/coming-soon`}>
        <img src={ require('assets/img/sidebar/target.png') } alt="target" />
        <ToolTip>Coming soon</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/agents`}>
        <img src={ require('assets/img/sidebar/profile.png') } alt="profile" />
        <ToolTip>Agents</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/claims`}>
        <img src={ require('assets/img/sidebar/claim.png') } alt="claim" />
        <ToolTip>Claims</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/history`}>
        <img src={ require('assets/img/sidebar/history.png') } alt="history" />
        <ToolTip>History</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/economy`}>
        <img src={ require('assets/img/sidebar/governance.png') } alt="governance" />
        <ToolTip>Economy</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/portfolio`}>
        <img src={ require('assets/img/sidebar/portfolio.png') } alt="portfolio" />
        <ToolTip>Portfolio</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/settings`}>
        <img src={ require('assets/img/sidebar/settings.png') } alt="settings" />
        <ToolTip>Settings</ToolTip>
      </NavItem>
    </Container>
  )
}

export default ProjectSidebar
