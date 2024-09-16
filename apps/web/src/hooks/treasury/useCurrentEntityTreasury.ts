import { KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain'
import { contracts } from '@ixo/impactxclient-sdk'
import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient'
import { GetBalances, RPC_ENDPOINT } from 'lib/protocol'
import { TTreasuryAccountModel, TTreasuryCoinModel } from 'screens/CurrentEntity/Treasury/InvestmentFunding/Accounts'
import { useEffect, useState } from 'react'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { TDAOGroupModel, TEntityModel } from 'types/entities'
import { determineChainFromAddress } from 'utils/account'
import { findKeyValuePairs } from 'utils/common'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { truncateString } from 'utils/formatters'
import { getTreasuryCoinByDenom, mergeBalances } from 'utils/treasury'

const updateNativeTokenBalances = async (address: string, chainInfo: KeplrChainInfo): Promise<TTreasuryCoinModel[]> => {
  if (!chainInfo) return []
  const balances = await GetBalances(address, chainInfo.rpc)

  const coins = (await Promise.all(
    balances.map((coin) => getTreasuryCoinByDenom(address, coin, chainInfo.rpc)).filter((v) => v !== undefined),
  )) as TTreasuryCoinModel[]

  return mergeBalances(coins) as any
}

const getStakingGroupBalance = async ({
  stakingGroup,
}: {
  stakingGroup: TDAOGroupModel
}): Promise<{ [key: string]: TTreasuryCoinModel } | undefined> => {
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

const getEntityAccountBalances = async ({
  accounts,
}: {
  accounts: EntityAccount[]
}): Promise<{ [address: string]: TTreasuryAccountModel }> => {
  const results = await Promise.all(
    accounts.map(async ({ address, name }) => {
      const chainInfo = await determineChainFromAddress(address)
      if (!chainInfo) return null
      return {
        address,
        name,
        type: 'entity',
        network: 'ixo Network',
        coins: await updateNativeTokenBalances(address, chainInfo),
      }
    }),
  )
  return results.reduce(
    (acc, account) => {
      if (account) acc[account.address] = account as any
      return acc
    },
    {} as { [address: string]: TTreasuryAccountModel },
  )
}

const getLinkedAccountBalances = async ({
  linkedEntity,
}: {
  linkedEntity: LinkedEntity[]
}): Promise<{ [address: string]: TTreasuryAccountModel }> => {
  const results = await Promise.all(
    linkedEntity
      .filter((item) => item.type === 'BlockchainAccount')
      .map(async ({ id, relationship }) => {
        const chainInfo = await determineChainFromAddress(id)
        if (!chainInfo) return null
        return {
          address: id,
          name: truncateString(id, 15),
          type: 'linked',
          network: relationship,
          coins: await updateNativeTokenBalances(id, chainInfo),
        }
      }),
  )
  return results.reduce(
    (acc, account) => {
      if (account) acc[account.address] = account as any
      return acc
    },
    {} as { [address: string]: TTreasuryAccountModel },
  )
}

const getStakingAccountBalances = async ({
  daoGroups,
}: {
  daoGroups: TEntityModel['daoGroups']
}): Promise<{ [address: string]: TTreasuryAccountModel }> => {
  const results = await Promise.all(
    Object.values(daoGroups ?? {}).map(async (group) => {
      const coins = await getStakingGroupBalance({ stakingGroup: group })
      return {
        address: group.coreAddress,
        name: group.config.name,
        type: 'group',
        network: 'ixo Network',
        coins,
      }
    }),
  )
  return results.reduce(
    (acc, account) => {
      if (account) acc[account.address] = account as any
      return acc
    },
    {} as { [address: string]: TTreasuryAccountModel },
  )
}

const getMemberGroupAccountBalances = async ({
  daoGroups,
}: {
  daoGroups: TEntityModel['daoGroups']
}): Promise<{ [address: string]: TTreasuryAccountModel }> => {
  const results = await Promise.all(
    Object.values(daoGroups ?? {}).map(async (group) => {
      const chainInfo = await determineChainFromAddress(group.coreAddress)
      if (!chainInfo) return null
      return {
        address: group.coreAddress,
        name: group.config.name,
        type: 'group',
        network: 'ixo Network',
        coins: await updateNativeTokenBalances(group.coreAddress, chainInfo),
      }
    }),
  )
  return results.reduce(
    (acc, account) => {
      if (account) acc[account.address] = account as any
      return acc
    },
    {} as { [address: string]: TTreasuryAccountModel },
  )
}

export function useCurrentEntityTreasury({ entityId = '' }: { entityId?: string }) {
  const entity = useAppSelector(getEntityById(entityId))

  const [accounts, setAccounts] = useState<{ [address: string]: TTreasuryAccountModel }>({})

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
