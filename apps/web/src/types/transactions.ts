export type TRX_MSG =
  | {
      type: string
      value: any
    }
  | {
      typeUrl: string
      value: any
    }

export type TRX_FEE = {
  amount: { amount: string; denom: string }[]
  gas: string
}

export type TRX_FEE_OPTION = 'low' | 'average' | 'high'

export type TRX_FEE_OPTIONS = {
  low: number
  average: number
  high: number
}
