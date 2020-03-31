import React, { Dispatch } from 'react'
import useForm from 'react-hook-form'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import * as bondBuySelectors from '../BondBuy.selectors'
import { confirmBuy, clear } from '../../quote/quote.actions'
import {
  remainingBalance,
  newBalance,
  currencyStr,
} from '../../account/account.utils'
import { Currency } from 'src/types/models'

interface Props extends RouteComponentProps {
  match: any
  signPending: boolean
  receiving: Currency
  isReceiving: boolean
  totalPrice: Currency
  actualPrice: Currency
  totalFee: Currency
  estimatedPrice: Currency
  maxPrice: Currency
  totalSupply: Currency
  balances: Currency[]
  handleConfirmBuy: () => void
  handleClear: () => void
}

const ConfirmBuyOrderScreen: React.FunctionComponent<Props> = ({
  match: {
    params: { projectDID, bondDID },
  },
  signPending,
  receiving,
  isReceiving,
  totalPrice,
  actualPrice,
  totalFee,
  estimatedPrice,
  maxPrice,
  totalSupply,
  balances,
  handleConfirmBuy,
  handleClear,
}) => {
  console.log(estimatedPrice)
  const { handleSubmit } = useForm()

  const error = (message?: string): JSX.Element => {
    return message ? <div className="error">{message}</div> : undefined
  }

  if (signPending) {
    return <div>Signing Transaction</div>
  } else if (!isReceiving) {
    return (
      <Redirect
        from={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`}
        exact
        to={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy`}
      />
    )
  } else {
    const onSubmit = (): void => {
      handleConfirmBuy()
    }

    const onBack = (): void => {
      handleClear()
      // props.history.push('../') TODO!
    }

    const remBal = remainingBalance(balances, actualPrice)
    const remBalError =
      remBal.amount! < 0
        ? 'You have insufficient funds for this transaction'
        : undefined

    const newBal = newBalance(balances, receiving)
    const newBalError =
      receiving.amount > totalSupply.amount
        ? "You're attempting to buy more tokens than this bond's supply."
        : undefined

    const maxPriceError =
      maxPrice.amount < estimatedPrice.amount
        ? 'Your max price is less than than the estimated price per token.'
        : undefined

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="label">Send</div>
        <div>
          <h3>{currencyStr(totalPrice)}</h3>
          <div className="label_subtitle">
            * Includes a{' '}
            <span className="label_subtitle__bold">
              {currencyStr(totalFee)} fee
            </span>
          </div>
          <div className="label_subtitle">
            My remaining balance will be{' '}
            <span className="label_subtitle__bold">{currencyStr(remBal)}</span>
          </div>
          {error(remBalError)}
        </div>

        {/* displays the balances of the connected Cosmos account addresses */}
        <div className="label">Receive</div>
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
          <h3>{currencyStr(estimatedPrice)}</h3>
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

const mapStateToProps = (state: RootState): any => ({
  receiving: bondBuySelectors.selectBondBuyReceiving(state),
  isReceiving: bondBuySelectors.selectBondBuyIsReceiving(state),
  signPending: bondBuySelectors.selectBondBuySignPending(state),
  totalPrice: bondBuySelectors.selectBondBuyTotalPrice(state),
  actualPrice: bondBuySelectors.selectBondBuyActualPrice(state),
  totalFee: bondBuySelectors.selectBondBuyTotalFee(state),
  maxPrice: bondBuySelectors.selectBondBuyMaxPrice(state),
  estimatedPrice: bondBuySelectors.selectEstimatePrice(state),
  totalSupply: state.activeBond.totalSupply, // TEMP until activeBond has selectors
  balances: state.account.balances, // TEMP until account has selectors
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleConfirmBuy: (): void => dispatch(confirmBuy()),
  handleClear: (): void => dispatch(clear()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ConfirmBuyOrderScreen))
