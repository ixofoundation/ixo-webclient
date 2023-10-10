import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Redirect, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts'
import Claims from './Claims'
import Payments from './Payments'
import Events from './Events'

const InvestmentFunding: React.FC = (): JSX.Element => {
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
    {
      url: `/entity/${entityId}/treasury/payments`,
      icon: requireCheckDefault(require('assets/img/sidebar/refresh.svg')),
      sdg: 'Payments',
      tooltip: 'Payments',
    },
    {
      url: `/entity/${entityId}/treasury/events`,
      icon: requireCheckDefault(require('assets/img/sidebar/history.svg')),
      sdg: 'Events',
      tooltip: 'Events',
    },
    {
      url: `/entity/${entityId}/treasury/claims`,
      icon: requireCheckDefault(require('assets/img/sidebar/check.svg')),
      sdg: 'Claims',
      tooltip: 'Claims',
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: 'Explore Investments',
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
      sdg: 'Funding',
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-investment`,
      linkClass: 'investment',
      path: `/entity/${entityId}/overview`,
      title: 'Investment',
      tooltip: `Investment Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `Investment Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `Investment Funding`,
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
      <Route exact path='/entity/:entityId/treasury/payments' component={Payments} />
      <Route exact path='/entity/:entityId/treasury/events' component={Events} />
      <Route exact path='/entity/:entityId/treasury/claims' component={Claims} />
      <Route exact path='/entity/:entityId/treasury'>
        <Redirect to={`/entity/${entityId}/treasury/accounts`} />
      </Route>
    </Dashboard>
  )
}

export default InvestmentFunding
