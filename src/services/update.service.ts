import { createSigningClient } from '@ixo/impactxclient-sdk'
import { CheckIidDoc } from 'common/utils'
import { useKeplr } from 'common/utils/keplr'
// import { useIxoKeysafe } from 'common/utils/keysafe'
import { useAccount } from 'modules/Account/Account.hooks'
import { WalletType } from 'modules/Account/types'
import { useEffect } from 'react'

const RPC_URL = process.env.REACT_APP_RPC_URL
let updateKeysafeLoginStatusTimer: NodeJS.Timer
const updateKeysafeLoginStatusInterval = 1000 * 10

const UpdateService = (): null => {
  const {
    did,
    address,
    selectedWallet,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateBalances,
    chooseWallet,
    updateSigningClient,
    updateRegistered,
  } = useAccount()
  const keplr = useKeplr()
  // const keysafe = useIxoKeysafe()

  useEffect(() => {
    const getIidDoc = async (): Promise<void> => {
      if (await CheckIidDoc(did)) {
        updateRegistered(true)
      } else {
        updateRegistered(false)
      }
    }
    if (did) {
      getIidDoc()
    }
    // eslint-disable-next-line
  }, [did])

  useEffect(() => {
    if (!address) {
      chooseWallet(undefined)
    } else {
      updateBalances()
    }
    // eslint-disable-next-line
  }, [address])

  useEffect(() => {
    if (selectedWallet === WalletType.Keysafe) {
      updateKeysafeLoginStatus()
      updateKeysafeLoginStatusTimer = setInterval(updateKeysafeLoginStatus, updateKeysafeLoginStatusInterval)
      // const offlineSigner = keysafe.getOfflineSigner()
    } else if (selectedWallet === WalletType.Keplr) {
      updateKeplrLoginStatus()
      const offlineSigner = keplr.getOfflineSigner()
      createSigningClient(RPC_URL!, offlineSigner).then((client) => {
        updateSigningClient(client)
      })
    } else {
      clearInterval(updateKeysafeLoginStatusTimer)
    }
    return (): void => {
      clearInterval(updateKeysafeLoginStatusTimer)
    } // eslint-disable-next-line
  }, [selectedWallet])

  return null
}

export default UpdateService
