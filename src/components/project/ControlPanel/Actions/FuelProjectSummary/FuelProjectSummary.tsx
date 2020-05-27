import React from 'react'

export interface Props {
  feeCurrency: string
  ixoAmount: number
  ixoCurrencyConversion: number
  ixoTransactionFee: number
  offerDescription: string
}

const FuelProjectSummary: React.FunctionComponent<Props> = ({
  feeCurrency,
  ixoAmount,
  ixoCurrencyConversion,
  ixoTransactionFee,
  offerDescription,
}) => {
  const conversionRate = 1 / ixoCurrencyConversion

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
        <div className="col-8">{offerDescription}</div>
        <div className="col-4">Included</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>IXO Credits</small>
        </div>
        <div className="col-4">
          <small>1 IXO = € {conversionRate}</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{ixoAmount}</div>
        <div className="col-4">€ {ixoAmount * conversionRate}</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>Fee</small>
        </div>
        <div className="col-4">
          <small>{ixoTransactionFee} IXO per transaction</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{ixoTransactionFee}</div>
        <div className="col-4">€ {ixoTransactionFee * conversionRate}</div>
      </div>
      <div className="row">
        <div className="col-8">
          <small>Amount due today</small>
        </div>
        <div className="col-4">
          <small>{ixoAmount + ixoTransactionFee} IXO</small>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{feeCurrency} TOTAL</div>
        <div className="col-4">
          € {(ixoAmount + ixoTransactionFee) * conversionRate}
        </div>
      </div>
    </div>
  )
}

export default FuelProjectSummary
