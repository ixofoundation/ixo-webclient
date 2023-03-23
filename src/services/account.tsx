import { createSigningClient } from '@ixo/impactxclient-sdk'
import { CheckIidDoc, RPC_ENDPOINT } from 'lib/protocol'
import { useKeplr } from 'lib/keplr/keplr'
import { ChooseWalletModal } from 'components/Modals'
import { useAccount } from 'hooks/account'
import { WalletType } from 'redux/account/account.types'
import { useEffect } from 'react'
import { SigningCosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'

let updateKeysafeLoginStatusTimer: NodeJS.Timer
const updateKeysafeLoginStatusInterval = 1000 * 10

const AccountUpdateService = (): JSX.Element => {
  const {
    did,
    address,
    selectedWallet,
    chooseWalletOpen,
    updateKeysafeLoginStatus,
    updateKeplrLoginStatus,
    updateBalances,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateRegistered,
    updateChooseWalletOpen,
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

      // const offlineSigner = keysafe.getOfflineSigner()
    } else if (selectedWallet === WalletType.Keplr) {
      updateKeplrLoginStatus()
      const offlineSigner = keplr.getOfflineSigner()
      createSigningClient(RPC_ENDPOINT!, offlineSigner).then((client) => {
        updateSigningClient(client)
      })
      SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT!, offlineSigner).then(updateCosmWasmClient)
    }
    // eslint-disable-next-line
  }, [selectedWallet])

  useEffect(() => {
    if (address && selectedWallet === WalletType.Keysafe) {
      updateKeysafeLoginStatusTimer = setInterval(updateKeysafeLoginStatus, updateKeysafeLoginStatusInterval)
    } else {
      clearInterval(updateKeysafeLoginStatusTimer)
    }
    return (): void => {
      clearInterval(updateKeysafeLoginStatusTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, selectedWallet])

  return <ChooseWalletModal open={chooseWalletOpen} setOpen={updateChooseWalletOpen} />
}

export default AccountUpdateService
