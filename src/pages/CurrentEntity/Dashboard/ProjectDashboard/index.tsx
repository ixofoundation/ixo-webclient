import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import Agents from './Agents'
import Claims from './Claims'
import EditEntity from './EditEntity'
import { useGetUserGranteeRole } from 'hooks/claim'
import { AgentRoles } from 'types/models'
import ClaimDetail from './ClaimDetail'

const ProjectDashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useRouteMatch('/entity/:entityId/dashboard/edit')
  const isClaimScreenRoute = useRouteMatch('/entity/:entityId/dashboard/claims')
  const { entityType, owner } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()
  const signerRole = useGetUserGranteeRole()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/agents`,
      icon: requireCheckDefault(require('assets/img/sidebar/profile.svg')),
      sdg: 'Agent',
      tooltip: 'Agent',
      disabled: !registered || owner !== address,
    },
    {
      url: `/entity/${entityId}/dashboard/claims`,
      icon: requireCheckDefault(require('assets/img/sidebar/check.svg')),
      sdg: 'Claims',
      tooltip: 'Claims',
      strict: true,
      disabled: !registered || (owner !== address && signerRole !== AgentRoles.evaluators),
    },
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: requireCheckDefault(require('assets/img/sidebar/gear.svg')),
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !registered || owner !== address,
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: `Explore ${toTitleCase(entityType)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/dashboard`,
      icon: '',
      sdg: 'Dashboard',
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-${entityType}`,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase(entityType),
      tooltip: `${toTitleCase(entityType)} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase(entityType)} Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `${toTitleCase(entityType)} Funding`,
    },
  ]

  return (
    <Dashboard
      theme={isEditEntityRoute || isClaimScreenRoute ? 'light' : 'dark'}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      {registered && owner === address && <Route exact path='/entity/:entityId/dashboard/agents' component={Agents} />}
      {registered && (owner === address || signerRole === AgentRoles.evaluators) && (
        <>
          <Route exact path='/entity/:entityId/dashboard/claims' component={Claims} />
          <Route exact path='/entity/:entityId/dashboard/claims/:claimId' component={ClaimDetail} />
        </>
      )}
      {registered && owner === address && (
        <Route exact path='/entity/:entityId/dashboard/edit' component={EditEntity} />
      )}

      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/agents`} />
      </Route>
    </Dashboard>
  )
}

export default ProjectDashboard
