import { Wallet, WalletType } from 'types/wallet'

export const LeapExtensionWallet: Wallet = {
  type: WalletType.Leap,
  name: 'Leap Wallet',
  description: 'Leap Cosmos Extension',
  imageUrl:
    'https://raw.githubusercontent.com/leapwallet/assets/2289486990e1eaf9395270fffd1c41ba344ef602/images/leap-cosmos-logo.png',
  getClient: async () => (window as any).leap,
  getOfflineSignerFunction: (client) =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerAuto.bind(client),
  windowKeystoreRefreshEvent: 'leap_keystorechange',
}
