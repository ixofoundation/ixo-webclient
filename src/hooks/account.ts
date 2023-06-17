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
} from 'redux/account/account.selectors'
import { decode } from 'bs58'
import {
  chooseWalletAction,
  updateAddressAction,
  updateBalancesAction,
  updateCosmWasmAction,
  updateCWClientAction,
  updateDidAction,
  updateNameAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from 'redux/account/account.actions'
import {} from 'redux/account/account.types'
import { GetBalances, KeyTypes, TSigner } from 'lib/protocol'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { WalletType } from '@gssuper/cosmodal'

export function useAccount(): {
  selectedWallet: WalletType | undefined
  address: string
  signingClient: SigningStargateClient
  cosmWasmClient: SigningCosmWasmClient
  cwClient: CosmWasmClient
  pubKey: string
  pubKeyUint8: Uint8Array | undefined
  keyType: KeyTypes
  did: string
  balances: Coin[]
  name: string
  registered: boolean | undefined
  funded: boolean
  signer: TSigner
  updateBalances: () => Promise<void>
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
  const selectedWallet: WalletType | undefined = useAppSelector(selectAccountSelectedWallet)
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
  const registered: boolean | undefined = useAppSelector(selectAccountRegistered)
  const funded: boolean = useAppSelector(selectAccountFunded)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }

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
    address,
    signingClient,
    cosmWasmClient,
    cwClient,
    pubKey,
    pubKeyUint8,
    keyType,
    did,
    balances,
    name,
    registered,
    funded,
    signer,
    updateBalances,
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
