import React from 'react'

interface Props {
  entityId?: string
  feeCurrency?: string
  fromWalletBalancePost?: number
  fromWalletBalancePre?: number
  ixoAmount?: number
  ixoCurrencyConversion?: number
  ixoTransactionFee?: number
  offerDescription?: string
  toWalletAddress?: string
  transactionFee?: number
}

const FuelProjectSummary: React.FunctionComponent<Props> = ({
  entityId,
  feeCurrency,
  fromWalletBalancePost,
  fromWalletBalancePre,
  ixoAmount,
  ixoCurrencyConversion,
  ixoTransactionFee,
  offerDescription,
  toWalletAddress,
  transactionFee,
}) => {
  return (
    <div>
      <h1>Order Summary</h1>
      {entityId}
      {feeCurrency}
      {fromWalletBalancePost}
      {fromWalletBalancePre}
      {ixoAmount}
      {ixoCurrencyConversion}
      {ixoTransactionFee}
      {offerDescription}
      {toWalletAddress}
      {transactionFee}
    </div>
  )
}

export default FuelProjectSummary
