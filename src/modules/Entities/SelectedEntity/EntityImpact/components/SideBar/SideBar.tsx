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
        {isActiveRoute(match, location, [`/projects/${did}/detail`]) ? (
          <HomeActive />
        ) : (
          <Home />
        )}
        <ToolTip>Dashboard</ToolTip>
      </NavItem>
      {showAgentLinks && (
        <>
          <NavItem
            exact={true}
            to={`/projects/${did}/detail/service-providers`}
          >
            {isActiveRoute(match, location, [
              `/projects/${did}/detail/service-providers`,
            ]) ? (
              <ServiceProvidersActive />
            ) : (
              <ServiceProviders />
            )}
            <ToolTip>Service Providers</ToolTip>
          </NavItem>
          <NavItem exact={true} to={`/projects/${did}/detail/evaluators`}>
            {isActiveRoute(match, location, [
              `/projects/${did}/detail/evaluators`,
            ]) ? (
              <EvaluatorsActive />
            ) : (
              <Evaluators />
            )}
            <ToolTip>Evaluators</ToolTip>
          </NavItem>
          <NavItem exact={true} to={`/projects/${did}/detail/investors`}>
            {isActiveRoute(match, location, [
              `/projects/${did}/detail/investors`,
            ]) ? (
              <EvaluatorsActive /> // TODO - correct icon
            ) : (
              <Evaluators /> // TODO - correct icon
            )}
            <ToolTip>Investors</ToolTip>
          </NavItem>
        </>
      )}
      <NavItem exact={true} to={`/projects/${did}/detail/claims`}>
        {isActiveRoute(match, location, [`/projects/${did}/detail/claims`]) ? (
          <ClaimsActive />
        ) : (
          <Claims />
        )}
        <ToolTip>Claims</ToolTip>
      </NavItem>
    </Container>
  )
}

export default ProjectSidebar
