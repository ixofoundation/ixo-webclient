import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getQuote } from '../../BondBuy.actions'
import { currencyStr, tokenBalance } from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import * as bondBuySelectors from '../../BondBuy.selectors'

interface Props extends RouteComponentProps {
  balances: Currency[]
  quotePending: boolean
  denomination: string
  handleGetQuote: (receiving: Currency, maxPrice: Currency) => void
}

const EnterBuyOrder: React.FunctionComponent<Props> = ({ balances, quotePending, denomination, handleGetQuote }) => {
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (formData: any): void => {
    const receiving = {
      amount: parseInt(formData.amount, 10),
      denom: denomination,
    }
    const maxPrice = {
      denom: formData.denom,
      amount: parseInt(formData.maxAmount, 10),
    }

    handleGetQuote(receiving, maxPrice)
  }

  if (quotePending) {
    return <div>Loading quote...</div>
  } else {
    watch()
    const payDenom = watch('denom') || 'res'
    const payOptions: string[] = balances.map((balance) => balance.denom!)
    const curBal = currencyStr(tokenBalance(balances, denomination))
    const payBal = currencyStr(tokenBalance(balances, payDenom))

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='label'>
          Number of <b>{denomination}</b> tokens to buy
        </div>
        <input
          name='amount'
          placeholder='Enter your order quantity'
          type='number'
          ref={register({ required: true, min: 0.001 })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}>
            {errors.tokenAmount && <span className='error'>This field requires a number value</span>}
          </span>
          <div className='label_subtitle'>
            My current balance is <span className='label_subtitle__bold'>{curBal}</span>
          </div>
        </div>

        <div className='label'>Payment token</div>
        <select name='denom' ref={register({ required: true })}>
          {payOptions.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <div className='label_subtitle'>
          My current balance is <span className='label_subtitle__bold'>{payBal}</span>
        </div>

        {/* the unit of the price will be the one which is selected in the dropdown - so it will be measured in IXO if IXO is selected
                for example entering number 5 would mean to buy tokenamount of the first input field with 5 IXO per token
                Insufficient balance should show an error - which says balance is to low */}
        <div className='label'>
          Maximum price per <b>{denomination}</b> token
        </div>
        <input
          name='maxAmount'
          placeholder='Enter the highest offer you would accept'
          type='number'
          ref={register({ required: true })}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}>
            {errors.maxPricePerToken && <span className='error'>This field requires a number value</span>}
          </span>
          <span className='label_subtitle'>I will have an opportunity to confirm this order</span>
        </div>

        <div>
          <input type='submit' value='get quote' className='button button_buy button_buy_quote' />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  denomination: state.activeBond.symbol, // TODO replace with selector once we have activeBondSelectors
  balances: state.account.balances,
  quotePending: bondBuySelectors.selectBondBuyQuotePending(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetQuote: (receiving: Currency, maxPrice: Currency): void => dispatch(getQuote(receiving, maxPrice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnterBuyOrder))
