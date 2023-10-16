import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import {
  selectAccountSelectedWallet,
  selectAccountAddress,
  selectAccountSigningClient,
  selectAccountPubKey,
  selectAccountKeyType,
  selectAccountDid,
  selectAccountBalances,
  selectAccountName,
  selectAccountRegistered,
  selectAccountCosmWasmClient,
  selectAccountCWClient,
  selectAccountFunded,
  selectAccountCw20Tokens,
  selectAccountNativeTokens,
  selectAccountConnectedWallet,
} from 'redux/account/account.selectors'
import { decode } from 'bs58'
import {
  chooseWalletAction,
  connectAction,
  disconnectAction,
  updateAddressAction,
  updateBalancesAction,
  updateCosmWasmAction,
  updateCw20TokensAction,
  updateCWClientAction,
  updateDidAction,
  updateNameAction,
  updateNativeTokensAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from 'redux/account/account.actions'
import {} from 'redux/account/account.types'
import { GetBalances, KeyTypes, TSigner } from 'lib/protocol'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { ConnectedWallet, WalletType } from 'types/wallet'
import { Cw20Token, NativeToken } from 'types/tokens'
import { getConnectedWalletInfo } from 'utils/account'
import { KeplrExtensionWallet } from 'wallets/keplr/extension'
import { getKeplrChainInfo } from '@ixo/cosmos-chain-resolver'
import { WALLET_STORE_LOCAL_STORAGE_KEY, useIxoConfigs } from './configs'
import { ChainInfo } from '@keplr-wallet/types'

export function useAccount(): {
  selectedWallet: WalletType | undefined
  connectedWallet: ConnectedWallet | undefined
  address: string
  signingClient: SigningStargateClient
  cosmWasmClient: SigningCosmWasmClient
  cwClient: CosmWasmClient
  pubKey: string
  pubKeyUint8: Uint8Array | undefined
  keyType: KeyTypes
  did: string
  balances: Coin[]
  displayBalances: Coin[]
  nativeTokens: NativeToken[]
  cw20Tokens: Cw20Token[]
  name: string
  registered: boolean | undefined
  funded: boolean
  signer: TSigner
  connect: () => Promise<void>
  disconnect: () => void
  updateBalances: () => Promise<void>
  updateNativeTokens: (balances: { [denom: string]: NativeToken }) => void
  updateCw20Tokens: (balances: { [addr: string]: Cw20Token }) => void
  chooseWallet: (wallet: WalletType | undefined) => void
  updateSigningClient: (signingClient?: SigningStargateClient) => void
  updateCosmWasmClient: (cosmWasmClient?: SigningCosmWasmClient) => void
  updateCWClient: (cosmWasmClient: CosmWasmClient) => void
  updateRegistered: (registered: boolean) => void
  updateDid: (did: string) => void
  updatePubKey: (pubKey: string) => void
  updateAddress: (address: string) => void
  updateName: (name: string) => void
} {
  const dispatch = useAppDispatch()
  const { convertToDenom } = useIxoConfigs()
  const selectedWallet: WalletType | undefined = useAppSelector(selectAccountSelectedWallet)
  const connectedWallet: ConnectedWallet | undefined = useAppSelector(selectAccountConnectedWallet)
  const address: string = useAppSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useAppSelector(selectAccountSigningClient)
  const cosmWasmClient: SigningCosmWasmClient = useAppSelector(selectAccountCosmWasmClient)
  const cwClient: CosmWasmClient = useAppSelector(selectAccountCWClient)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const pubKeyUint8: Uint8Array | undefined = pubKey ? Uint8Array.from(decode(pubKey)) : undefined
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const name: string = useAppSelector(selectAccountName)
  const balances: Coin[] = useAppSelector(selectAccountBalances)
  const displayBalances: Coin[] = balances.map((balance) => convertToDenom(balance)).filter(Boolean) as Coin[]
  const nativeTokens: NativeToken[] = useAppSelector(selectAccountNativeTokens)
  const cw20Tokens: Cw20Token[] = useAppSelector(selectAccountCw20Tokens)
  const registered: boolean | undefined = useAppSelector(selectAccountRegistered)
  const funded: boolean = useAppSelector(selectAccountFunded)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }

  const connect = async (): Promise<void> => {
    const chainInfo = await getKeplrChainInfo('impacthub')
    const wallet = KeplrExtensionWallet
    const walletClient = await wallet.getClient(chainInfo as ChainInfo)
    if (!walletClient) {
      throw new Error('Failed to retrieve wallet client.')
    }
    const connectedWallet = await getConnectedWalletInfo(wallet, walletClient, chainInfo as ChainInfo)
    dispatch(connectAction(connectedWallet))
    localStorage.setItem(WALLET_STORE_LOCAL_STORAGE_KEY, 'connected')
  }

  const disconnect = (): void => {
    dispatch(disconnectAction())
    localStorage.removeItem(WALLET_STORE_LOCAL_STORAGE_KEY)
  }

  const updateBalances = async (): Promise<void> => {
    try {
      if (!address) {
        return
      }
      const balances = await GetBalances(address)
      dispatch(updateBalancesAction(balances))
    } catch (e) {
      console.error('updateBalances:', e)
    }
  }
  const updateCw20Tokens = (balances: { [addr: string]: Cw20Token }) => {
    dispatch(updateCw20TokensAction(balances))
  }
  const updateNativeTokens = (balances: { [denom: string]: NativeToken }) => {
    dispatch(updateNativeTokensAction(balances))
  }
  const chooseWallet = (wallet: WalletType | undefined): void => {
    dispatch(chooseWalletAction(wallet))
  }
  const updateSigningClient = (signingClient?: SigningStargateClient): void => {
    dispatch(updateSigningClientAction(signingClient!))
  }
  const updateCosmWasmClient = (cosmWasmClient?: SigningCosmWasmClient): void => {
    dispatch(updateCosmWasmAction(cosmWasmClient!))
  }
  const updateCWClient = (cosmWasmClient: CosmWasmClient): void => {
    dispatch(updateCWClientAction(cosmWasmClient))
  }
  const updateRegistered = (registered: boolean): void => {
    dispatch(updateRegisteredAction(registered))
  }
  const updateDid = (did: string): void => {
    dispatch(updateDidAction(did))
  }
  const updatePubKey = (pubKey: string): void => {
    dispatch(updatePubKeyAction(pubKey))
  }
  const updateAddress = (address: string): void => {
    dispatch(updateAddressAction(address))
  }
  const updateName = (name: string): void => {
    dispatch(updateNameAction(name))
  }

  return {
    selectedWallet,
    connectedWallet,
    address,
    signingClient,
    cosmWasmClient,
    cwClient,
    pubKey,
    pubKeyUint8,
    keyType,
    did,
    balances,
    displayBalances,
    nativeTokens,
    cw20Tokens,
    name,
    registered,
    funded,
    signer,
    connect,
    disconnect,
    updateBalances,
    updateNativeTokens,
    updateCw20Tokens,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateCWClient,
    updateRegistered,
    updateDid,
    updatePubKey,
    updateAddress,
    updateName,
  }
}

export function useSigner() {
  const address: string = useAppSelector(selectAccountAddress)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const pubKeyUint8: Uint8Array | undefined = pubKey ? Uint8Array.from(decode(pubKey)) : undefined
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }

  return signer
}
