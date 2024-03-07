import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
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
import Agents from './Agents'
import Claims from './Claims'
import ClaimDetail from './ClaimDetail'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const isCreateProposalRoute = useMatch('/entity/:entityId/dashboard/governance/:coreAddress/*')
  const isClaimScreenRoute = useMatch('/entity/:entityId/dashboard/claims')
  const { entityType, owner, daoGroups, linkedEntity } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()
  const signerRole = useGetUserGranteeRole()

  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')

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

  if (getDAOGroupLinkedEntities(linkedEntity).length > 0 && Object.keys(daoGroups).length === 0) {
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
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Routes>
        <Route index element={<Navigate to={`overview`} />} />
        <Route path='overview' Component={Overview} />
        <Route path='membership' Component={Membership} />
        <Route path='membership/:address' Component={IndividualMember} />
        <Route path='governance' Component={Governance} />
        {/* <Route path='governance/:coreAddress/*' Component={CreateProposal} /> */}

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
