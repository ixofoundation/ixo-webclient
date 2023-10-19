import { Wallet, WalletType } from 'types/wallet'

export const WalletConnectWallet: Wallet = {
  type: WalletType.WalletConnect,
  name: 'Impacts X',
  description: 'via WalletConnect',
  imageUrl: 'https://bafybeid7unga64bbctxfajcyt3cutrcep4tkclmd7xh2p3p7kwggljvtby.ipfs.w3s.link/ImpactsX.png',
  getClient: async (chainInfo, walletConnect) => {
    if (walletConnect?.connected) {
      return new (await import('./KeplrWalletConnectV1')).KeplrWalletConnectV1(walletConnect, [chainInfo])
    }
    throw new Error('Mobile wallet not connected.')
  },
  // WalletConnect only supports Amino signing.
  getOfflineSignerFunction: (client) =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerOnlyAmino.bind(client),
  windowKeystoreRefreshEvent: 'keplr_keystorechange',
}
