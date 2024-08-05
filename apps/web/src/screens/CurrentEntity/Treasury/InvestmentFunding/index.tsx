import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { Navigate, Route, useMatch, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import Accounts from './Accounts'
import Payments from './Payments'
import Events from './Events'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const InvestmentFunding: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { type, profile } = useAppSelector(getEntityById(entityId))
  const isClaimScreenRoute = useMatch('/entity/:entityId/treasury/claims')

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/treasury/accounts`,
      icon: '/public/assets/img/sidebar/account.svg',
      sdg: 'Accounts',
      tooltip: 'Accounts',
    },
    {
      url: `/entity/${entityId}/treasury/payments`,
      icon: '/public/assets/img/sidebar/refresh.svg',
      sdg: 'Payments',
      tooltip: 'Payments',
    },
    {
      url: `/entity/${entityId}/treasury/events`,
      icon: '/public/assets/img/sidebar/history.svg',
      sdg: 'Events',
      tooltip: 'Events',
    },
    {
      url: `/entity/${entityId}/treasury/claims`,
      icon: '/public/assets/img/sidebar/check.svg',
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
      sdg: profile?.name ?? '',
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

  const theme = isClaimScreenRoute ? 'light' : 'dark'

  return (
    <Dashboard
      theme={theme}
      title={profile?.name ?? ''}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Route path='/entity/:entityId/treasury/accounts' element={<Accounts />} />
      <Route path='/entity/:entityId/treasury/payments' element={<Payments />} />
      <Route path='/entity/:entityId/treasury/events' element={<Events />} />
      <Route path='/entity/:entityId/treasury'>
        <Navigate to={`/entity/${entityId}/treasury/accounts`} />
      </Route>
    </Dashboard>
  )
}

export default InvestmentFunding
