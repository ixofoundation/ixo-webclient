import { Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { GetValidators } from 'lib/protocol'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getValidatorAction } from 'redux/validator/validator.actions'
import { selectValidator } from 'redux/validator/validator.selectors'
import { TValidatorModel } from 'redux/validator/validator.types'

export function useValidators(): {
  validators: TValidatorModel[]
  getValidators: () => Promise<void>
} {
  const dispatch = useAppDispatch()
  const validators = useAppSelector(selectValidator)

  const getValidators = useCallback(async () => {
    const validators: Validator[] = await GetValidators()
    dispatch(getValidatorAction(validators))
  }, [dispatch])

  return {
    validators: Object.values(validators),
    getValidators,
  }
}

// export function useValidator(address: string) {}
