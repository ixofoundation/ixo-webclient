import React from 'react'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import EnterSellOrder from './components/EnterSellOrder/EnterSellOrder'
import ConfirmSellOrder from './components/ConfirmSellOrder/ConfirmSellOrder'
import * as bondSellSelectors from './BondSell.selectors'

interface Props {
  projectDID: string
  bondDID: string
  isSending: boolean
}

const BondSell: React.FunctionComponent<Props> = ({ projectDID, bondDID, isSending }) => {
  return (
    <div className='BondsWrapper_panel__chrome'>
      <div className='BondsWrapper_panel__content'>
        <div className='centerAll'>
          <BrowserRouter>
            <div className='BuySellForm_wrapper'>
              <Route
                exact
                path={`/projects/${projectDID}/bonds/${bondDID}/exchange/sell`}
                render={(props: any): JSX.Element => {
                  if (isSending) {
                    return (
                      <Redirect
                        from={`/projects/${projectDID}/bonds/${bondDID}/exchange/sell`}
                        exact
                        to={`/projects/${projectDID}/bonds/${bondDID}/exchange/sell/confirm`}
                      />
                    )
                  } else {
                    return <EnterSellOrder {...props} />
                  }
                }}
              />
              <Route
                exact
                path={`/projects/${projectDID}/bonds/${bondDID}/exchange/sell/confirm`}
                render={(props: any): JSX.Element => <ConfirmSellOrder {...props} />}
              />
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState): any => ({
  isSending: bondSellSelectors.selectBondSellIsSending(state),
})
export default connect(mapStateToProps)(BondSell)
