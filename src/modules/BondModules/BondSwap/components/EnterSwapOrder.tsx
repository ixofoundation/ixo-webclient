import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getQuote } from '../BondSwap.actions'
import { currencyStr, tokenBalance } from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import * as bondSellSelectors from '../BondSwap.selectors'

interface Props extends RouteComponentProps {
  tokenSupply: Currency[]
  balances: Currency[]
  quotePending: boolean
  handleGetQuote: (sending: Currency, receiving: Currency) => void
}

const EnterSwapOrder: React.FunctionComponent<Props> = ({ tokenSupply, balances, quotePending, handleGetQuote }) => {
  const { register, handleSubmit, watch, errors } = useForm()
  // const { state, action } = useStateMachine(wizardUpdateAction);

  // const subscriptions: Subscription = new Subscription();

  // //initial state - react state
  // const [data, setData] = useState({
  //     eduBalance: 0,
  //     firstStepData: {},
  //     secondStepData: {
  //         balance: 0
  //     }
  // });

  // useEffect(() => {
  //     //mount functional component
  //     subscriptions.add(props.buyData.tokenObservable.subscribe({
  //         next: (result: any) => {
  //             setData({ ...data, eduBalance: result ? parseInt(result) : 0 });
  //             // state.data.eduBalance = result ? parseInt(result) : 0;
  //             // console.log( '##### ' + JSON.stringify( state.data ) );
  //         },
  //         complete: () => console.log('done fetching edu token balance')
  //     }));

  //     return () => {
  //         //unmount functional component
  //         subscriptions.unsubscribe();
  //     }
  // }, []);

  const onSubmit = (formData: any): void => {
    const sending = {
      denom: formData.denom,
      amount: parseInt(formData.amount, 10),
    }
    const receiving = { denom: formData.receivingDenom }

    handleGetQuote(sending, receiving)
  }

  if (quotePending) {
    return <div>Loading quote...</div>
  } else {
    watch()
    const payDenom = watch('denom') || 'res'
    const recDenom = watch('receivingDenom') || 'res'
    const payOptions: string[] = balances.map((balance) => balance.denom!)

    const curBal = currencyStr(tokenBalance(balances, payDenom))
    const recBal = currencyStr(tokenBalance(balances, recDenom))

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='label'>Send</div>
        <div className='currencyInput'>
          <select name='denom' ref={register({ required: true })}>
            {payOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          <input
            name='amount'
            placeholder='Enter the quantity of tokens you are selling.'
            type='number'
            ref={register({ required: true })}
          />
        </div>
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

        <img
          alt=''
          src={require('assets/img/arrows-icon.png')}
          width={25}
          style={{ display: 'block', margin: '0 auto' }}
        />

        {/* displays the balances of the connected Cosmos account addresses */}
        <div className='label'>Receive</div>
        <select name='receivingDenom' ref={register({ required: true })}>
          {tokenSupply.map((supply: Currency) => (
            <option key={supply.denom} value={supply.denom}>
              {supply.denom!.toUpperCase()}
            </option>
          ))}
        </select>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <span className='label_subtitle'>
            My current balance is <span className='label_subtitle__bold'>{recBal}</span>
          </span>
        </div>

        {/* the unit of the price will be the one which is selected in the dropdown - so it will be measured in IXO if IXO is selected
                for example entering number 5 would mean to buy tokenamount of the first input field with 5 IXO per token
                Insufficient balance should show an error - which says balance is to low */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <input type='submit' value='get quote' className='button button_buy button_buy_quote' />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  quotePending: bondSellSelectors.selectBondSwapQuotePending(state),
  tokenSupply: state.tokenSupply,
  balances: state.account.balances,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetQuote: (sending: Currency, receiving: Currency): void => dispatch(getQuote(sending, receiving)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnterSwapOrder))
