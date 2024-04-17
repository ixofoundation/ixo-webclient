import { KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain'
import { contracts } from '@ixo/impactxclient-sdk'
import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient'
import { GetBalances, RPC_ENDPOINT } from 'lib/protocol'
import { TTreasuryAccountModel, TTreasuryCoinModel } from 'pages/CurrentEntity/Treasury/InvestmentFunding/Accounts'
import { useEffect, useState } from 'react'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TDAOGroupModel, TEntityModel } from 'types/entities'
import { determineChainFromAddress } from 'utils/account'
import { findKeyValuePairs } from 'utils/common'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { truncateString } from 'utils/formatters'
import { getTreasuryCoinByDenom } from 'utils/treasury'

const updateNativeTokenBalances = async (address: string, chainInfo: KeplrChainInfo) => {
  if (!chainInfo) return []
  const balances = await GetBalances(address, chainInfo.rpc)

  const coins = (await Promise.all(
    balances.map((coin) => getTreasuryCoinByDenom(address, coin, chainInfo.rpc)).filter((v) => v !== undefined),
  )) as TTreasuryCoinModel[]

  return coins
}

const getStakingGroupBalance = async ({ stakingGroup }: { stakingGroup: TDAOGroupModel }) => {
  const cwClient = await getCosmwasmClient(RPC_ENDPOINT ?? '')
  const {
    token,
    votingModule: { votingModuleAddress },
  } = stakingGroup

  if (!token) return undefined

  const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
    cwClient,
    votingModuleAddress,
  )
  const tokenContract = await daoVotingCw20StakedClient.tokenContract()

  const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
  const { balance: microBalance } = await cw20BaseClient.balance({ address: stakingGroup.coreAddress })

  const balance = convertMicroDenomToDenomWithDecimals(microBalance, token.tokenInfo.decimals)
  if (balance === 0) {
    return undefined
  }

  const payload: TTreasuryCoinModel = {
    address: stakingGroup.coreAddress,
    coinDenom: token.tokenInfo.symbol,
    network: 'IXO',
    balance: balance.toString(),
    coinImageUrl: (token.marketingInfo?.logo !== 'embedded' && token.marketingInfo.logo?.url) || '',
    lastPriceUsd: 0,
  }
  return {
    [payload.address]: payload,
  }
}

const getEntityAccountBalances = async ({ accounts }: { accounts: EntityAccount[] }) => {
  return accounts.reduce(async (acc, { address, name }) => {
    const chainInfo = await determineChainFromAddress(address)
    if (!chainInfo) return
    return {
      ...acc,
      [address]: {
        address,
        name,
        type: 'entity',
        network: 'ixo Network',
        coins: await updateNativeTokenBalances(address, chainInfo),
      },
    }
  }, {})
}

const getLinkedAccountBalances = async ({ linkedEntity }: { linkedEntity: LinkedEntity[] }) => {
  return linkedEntity
    .filter((item) => item.type === 'BlockchainAccount')
    .reduce(async (acc, { id, relationship }) => {
      const chainInfo = await determineChainFromAddress(id)
      if (!chainInfo) return
      return {
        ...acc,
        [id]: {
          address: id,
          name: truncateString(id, 15),
          type: 'linked',
          network: relationship,
          coins: await updateNativeTokenBalances(id, chainInfo),
        },
      }
    }, {})
}

const getStakingAccountBalances = async ({ daoGroups }: { daoGroups: TEntityModel['daoGroups'] }) => {
  return Object.values(daoGroups ?? {}).reduce(
    async (acc, group) => ({
      ...acc,
      [group.coreAddress]: {
        address: group.coreAddress,
        name: group.config.name,
        type: 'group',
        network: 'ixo Network',
        coins: await getStakingGroupBalance({ stakingGroup: group }),
      },
    }),
    {},
  )
}

const getMemberGroupAccountBalances = async ({ daoGroups }: { daoGroups: TEntityModel['daoGroups'] }) => {
  return Object.values(daoGroups ?? {}).reduce(async (acc, group) => {
    const chainInfo = await determineChainFromAddress(group.coreAddress)
    if (!chainInfo) return
    return {
      ...acc,
      [group.coreAddress]: {
        address: group.coreAddress,
        name: group.config.name,
        type: 'group',
        network: 'ixo Network',
        coins: await updateNativeTokenBalances(group.coreAddress, chainInfo),
      },
    }
  }, {})
}

export function useCurrentEntityTreasury({ entityId = '' }) {
  const entity = useAppSelector(getEntityById(entityId))

  const [accounts, setAccounts] = useState<{
    [address: string]: TTreasuryAccountModel
  }>({})

  useEffect(() => {
    getEntityAccountBalances({ accounts: entity.accounts }).then((response) =>
      setAccounts((prev) => ({ ...prev, ...response })),
    )
  }, [entity.accounts])

  useEffect(() => {
    getStakingAccountBalances({ daoGroups: findKeyValuePairs(entity?.daoGroups ?? {}, 'type', 'staking') })
      .then((response) => {
        return response
      })
      .then((response) => setAccounts((prev) => ({ ...prev, ...response })))
  }, [entity.daoGroups])

  useEffect(() => {
    getLinkedAccountBalances({ linkedEntity: entity.linkedEntity }).then((response) =>
      setAccounts((prev) => ({ ...prev, ...response })),
    )
  }, [entity.linkedEntity])

  useEffect(() => {
    getMemberGroupAccountBalances({ daoGroups: findKeyValuePairs(entity?.daoGroups ?? {}, 'type', 'membership') })
      .then((response) => {
        return response
      })
      .then((response) => setAccounts((prev) => ({ ...prev, ...response })))
  }, [entity.daoGroups])

  return accounts
}
