import React from 'react'
import useForm from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Store } from '../../../../model/store'
import { quoteBuy } from '../../../../redux/quote/quote_action_creators'
import { Quote } from '../../../../model/quote'
import { currencyStr, tokenBalance } from '../../../../model/account'

const QuoteBuy = (props: any): JSX.Element => {
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (formData: any): void => {
    const quote: Quote = {}
    quote.sending = { denom: formData.denom }
    quote.recieving = {
      amount: formData.amount,
      denom: props.activeBond.symbol,
    }
    quote.maxPrices = [{ denom: formData.denom, amount: formData.maxAmount }]

    props.dispatch(quoteBuy(quote))
  }

  if (props.quotePending) {
    return <div>Loading quote...</div>
  } else {
    watch()
    const payDenom = watch('denom') || 'res'
    const payOptions: [string] = props.account.balances.map(
      (balance: { denom: string }) => balance.denom,
    )

    const curBal = currencyStr(tokenBalance(props, props.activeBond.symbol))
    const payBal = currencyStr(tokenBalance(props, payDenom))

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="label">
          Number of <b>{props.activeBond.symbol}</b> tokens to buy
        </div>
        <input
          name="amount"
          placeholder="Enter your order quantity"
          ref={register({ required: true, pattern: /^[0-9]+$/i })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}>
            {errors.tokenAmount && (
              <span className="error">This field requires a number value</span>
            )}
          </span>
          <div className="label_subtitle">
            My current balance is{' '}
            <span className="label_subtitle__bold">{curBal}</span>
          </div>
        </div>

        <div className="label">Payment token</div>
        <select name="denom" ref={register({ required: true })}>
          {payOptions.map(option => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="label_subtitle">
          My current balance is{' '}
          <span className="label_subtitle__bold">{payBal}</span>
        </div>

        {/* the unit of the price will be the one which is selected in the dropdown - so it will be measured in IXO if IXO is selected
                for example entering number 5 would mean to buy tokenamount of the first input field with 5 IXO per token
                Insufficient balance should show an error - which says balance is to low */}
        <div className="label">
          Maximum price per <b>{props.activeBond.symbol}</b> token
        </div>
        <input
          name="maxAmount"
          placeholder="Enter the highest offer you would accept"
          ref={register({ required: true, pattern: /^[0-9]+$/i })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}>
            {errors.maxPricePerToken && (
              <span className="error">This field requires a number value</span>
            )}
          </span>
          <span className="label_subtitle">
            I will have an opportunity to confirm this order
          </span>
        </div>

        <div>
          <input
            type="submit"
            value="get quote"
            className="button button_buy button_buy_quote"
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: Store): Store => {
  return state
}

export default connect(mapStateToProps)(withRouter(QuoteBuy))
