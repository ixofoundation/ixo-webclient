import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { confirmSell, clear } from '../../BondSell.actions'
import { remainingBalance, newBalance, currencyStr } from '../../../../Account/Account.utils'
import { Currency } from 'types/models'
import * as bondSellSelectors from '../../BondSell.selectors'

interface Props extends RouteComponentProps {
  match: any
  history: any
  signPending: boolean
  sending: Currency
  receiving: Currency
  isSending: boolean
  totalFee: Currency
  estimatedPrice: Currency
  minPrice: Currency
  collateral: Currency
  balances: Currency[]
  handleConfirmSell: () => void
  handleClear: () => void
}

const ConfirmSellOrder: React.FunctionComponent<Props> = ({
  history,
  signPending,
  sending,
  receiving,
  minPrice,
  totalFee,
  estimatedPrice,
  isSending,
  balances,
  collateral,
  handleConfirmSell,
  handleClear,
}) => {
  const { handleSubmit } = useForm()

  const error = (message?: string): JSX.Element => {
    return message ? <div className='error'>{message}</div> : <div />
  }

  if (signPending) {
    return <div>Signing Transaction</div>
  } else if (!isSending) {
    history.push('../sell')

    return null
  } else {
    const onSubmit = (): void => {
      handleConfirmSell()
    }

    const onBack = (): void => {
      handleClear()
      history.push('../sell')
    }

    const remBal = remainingBalance(balances, sending)
    const remBalError = remBal.amount! < 0 ? "You're attempting to sell more than your holdings." : undefined

    const newBal = newBalance(balances, receiving)
    const minPriceError =
      minPrice.amount! < estimatedPrice.amount!
        ? 'Your minimum price is less than than the estimated return per token.'
        : undefined
    const maxSupplyError =
      sending.amount! > collateral.amount! ? "You're attempting to sell more than this bond's supply." : undefined

    const hasErrors = !!remBalError || !!minPriceError || !!maxSupplyError

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* displays the balances of the connected Cosmos account addresses */}
        <div className='label'>Send</div>
        <div>
          <h3>{currencyStr(sending)}</h3>
          <div className='label_subtitle'>
            My new balance will be <span className='label_subtitle__bold'>{currencyStr(remBal)}</span>
          </div>
          {error(maxSupplyError)}
          {error(remBalError)}
        </div>

        <div className='label'>Receive</div>
        <div>
          <h3>{currencyStr(receiving)}</h3>
          <div className='label_subtitle'>
            * Includes a <span className='label_subtitle__bold'>{currencyStr(totalFee)} fee</span>
          </div>
          <div className='label_subtitle'>
            My total balance will be <span className='label_subtitle__bold'>{currencyStr(newBal)}</span>
          </div>
        </div>

        <div className='label'>Estimated return per token</div>
        <div>
          <h3>{currencyStr(estimatedPrice)}</h3>
          <div className='label_subtitle'>
            My minimum token price is <span className='label_subtitle__bold'>{currencyStr(minPrice)}</span>
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
          <button onClick={onBack} className='button button_buy button_buy_back'>
            go back
          </button>

          <input
            disabled={hasErrors}
            type='submit'
            value='confirm &amp; sign'
            className='button button_buy button_buy_confirm'
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  sending: bondSellSelectors.selectBondSellSending(state),
  receiving: bondSellSelectors.selectBondSellReceiving(state),
  isSending: bondSellSelectors.selectBondSellIsSending(state),
  signPending: bondSellSelectors.selectBondSellSignPending(state),
  totalFee: bondSellSelectors.selectBondSellTotalFee(state),
  minPrice: bondSellSelectors.selectBondSellMinPrice(state),
  estimatedPrice: bondSellSelectors.selectBondSellPriceEstimate(state),
  collateral: state.activeBond.collateral, // TEMP until activeBond has selectors
  balances: state.account.balances, // TEMP until account has selectors
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleConfirmSell: (): void => dispatch(confirmSell()),
  handleClear: (): void => dispatch(clear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmSellOrder))
