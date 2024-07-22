import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import { useCurrentEntityDAOGroupToken } from 'hooks/currentEntity'
import { Navigate, Route, Routes, useMatch, useParams } from 'react-router-dom'
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
import CreateProposal from './Governance/CreateProposal'
import CreateEntityLayout from 'pages/CreateEntity/CreateEntityLayout/CreateEntityLayout'
import { useGetUserGranteeRole } from 'hooks/claim'
import { AgentRoles } from 'types/models'
import Agents from '../ProjectDashboard/Agents'
import Claims from '../ProjectDashboard/Claims'
import ClaimDetail from '../ProjectDashboard/ClaimDetail'
import Shareholders from './Shareholders'
import { useMemo } from 'react'
import { Requests } from './Requests'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useWallet } from '@ixo-webclient/wallet-connector'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const isCreateProposalRoute = useMatch('/entity/:entityId/dashboard/governance/:coreAddress/*')
  const isClaimScreenRoute = useMatch('/entity/:entityId/dashboard/claims')
  const isShareholdersScreenRoute = useMatch('/entity/:entityId/dashboard/shareholders')
  const { wallet } = useWallet()
  const entity = useAppSelector(getEntityById(entityId))

  const owner = entity?.owner
  const daoGroups = entity?.daoGroups ?? {}
  const name = entity.profile?.name ?? ''
  const type = entity.type

  // const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()
  const signerRole = useGetUserGranteeRole(wallet?.address ?? '', entity.owner, entity.accounts, entity.verificationMethod)

  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')

  const { tokenSymbol } = useCurrentEntityDAOGroupToken(selectedGroup, entity?.daoGroups ?? {})

  const searchParams = new URLSearchParams()
  searchParams.set('selectedGroup', selectedGroup)
  searchParams.toString()

  const routes: Path[] = [
    // {
    //   url: `/entity/${entityId}/dashboard/navigator`,
    //   icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
    //   sdg: 'Navigator',
    //   tooltip: 'Navigator',
    //   strict: true,
    // },
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
      url: `/entity/${entityId}/dashboard/edit` + (selectedGroup ? '?' + searchParams.toString() : ''),
      icon: requireCheckDefault(require('assets/img/sidebar/gear.svg')),
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !registered || owner !== address,
    },
    {
      url: `/entity/${entityId}/dashboard/requests`,
      icon: requireCheckDefault(require('assets/img/sidebar/settings.svg')),
      sdg: 'Requests',
      tooltip: 'Requests',
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

  const title = useMemo(() => {
    if (isShareholdersScreenRoute) {
      return tokenSymbol?.toUpperCase() + ' Shares'
    }
    return name
  }, [isShareholdersScreenRoute, name, tokenSymbol])

  if (getDAOGroupLinkedEntities(entity.linkedEntity).length > 0 && Object.keys(daoGroups).length === 0) {
    return <Spinner info='Loading DAO Groups...' />
  }

  if (isCreateProposalRoute) {
    return (
      <CreateEntityLayout title={'Create Proposal'} subtitle={''} breadCrumbs={[]}>
        <Routes>
          {/* <CreateProposal /> */}
          <Route path='governance/:coreAddress/*' Component={CreateProposal} />
        </Routes>
      </CreateEntityLayout>
    )
  }

  return (
    <Dashboard
      theme={isEditEntityRoute || isClaimScreenRoute ? 'light' : 'dark'}
      title={title}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={`overview`} />} />
        <Route path='overview' Component={Overview} />
        <Route path='membership' Component={Membership} />
        <Route path='membership/:address' Component={IndividualMember} />
        <Route path='governance' Component={Governance} />
        <Route path='requests' Component={Requests} />
        {/* <Route path='governance/:coreAddress/*' Component={CreateProposal} /> */}

        <Route path='shareholders' Component={Shareholders} />

        {registered && owner === address && <Route path='agents' Component={Agents} />}
        {registered && (owner === address || signerRole === AgentRoles.evaluators) && (
          <>
            <Route path='claims' Component={Claims} />
            <Route path='claims/:claimId' Component={ClaimDetail} />
          </>
        )}

        {registered && <Route path='my-participation' Component={MyParticipation} />}
        {registered && owner === address && <Route path='edit' Component={EditEntity} />}

        {/* <Route path='navigator' element={<Navigator />} />
        <Route path='membership'>
          <Route path=':address' element={<IndividualMember />} />
          <Route index element={<Membership />} />
        </Route> */}
        {/* 
        <Route path='governance' element={<Governance />} />
        {registered && <Route path='my-participation' element={<MyParticipation />} />}
        {registered && owner === address && <Route path='edit' element={<EditEntity />} />} */}
      </Routes>
    </Dashboard>
  )
}

export default DAODashboard
