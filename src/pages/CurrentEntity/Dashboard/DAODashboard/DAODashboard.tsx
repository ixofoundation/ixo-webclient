import { contracts } from '@ixo/impactxclient-sdk'
import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab } from 'components/Dashboard/types'
import EconomyGovernance from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/EconomyGovernance'
import useCurrentEntity from 'hooks/useCurrentEntity'
import { useEffect } from 'react'
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { Overview } from './Overview'
import { OverviewIndividualMember } from './OverviewIndividualMember'
import { OverviewMembers } from './OverviewMembers'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/useCurrentDao'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { address, cosmWasmClient } = useAccount()
  const isIndividualMemberRoute = useRouteMatch('/entity/:entityId/dashboard/overview/:groupId/:address')
  const { entityType, linkedEntity, profile } = useCurrentEntity()
  const { updateGroup } = useCurrentDao()
  const name = profile?.name //  TODO: from redux

  const routes = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Dashboard',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/proposals`,
      icon: requireCheckDefault(require('assets/img/sidebar/governance.svg')),
      sdg: 'Proposals',
      tooltip: 'Proposals',
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
      url: `/entity/${entityId}/dashboard/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-dao`,
      linkClass: 'dao',
      path: '/explore',
      title: 'DAO',
      tooltip: `DAO Explorer`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `DAO Management`,
    },
  ]

  const theme = isIndividualMemberRoute ? 'light' : 'dark'

  useEffect(() => {
    if (linkedEntity.length > 0 && !!cosmWasmClient) {
      linkedEntity
        .filter(({ type }) => type === 'Group')
        .forEach(({ id }) => {
          const [, coreAddress] = id.split('#')

          ;(async () => {
            const daoCoreClient = new contracts.DaoCore.DaoCoreClient(cosmWasmClient, address, coreAddress)
            const admin = await daoCoreClient.admin()
            const config = await daoCoreClient.config()
            const cw20Balances = await daoCoreClient.cw20Balances({})
            const cw20TokenList = await daoCoreClient.cw20TokenList({})
            const cw721TokenList = await daoCoreClient.cw721TokenList({})
            const listItems = await daoCoreClient.listItems({})
            const [{ address: proposalModuleAddress }] = await daoCoreClient.proposalModules({})
            const [{ address: activeProposalModuleAddress }] = await daoCoreClient.activeProposalModules({})
            const proposalModuleCount = await daoCoreClient.proposalModuleCount()
            const votingModuleAddress = await daoCoreClient.votingModule()

            // proposalModule
            const proposalModule: any = {}
            proposalModule.proposalModuleAddress = proposalModuleAddress
            proposalModule.proposalModuleCount = proposalModuleCount
            const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
              cosmWasmClient,
              address,
              proposalModuleAddress,
            )
            const { proposals } = await daoProposalSingleClient.listProposals({})
            // const votes = await daoProposalSingleClient.listVotes({})
            proposalModule.proposals = proposals
            const {
              module: { addr: preProposalContractAddress },
            } = (await daoProposalSingleClient.proposalCreationPolicy()) as { module: { addr: string } }
            proposalModule.preProposalContractAddress = preProposalContractAddress

            // votingModule
            const votingModule: any = {}
            votingModule.votingModuleAddress = votingModuleAddress
            const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4Client(
              cosmWasmClient,
              address,
              votingModule.votingModuleAddress,
            )
            votingModule.groupContractAddress = await daoVotingCw4Client.groupContract()
            const cw4GroupClient = new contracts.Cw4Group.Cw4GroupClient(
              cosmWasmClient,
              address,
              votingModule.groupContractAddress,
            )
            votingModule.members = (await cw4GroupClient.listMembers({})).members as never[]
            votingModule.totalWeight = (await cw4GroupClient.totalWeight({})).weight as number

            // treasury
            const treasury: any = {}
            treasury.cw20Balances = cw20Balances
            treasury.cw20TokenList = cw20TokenList
            treasury.cw721TokenList = cw721TokenList

            console.log({
              admin,
              config,
              cw20Balances,
              cw20TokenList,
              listItems,
              activeProposalModuleAddress,
              proposalModule,
              votingModule,
              treasury,
            })

            updateGroup({
              coreAddress,
              admin,
              type: 'membership',
              config,
              proposalModule,
              votingModule,
              treasury,
            })
          })()
          // const daoCoreClient = new contracts.DaoCore.DaoCoreClient(cosmWasmClient, address, coreAddress)
          // daoCoreClient.admin().then((admin) => console.log({ admin }))
          // daoCoreClient.config().then((config) => console.log({ config }))
          // daoCoreClient.cw20Balances({}).then((cw20Balances) => console.log({ cw20Balances }))
          // daoCoreClient.cw20TokenList({}).then((cw20TokenList) => console.log({ cw20TokenList }))
          // daoCoreClient.cw721TokenList({}).then((cw721TokenList) => console.log({ cw721TokenList }))
          // daoCoreClient.dumpState().then((dumpState) => console.log({ dumpState }))
          // daoCoreClient.listItems({}).then((listItems) => console.log({ listItems }))
          // daoCoreClient.proposalModules({}).then((proposalModules) => {
          //   console.log({ proposalModules })
          //   proposalModules.forEach((proposalModule) => {
          //     const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
          //       cosmWasmClient,
          //       address,
          //       proposalModule.address,
          //     )
          //     daoProposalSingleClient
          //       .config()
          //       .then((daoProposalSingleClientConfig) => console.log({ daoProposalSingleClientConfig }))
          //     daoProposalSingleClient.listProposals({}).then((listProposals) => console.log({ listProposals }))
          //     daoProposalSingleClient.reverseProposals({}).then((reverseProposals) => console.log({ reverseProposals }))
          //   })
          // })
          // daoCoreClient
          //   .activeProposalModules({})
          //   .then((activeProposalModules) => console.log({ activeProposalModules }))
          // daoCoreClient.proposalModuleCount().then((proposalModuleCount) => console.log({ proposalModuleCount }))
          // daoCoreClient.pauseInfo().then((pauseInfo) => console.log({ pauseInfo }))
          // daoCoreClient.votingModule().then((votingModule) => {
          //   console.log({ votingModule })
          //   const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4Client(
          //     cosmWasmClient,
          //     address,
          //     votingModule,
          //   )
          //   daoVotingCw4Client.dao().then((dao) => console.log({ dao }))
          //   daoVotingCw4Client
          //     .votingPowerAtHeight({ address: '' })
          //     .then((votingPowerAtHeight) => console.log({ votingPowerAtHeight }))
          //   daoVotingCw4Client.totalPowerAtHeight({}).then((totalPowerAtHeight) => console.log({ totalPowerAtHeight }))

          //   daoVotingCw4Client.groupContract().then((groupContract) => {
          //     console.log({ groupContract })
          //     const cw4GroupClient = new contracts.Cw4Group.Cw4GroupClient(cosmWasmClient, address, groupContract)
          //     cw4GroupClient.listMembers({}).then((listMembers) => console.log({ listMembers }))
          //   })
          // })
          // daoCoreClient.listSubDaos({}).then((listSubDaos) => console.log({ listSubDaos }))
          // daoCoreClient.daoURI().then((daoURI) => console.log({ daoURI }))
          // daoCoreClient
          //   .votingPowerAtHeight({ address: '' })
          //   .then((votingPowerAtHeight) => console.log({ votingPowerAtHeight }))
          // daoCoreClient.totalPowerAtHeight({}).then((totalPowerAtHeight) => console.log({ totalPowerAtHeight }))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedEntity, cosmWasmClient])

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Route exact path='/entity/:entityId/dashboard/overview' component={Overview} />
      <Route exact path='/entity/:entityId/dashboard/overview/:coreAddress' component={OverviewMembers} />
      <Route exact path='/entity/:entityId/dashboard/overview/:groupId/:address' component={OverviewIndividualMember} />
      <Route exact path='/entity/:entityId/dashboard/proposals' component={EconomyGovernance} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
