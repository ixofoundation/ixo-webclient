import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getQuote } from '../../BondSell.actions'
import { currencyStr, tokenBalance } from '../../../../Account/Account.utils'
import { Currency } from 'types/models'
import * as bondSellSelectors from '../../BondSell.selectors'

interface Props extends RouteComponentProps {
  balances: Currency[]
  quotePending: boolean
  denomination: string
  handleGetQuote: (receiving: Currency, minPrice: Currency) => void
}

const EnterSellOrder: React.FunctionComponent<Props> = ({ balances, quotePending, denomination, handleGetQuote }) => {
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (formData: any): void => {
    const sending: Currency = {
      amount: parseInt(formData.amount, 10),
      denom: denomination,
    }
    const minPrice: Currency = {
      denom: formData.denom,
      amount: parseInt(formData.minAmount, 10),
    }

    handleGetQuote(sending, minPrice)
  }

  if (quotePending) {
    return <div>Loading quote...</div>
  } else {
    watch()
    const payDenom = watch('denom') || 'res'
    const payOptions: string[] = balances.map((balance) => balance.denom!)

    const curBal = currencyStr(tokenBalance(balances, denomination))
    const recBal = currencyStr(tokenBalance(balances, payDenom))

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='label'>
          Number of <b>{denomination}</b> tokens to sell
        </div>
        <input
          name='amount'
          placeholder={`Enter the quantity of ${denomination} tokens you're selling.`}
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
            {errors.amount && <span className='error'>This field requires a number value</span>}
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
          My current balance is <span className='label_subtitle__bold'>{recBal}</span>
        </div>

        {/* the unit of the price will be the one which is selected in the dropdown - so it will be measured in IXO if IXO is selected
                for example entering number 5 would mean to buy tokenamount of the first input field with 5 IXO per token
                Insufficient balance should show an error - which says balance is to low */}
        <div className='label'>
          Minimum price per <b>{denomination}</b> token
        </div>
        <input
          name='minAmount'
          placeholder='Enter the lowest offer you will accept'
          type='number'
          ref={register({ required: true, min: 0.001 })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: '-0.5em', padding: '0' }}>
            {errors.minAmount && <span className='error'>This field requires a number value</span>}
          </span>
          <div className='label_subtitle'>I will have an opportunity to confirm this value</div>
        </div>

        <input type='submit' value='get quote' className='button button_buy button_buy_quote' />
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  denomination: state.activeBond.symbol, // TODO replace with selector once we have activeBondSelectors
  balances: state.account.balances,
  quotePending: bondSellSelectors.selectBondSellQuotePending(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetQuote: (receiving: Currency, minPrice: Currency): void => dispatch(getQuote(receiving, minPrice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnterSellOrder))
