import React, { Component } from 'react'
import { RootState } from '../../../../common/redux/types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteSell from './QuoteSell'
import ConfirmSell from './ConfirmSell'

class Sell extends Component<any> {
  render(): JSX.Element {
    return (
      <div className="BondsWrapper_panel__chrome">
        <div className="BondsWrapper_panel__content">
          <div className="centerAll">
            <BrowserRouter>
              <div className="BuySellForm_wrapper">
                <Route
                  exact
                  path="/bonds/exchange/sell"
                  render={(props): JSX.Element => {
                    if (
                      this.props.activeQuote &&
                      Object.prototype.hasOwnProperty.call(
                        this.props.activeQuote,
                        'receiving',
                      ) &&
                      Object.prototype.hasOwnProperty.call(
                        this.props.activeQuote.receiving,
                        'amount',
                      )
                    ) {
                      return (
                        <Redirect
                          from="/bonds/exchange/sell"
                          exact
                          to="/bonds/exchange/sell/confirm"
                        />
                      )
                    } else {
                      return <QuoteSell {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path="/bonds/exchange/sell/confirm"
                  render={(props): JSX.Element => <ConfirmSell {...props} />}
                />
              </div>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Sell)
