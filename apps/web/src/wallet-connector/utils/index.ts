import { toHex } from '@cosmjs/encoding'
import { utils } from '@ixo/impactxclient-sdk'
import base58 from 'bs58'
import { ChainInfo } from 'redux/configs/configs.types'
import { ConnectedWallet, Wallet, WalletClient, WalletType } from 'types/wallet'

export const getConnectedWalletInfo = async (
  wallet: Wallet,
  client: WalletClient,
  chainInfo: ChainInfo,
): Promise<ConnectedWallet> => {
  // Call experimentalSuggestChain if defined, except for Keplr Mobile web.
  if (wallet.type !== WalletType.Keplr || client.mode !== 'mobile-web') {
    await client.experimentalSuggestChain?.(chainInfo)
  }

  await client.enable(chainInfo.chainId)

  // Parallelize for efficiency.
  const [{ name, bech32Address: address, pubKey }, offlineSigner] = await Promise.all([
    // Get name, address, and public key.
    client.getKey(chainInfo.chainId),
    // Get offline signer.
    wallet.getOfflineSignerFunction(client)(chainInfo.chainId),
  ])

  const did = utils.did.generateSecpDid(base58.encode(pubKey))

  if (address === undefined) {
    throw new Error('Failed to retrieve wallet address.')
  }

  return {
    wallet,
    walletClient: client,
    chainInfo,
    offlineSigner,
    name,
    address,
    did,
    publicKey: {
      data: pubKey,
      hex: toHex(pubKey),
    },
  }
}

export const friendlyWalletNames = (wallet: string) => {
  switch (wallet) {
    case 'impactx_mobile':
      return 'Impacts X'
    default:
      return wallet
  }
}

export const friendlyModalTitles = (type: string) => {
  switch (type) {
    case 'SIGN_X_LOGIN':
      return 'Login'
    case 'SIGN_X_TRANSACT':
      return 'Transacting'
    default:
      return 'Impacts X'
  }
}
