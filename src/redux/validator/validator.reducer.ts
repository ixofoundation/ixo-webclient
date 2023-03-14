import BigNumber from 'bignumber.js'
import { ValidatorActionTypes, TValidatorState, ValidatorActions } from './validator.types'

const initialState: TValidatorState = {}

export const reducer = (state = initialState, action: ValidatorActionTypes): TValidatorState => {
  switch (action.type) {
    case ValidatorActions.GetValidators: {
      const validators = action.payload
      const totalTokens = validators
        .map((validator) => validator.tokens)
        .reduce((acc, cur) => new BigNumber(acc).plus(new BigNumber(cur)), new BigNumber(0))
      return Object.fromEntries(
        validators.map((validator) => {
          return [
            validator.operatorAddress,
            {
              address: validator.operatorAddress,
              website: validator?.description?.website || '',
              identity: validator?.description?.identity || '',
              description: validator?.description?.details || '',
              moniker: validator?.description?.moniker || '',
              commission: new BigNumber(validator.commission?.commissionRates?.rate ?? '0')
                .dividedBy(new BigNumber(Math.pow(10, 16)))
                .toNumber(),
              votingPower: new BigNumber(validator.tokens).dividedBy(new BigNumber(totalTokens)).toNumber(),
              status: validator.status,
            },
          ]
        }),
      )
    }
    default:
      return { ...state }
  }
}
