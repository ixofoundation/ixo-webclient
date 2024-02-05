import { Wallet, WalletType } from 'types/wallet'

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
