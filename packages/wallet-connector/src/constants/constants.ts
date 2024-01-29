import { ChainNetwork } from "@ixo/cosmos-chain-resolver/types/types/chain"
import { Wallet, WalletType } from '@ixo-webclient/types'

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const testnetOrDevnet = CHAIN_ID?.startsWith('pandora')
? 'testnet'
: 'devnet'
export const chainNetwork: ChainNetwork = CHAIN_ID?.startsWith('ixo')
  ? 'mainnet'
  : testnetOrDevnet

export const KeplrExtensionWallet: Wallet = {
  type: WalletType.Keplr,
  name: 'Keplr Wallet',
  description: 'Keplr Chrome Extension',
  imageUrl: 'https://bafkreifdzoeavalj5ger3bigyapou5vgcpbcflupowqrju5ykxubcbyjlq.ipfs.nftstorage.link',
  getClient: async () => (await import('@keplr-wallet/stores')).getKeplrFromWindow(),
  getOfflineSignerFunction: (client) =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerAuto.bind(client),
  windowKeystoreRefreshEvent: 'keplr_keystorechange',
}
