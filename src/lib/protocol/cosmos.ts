import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { cosmos, createQueryClient, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { fee, RPC_ENDPOINT } from './common'
import { VoteOption } from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1/gov'
import { Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { Input, Output } from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/bank'

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
    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('BankMultiSendTrx', e)
    return undefined
  }
}

export const GetBalances = async (address: string): Promise<Coin[]> => {
  try {
    if (!address) {
      throw new Error('address is undefined')
    }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmos.bank.v1beta1.allBalances({
      address,
    })
    console.info('GetBalances', res)
    return res.balances
  } catch (e) {
    console.error('GetBalances', e)
    return []
  }
}

export const GetValidators = async (): Promise<Validator[]> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT!)
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
    const client = await createQueryClient(RPC_ENDPOINT!)
    const { validator } = await client.cosmos.staking.v1beta1.validator({
      validatorAddr,
    })
    return validator
  } catch (e) {
    console.error('GetValidatorByAddr', e)
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
    const client = await createQueryClient(RPC_ENDPOINT!)
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
    const response = await client.signAndBroadcast(address, [message], fee)
    console.info('GovDepositTrx', response)
    return response
  } catch (e) {
    console.error('GovDepositTrx', e)
    return undefined
  }
}
