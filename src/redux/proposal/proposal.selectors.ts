import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { TProposalState } from './proposal.types'

export const selectValidator = (state: RootState): TProposalState => Object(state.validator)

export const selectValidatorByAddress = (address: string) =>
  createSelector(selectValidator, (validators: TProposalState) => {
    return validators[address]
  })
