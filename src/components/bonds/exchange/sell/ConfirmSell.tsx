import React from 'react'
import useForm from 'react-hook-form'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../../../common/redux/types'

import {
  confirmSell,
  clearQuote,
} from '../../../../modules/quote/quote.actions'

import {
  remainingBalance,
  newBalance,
  currencyStr,
} from '../../../../modules/account/account.utils'

const ConfirmSell = (props: any): JSX.Element => {
  const { handleSubmit } = useForm()

  const error = (message?: string): JSX.Element => {
    return message ? <div className="error">{message}</div> : undefined
  }

  if (props.signPending) {
    return <div>Signing Transaction</div>
  } else if (!props.activeQuote.recieving) {
    return (
      <Redirect
        from="/bonds/exchange/sell/confirm"
        exact
        to="/bonds/exchange/sell"
      />
    )
  } else {
    const onSubmit = (): void => {
      props.dispatch(
        confirmSell(props.activeQuote, props.activeBond, props.account.address),
      )
    }

    const onBack = (): void => {
      props.dispatch(clearQuote())
      props.history.push('../sell')
    }

    const actualPrice = props.activeQuote.sending
    const recieving = props.activeQuote.recieving
    const estPricePer = {
      amount:
        props.activeQuote.recieving.amount / props.activeQuote.sending.amount,
      denom: props.activeQuote.recieving.denom,
    }

    const remBal = remainingBalance(props, props.activeQuote.sending)
    const remBalError =
      remBal.amount! < 0
        ? "You're attempting to sell more than your holdings."
        : undefined

    const newBal = newBalance(props, props.activeQuote.recieving)
    const minPrice = props.activeQuote.minPrices[0]
    const minPriceError =
      minPrice.amount < estPricePer.amount
        ? 'Your minimum price is less than than the estimated return per token.'
        : undefined
    const maxSupplyError =
      props.activeQuote.sending.amount > props.activeBond.collateral.amount
        ? "You're attempting to sell more than this bond's supply."
        : undefined

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* displays the balances of the connected Cosmos account addresses */}
        <div className="label">Send</div>
        <div>
          <h3>{currencyStr(actualPrice)}</h3>
          <div className="label_subtitle">
            My new balance will be{' '}
            <span className="label_subtitle__bold">{currencyStr(remBal)}</span>
          </div>
          {error(maxSupplyError)}
          {error(remBalError)}
        </div>

        <div className="label">Receive</div>
        <div>
          <h3>{currencyStr(recieving)}</h3>
          <div className="label_subtitle">
            * Includes a{' '}
            <span className="label_subtitle__bold">
              {currencyStr(props.activeQuote.total_fees[0])} fee
            </span>
          </div>
          <div className="label_subtitle">
            My total balance will be{' '}
            <span className="label_subtitle__bold">{currencyStr(newBal)}</span>
          </div>
        </div>

        <div className="label">Estimated return per token</div>
        <div>
          <h3>{currencyStr(estPricePer)}</h3>
          <div className="label_subtitle">
            My minimum token price is{' '}
            <span className="label_subtitle__bold">
              {currencyStr(minPrice)}
            </span>
          </div>
          {error(minPriceError)}
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

export default connect(mapStateToProps)(withRouter(ConfirmSell))
