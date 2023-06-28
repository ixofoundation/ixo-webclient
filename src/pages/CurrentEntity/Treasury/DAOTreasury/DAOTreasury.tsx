import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts/Accounts'

const DAOTreasury: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { daoGroups } = useCurrentDao()
  const { address } = useAccount()

  const isMemberOfDAO = Object.values(daoGroups ?? {}).some((daoGroup) =>
    daoGroup.votingModule.members.some((member) => member.addr === address),
  )

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
      url: `/entity/${entityId}/treasury`,
      icon: '',
      sdg: 'Treasury',
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
      <Route exact path='/entity/:entityId/treasury/accounts' component={Accounts} />
      <Route exact path='/entity/:entityId/treasury'>
        <Redirect to={`/entity/${entityId}/treasury/accounts`} />
      </Route>
    </Dashboard>
  )
}

export default DAOTreasury
