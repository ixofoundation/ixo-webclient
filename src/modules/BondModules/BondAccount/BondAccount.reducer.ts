import { BondAccountActionTypes, BondAccountActions } from './types'

export const initialState: any = []

export const reducer = (state = initialState, action: BondAccountActionTypes): any[] => {
  switch (action.type) {
    case BondAccountActions.GetAccountsSuccess:
      return [...action.payload.bondAccounts]
  }

  return state
}
