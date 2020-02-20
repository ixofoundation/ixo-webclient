import React from 'react'
import useForm from 'react-hook-form'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Store } from '../../../../model/store'
import {
  confirmSwap,
  clearQuote,
} from '../../../../redux/quote/quote_action_creators'

import {
  remainingBalance,
  newBalance,
  currencyStr,
} from '../../../../model/account'

const ConfirmSwap = (props: any): JSX.Element => {
  const { handleSubmit } = useForm()

  if (props.signPending) {
    return <div>Signing Transaction</div>
  } else if (!props.activeQuote.recieving) {
    return (
      <Redirect
        from="/bonds/exchange/swap/confirm"
        exact
        to="/bonds/exchange/swap"
      />
    )
  } else {
    const onSubmit = (): void => {
      props.dispatch(
        confirmSwap(props.activeQuote, props.activeBond, props.account.address),
      )
    }

    const onBack = (): void => {
      props.dispatch(clearQuote())
      props.history.push('../swap')
    }

    const actualPrice = currencyStr(props.activeQuote.sending)
    const recieving = currencyStr(props.activeQuote.recieving)
    const estPricePer = currencyStr({
      amount:
        props.activeQuote.recieving.amount / props.activeQuote.sending.amount,
      denom: props.activeQuote.recieving.denom,
    })

    const remBal = currencyStr(
      remainingBalance(props, props.activeQuote.sending),
    )
    const newBal = currencyStr(newBalance(props, props.activeQuote.recieving))
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* displays the balances of the connected Cosmos account addresses */}
        <div className="label">Send</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{actualPrice}</h3>
          <span className="label_subtitle">
            My new balance will be{' '}
            <span className="label_subtitle__bold">{remBal}</span>
          </span>
        </div>

        <div className="label">Recieve</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{recieving}</h3>
          <span className="label_subtitle">
            My total balance will be{' '}
            <span className="label_subtitle__bold">{newBal}</span>
          </span>
        </div>

        <div className="label">Estimated return per token</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{estPricePer}</h3>
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

const mapStateToProps = (state: Store): Store => {
  return state
}

export default connect(mapStateToProps)(withRouter(ConfirmSwap))
