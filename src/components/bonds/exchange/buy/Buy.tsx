import React, { Component } from 'react'
import { RootState } from '../../../../common/redux/types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteBuy from './QuoteBuy'
import ConfirmBuy from './ConfirmBuy'

class Buy extends Component<any> {
  render(): JSX.Element {
    const projectDID = this.props.projectDID

    return (
      <div className="BondsWrapper_panel__chrome">
        <div className="BondsWrapper_panel__content">
          <div className="centerAll">
            <BrowserRouter>
              <div className="BuySellForm_wrapper">
                <Route
                  exact
                  path={[
                    `/projects/${projectDID}/bonds/exchange/buy`,
                    `/projects/${projectDID}/bonds/exchange/`,
                  ]}
                  render={(props): JSX.Element => {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        this.props.activeQuote,
                        'totalPrices',
                      )
                    ) {
                      return (
                        <Redirect
                          from="/bonds"
                          to={`/projects/${projectDID}/bonds/exchange/buy/confirm`}
                        />
                      )
                    } else {
                      return <QuoteBuy {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path={`/projects/${projectDID}/bonds/exchange/buy/confirm`}
                  render={(props): JSX.Element => <ConfirmBuy {...props} />}
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

export default connect(mapStateToProps)(Buy)
