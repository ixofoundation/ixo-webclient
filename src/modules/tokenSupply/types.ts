export enum TokenSupplyActions {
  GetTotalSupplies = 'ixo/TokenSupply/GET_TOTAL_SUPPLIES',
  GetTotalSuppliesPending = 'ixo/TokenSupply/GET_TOTAL_SUPPLIES_PENDING',
  GetTotalSuppliesSuccess = 'ixo/TokenSupply/GET_TOTAL_SUPPLIES_FULFILLED',
  GetTotalSuppliesFailure = 'ixo/TokenSupply/GET_TOTAL_SUPPLIES_REJECTED',
}

export interface GetTotalSuppliesAction {
  type: typeof TokenSupplyActions.GetTotalSupplies
  payload: Promise<any>
}

export interface GetTotalSuppliesPendingAction {
  type: typeof TokenSupplyActions.GetTotalSuppliesPending
}

export interface GetTotalSuppliesSuccessAction {
  type: typeof TokenSupplyActions.GetTotalSuppliesSuccess
  payload: {
    data: any
  }
}

export interface GetTotalSuppliesFailureAction {
  type: typeof TokenSupplyActions.GetTotalSuppliesFailure
}

export type TokenSupplyActionTypes =
  | GetTotalSuppliesAction
  | GetTotalSuppliesPendingAction
  | GetTotalSuppliesSuccessAction
  | GetTotalSuppliesFailureAction
