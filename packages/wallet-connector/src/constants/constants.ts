import { ChainNetwork } from "@ixo/cosmos-chain-resolver/types/types/chain"
import { Wallet, WalletType } from '@ixo-webclient/types'

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const testnetOrDevnet = CHAIN_ID?.startsWith('pandora')
? 'testnet'
: 'devnet'
export const chainNetwork: ChainNetwork = CHAIN_ID?.startsWith('ixo')
  ? 'mainnet'
  : testnetOrDevnet
