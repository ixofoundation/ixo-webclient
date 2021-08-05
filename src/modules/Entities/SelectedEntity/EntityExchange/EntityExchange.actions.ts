import {
  ChangeTradeMethodAction,
  EntityExchangeActions
} from './types'

export const changeTradeMethod = (tradeMethod: string): ChangeTradeMethodAction => ({
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: {
    tradeMethod
  }
})
