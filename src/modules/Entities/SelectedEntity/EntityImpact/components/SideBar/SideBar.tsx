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
        <img src={ require('assets/img/sidebar/global.png') } />
        <ToolTip>Dashboard</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/coming-soon`}>
        <img src={ require('assets/img/sidebar/target.png') } />
        <ToolTip>Coming soon</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/agents`}>
        <img src={ require('assets/img/sidebar/profile.png') } />
        <ToolTip>Agents</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/claims`}>
        <img src={ require('assets/img/sidebar/claim.png') } />
        <ToolTip>Claims</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/history`}>
        <img src={ require('assets/img/sidebar/history.png') } />
        <ToolTip>History</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/economy`}>
        <img src={ require('assets/img/sidebar/governance.png') } />
        <ToolTip>Economy</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/portfolio`}>
        <img src={ require('assets/img/sidebar/portfolio.png') } />
        <ToolTip>Portfolio</ToolTip>
      </NavItem>
      <NavItem exact={true} to={`/projects/${did}/detail/settings`}>
        <img src={ require('assets/img/sidebar/settings.png') } />
        <ToolTip>Settings</ToolTip>
      </NavItem>
    </Container>
  )
}

export default ProjectSidebar
