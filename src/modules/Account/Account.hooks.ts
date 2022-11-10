import { useDispatch, useSelector } from 'react-redux'
import { Bech32 } from '@cosmjs/encoding'
import { sha256 } from '@cosmjs/crypto'
import { decode } from 'bs58'
import { cosmos } from '@ixo/impactxclient-sdk'
import {
  selectAccountSelectedWallet,
  selectAccountAddress,
} from './Account.selectors'
import { useEffect, useState } from 'react'
import { keysafeGetInfo, KeysafeInfo } from 'common/utils/keysafe'
import {
  updateAddressAction,
  updateBalancesAction,
  updateNameAction,
  updateRegisteredAction,
} from './Account.actions'
import { WalletType } from './types'

declare const window: any

const { createRPCQueryClient } = cosmos.ClientFactory
const RPC_ENDPOINT = process.env.REACT_APP_RPC_URL
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export function useAccount(): any {
  const dispatch = useDispatch()
  const selectedWallet: WalletType = useSelector(selectAccountSelectedWallet)
  const address: string = useSelector(selectAccountAddress)
  const [qc, setQueryClient] = useState(undefined)

  const updateKeysafeLoginStatus = async (): Promise<void> => {
    try {
      const keysafeInfo: KeysafeInfo = await keysafeGetInfo()
      const { name, didDoc } = keysafeInfo
      if (name) {
        dispatch(updateNameAction(name))
      }
      if (didDoc?.pubKey) {
        const address = Bech32.encode(
          'ixo',
          sha256(decode(didDoc.pubKey)).slice(0, 20),
        )
        if (address) {
          dispatch(updateAddressAction(address))
        }
      }
    } catch (e) {
      console.error('updateKeysafeLoginStatus:', e)
    }
  }
  const updateKeplrLoginStatus = async (): Promise<void> => {
    try {
      const offlineSigner = window.getOfflineSigner(CHAIN_ID)
      const [account] = await offlineSigner.getAccounts()
      const { address } = account
      if (address) {
        dispatch(updateAddressAction(address))
      }
    } catch (e) {
      console.error('updateKeplrLoginStatus:', e)
    }
  }
  const updateBalances = async (): Promise<void> => {
    try {
      if (!address || !qc) {
        return
      }
      const { balances } = await qc.cosmos.bank.v1beta1.allBalances({ address })
      dispatch(updateBalancesAction(balances))
    } catch (e) {
      console.error('updateBalances:', e)
    }
  }
  const updateAccount = async (): Promise<void> => {
    try {
      if (!address || !qc) {
        return
      }
      const account = await qc.cosmos.auth.v1beta1.account({ address })

      console.log('account', account)
      // TODO: update redux auth.account
      dispatch(updateRegisteredAction(true))
    } catch (e) {
      console.error('updateAccount:', e)
      dispatch(updateRegisteredAction(false))
    }
  }

  useEffect(() => {
    const init = async (): Promise<void> => {
      const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
      setQueryClient(client)
    }
    init()
  }, [])
  useEffect(() => {
    if (!!address && !!qc) {
      updateBalances()
      updateAccount()
    }
    // eslint-disable-next-line
  }, [address, qc])

  return {
    selectedWallet,
    address,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateBalances,
    updateAccount,
  }
}
