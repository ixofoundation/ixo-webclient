import Dashboard from 'components/Dashboard/Dashboard'
import { useSelectedEntity } from 'hooks/entity'
import { Redirect, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { Overview } from './Overview'
import { OverviewMembers } from './OverviewMembers'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId, groupId } = useParams<{ entityId: string; groupId: string }>()
  const name = 'EducationDAO' //  TODO: from redux
  const { type } = useSelectedEntity()

  const routes = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Dashboard',
      tooltip: 'Overview',
    },
  ]
  const breadcrumbs = [
    {
      url: `/`,
      icon: '',
      sdg: 'Explore DAOs',
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]
  const tabs = [
    {
      iconClass: `icon-${type ? type.toLowerCase() : 'project'}`,
      linkClass: null,
      path: `/`,
      title: 'DAOs',
      tooltip: `Explorer all ${type}`,
    },
    {
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${entityId}/bonds/${groupId}/overview`,
      title: 'DASHBOARD',
      tooltip: `${type} Management`,
    },
  ]

  return (
    <Dashboard
      theme='dark'
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs as any[]}
      entityType={type}
    >
      <Route exact path='/entity/:entityId/dashboard/overview' component={Overview} />
      <Route exact path='/entity/:entityId/dashboard/overview/:groupId' component={OverviewMembers} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
