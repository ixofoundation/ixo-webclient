import * as React from 'react'
import { requireCheckDefault } from 'utils/images'
import { Container, NavItem, ToolTip } from './SideBar.styles'

interface Props {
  match: any
  location: any
  did: string
  showAgentLinks: boolean
  hasToc?: boolean
}

const ProjectSidebar: React.FunctionComponent<Props> = ({ did, hasToc, showAgentLinks }) => {
  return (
    <Container>
      <NavItem exact={true} to={`/projects/${did}/detail/overview`}>
        <img src={requireCheckDefault(require('assets/img/sidebar/global.svg'))} alt='global' />
        <ToolTip>Overview</ToolTip>
      </NavItem>
      {/* <NavItem exact={true} to={`/projects/${did}/detail/coming-soon`}>
        <img src={ requireCheckDefault(require('assets/img/sidebar/target.svg')) } />
        <ToolTip>Targets</ToolTip>
      </NavItem> */}
      {hasToc && (
        <NavItem exact={true} to={`/projects/${did}/detail/toc`}>
          <img src={requireCheckDefault(require('assets/img/sidebar/toc.svg'))} alt='toc' />
          <ToolTip style={{ width: 120 }}>Theory of Change</ToolTip>
        </NavItem>
      )}
      {showAgentLinks && (
        <NavItem exact={true} to={`/projects/${did}/detail/agents`}>
          <img src={requireCheckDefault(require('assets/img/sidebar/profile.svg'))} alt='profile' />
          <ToolTip>Agents</ToolTip>
        </NavItem>
      )}

      <NavItem exact={true} to={`/projects/${did}/detail/claims`}>
        <img src={requireCheckDefault(require('assets/img/sidebar/claim.svg'))} alt='claim' />
        <ToolTip>Claims</ToolTip>
      </NavItem>
      {/* <NavItem exact={true} to={`/projects/${did}/detail/history`}>
        <img src={ requireCheckDefault(require('assets/img/sidebar/history.svg')) } />
        <ToolTip>Events</ToolTip>
      </NavItem> */}
      {/* <NavItem exact={true} to={`/projects/${did}/detail/economy`}>
        <img src={ requireCheckDefault(require('assets/img/sidebar/governance.svg')) } />
        <ToolTip>Governance</ToolTip>
      </NavItem> */}
      {/* <NavItem exact={true} to={`/projects/${did}/detail/portfolio`}>
        <img src={ requireCheckDefault(require('assets/img/sidebar/portfolio.svg')) } />
        <ToolTip>Portfolio</ToolTip>
      </NavItem> */}
      {/* <NavItem exact={true} to={`/projects/${did}/detail/settings`}>
        <img src={ requireCheckDefault(require('assets/img/sidebar/settings.svg')) } />
        <ToolTip>Settings</ToolTip>
      </NavItem> */}
    </Container>
  )
}

export default ProjectSidebar
