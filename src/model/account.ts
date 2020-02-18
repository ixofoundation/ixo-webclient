import { Currency } from "./";
import { Store } from "./store"


export interface Account {
    name?: string
    address?: string
    orders?: {}[]
    balances: Currency[]
}


export enum AccountActions {
    SIGN_ORDER = "SIGN_ORDER",
    GET_BALANCES = "GET_BALANCES",
    GET_ORDERS = "GET_ORDERS",
    INIT_PROVIDER = "INIT_PROVIDER"
}

interface WalletActionType<T, P> {
    type: T;
    payload?: P;
}

export type WalletAction =
    | WalletActionType<typeof AccountActions.SIGN_ORDER, string>
    | WalletActionType<typeof AccountActions.GET_BALANCES, any>
    | WalletActionType<typeof AccountActions.INIT_PROVIDER, any>
    | WalletActionType<typeof AccountActions.GET_ORDERS, any>
    ;



// UTILITY FUNCTIONS

export function tokenBalance(store: Store, symbol: string): Currency {
    var balance: Currency = { amount: 0, denom: symbol }
    store.account.balances.forEach((element: Currency) => {
        if (element.denom == symbol) {
            balance = Object.assign({}, element);
        }
    });
    return balance
}

export function remainingBalance(store: Store, sending: Currency): Currency {
    var balance = tokenBalance(store, sending.denom!)
    // console.log(balance)

    balance.amount = parseInt(balance.amount! as any) - parseInt(sending.amount! as any)
    // console.log(sending)
    return balance
}

export function newBalance(store: Store, recieving: Currency): Currency {
    var balance = tokenBalance(store, recieving.denom!)

    balance.amount = parseInt(balance.amount! as any) + parseInt(recieving.amount! as any)
    return balance
}

export function currencyStr(currency: Currency): string {
    const newCurr = Object.assign({}, currency);

    if (!currency.hasOwnProperty('amount')) {
        newCurr.amount = 0
    }
    return newCurr.amount!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        + " " + newCurr.denom!.toUpperCase()
}