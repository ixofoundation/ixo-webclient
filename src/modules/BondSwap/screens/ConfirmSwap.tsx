import React from 'react'
import useForm from 'react-hook-form'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import { confirmSwap, clear } from '../../quote/quote.actions'

import {
  remainingBalance,
  newBalance,
  currencyStr,
} from '../../account/account.utils'

const ConfirmSwap = (props: any): JSX.Element => {
  const projectDID = props.match.params.projectDID

  const { handleSubmit } = useForm()

  if (props.activeQuote.signPending) {
    return <div>Signing Transaction</div>
  } else if (!props.activeQuote.receiving) {
    return (
      <Redirect
        from={`/projects/${projectDID}/bonds/exchange/swap/confirm`}
        exact
        to={`/projects/${projectDID}/bonds/exchange/swap`}
      />
    )
  } else {
    const onSubmit = (): void => {
      props.dispatch(confirmSwap())
    }

    const onBack = (): void => {
      props.dispatch(clear())
      props.history.push('../swap')
    }

    const actualPrice = currencyStr(props.activeQuote.sending)
    const receiving = currencyStr(props.activeQuote.receiving)
    const estPricePer = currencyStr({
      amount:
        props.activeQuote.receiving.amount / props.activeQuote.sending.amount,
      denom: props.activeQuote.receiving.denom,
    })

    const remBal = currencyStr(
      remainingBalance(props, props.activeQuote.sending),
    )
    const newBal = currencyStr(newBalance(props, props.activeQuote.receiving))
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

        <div className="label">Receive</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{receiving}</h3>
          <div className="label_subtitle">
            * Includes a{' '}
            <span className="label_subtitle__bold">
              {currencyStr(props.activeQuote.totalFees[0])} fee
            </span>
          </div>
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

const mapStateToProps = (state: RootState): RootState => {
  return state
}

export default connect(mapStateToProps)(withRouter(ConfirmSwap))
