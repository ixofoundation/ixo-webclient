import { createSigningClient, utils } from '@ixo/impactxclient-sdk'
import { CheckIidDoc, RPC_ENDPOINT } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { SigningCosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { useWalletManager } from '@gssuper/cosmodal'
import base58 from 'bs58'
// import { useKeplr } from 'lib/keplr/keplr'
// import { WalletType } from 'redux/account/account.types'

const AccountUpdateService = (): JSX.Element | null => {
  const {
    did,
    address,
    // selectedWallet,
    // updateKeplrLoginStatus,
    updateBalances,
    updateName,
    updateAddress,
    updatePubKey,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateRegistered,
    updateDid,
  } = useAccount()
  // const keplr = useKeplr()
  const { connectedWallet } = useWalletManager()

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

  // useEffect(() => {
  //   if (selectedWallet === WalletType.Keplr) {
  //     updateKeplrLoginStatus()
  //     const offlineSigner = keplr.getOfflineSigner()
  //     createSigningClient(RPC_ENDPOINT!, offlineSigner).then((client) => {
  //       updateSigningClient(client)
  //     })
  //     SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT!, offlineSigner).then(updateCosmWasmClient)
  //   }
  //   // eslint-disable-next-line
  // }, [selectedWallet])

  useEffect(() => {
    if (connectedWallet) {
      const { name, address, publicKey, offlineSigner } = connectedWallet
      const pubKey = base58.encode(publicKey.data)
      const did = utils.did.generateSecpDid(pubKey)

      updateName(name)
      updateAddress(address)
      updatePubKey(pubKey)
      updateDid(did)

      createSigningClient(RPC_ENDPOINT!, offlineSigner).then((client) => {
        updateSigningClient(client)
      })
      SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT!, offlineSigner).then(updateCosmWasmClient)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet])

  return null
}

export default AccountUpdateService
