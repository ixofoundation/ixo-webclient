import {
  AccountActions,
  ConnectAction,
  DisconnectAction,
  ChooseWalletAction,
  UpdateNameAction,
  UpdateAddressAction,
  UpdateBalancesAction,
  UpdateRegisteredAction,
  UpdatePubKeyAction,
  UpdateSigningClientAction,
  UpdateDidAction,
  UpdateCosmWasmClientAction,
  UpdateCWClientAction,
  UpdateCw20TokensAction,
  UpdateNativeTokensAction,
} from './account.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { ConnectedWallet, WalletType } from 'types/wallet'
import { Cw20Token, NativeToken } from 'types/tokens'

export const connectAction = (connectedWallet: ConnectedWallet): ConnectAction => ({
  type: AccountActions.Connect,
  payload: connectedWallet,
})

export const disconnectAction = (): DisconnectAction => ({
  type: AccountActions.Disconnect,
})

export const chooseWalletAction = (type: WalletType | undefined): ChooseWalletAction => {
  return {
    type: AccountActions.ChooseWallet,
    payload: type,
  }
}

export const updateNameAction = (name: string): UpdateNameAction => {
  return {
    type: AccountActions.UpdateName,
    payload: name,
  }
}

export const updateAddressAction = (address: string): UpdateAddressAction => {
  return {
    type: AccountActions.UpdateAddress,
    payload: address,
  }
}

export const updateBalancesAction = (balances: Coin[]): UpdateBalancesAction => {
  return {
    type: AccountActions.UpdateBalances,
    payload: balances,
  }
}

export const updateNativeTokensAction = (balances: { [addr: string]: NativeToken }): UpdateNativeTokensAction => {
  return {
    type: AccountActions.UpdateNativeTokens,
    payload: balances,
  }
}

export const updateCw20TokensAction = (balances: { [addr: string]: Cw20Token }): UpdateCw20TokensAction => {
  return {
    type: AccountActions.UpdateCw20Tokens,
    payload: balances,
  }
}

export const updateRegisteredAction = (registered: boolean): UpdateRegisteredAction => {
  return {
    type: AccountActions.UpdateRegistered,
    payload: registered,
  }
}

export const updatePubKeyAction = (pubKey: string): UpdatePubKeyAction => {
  return {
    type: AccountActions.UpdatePubKey,
    payload: pubKey,
  }
}

export const updateSigningClientAction = (signingClient: SigningStargateClient): UpdateSigningClientAction => {
  return {
    type: AccountActions.UpdateSigningClient,
    payload: signingClient,
  }
}

export const updateCosmWasmAction = (cosmWasmClient: SigningCosmWasmClient): UpdateCosmWasmClientAction => {
  return {
    type: AccountActions.UpdateCosmWasmClient,
    payload: cosmWasmClient,
  }
}

export const updateCWClientAction = (cosmWasmClient: CosmWasmClient): UpdateCWClientAction => {
  return {
    type: AccountActions.UpdateCWClient,
    payload: cosmWasmClient,
  }
}

export const updateDidAction = (did: string): UpdateDidAction => {
  return {
    type: AccountActions.UpdateDid,
    payload: did,
  }
}
