import { Wallet } from 'types/wallet'
import { KeplrExtensionWallet } from './extension'
// import { KeplrMobileWallet } from "./mobile"

export const wallets: Wallet[] = [
  KeplrExtensionWallet,
  // KeplrMobileWallet
]
