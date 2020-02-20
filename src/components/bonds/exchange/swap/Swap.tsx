import React, { Component } from 'react'
import { Store } from '../../../../model/store'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteSwap from './QuoteSwap'
import ConfirmSwap from './ConfirmSwap'
import BondsWrapper from '../../BondsWrapper'

class Swap extends Component<any> {
  render(): JSX.Element {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel__chrome">
          <div className="BondsWrapper_panel__content">
            <div className="centerAll">
              <BrowserRouter>
                <Route
                  exact
                  path="/bonds/exchange/swap"
                  render={(props): JSX.Element => {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        this.props.activeQuote,
                        'isSwapping',
                      )
                    ) {
                      return (
                        <Redirect
                          from="/bonds/exchange/swap"
                          exact
                          to="/bonds/exchange/swap/confirm"
                        />
                      )
                    } else if (
                      this.props.activeBond.type != 'swapper_function'
                    ) {
                      return (
                        <Redirect
                          from="/bonds/exchange/swap"
                          exact
                          to="/bonds/exchange/"
                        />
                      )
                    } else {
                      return <QuoteSwap {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path="/bonds/exchange/swap/confirm"
                  render={(props): JSX.Element => <ConfirmSwap {...props} />}
                />
              </BrowserRouter>
            </div>
          </div>
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: Store): Store {
  return state
}

export default connect(mapStateToProps)(Swap)
