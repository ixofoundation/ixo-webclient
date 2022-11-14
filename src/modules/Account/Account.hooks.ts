import { useDispatch, useSelector } from 'react-redux'
import * as base58 from 'bs58'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import {
  selectAccountSelectedWallet,
  selectAccountAddress,
  selectAccountSigningClient,
  selectAccountPubKey,
  selectAccountKeyType,
  selectAccountDid,
  selectAccountBalances,
} from './Account.selectors'
import {
  getAddressFromPubKey,
  keysafeGetInfo,
  KeysafeInfo,
} from 'common/utils/keysafe'
import {
  chooseWalletAction,
  updateAddressAction,
  updateBalancesAction,
  updateDidAction,
  updateNameAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from './Account.actions'
import { WalletType } from './types'
import { generateSecpDid, GetBalances, KeyTypes } from 'common/utils'
import { Coin } from '@cosmjs/proto-signing'

declare const window: any

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export function useAccount(): any {
  const dispatch = useDispatch()
  const selectedWallet: WalletType = useSelector(selectAccountSelectedWallet)
  const address: string = useSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useSelector(
    selectAccountSigningClient,
  )
  const pubKey: string = useSelector(selectAccountPubKey)
  const keyType: KeyTypes = useSelector(selectAccountKeyType)
  const did: string = useSelector(selectAccountDid)
  const balances: Coin[] = useSelector(selectAccountBalances)

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

  const updateKeysafeLoginStatus = async (): Promise<void> => {
    try {
      const keysafeInfo: KeysafeInfo = await keysafeGetInfo()
      const { name, didDoc } = keysafeInfo
      if (name) {
        dispatch(updateNameAction(name))
      }
      if (didDoc?.pubKey) {
        dispatch(updatePubKeyAction(didDoc?.pubKey))
        const addressFromPK = getAddressFromPubKey(didDoc.pubKey)
        if (addressFromPK) {
          dispatch(updateAddressAction(addressFromPK))
        }
      }
      if (didDoc?.did) {
        dispatch(updateDidAction(didDoc?.did))
      }
    } catch (e) {
      console.error('updateKeysafeLoginStatus:', e)
    }
  }
  const updateKeplrLoginStatus = async (): Promise<void> => {
    try {
      const offlineSigner = window.getOfflineSigner(CHAIN_ID)
      const [account] = await offlineSigner.getAccounts()
      const { address, pubkey } = account
      dispatch(updatePubKeyAction(base58.encode(pubkey)))
      if (address) {
        dispatch(updateAddressAction(address))
      }
      const did = generateSecpDid(pubkey)
      if (did) {
        dispatch(updateDidAction(did))
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
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateBalances,
    chooseWallet,
    updateSigningClient,
    updateRegistered,
  }
}
