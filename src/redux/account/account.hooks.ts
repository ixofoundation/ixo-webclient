import { useAppDispatch, useAppSelector } from 'redux/hooks'
import * as base58 from 'bs58'
import { SigningStargateClient, utils } from '@ixo/impactxclient-sdk'
import {
  selectAccountSelectedWallet,
  selectAccountAddress,
  selectAccountSigningClient,
  selectAccountPubKey,
  selectAccountKeyType,
  selectAccountDid,
  selectAccountBalances,
  selectAccountChooseWalletOpen,
  selectAccountName,
  selectAccountRegistered,
} from './account.selectors'
import { getAddressFromPubKey, keysafeGetInfo } from 'lib/keysafe/keysafe'
import {
  chooseWalletAction,
  updateAddressAction,
  updateBalancesAction,
  updateChooseWalletOpenAction,
  updateDidAction,
  updateNameAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from './account.actions'
import { WalletType } from './account.types'
import { GetBalances, KeyTypes } from 'lib/protocol'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { useKeplr } from 'lib/keplr/keplr'

export function useAccount(): any {
  const dispatch = useAppDispatch()
  const keplr = useKeplr()
  const selectedWallet: WalletType = useAppSelector(selectAccountSelectedWallet)
  const address: string = useAppSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useAppSelector(selectAccountSigningClient)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const name: string = useAppSelector(selectAccountName)
  const balances: Coin[] = useAppSelector(selectAccountBalances)
  const registered: boolean | undefined = useAppSelector(selectAccountRegistered)
  const chooseWalletOpen: boolean = useAppSelector(selectAccountChooseWalletOpen)

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
  const chooseWallet = (wallet: WalletType): void => {
    dispatch(chooseWalletAction(wallet))
  }
  const updateSigningClient = (signingClient: SigningStargateClient): void => {
    dispatch(updateSigningClientAction(signingClient))
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
  const updateChooseWalletOpen = (open: boolean): void => {
    dispatch(updateChooseWalletOpenAction(open))
  }

  const updateKeysafeLoginStatus = async (): Promise<void> => {
    try {
      const keysafeInfo = await keysafeGetInfo()
      const { name, didDoc } = keysafeInfo!
      if (name) {
        updateName(name)
      }
      if (didDoc?.pubKey) {
        updatePubKey(didDoc.pubKey)
        const addressFromPK = getAddressFromPubKey(didDoc.pubKey)
        if (addressFromPK) {
          updateAddress(addressFromPK)
        }
      }
      if (didDoc?.did) {
        updateDid(didDoc.did)
      }
    } catch (e) {
      console.error('updateKeysafeLoginStatus:', e)
    }
  }
  const updateKeplrLoginStatus = async (): Promise<void> => {
    try {
      const key = await keplr.getKey()
      if (key?.name) {
        updateName(key.name)
      }
      if (key?.bech32Address) {
        updateAddress(key.bech32Address)
      }
      if (key?.pubKey) {
        const pubKey = base58.encode(key.pubKey)
        updatePubKey(pubKey)
        const did = utils.did.generateSecpDid(pubKey)
        if (did) {
          updateDid(did)
        }
      }
    } catch (e) {
      console.error('updateKeplrLoginStatus:', e)
    }
  }

  return {
    selectedWallet,
    address,
    signingClient,
    pubKey,
    keyType,
    did,
    balances,
    name,
    registered,
    chooseWalletOpen,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateBalances,
    chooseWallet,
    updateSigningClient,
    updateRegistered,
    updateDid,
    updatePubKey,
    updateAddress,
    updateName,
    updateChooseWalletOpen,
  }
}
