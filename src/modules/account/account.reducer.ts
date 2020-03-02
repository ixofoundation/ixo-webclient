import createReducer from '../../common/redux/createReducer'
import { WalletAction, AccountActions, AccountState } from './types'
import { Currency } from '../../types/models'

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
  address: 'cosmos1fydp860ztlyxvyys8p536hm7nzg0348xtdwgls',
  name: 'miguel',
  balances: [],
} as AccountState

export const account = createReducer(accountInitialState, {
  [AccountActions.INIT_PROVIDER + '_FULFILLED'](
    account: AccountState,
    action: WalletAction,
  ) {
    const newState = Object.assign({}, action.payload)
    return newState
  },
  [AccountActions.INIT_PROVIDER](account: AccountState, action: WalletAction) {
    const newState = Object.assign({}, action.payload)
    return newState
  },
  [AccountActions.GET_ORDERS + '_FULFILLED'](
    account: AccountState,
    action: WalletAction,
  ) {
    const newState = Object.assign({}, account)
    newState.orders = action.payload
    return newState
  },
  [AccountActions.GET_BALANCES + '_FULFILLED'](
    account: AccountState,
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
