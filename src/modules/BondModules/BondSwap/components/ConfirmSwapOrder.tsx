import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { confirmSwap, clear } from '../BondSwap.actions'
import { remainingBalance, newBalance, currencyStr } from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import * as bondSwapSelectors from '../BondSwap.selectors'

interface Props extends RouteComponentProps {
  match: any
  signPending: boolean
  sending: Currency
  receiving: Currency
  isSending: boolean
  totalFee: Currency
  estimatedPrice: Currency
  balances: Currency[]
  handleConfirmSwap: () => void
  handleClear: () => void
}

const ConfirmSwapOrder: React.FunctionComponent<Props> = ({
  match: {
    params: { projectDID, bondDID },
  },
  signPending,
  sending,
  receiving,
  totalFee,
  estimatedPrice,
  isSending,
  balances,
  handleConfirmSwap,
  handleClear,
}) => {
  const { handleSubmit } = useForm()

  if (signPending) {
    return <div>Signing Transaction</div>
  } else if (!isSending) {
    return (
      <Redirect
        from={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap/confirm`}
        exact
        to={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap`}
      />
    )
  } else {
    const onSubmit = (): void => {
      handleConfirmSwap()
    }

    const onBack = (): void => {
      handleClear()
      // props.history.push('../swap')
    }

    const remBal = remainingBalance(balances, sending)
    const newBal = newBalance(balances, receiving)
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* displays the balances of the connected Cosmos account addresses */}
        <div className='label'>Send</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{currencyStr(sending)}</h3>
          <span className='label_subtitle'>
            My new balance will be <span className='label_subtitle__bold'>{currencyStr(remBal)}</span>
          </span>
        </div>

        <div className='label'>Receive</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{receiving}</h3>
          <div className='label_subtitle'>
            * Includes a <span className='label_subtitle__bold'>{currencyStr(totalFee)} fee</span>
          </div>
          <span className='label_subtitle'>
            My total balance will be <span className='label_subtitle__bold'>{currencyStr(newBal)}</span>
          </span>
        </div>

        <div className='label'>Estimated return per token</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>{estimatedPrice}</h3>
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

          <input type='submit' value='confirm & sign' className='button button_buy button_buy_confirm' />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  sending: bondSwapSelectors.selectBondSwapSending(state),
  receiving: bondSwapSelectors.selectBondSwapReceiving(state),
  isSending: bondSwapSelectors.selectBondSwapIsSending(state),
  signPending: bondSwapSelectors.selectBondSwapSignPending(state),
  totalFee: bondSwapSelectors.selectBondSwapTotalFee(state),
  estimatedPrice: bondSwapSelectors.selectBondSwapPriceEstimate(state),
  balances: state.account.balances, // TEMP until account has selectors
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleConfirmSwap: (): void => dispatch(confirmSwap()),
  handleClear: (): void => dispatch(clear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmSwapOrder))
