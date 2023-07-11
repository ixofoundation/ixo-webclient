import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { MyParticipation } from './MyParticipation'
import { Navigator } from './Navigator'
// import { OverviewIndividualMember } from './OverviewIndividualMember'
import { Membership } from './Membership'
import { Governance } from './Governance'
import { IndividualMember } from './IndividualMember'
import { AddGroup } from './AddGroup'
import useCurrentDao from 'hooks/currentDao'
import EditEntity from './EditEntity'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useRouteMatch('/entity/:entityId/dashboard/edit')
  const { entityType, owner } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { daoGroups } = useCurrentDao()
  const { registered, address } = useAccount()
  const isMemberOfDAO = Object.values(daoGroups ?? {}).some((daoGroup) =>
    daoGroup.votingModule.members.some((member) => member.addr === address),
  )

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
      url: `/entity/${entityId}/dashboard/add-group`,
      icon: requireCheckDefault(require('assets/img/sidebar/toc.svg')),
      sdg: 'Add Group',
      tooltip: 'Add Group',
      disabled: !registered || owner !== address,
    },
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: requireCheckDefault(require('assets/img/sidebar/settings.svg')),
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
      linkClass: isMemberOfDAO ? '' : 'restricted',
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
      {/* <Route
        exact
        path='/entity/:entityId/dashboard/overview/:coreAddress/:address'
        component={OverviewIndividualMember}
      /> */}
      <Route exact path='/entity/:entityId/dashboard/governance' component={Governance} />
      {registered && <Route exact path='/entity/:entityId/dashboard/my-participation' component={MyParticipation} />}
      {registered && owner === address && (
        <Route exact path='/entity/:entityId/dashboard/add-group' component={AddGroup} />
      )}
      {registered && owner === address && (
        <Route exact path='/entity/:entityId/dashboard/edit' component={EditEntity} />
      )}
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/membership`} />
      </Route>

      <Redirect to={`/entity/${entityId}/dashboard/membership`} />
    </Dashboard>
  )
}

export default DAODashboard
