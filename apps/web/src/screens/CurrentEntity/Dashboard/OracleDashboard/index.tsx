import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import { Navigate, Route, Routes, useParams, useMatch } from 'react-router-dom'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import EditEntity from './EditEntity'
import Overview from './Overview'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useGetUserGranteeRole } from 'hooks/claim'
import { AgentRoles } from 'types/models'
import Agents from '../ProjectDashboard/Agents'
import Claims from '../ProjectDashboard/Claims'
import ClaimDetail from '../ProjectDashboard/ClaimDetail'

const OracleDashboard: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const { type, owner, profile, verificationMethod, accounts } = useAppSelector(getEntityById(entityId))
  const { address } = useAccount()
  const signerRole = useGetUserGranteeRole(address, owner, accounts, verificationMethod)

  const isVerifiedOnEntity = verificationMethod.some((verification) => verification?.blockchainAccountID === address)

  const showAgentsRoute = owner === address || isVerifiedOnEntity
  const ShowClaimsRoute = (owner === address && signerRole === AgentRoles.evaluators) || isVerifiedOnEntity
  const showEditEntityRoute = owner === address || isVerifiedOnEntity

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: '/assets/img/sidebar/global.svg',
      sdg: 'Overview',
      tooltip: 'Overview',
    },
    {
      url: `/entity/${entityId}/dashboard/agents`,
      icon: '/assets/img/sidebar/agent.svg',
      sdg: 'Agents',
      tooltip: 'Agents',
      disabled: !showAgentsRoute,
    },
    {
      url: `/entity/${entityId}/dashboard/claims`,
      icon: '/assets/img/sidebar/check.svg',
      sdg: 'Claims',
      tooltip: 'Claims',
      strict: true,
      disabled: !ShowClaimsRoute,
    },
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: '/assets/img/sidebar/gear.svg',
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !showEditEntityRoute,
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: `Explore ${toTitleCase(type)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: profile?.name ?? '',
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
      iconClass: `icon-${type}`,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase('oracle'),
      tooltip: `${toTitleCase('oracle')} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase('oracle')} Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `${toTitleCase(type)} Funding`,
    },
  ]

  return (
    <Dashboard
      theme={isEditEntityRoute ? 'light' : 'dark'}
      title={profile?.name ?? ''}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={'overview'} />} />
        <Route path='overview' Component={Overview} />

        {showAgentsRoute && <Route path='agents' Component={Agents} />}

        {ShowClaimsRoute && (
          <>
            <Route path='claims' Component={Claims} />
            <Route path='claims/:claimId' Component={ClaimDetail} />
          </>
        )}

        {showEditEntityRoute && <Route path='edit' Component={EditEntity} />}
      </Routes>
    </Dashboard>
  )
}

export default OracleDashboard
