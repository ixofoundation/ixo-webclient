import React from 'react'
import useForm from 'react-hook-form'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../../../common/redux/types'

import { confirmBuy, clear } from '../../../../modules/quote/quote.actions'
import {
  remainingBalance,
  newBalance,
  currencyStr,
} from '../../../../modules/account/account.utils'

const ConfirmBuy = (props: any): JSX.Element => {
  const { handleSubmit } = useForm()

  const error = (message?: string): JSX.Element => {
    return message ? <div className="error">{message}</div> : undefined
  }

  if (props.activeQuote.signPending) {
    return <div>Signing Transaction</div>
  } else if (!props.activeQuote.receiving) {
    return (
      <Redirect
        from="/bonds/exchange/buy/confirm"
        exact
        to="/bonds/exchange/buy"
      />
    )
  } else {
    const onSubmit = (): void => {
      props.dispatch(confirmBuy())
    }

    const onBack = (): void => {
      props.dispatch(clear())
      props.history.push('../')
    }

    const totalPrice = props.activeQuote.totalPrices[0]
    const receiving = props.activeQuote.receiving
    const estPricePer = {
      amount:
        props.activeQuote.actualPrices[0].amount /
        props.activeQuote.receiving.amount,
      denom: props.activeQuote.actualPrices[0].denom,
    }

    const remBal = remainingBalance(props, props.activeQuote.actualPrices[0])
    const remBalError =
      remBal.amount! < 0
        ? 'You have insufficient funds for this transaction'
        : undefined

    const newBal = newBalance(props, props.activeQuote.receiving)
    const newBalError =
      parseInt(props.activeQuote.receiving.amount) >
      parseInt(props.activeBond.totalSupply.amount)
        ? "You're attempting to buy more tokens than this bond's supply."
        : undefined

    const maxPrice = props.activeQuote.maxPrices[0]
    const maxPriceError =
      maxPrice.amount < estPricePer.amount
        ? 'Your max price is less than than the estimated price per token.'
        : undefined

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="label">Send</div>
        <div>
          <h3>{currencyStr(totalPrice)}</h3>
          {props.activeQuote.totalFees.length > 0 ? (
            <div className="label_subtitle">
              * Includes a{' '}
              <span className="label_subtitle__bold">
                {currencyStr(props.activeQuote.totalFees[0])} fee
              </span>
            </div>
          ) : (
            undefined
          )}
          <div className="label_subtitle">
            My remaining balance will be{' '}
            <span className="label_subtitle__bold">{currencyStr(remBal)}</span>
          </div>
          {error(remBalError)}
        </div>

        {/* displays the balances of the connected Cosmos account addresses */}
        <div className="label">Recieve</div>
        <div>
          <h3>{currencyStr(receiving)}</h3>
          <div className="label_subtitle">
            My new balance will be{' '}
            <span className="label_subtitle__bold">{currencyStr(newBal)}</span>
          </div>
          {error(newBalError)}
        </div>

        <div className="label">Estimated price per token</div>
        <div>
          {/* <span style={{ marginTop: "-0.5em", padding: "0" }}>{errors.tokenAmount && <span className="error">This field requires a number value</span>}</span> */}
          <h3>{currencyStr(estPricePer)}</h3>
          <div className="label_subtitle">
            My maximum token price is{' '}
            <span className="label_subtitle__bold">
              {currencyStr(maxPrice)}
            </span>
          </div>
          {error(maxPriceError)}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}></span>
          <button
            onClick={onBack}
            className="button button_buy button_buy_back"
          >
            go back
          </button>
          <input
            type="submit"
            value="confirm & sign"
            className="button button_buy button_buy_confirm"
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): RootState => {
  return state
}

export default connect(mapStateToProps)(withRouter(ConfirmBuy))
