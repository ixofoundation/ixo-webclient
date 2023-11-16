import { WalletType } from 'types/wallet'
import { AccountActionTypes, AccountActions, AccountState } from './account.types'

export const initialState: AccountState = {
  selectedWallet: WalletType,
  connectedWallet: undefined,
  name: undefined,
  registered: undefined,
  pubKey: undefined,
  cwClient: undefined,
  signingClient: undefined,
  cosmWasmClient: undefined,
  did: undefined,
  address: null,
  balances: [],
  nativeTokens: {},
  cw20Tokens: {},
} as any

export const reducer = (state = initialState, action: AccountActionTypes): AccountState => {
  switch (action.type) {
    case AccountActions.Connect:
      return {
        ...state,
        connectedWallet: action.payload,
      }
    case AccountActions.Disconnect:
      return {
        ...state,
        connectedWallet: undefined,
      }
    case AccountActions.ChooseWallet:
      return {
        ...state,
        selectedWallet: action.payload,
      }
    case AccountActions.UpdateName:
      return { ...state, name: action.payload }
    case AccountActions.UpdateAddress:
      return { ...state, address: action.payload }
    case AccountActions.UpdateBalances:
      return { ...state, balances: action.payload }
    case AccountActions.UpdateNativeTokens:
      return { ...state, nativeTokens: { ...state.nativeTokens, ...action.payload } }
    case AccountActions.UpdateCw20Tokens:
      return { ...state, cw20Tokens: { ...state.cw20Tokens, ...action.payload } }
    case AccountActions.UpdateRegistered:
      return { ...state, registered: action.payload }
    case AccountActions.UpdatePubKey:
      return { ...state, pubKey: action.payload }
    case AccountActions.UpdateSigningClient:
      return { ...state, signingClient: action.payload }
    case AccountActions.UpdateCosmWasmClient:
      return { ...state, cosmWasmClient: action.payload }
    case AccountActions.UpdateCWClient:
      return { ...state, cwClient: action.payload }
    case AccountActions.UpdateDid:
      return { ...state, did: action.payload }
    default:
      return { ...state }
  }
}
