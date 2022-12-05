import { useDispatch, useSelector } from 'react-redux'
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
import { useIxoConfigs } from 'redux/configs/configs.hooks'

export function useAccount(): {
  selectedWallet: WalletType
  address: string
  signingClient: SigningStargateClient
  pubKey: string
  keyType: KeyTypes
  did: string
  balances: Coin[]
  name: string
  registered: boolean | undefined
  chooseWalletOpen: boolean
  updateKeysafeLoginStatus: () => Promise<void>
  updateKeplrLoginStatus: () => Promise<void>
  updateBalances: () => Promise<void>
  chooseWallet: (wallet: WalletType | undefined) => void
  updateSigningClient: (signingClient: SigningStargateClient) => void
  updateRegistered: (registered: boolean) => void
  updateDid: (did: string) => void
  updatePubKey: (pubKey: string) => void
  updateAddress: (address: string) => void
  updateName: (name: string) => void
  updateChooseWalletOpen: (open: boolean) => void
} {
  const dispatch = useDispatch()
  const { convertToDenom } = useIxoConfigs()
  const keplr = useKeplr()
  const selectedWallet: WalletType = useSelector(selectAccountSelectedWallet)
  const address: string = useSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useSelector(selectAccountSigningClient)
  const pubKey: string = useSelector(selectAccountPubKey)
  const keyType: KeyTypes = useSelector(selectAccountKeyType)
  const did: string = useSelector(selectAccountDid)
  const name: string = useSelector(selectAccountName)
  const balances: Coin[] = useSelector(selectAccountBalances)
  const registered: boolean | undefined = useSelector(selectAccountRegistered)
  const chooseWalletOpen: boolean = useSelector(selectAccountChooseWalletOpen)

  const updateBalances = async (): Promise<void> => {
    try {
      if (!address) {
        return
      }
      const balances = await GetBalances(address)
      dispatch(updateBalancesAction(balances.map((item) => convertToDenom(item)!)))
    } catch (e) {
      console.error('updateBalances:', e)
    }
  }
  const chooseWallet = (wallet: WalletType | undefined): void => {
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
