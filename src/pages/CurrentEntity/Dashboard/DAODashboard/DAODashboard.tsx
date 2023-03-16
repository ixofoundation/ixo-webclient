import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab } from 'components/Dashboard/types'
import useCurrentDao from 'hooks/currentDao'
import useCurrentEntity from 'hooks/currentEntity'
import { useEffect } from 'react'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { Overview } from './Overview'
import { OverviewIndividualMember } from './OverviewIndividualMember'
import { OverviewMembers } from './OverviewMembers'
import { Proposals } from './Proposals'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isIndividualMemberRoute = useRouteMatch('/entity/:entityId/dashboard/overview/:groupId/:address')
  const { entityType, profile } = useCurrentEntity()
  const { daoGroupAddresses, setDaoGroup } = useCurrentDao()
  const name = profile?.name

  const routes = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Dashboard',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/proposals`,
      icon: requireCheckDefault(require('assets/img/sidebar/governance.svg')),
      sdg: 'Proposals',
      tooltip: 'Proposals',
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
      url: `/entity/${entityId}/dashboard/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-dao`,
      linkClass: 'dao',
      path: '/explore',
      title: 'DAO',
      tooltip: `DAO Explorer`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `DAO Management`,
    },
  ]

  const theme = isIndividualMemberRoute ? 'light' : 'dark'

  useEffect(() => {
    console.log({ daoGroupAddresses })
    if (daoGroupAddresses.length > 0) {
      daoGroupAddresses.forEach((address) => {
        setDaoGroup(address)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(daoGroupAddresses)])

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
      <Route exact path='/entity/:entityId/dashboard/overview/:coreAddress' component={OverviewMembers} />
      <Route exact path='/entity/:entityId/dashboard/overview/:groupId/:address' component={OverviewIndividualMember} />
      <Route exact path='/entity/:entityId/dashboard/proposals' component={Proposals} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
