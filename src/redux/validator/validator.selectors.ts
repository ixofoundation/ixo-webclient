import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { TValidatorState } from './validator.types'

export const selectValidator = (state: RootState): TValidatorState => Object(state.validator)

export const selectValidatorByAddress = (address: string) =>
  createSelector(selectValidator, (validators: TValidatorState) => {
    return validators[address]
  })
