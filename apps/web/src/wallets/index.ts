import { Wallet } from 'types/wallet'
import { wallets as keplrWallets } from './keplr'
import { wallets as leapWallets } from './leap'
import { wallets as walletconnectWallets } from './walletconnect'

export const WALLETS: Wallet[] = [...keplrWallets, ...leapWallets, ...walletconnectWallets]
