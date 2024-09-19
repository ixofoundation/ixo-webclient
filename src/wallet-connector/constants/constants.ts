import { ChainNetwork } from '@ixo/cosmos-chain-resolver/types/types/chain'

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

const testnetOrDevnet = CHAIN_ID?.startsWith('pandora') ? 'testnet' : 'devnet'
export const chainNetwork: ChainNetwork = CHAIN_ID?.startsWith('ixo') ? 'mainnet' : testnetOrDevnet
