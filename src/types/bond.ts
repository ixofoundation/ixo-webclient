export interface AlphaBondInfo {
  token: string
  name: string
  controllerDid: string
  reserveToken: string
  txFeePercentage: number
  exitFeePercentage: number
  feeAddress: string
  reserveWithdrawalAddress: string
  maxSupply: number
  initialPrice: number
  initialSupply: number
  baseCurveShape: number
  outcomePayment: number
  allowReserveWithdrawals: boolean
  bondDid: string

  // new:
  minimumYield: number
  period: number
  targetRaise: number
}
