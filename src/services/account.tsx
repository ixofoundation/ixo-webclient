import { createSigningClient, utils } from '@ixo/impactxclient-sdk'
import { CheckIidDoc, RPC_ENDPOINT } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { useWalletManager } from '@gssuper/cosmodal'
import base58 from 'bs58'

const AccountUpdateService = (): JSX.Element | null => {
  const {
    did,
    address,
    updateBalances,
    updateName,
    updateAddress,
    updatePubKey,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateCWClient,
    updateRegistered,
    updateDid,
  } = useAccount()
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

  useEffect(() => {
    if (connectedWallet) {
      const { wallet, name, address, publicKey, offlineSigner } = connectedWallet
      const pubKey = base58.encode(publicKey.data)
      const did = utils.did.generateSecpDid(pubKey)

      updateName(name)
      updateAddress(address)
      updatePubKey(pubKey)
      updateDid(did)
      chooseWallet(wallet.type)

      createSigningClient(RPC_ENDPOINT!, offlineSigner).then(updateSigningClient)
      SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT!, offlineSigner).then(updateCosmWasmClient)
    } else {
      updateName('')
      updateAddress('')
      updatePubKey('')
      updateDid('')
      chooseWallet(undefined)
      updateSigningClient(undefined)
      updateCosmWasmClient(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet])

  useEffect(() => {
    CosmWasmClient.connect(RPC_ENDPOINT!).then(updateCWClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default AccountUpdateService
