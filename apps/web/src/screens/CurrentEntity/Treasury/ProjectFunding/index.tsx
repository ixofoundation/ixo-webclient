import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { Navigate, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts'
import { toTitleCase } from 'utils/formatters'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const ProjectFunding: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { type, profile } = useAppSelector(getEntityById(entityId))

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/treasury/accounts`,
      icon: '/public/assets/img/sidebar/account.svg',
      sdg: 'Accounts',
      tooltip: 'Accounts',
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: `Explore ${toTitleCase(type)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: profile?.name ?? '',
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
      iconClass: `icon-${type}`,
      linkClass: type,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase(type),
      tooltip: `${toTitleCase(type)} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase(type)} Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `${toTitleCase(type)} Funding`,
    },
  ]

  const theme = 'dark'

  return (
    <Dashboard
      theme={theme}
      title={profile?.name ?? ''}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Route path='/entity/:entityId/treasury/accounts' Component={Accounts} />
      <Route path='/entity/:entityId/treasury' element={<Navigate to={`/entity/${entityId}/treasury/accounts`} />} />
    </Dashboard>
  )
}

export default ProjectFunding
