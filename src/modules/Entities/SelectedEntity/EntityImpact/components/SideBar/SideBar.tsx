import * as React from 'react'
import Home from 'assets/icons/Home'
import HomeActive from 'assets/icons/HomeActive'
import ServiceProviders from 'assets/icons/ServiceProviders'
import ServiceProvidersActive from 'assets/icons/ServiceProvidersActive'
import Evaluators from 'assets/icons/Evaluators'
import EvaluatorsActive from 'assets/icons/EvaluatorsActive'
import Claims from 'assets/icons/Claims'
import ClaimsActive from 'assets/icons/ClaimsActive'
import { Container, NavItem, ToolTip } from './SideBar.styles'
import { isActiveRoute } from 'common/utils/isActiveRoute'

interface Props {
  match: any
  location: any
  did: string
  showAgentLinks: boolean
}

const ProjectSidebar: React.FunctionComponent<Props> = ({
  match,
  location,
  did,
  showAgentLinks,
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
