import { useAccount } from 'modules/Account/Account.hooks'
import { WalletType } from 'modules/Account/types'
import { useEffect } from 'react'

let updateKeysafeLoginStatusTimer = null
const updateKeysafeLoginStatusInterval = 1000 * 10

const UpdateService = (): null => {
  const {
    selectedWallet,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
  } = useAccount()

  useEffect(() => {
    if (selectedWallet === WalletType.Keysafe) {
      updateKeysafeLoginStatus()
      updateKeysafeLoginStatusTimer = setInterval(
        updateKeysafeLoginStatus,
        updateKeysafeLoginStatusInterval,
      )
    } else if (selectedWallet === WalletType.Keplr) {
      updateKeplrLoginStatus()
    }
    return (): void => {
      clearInterval(updateKeysafeLoginStatusTimer)
    } // eslint-disable-next-line
  }, [selectedWallet])

  return null
}

export default UpdateService
