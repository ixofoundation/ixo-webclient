import { fromBech32, toHex } from '@cosmjs/encoding'
import { KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain'
import { getChainNameFromAddressPrefix, getKeplrChainInfo } from '@ixo/cosmos-chain-resolver'
import { chainNetwork } from 'hooks/configs'

import { ChainInfo } from '@keplr-wallet/types'
import { ConnectedWallet, Wallet, WalletClient, WalletType } from 'types/wallet'
import { utils } from '@ixo/impactxclient-sdk'
import base58 from 'bs58'

export const isIxoAccount = (address: string): boolean => {
  return address.startsWith('ixo')
}

export const getPrefixFromAddress = (address: string): string => {
  const { prefix } = fromBech32(address)
  return prefix
}

export const determineChainFromAddress = async (address: string): Promise<KeplrChainInfo | undefined> => {
  try {
    const prefix: string = getPrefixFromAddress(address)
    const chainName: string = getChainNameFromAddressPrefix(prefix)
    const chainInfo: KeplrChainInfo = await getKeplrChainInfo(
      chainName,
      chainName === 'impacthub' ? chainNetwork : undefined,
    )
    return chainInfo
  } catch (e) {
    // console.error('determineChainFromAddress', e)
    return undefined
  }
}

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
