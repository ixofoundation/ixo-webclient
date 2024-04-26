import { FlexBox } from 'components/App/App.styles'
import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { useCurrentEntityBondLinkedEntity } from 'hooks/currentEntity'
import { Navigate, Route, Routes, useMatch, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import EditEntity from './EditEntity'
import Outcomes from './Outcomes'
import Overview from './Overview'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useGetUserGranteeRole } from 'hooks/claim'
import Claims from '../ProjectDashboard/Claims'
import ClaimDetail from '../ProjectDashboard/ClaimDetail'
import { AgentRoles } from 'types/models'

const InvestmentDashboard: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const { entityId = "" } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const isClaimScreenRoute = useMatch('/entity/:entityId/dashboard/claims')

  const { owner, type, profile, accounts } = useAppSelector(getEntityById(entityId))
  const { registered, address } = useAccount()
  const { wallet } = useWallet()

  const signerRole = useGetUserGranteeRole(wallet?.address ?? '', owner, accounts)


  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Overview',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/outcomes`,
      icon: requireCheckDefault(require('assets/img/sidebar/outcomes.svg')),
      sdg: 'Outcomes',
      tooltip: 'Outcomes',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/agents`,
      icon: requireCheckDefault(require('assets/img/sidebar/agent.svg')),
      sdg: 'Agents',
      tooltip: 'Agents',
      disabled: !registered || owner !== address,
    },
    {
      url: `/entity/${entityId}/dashboard/claims`,
      icon: requireCheckDefault(require('assets/img/sidebar/check.svg')),
      sdg: 'Claims',
      tooltip: 'Claims',
      strict: true,
      disabled: !registered || (owner !== address && signerRole !== AgentRoles.evaluators),
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
      sdg: `Explore ${toTitleCase(type)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: profile?.name ?? "",
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
      iconClass: `icon-investment`,
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

  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''
  const { data: bondDetail } = useGetBondDid(bondDid)

  return (
    <Dashboard
      theme={isEditEntityRoute || isClaimScreenRoute ? 'light' : 'dark'}
      title={
        <FlexBox $alignItems='center' $gap={6}>
          {profile?.name}
          <FlexBox background={theme.ixoNewBlue} p={2} $borderRadius={'8px'}>
            <Typography size='base' color='white'>
              {bondDetail?.state}
            </Typography>
          </FlexBox>
        </FlexBox>
      }
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={`overview`} />} />

        <Route path='overview' Component={Overview} />
        <Route path='outcomes' Component={Outcomes} />

        {registered && owner === address && <Route path='edit' Component={EditEntity} />}
        {registered && (owner === address || signerRole === AgentRoles.evaluators) && (
          <>
            <Route path='claims' Component={Claims} />
            <Route path='claims/:claimId' Component={ClaimDetail} />
          </>
        )}
      </Routes>
    </Dashboard>
  )
}

export default InvestmentDashboard
