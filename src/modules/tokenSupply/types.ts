import { Currency } from 'types/models';

export enum TokenSupplyActions {
  GetTotalSupply = 'ixo/TokenSupply/GET_TOTAL_SUPPLY',
  GetTotalSupplyPending = 'ixo/TokenSupply/GET_TOTAL_SUPPLY_PENDING',
  GetTotalSupplySuccess = 'ixo/TokenSupply/GET_TOTAL_SUPPLY_FULFILLED',
  GetTotalSupplyFailure = 'ixo/TokenSupply/GET_TOTAL_SUPPLY_REJECTED',
}

export interface GetTotalSupplyAction {
  type: typeof TokenSupplyActions.GetTotalSupply
  payload: Promise<any>
}

export interface GetTotalSupplyPendingAction {
  type: typeof TokenSupplyActions.GetTotalSupplyPending
}

export interface GetTotalSupplySuccessAction {
  type: typeof TokenSupplyActions.GetTotalSupplySuccess
  payload: {
    tokenSupply: Currency[]
  }
}

export interface GetTotalSupplyFailureAction {
  type: typeof TokenSupplyActions.GetTotalSupplyFailure
}

export type TokenSupplyActionTypes =
  | GetTotalSupplyAction
  | GetTotalSupplyPendingAction
  | GetTotalSupplySuccessAction
  | GetTotalSupplyFailureAction;
