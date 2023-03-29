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
  selectAccountCosmWasmClient,
} from 'redux/account/account.selectors'
import { decode } from 'bs58'
import { getAddressFromPubKey, keysafeGetInfo } from 'lib/keysafe/keysafe'
import {
  chooseWalletAction,
  updateAddressAction,
  updateBalancesAction,
  updateChooseWalletOpenAction,
  updateCosmWasmAction,
  updateDidAction,
  updateNameAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from 'redux/account/account.actions'
import { WalletType } from 'redux/account/account.types'
import { GetBalances, KeyTypes, TSigner } from 'lib/protocol'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { useKeplr } from 'lib/keplr/keplr'
import { useOpera } from 'lib/opera/opera'
import { OfflineSigner } from '@cosmjs/proto-signing'
import { useIxoConfigs } from './configs'
import { useMemo } from 'react'
import { SigningCosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'

export function useAccount(): {
  selectedWallet: WalletType
  address: string
  signingClient: SigningStargateClient
  cosmWasmClient: SigningCosmWasmClient
  pubKey: string
  pubKeyUint8: Uint8Array | undefined
  keyType: KeyTypes
  did: string
  balances: Coin[]
  name: string
  registered: boolean | undefined
  chooseWalletOpen: boolean
  signer: TSigner
  offlineSigner: OfflineSigner
  updateKeysafeLoginStatus: () => Promise<void>
  updateKeplrLoginStatus: () => Promise<void>
  updateOperaLoginStatus: () => Promise<void>
  updateBalances: () => Promise<void>
  chooseWallet: (wallet: WalletType | undefined) => void
  updateSigningClient: (signingClient: SigningStargateClient) => void
  updateCosmWasmClient: (cosmWasmClient: SigningCosmWasmClient) => void
  updateRegistered: (registered: boolean) => void
  updateDid: (did: string) => void
  updatePubKey: (pubKey: string) => void
  updateAddress: (address: string) => void
  updateName: (name: string) => void
  updateChooseWalletOpen: (open: boolean) => void
} {
  const dispatch = useAppDispatch()
  const { convertToDenom } = useIxoConfigs()
  const keplr = useKeplr()
  const opera = useOpera()
  const selectedWallet: WalletType = useAppSelector(selectAccountSelectedWallet)
  const address: string = useAppSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useAppSelector(selectAccountSigningClient)
  const cosmWasmClient: SigningCosmWasmClient = useAppSelector(selectAccountCosmWasmClient)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const pubKeyUint8: Uint8Array | undefined = pubKey ? Uint8Array.from(decode(pubKey)) : undefined
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const name: string = useAppSelector(selectAccountName)
  const balances: Coin[] = useAppSelector(selectAccountBalances)
  const registered: boolean | undefined = useAppSelector(selectAccountRegistered)
  const chooseWalletOpen: boolean = useAppSelector(selectAccountChooseWalletOpen)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }
  const offlineSigner: OfflineSigner = useMemo(() => {
    if (selectedWallet === WalletType.Keysafe) {
      alert('get offlineSigner for keysafe')
    } else if (selectedWallet === WalletType.Keplr) {
      return keplr.getOfflineSigner()
    } else if (selectedWallet === WalletType.Opera) {
      return opera.getOfflineSigner()
    }
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWallet])

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
  const updateCosmWasmClient = (cosmWasmClient: SigningCosmWasmClient): void => {
    dispatch(updateCosmWasmAction(cosmWasmClient))
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
      if (!keysafeInfo) {
        throw new Error('Unlock keysafe')
      }

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
      console.error('updateKeysafeLoginStatus', e)
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
  const updateOperaLoginStatus = async (): Promise<void> => {
    try {
      const key = await opera.getKey()
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
      console.error('updateOperaLoginStatus:', e)
    }
  }

  return {
    selectedWallet,
    address,
    signingClient,
    cosmWasmClient,
    pubKey,
    pubKeyUint8,
    keyType,
    did,
    balances,
    name,
    registered,
    chooseWalletOpen,
    signer,
    offlineSigner,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateOperaLoginStatus,
    updateBalances,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateRegistered,
    updateDid,
    updatePubKey,
    updateAddress,
    updateName,
    updateChooseWalletOpen,
  }
}
