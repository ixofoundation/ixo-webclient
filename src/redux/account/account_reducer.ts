import createReducer from '../createReducer'
import { WalletAction, AccountActions } from '../../model/account'
import { Currency } from '../../model'
import { Account } from '../../model/account'

// export const activeQuote = createReducer({}, {
//     [AccountActions.SIGN_ORDER](jsonTxStr: string, action: WalletAction) {
//         const newQuote = Object.assign({}, quote);

//         let quoteQuery = axios
//             .get(process.env.REACT_APP_BLOCKCHAIN_NODE_URL + "/bonds/" + quote.recieving!.denom + "/buy_price/" + quote.recieving!.amount)
//             .then((response) => {
//                 newQuote.tx = response.data
//             })
//             .catch((error) => {
//                 console.error(error)
//             })

//         return newQuote

//     }});

const accountInitialState = {
  address: 'cosmos1d5tmj8fk64vmvs0gvjyjgsx97teee5s4jc7vhh',
  name: 'miguel',
  balances: [],
} as Account

export const account = createReducer(accountInitialState, {
  [AccountActions.INIT_PROVIDER + '_FULFILLED'](
    account: Account,
    action: WalletAction,
  ) {
    const newState = Object.assign({}, action.payload)
    return newState
  },
  [AccountActions.INIT_PROVIDER](account: Account, action: WalletAction) {
    const newState = Object.assign({}, action.payload)
    return newState
  },
  [AccountActions.GET_ORDERS + '_FULFILLED'](
    account: Account,
    action: WalletAction,
  ) {
    const newState = Object.assign({}, account)
    newState.orders = action.payload
    return newState
  },
  [AccountActions.GET_BALANCES + '_FULFILLED'](
    account: Account,
    action: WalletAction,
  ) {
    const newState = Object.assign({}, account)
    newState.balances = action.payload
    return newState
  },
})

export const balances = createReducer([] as Currency[], {
  [AccountActions.GET_BALANCES + '_FULFILLED'](
    balances: Currency[],
    action: WalletAction,
  ) {
    const newState = Object.assign([], action.payload)

    return newState
  },
})

// activeBond: Bond;
// balances: [Currency];
// accounts: Accounts;
// activeQuote: Quote;
