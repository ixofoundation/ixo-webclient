import { StdFee } from '@cosmjs/stargate'
import BigNumber from 'bignumber.js'
import { ExchangeAsset } from 'redux/exchange/exchange.types'
import { TRX_MSG } from 'types/transactions'

export enum Token {
  Token1155 = 'token1155',
}

export type SupportedSwapDenoms = 'uixo' | 'carbon'

export type DexAsset = {
  amount: BigNumber
  denom?: SupportedSwapDenoms
  entity: any
  balance: any
  asset: any
  usdAmount: number
  batches?: any
  minimumOutputAmount?: BigNumber
  standard?: Token
}

export interface SwapAdapterConstructorProps {
  walletAddress: string
  smartContractAddress?: string
  offlineSigner?: any
}

export interface SwapAdapterGenerateTransactionProps {
  inputAsset: ExchangeAsset
  outputAsset: ExchangeAsset
}

export interface SwapAdapterPerformSwapProps {
  offlineSigner: any
  swapTrxs: TRX_MSG[]
  fee?: StdFee
  callback?: () => void
}

interface SwapAdapter {
  walletAddress: string
  smartContractAddress: string

  generateSwapTransaction(props: SwapAdapterGenerateTransactionProps): Promise<TRX_MSG>

  executeWasmTRX(props: SwapAdapterPerformSwapProps): void
}

export default SwapAdapter
