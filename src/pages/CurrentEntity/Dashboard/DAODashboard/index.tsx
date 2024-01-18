import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { MyParticipation } from './MyParticipation'
import { Navigator } from './Navigator'
import { Membership } from './Membership'
import { Governance } from './Governance'
import { IndividualMember } from './IndividualMember'
import EditEntity from './EditEntity'
import { useQuery } from 'hooks/window'
import { useEffect } from 'react'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useRouteMatch('/entity/:entityId/dashboard/edit')
  const { entityType, owner, selectDAOGroup } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()

  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  useEffect(() => {
    if (selectedGroup) {
      selectDAOGroup(selectedGroup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup])

  const routes: Path[] = [
    // {
    //   url: `/entity/${entityId}/dashboard/navigator`,
    //   icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
    //   sdg: 'Navigator',
    //   tooltip: 'Navigator',
    //   strict: true,
    // },
    {
      url: `/entity/${entityId}/dashboard/membership`,
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'Membership',
      tooltip: 'Membership',
      strict: true,
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
      <Route exact path='/entity/:entityId/dashboard/navigator' component={Navigator} />
      <Route exact path='/entity/:entityId/dashboard/membership' component={Membership} />
      <Route exact path='/entity/:entityId/dashboard/membership/:address' component={IndividualMember} />
      <Route exact path='/entity/:entityId/dashboard/governance' component={Governance} />
      {registered && <Route exact path='/entity/:entityId/dashboard/my-participation' component={MyParticipation} />}
      {registered && owner === address && (
        <Route exact path='/entity/:entityId/dashboard/edit' component={EditEntity} />
      )}
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/membership`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
