import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import { Navigate, Route, useMatch, useParams, Routes } from 'react-router-dom'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import Agents from './Agents'
import Claims from './Claims'
import EditEntity from './EditEntity'
import { useGetUserGranteeRole } from 'hooks/claim'
import { AgentRoles } from 'types/models'
import ClaimDetail from './ClaimDetail'
import Overview from './Overview'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const ProjectDashboard: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const isClaimScreenRoute = useMatch('/entity/:entityId/dashboard/claims')
  const { accounts, owner, type, profile, verificationMethod } = useAppSelector(getEntityById(entityId))
  const { registered, address } = useAccount()
  const signerRole = useGetUserGranteeRole(address, owner, accounts, verificationMethod)

  const isVerifiedOnEntity = verificationMethod.some((verification) => verification?.blockchainAccountID === address)

  const showAgentsRoute = owner === address || isVerifiedOnEntity
  const ShowClaimsRoute = owner === address || signerRole === AgentRoles.evaluators || isVerifiedOnEntity
  const showEditEntityRoute = (registered && owner === address) || isVerifiedOnEntity

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
      iconClass: `icon-project`,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase(type),
      tooltip: `${toTitleCase(type)} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase(type)} Management`,
    },
  ]

  return (
    <Dashboard
      theme={isEditEntityRoute || isClaimScreenRoute ? 'light' : 'dark'}
      title={profile?.name ?? ''}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={`overview`} />} />

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

export default ProjectDashboard
