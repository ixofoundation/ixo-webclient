import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Route, useMatch, useParams } from 'react-router-dom'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import ClaimQuestions from './ClaimQuestions'
import Claims from './Claims'
import EditEntity from './EditEntity'

const ProjectDashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const { entityType, owner } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/claims`,
      icon: requireCheckDefault(require('assets/img/sidebar/claim.svg')),
      sdg: 'Claims',
      tooltip: 'Claims',
      strict: true,
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

  const theme = isEditEntityRoute ? 'light' : 'dark'

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Route path='/entity/:entityId/dashboard/claims' element={<Claims/>} />
      <Route path='/entity/:entityId/dashboard/claims/:claimId' element={<ClaimQuestions/>} />

      {registered && owner === address && (
        <Route path='/entity/:entityId/dashboard/edit' element={<EditEntity/>} />
      )}

      <Route path='/entity/:entityId/dashboard'>
        <Navigate to={`/entity/${entityId}/dashboard/claims`} />
      </Route>
    </Dashboard>
  )
}

export default ProjectDashboard
