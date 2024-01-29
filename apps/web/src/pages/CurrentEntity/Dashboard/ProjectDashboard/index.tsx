import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Route, useMatch, useParams } from 'react-router-dom'
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
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const isClaimScreenRoute = useMatch('/entity/:entityId/dashboard/claims')
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
      iconClass: `icon-project`,
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
      {registered && owner === address && <Route path='/entity/:entityId/dashboard/agents' Component={Agents} />}
      {registered && (owner === address || signerRole === AgentRoles.evaluators) && (
        <>
          <Route path='/entity/:entityId/dashboard/claims' Component={Claims} />
          <Route path='/entity/:entityId/dashboard/claims/:claimId' Component={ClaimDetail} />
        </>
      )}
      {registered && owner === address && <Route path='/entity/:entityId/dashboard/edit' Component={EditEntity} />}

      <Route path='/entity/:entityId/dashboard' element={<Navigate to={`/entity/${entityId}/dashboard/agents`} />} />
    </Dashboard>
  )
}

export default ProjectDashboard
