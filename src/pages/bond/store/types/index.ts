// TODO - once orders has been sorted out properly and we know the endpoints then
// create a specific interface for the Order - it will be any for now

export enum ProjectAccountActions {
  GetAccounts = 'ixo/PROJECT/GET_ACCOUNTS',
  GetAccountsSuccess = 'ixo/PROJECT/GET_ACCOUNTS_SUCCESS',
  GetAccountsRequest = 'ixo/PROJECT/GET_ACCOUNTS_REQUEST',
  GetAccountsFailure = 'ixo/PROJECT/GET_ACCOUNTS_FAILURE'
}

export interface GetProjectAccountActionType {
  type: typeof ProjectAccountActions.GetAccounts
  payload: Promise<any>
}

export interface GetProjectAccountSuccessActionType {
  type: typeof ProjectAccountActions.GetAccountsSuccess
  payload: any
}

export interface ProjectType {
  accountsInfo: {
    loading: boolean
    accounts: []
    address: string
  }
}

export interface ProjectAccountActionTypes {
  type: GetProjectAccountActionType | GetProjectAccountSuccessActionType | ProjectType | ProjectAccountActions
  payload: any
}