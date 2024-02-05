export interface AlphaBondInfo {
  token: string
  name: string
  description: string
  controllerDid: string
  reserveToken: string
  txFeePercentage: number
  exitFeePercentage: number
  feeAddress: string
  reserveWithdrawalAddress: string
  maxSupply: string
  initialPrice: string
  initialSupply: string
  baseCurveShape: number
  outcomePayment: string
  allowReserveWithdrawals: boolean
  bondDid: string

  // new:
  minimumYield: number
  period: number
  targetRaise: number
}
