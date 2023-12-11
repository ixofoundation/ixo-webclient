import { DelegationResponse, Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import Axios from 'axios'
import { GetDelegation, GetDelegationTotalRewards, GetValidators } from 'lib/protocol'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getValidatorAction } from 'redux/validator/validator.actions'
import { selectValidator } from 'redux/validator/validator.selectors'
import { TValidatorModel } from 'redux/validator/validator.types'
import { requireCheckDefault } from 'utils/images'
import { useAccount } from './account'
import BigNumber from 'bignumber.js'
import { convertDecCoinToCoin } from 'utils/currency'
import { Coin } from '@cosmjs/proto-signing'

const RelayerLogo = requireCheckDefault(require('assets/img/relayer.png'))

export function useValidators(): {
  validators: TValidatorModel[]
  getValidators: () => Promise<void>
} {
  const dispatch = useAppDispatch()
  const { address } = useAccount()
  const validators = useAppSelector(selectValidator)

  const getValidators = useCallback(async () => {
    const validators: Validator[] = await GetValidators()

    const totalTokens = validators
      .map((validator) => validator.tokens)
      .reduce((acc, cur) => new BigNumber(acc).plus(new BigNumber(cur)), new BigNumber(0))

    const mappedValidators: TValidatorModel[] = []

    for (const validator of validators) {
      const logo = validator.description?.identity
        ? await Axios.get(
            `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${validator.description.identity}&fields=pictures`,
          )
            .then((response) => response.data)
            .then((response) => response.them[0])
            .then((response) => response.pictures)
            .then((response) => response.primary)
            .then((response) => response.url)
            .catch(() => RelayerLogo)
        : RelayerLogo
      let delegation: DelegationResponse | undefined = undefined
      let reward: Coin | undefined = undefined

      if (address) {
        delegation = await GetDelegation(validator.operatorAddress, address)
        const totalReward = await GetDelegationTotalRewards(address)
        const rewardDecCoin = totalReward?.rewards.find((v) => v.validatorAddress === validator.operatorAddress)
          ?.reward[0]
        reward = rewardDecCoin && convertDecCoinToCoin(rewardDecCoin)
      }

      mappedValidators.push({
        address: validator.operatorAddress,
        website: validator.description?.website || '',
        identity: validator.description?.identity || '',
        description: validator.description?.details || '',
        moniker: validator.description?.moniker || '',
        commission: new BigNumber(validator.commission?.commissionRates?.rate ?? '0')
          .dividedBy(new BigNumber(Math.pow(10, 16)))
          .toNumber(),
        votingPower: validator.tokens,
        votingPowerRate: new BigNumber(validator.tokens).dividedBy(new BigNumber(totalTokens)).toNumber(),
        status: validator.status,
        logo,
        delegation: delegation?.balance,
        reward: reward,
      })
    }

    dispatch(getValidatorAction(mappedValidators))
  }, [dispatch, address])

  return {
    validators: Object.values(validators),
    getValidators,
  }
}
