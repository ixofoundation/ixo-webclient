import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { MyStats } from './MyStats'
import { Overview } from './Overview'
import { OverviewIndividualMember } from './OverviewIndividualMember'
import { OverviewMembers } from './OverviewMembers'
import { Proposals } from './Proposals'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isIndividualMemberRoute = useRouteMatch('/entity/:entityId/dashboard/overview/:groupId/:address')
  const { entityType } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered } = useAccount()

  const routes = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Overview',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/members`,
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'Members',
      tooltip: 'Members',
    },
    {
      url: `/entity/${entityId}/dashboard/proposals`,
      icon: requireCheckDefault(require('assets/img/sidebar/governance.svg')),
      sdg: 'Proposals',
      tooltip: 'Proposals',
    },
    ...(registered
      ? [
          {
            url: `/entity/${entityId}/dashboard/my-stats`,
            icon: requireCheckDefault(require('assets/img/sidebar/profile.svg')),
            sdg: 'My Stats',
            tooltip: 'My Stats',
          },
        ]
      : []),
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
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

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-dao`,
      linkClass: 'dao',
      path: `/entity/${entityId}/overview`,
      title: 'DAO',
      tooltip: `DAO Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `DAO Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Treasury',
      tooltip: `DAO Treasury`,
    },
  ]

  const theme = isIndividualMemberRoute ? 'light' : 'dark'

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Route exact path='/entity/:entityId/dashboard/overview' component={Overview} />
      <Route exact path='/entity/:entityId/dashboard/members' component={OverviewMembers} />
      <Route
        exact
        path='/entity/:entityId/dashboard/overview/:coreAddress/:address'
        component={OverviewIndividualMember}
      />
      <Route exact path='/entity/:entityId/dashboard/proposals' component={Proposals} />
      <Route exact path='/entity/:entityId/dashboard/my-stats' component={MyStats} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
