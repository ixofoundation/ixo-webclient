import { GetBondDetail, GetProjectAccounts } from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'
import { matchPath, useHistory } from 'react-router-dom'
import useCurrentEntity from 'hooks/currentEntity'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { cellNodeChainMapping, chainNetwork } from 'hooks/configs'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import { contracts } from '@ixo/impactxclient-sdk'

const EntityUpdateService = (): null => {
  const history = useHistory()
  const match =
    matchPath(history.location.pathname, {
      path: '/create/entity/:entityId/deed/:coreAddress',
    }) ??
    matchPath(history.location.pathname, {
      path: '/entity/:entityId/dashboard',
    })
  const entityId = match?.params['entityId']
  const { did, bondDid, updateEntityAddress, updateEntityBondDetail } = useSelectedEntity()
  const { getValidators } = useValidators()
  const { address, cosmWasmClient } = useAccount()
  const {
    linkedEntity,
    linkedResource,
    getEntityByDid,
    updateEntityProfile,
    updateEntityCreator,
    updateEntityAdministrator,
    updateEntityPage,
    updateEntityTags,
  } = useCurrentEntity()
  const { updateGroup } = useCurrentDao()

  useEffect(() => {
    const init = async (did: string): Promise<void> => {
      const res = await GetProjectAccounts(did)
      if (res![did]) {
        updateEntityAddress(res![did])
      }
    }
    if (did) {
      init(did)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [did])

  useEffect(() => {
    const fetch = async (bondDid: string) => {
      const res = await GetBondDetail(bondDid)
      if (res?.bond) {
        // update bond detail in redux
        updateEntityBondDetail(res.bond)
      }
    }
    if (bondDid) {
      fetch(bondDid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDid])

  useEffect(() => {
    getValidators()
  }, [getValidators])

  useEffect(() => {
    if (entityId) {
      console.log('getEntityByDid is being called')
      getEntityByDid(entityId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  useEffect(() => {
    if (linkedResource.length > 0) {
      linkedResource.forEach((item: LinkedResource) => {
        const { id, serviceEndpoint } = item
        switch (id) {
          case '{id}#profile':
            fetch(serviceEndpoint)
              .then((response) => response.json())
              .then((response) => {
                updateEntityProfile(response)
              })
            break
          case '{id}#creator': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((credentialSubject) => {
                updateEntityCreator(credentialSubject)
              })
            break
          }
          case '{id}#administrator': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((credentialSubject) => {
                updateEntityAdministrator(credentialSubject)
              })
            break
          }
          case '{id}#page': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.page)
              .then((page) => {
                updateEntityPage(page)
              })
            break
          }
          case '{id}#tags': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((ddoTags) => {
                updateEntityTags(ddoTags)
              })
            break
          }
          default:
            break
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedResource])

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
            const storageItems = await daoCoreClient.listItems({})
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
            proposalModule.proposalConfig = await daoProposalSingleClient.config()
            const { proposals } = await daoProposalSingleClient.listProposals({})
            // const votes = await daoProposalSingleClient.listVotes({})
            proposalModule.proposals = proposals
            const {
              module: { addr: preProposalContractAddress },
            } = (await daoProposalSingleClient.proposalCreationPolicy()) as { module: { addr: string } }
            proposalModule.preProposalContractAddress = preProposalContractAddress
            const daoPreProposeSingleClient = new contracts.DaoPreProposeSingle.DaoPreProposeSingleClient(
              cosmWasmClient,
              address,
              preProposalContractAddress,
            )
            proposalModule.preProposeConfig = await daoPreProposeSingleClient.config()

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
              storageItems,
              activeProposalModuleAddress,
              proposalModule,
              votingModule,
              treasury,
            })

            updateGroup({
              coreAddress,
              admin,
              type: 'membership', // TODO:
              config,
              proposalModule,
              votingModule,
              treasury,
              storageItems,
            })
          })()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedEntity, cosmWasmClient])

  return null
}

export default EntityUpdateService
