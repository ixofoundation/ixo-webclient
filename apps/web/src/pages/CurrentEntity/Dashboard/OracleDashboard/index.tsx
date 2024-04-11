import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import { Navigate, Route, Routes, useParams, useMatch } from 'react-router-dom'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import EditEntity from './EditEntity'
import Overview from './Overview'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const OracleDashboard: React.FC = (): JSX.Element => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const { type, owner, profile } = useAppSelector(getEntityById(entityId))
  const { registered, address } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Overview',
      tooltip: 'Overview',
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
      sdg: `Explore ${toTitleCase(type)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: profile?.name ?? "",
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
      iconClass: `icon-${type}`,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase('oracle'),
      tooltip: `${toTitleCase('oracle')} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase('oracle')} Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `${toTitleCase(type)} Funding`,
    },
  ]

  return (
    <Dashboard
      theme={isEditEntityRoute ? 'light' : 'dark'}
      title={profile?.name ?? ""}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={'overview'} />} />
        <Route path='overview' Component={Overview} />

        {registered && owner === address && <Route path='edit' Component={EditEntity} />}
      </Routes>
    </Dashboard>
  )
}

export default OracleDashboard
