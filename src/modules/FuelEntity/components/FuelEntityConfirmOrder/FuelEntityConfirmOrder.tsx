import React from 'react'

export interface Props {
  subscription: string
  symbol: string
  amount: string
  fiatAmount: string
  fiatConversionRate: string
  transactionFee: string
  fiatTransactionFee: string
  gasFee: string
  fiat: string
  total: string
  fiatTotal: string
  handleConfirmOrder: () => void
}

const FuelEntityConfirmOrder: React.FunctionComponent<Props> = ({
  subscription,
  symbol,
  amount,
  fiatAmount,
  fiatConversionRate,
  transactionFee,
  fiatTransactionFee,
  gasFee,
  fiat,
  total,
  fiatTotal,
  handleConfirmOrder,
}) => {
  return (
    <div>
      <h1>Order Summary</h1>
      <div className="row">
        <div className="col-8">
          <small>Subscription</small>
        </div>
        <div className="col-4">
          <small>Standard Hosting Service</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{subscription}</div>
        <div className="col-4">Included</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>{symbol} Credits</small>
        </div>
        <div className="col-4">
          <small>
            1 {symbol} = {fiatConversionRate}
          </small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{amount}</div>
        <div className="col-4">{fiatAmount}</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>Fee</small>
        </div>
        <div className="col-4">
          <small>{gasFee} per transaction</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{transactionFee}</div>
        <div className="col-4">{fiatTransactionFee}</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>Amount due today</small>
        </div>
        <div className="col-4">
          <small>{total}</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{fiat} TOTAL</div>
        <div className="col-4">{fiatTotal}</div>
      </div>
      <div>
        <button onClick={handleConfirmOrder}>Confirm</button>
      </div>
    </div>
  )
}

export default FuelEntityConfirmOrder
