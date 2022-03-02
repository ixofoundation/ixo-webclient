export interface ContractData {
  id: string
  payment_template_id: string
  creator: string
  payer: string
  recipients: {
    address: string
    percentage: string
  }[]
  cumulative_pay: {
    denom: string
    amount: string
  }[]
  current_remainder: {
    denom: string
    amount: string
  }[]
  can_deauthorise: boolean
  authorised: boolean
  discount_id: string
  discount?: string
  date?: Date
}

export interface ContractTableData {
  date: Date
  status: string
  type: string
  source: ContractData['recipients']
  conditions: string
  discount: string
  value: string
  contractId: string
  payer: string
}
