import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import {
  Redirect,
  Route,
  useParams,
  // useRouteMatch
} from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { MyGroups } from './MyGroups'
import { Overview } from './Overview'
// import { OverviewIndividualMember } from './OverviewIndividualMember'
import { OverviewMembers } from './OverviewMembers'
import { Proposals } from './Proposals'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  // const isIndividualMemberRoute = useRouteMatch('/entity/:entityId/dashboard/overview/:groupId/:address')
  const { entityType } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/navigator`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Navigator',
      tooltip: 'Navigator',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/membership`,
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'Membership',
      tooltip: 'Membership',
    },
    {
      url: `/entity/${entityId}/dashboard/governance`,
      icon: requireCheckDefault(require('assets/img/sidebar/governance.svg')),
      sdg: 'Governance',
      tooltip: 'Governance',
    },
    {
      url: `/entity/${entityId}/dashboard/my-participation`,
      icon: requireCheckDefault(require('assets/img/sidebar/profile.svg')),
      sdg: 'My Participation',
      tooltip: 'My Participation',
      disabled: !registered,
    },
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
    {
      url: `/entity/${entityId}/dashboard`,
      icon: '',
      sdg: 'Dashboard',
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

  // const theme = isIndividualMemberRoute ? 'light' : 'dark'
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
      <Route exact path='/entity/:entityId/dashboard/navigator' component={Overview} />
      <Route exact path='/entity/:entityId/dashboard/membership' component={OverviewMembers} />
      {/* <Route
        exact
        path='/entity/:entityId/dashboard/overview/:coreAddress/:address'
        component={OverviewIndividualMember}
      /> */}
      <Route exact path='/entity/:entityId/dashboard/governance' component={Proposals} />
      <Route exact path='/entity/:entityId/dashboard/my-participation' component={MyGroups} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/navigator`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
