import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { MyParticipation } from './MyParticipation'
import { Membership } from './Membership'
import { Governance } from './Governance'
import { IndividualMember } from './IndividualMember'
import EditEntity from './EditEntity'
import Overview from './Overview'
import { useQuery } from 'hooks/window'
import { getDAOGroupLinkedEntities } from 'utils/entities'
import { Spinner } from 'components/Spinner/Spinner'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useRouteMatch('/entity/:entityId/dashboard/edit')
  const { entityType, owner, daoGroups, linkedEntity } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()

  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')

  const searchParams = new URLSearchParams()
  searchParams.set('selectedGroup', selectedGroup)
  searchParams.toString()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/overview` + (selectedGroup ? '?' + searchParams.toString() : ''),
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Overview',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/membership` + (selectedGroup ? '?' + searchParams.toString() : ''),
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'Membership',
      tooltip: 'Membership',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/governance` + (selectedGroup ? '?' + searchParams.toString() : ''),
      icon: requireCheckDefault(require('assets/img/sidebar/governance.svg')),
      sdg: 'Governance',
      tooltip: 'Governance',
    },
    {
      url: `/entity/${entityId}/dashboard/my-participation` + (selectedGroup ? '?' + searchParams.toString() : ''),
      icon: requireCheckDefault(require('assets/img/sidebar/profile.svg')),
      sdg: 'My Participation',
      tooltip: 'My Participation',
      disabled: !registered,
    },
    {
      url: `/entity/${entityId}/dashboard/edit` + (selectedGroup ? '?' + searchParams.toString() : ''),
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

  if (getDAOGroupLinkedEntities(linkedEntity).length > 0 && Object.keys(daoGroups).length === 0) {
    return <Spinner info='Loading DAO Groups...' />
  }

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
      <Route exact path='/entity/:entityId/dashboard/membership' component={Membership} />
      <Route exact path='/entity/:entityId/dashboard/membership/:address' component={IndividualMember} />
      <Route exact path='/entity/:entityId/dashboard/governance' component={Governance} />

      {registered && <Route exact path='/entity/:entityId/dashboard/my-participation' component={MyParticipation} />}
      {registered && owner === address && (
        <Route exact path='/entity/:entityId/dashboard/edit' component={EditEntity} />
      )}

      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
