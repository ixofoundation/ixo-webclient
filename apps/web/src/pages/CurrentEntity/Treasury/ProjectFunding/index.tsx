import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts'
import { toTitleCase } from 'utils/formatters'

const ProjectFunding: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/treasury/accounts`,
      icon: requireCheckDefault(require('assets/img/sidebar/account.svg')),
      sdg: 'Accounts',
      tooltip: 'Accounts',
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
      url: `/entity/${entityId}/treasury`,
      icon: '',
      sdg: 'Funding',
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-${entityType}`,
      linkClass: entityType,
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

  const theme = 'dark'

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Route path='/entity/:entityId/treasury/accounts' Component={Accounts} />
      <Route path='/entity/:entityId/treasury' element={<Navigate to={`/entity/${entityId}/treasury/accounts`} />} />
    </Dashboard>
  )
}

export default ProjectFunding
