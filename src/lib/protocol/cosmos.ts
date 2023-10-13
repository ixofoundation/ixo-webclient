import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { cosmos, createQueryClient, customQueries, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { fee, RPC_ENDPOINT } from './common'
import { VoteOption } from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1/gov'
import {
  DelegationResponse,
  UnbondingDelegation,
  Validator,
} from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { Input, Output } from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/bank'
import { QueryDelegationTotalRewardsResponse } from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/query'
import { TokenAsset } from '@ixo/impactxclient-sdk/types/custom_queries/currency.types'
import { sleepByLimiter } from 'utils/limiter'

const { createRPCQueryClient } = cosmos.ClientFactory

export const BankSendTrx = async (
  client: SigningStargateClient,
  myAddress: string,
  toAddress: string,
  token: Coin,
): Promise<DeliverTxResponse | undefined> => {
  try {
    const message = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: cosmos.bank.v1beta1.MsgSend.fromPartial({
        fromAddress: myAddress,
        toAddress: toAddress,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(token)],
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(myAddress, [message], fee)
    return response
  } catch (e) {
    console.error('BankSendTrx', e)
    return undefined
  }
}

export const BankMultiSendTrx = async (
  client: SigningStargateClient,
  payload: { address: string; inputs: Input[]; outputs: Output[] },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { inputs, outputs, address } = payload
    const message = {
      typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
      value: cosmos.bank.v1beta1.MsgMultiSend.fromPartial({
        inputs,
        outputs,
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('BankMultiSendTrx', e)
    return undefined
  }
}

export const GetBalances = async (address: string, rpc = RPC_ENDPOINT): Promise<Coin[]> => {
  if (!address) {
    throw new Error('address is undefined')
  }
  const client = await createRPCQueryClient({ rpcEndpoint: rpc! })
  await sleepByLimiter()
  const res = await client.cosmos.bank.v1beta1.allBalances({
    address,
  })
  return res.balances
}

export const GetTokenAsset = async (denom: string, rpc = RPC_ENDPOINT): Promise<TokenAsset> => {
  if (!denom) {
    // eslint-disable-next-line no-throw-literal
    throw 'Denom is undefined'
  }

  const isIbc = /^ibc\//i.test(denom)
  if (isIbc) {
    const client = await createQueryClient(rpc!)
    await sleepByLimiter()
    const ibcToken = await customQueries.currency.findIbcTokenFromHash(client, denom)
    if (!ibcToken.token) {
      // eslint-disable-next-line no-throw-literal
      throw 'Token Asset not found'
    }
    return ibcToken.token
  }

  const token = customQueries.currency.findTokenFromDenom(denom)
  return token
}

export const GetValidators = async (): Promise<Validator[]> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { validators = [] } = await client.cosmos.staking.v1beta1.validators({ status: 'BOND_STATUS_BONDED' })
    return validators
  } catch (e) {
    console.error('GetValidators', e)
    return []
  }
}

export const GetValidatorByAddr = async (validatorAddr: string): Promise<Validator | undefined> => {
  try {
    if (!validatorAddr) {
      throw new Error('validatorAddr is undefined')
    }
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { validator } = await client.cosmos.staking.v1beta1.validator({
      validatorAddr,
    })
    return validator
  } catch (e) {
    console.error('GetValidatorByAddr', e)
    return undefined
  }
}

export const GetDelegatorValidators = async (delegatorAddr: string): Promise<Validator[]> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { validators } = await client.cosmos.staking.v1beta1.delegatorValidators({ delegatorAddr })
    return validators
  } catch (e) {
    console.error('GetDelegatorValidators', e)
    return []
  }
}

export const GetDelegatorDelegations = async (delegatorAddr: string): Promise<DelegationResponse[]> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { delegationResponses } = await client.cosmos.staking.v1beta1.delegatorDelegations({ delegatorAddr })
    return delegationResponses
  } catch (e) {
    console.error('GetDelegatorValidators', e)
    return []
  }
}

export const GetDelegatorUnbondingDelegations = async (delegatorAddr: string): Promise<UnbondingDelegation[]> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { unbondingResponses } = await client.cosmos.staking.v1beta1.delegatorUnbondingDelegations({ delegatorAddr })
    return unbondingResponses
  } catch (e) {
    console.error('GetDelegatorUnbondingDelegations', e)
    return []
  }
}

export const GetDelegationTotalRewards = async (
  delegatorAddress: string,
): Promise<QueryDelegationTotalRewardsResponse | undefined> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const totalRewardsResponse = await client.cosmos.distribution.v1beta1.delegationTotalRewards({ delegatorAddress })
    return totalRewardsResponse
  } catch (e) {
    console.error('GetDelegationTotalRewards', e)
    return undefined
  }
}

export const GovVoteTrx = async (
  client: SigningStargateClient,
  payload: { address: string; proposalId: Long; option: VoteOption },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { address, proposalId, option } = payload
    const message = {
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: cosmos.gov.v1beta1.MsgVote.fromPartial({
        proposalId,
        voter: address,
        option,
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('GovVoteTrx', e)
    return undefined
  }
}

export const GetWithdrawAddress = async (address: string): Promise<string> => {
  try {
    if (!address) {
      throw new Error('address is undefined')
    }
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    await sleepByLimiter()
    const { withdrawAddress } = await client.cosmos.distribution.v1beta1.delegatorWithdrawAddress({
      delegatorAddress: address,
    })
    return withdrawAddress
  } catch (e) {
    console.error('GetWithdrawAddress', e)
    return ''
  }
}

export const SetWithdrawAddress = async (
  client: SigningStargateClient,
  payload: { delegatorAddress: string; withdrawAddress: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { delegatorAddress, withdrawAddress } = payload
    const message = {
      typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      value: cosmos.distribution.v1beta1.MsgSetWithdrawAddress.fromPartial({
        delegatorAddress,
        withdrawAddress,
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(delegatorAddress, [message], fee)
    return response
  } catch (e) {
    console.error('SetWithdrawAddress', e)
    return undefined
  }
}

export const GovSubmitProposalTrx = async (
  client: SigningStargateClient,
  payload: { address: string; initialDeposit: Coin[]; title: string; description: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { address, initialDeposit, title, description } = payload
    const message = {
      typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
      value: cosmos.gov.v1beta1.MsgSubmitProposal.fromPartial({
        proposer: address,
        initialDeposit,
        content: {
          typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
          // @ts-ignore TODO:
          value: cosmos.params.v1beta1.ParameterChangeProposal.fromJSON({
            title,
            description,
            changes: [
              {
                subspace: 'mint',
                key: 'InflationMax',
                value: '"0.200000000000000000"',
              },
              {
                subspace: 'mint',
                key: 'InflationMin',
                value: '"0.200000000000000000"',
              },
              {
                subspace: 'mint',
                key: 'InflationRateChange',
                value: '"0.000000000000000000"',
              },
            ],
          }),
        },
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('GovSubmitProposalTrx', e)
    return undefined
  }
}

export const GovDepositTrx = async (
  client: SigningStargateClient,
  payload: { address: string; proposalId: Long; amount: Coin[] },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { address, proposalId, amount } = payload
    const message = {
      typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
      value: cosmos.gov.v1beta1.MsgDeposit.fromPartial({
        proposalId,
        depositor: address,
        amount,
      }),
    }
    await sleepByLimiter()
    const response = await client.signAndBroadcast(address, [message], fee)
    console.info('GovDepositTrx', response)
    return response
  } catch (e) {
    console.error('GovDepositTrx', e)
    return undefined
  }
}
