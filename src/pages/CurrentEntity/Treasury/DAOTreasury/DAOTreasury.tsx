import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts/Accounts'

const DAOTreasury: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()

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
    },
  ]

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
