import produce from 'immer';
import { ProjectAccountActionTypes, ProjectAccountActions, ProjectType } from '../types'

export const initialState: ProjectType = {
  accountsInfo: {
    loading: true,
    accounts: [],
    address: null
  }
}

export const reducer = (
  state = initialState,
  action: ProjectAccountActionTypes,
): ProjectType =>
  produce(state, (draft: ProjectType): any => {
    switch (action.type) {
      case ProjectAccountActions.GetAccountsRequest:
        draft.accountsInfo.loading = true
        return draft
      case ProjectAccountActions.GetAccountsSuccess:
        draft.accountsInfo.loading = false
        draft.accountsInfo.accounts = action.payload.accounts;
        draft.accountsInfo.address = action.payload.address;
        return draft
    }
  })
