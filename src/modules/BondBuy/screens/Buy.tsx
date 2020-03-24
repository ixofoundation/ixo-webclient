import React, { Component } from 'react'
import { RootState } from '../../../common/redux/types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteBuy from './QuoteBuy'
import ConfirmBuy from './ConfirmBuy'

class Buy extends Component<any> {
  render(): JSX.Element {
    const { projectDID, bondDID } = this.props

    return (
      <div className="BondsWrapper_panel__chrome">
        <div className="BondsWrapper_panel__content">
          <div className="centerAll">
            <BrowserRouter>
              <div className="BuySellForm_wrapper">
                <Route
                  exact
                  path={[
                    `/projects/${projectDID}/bonds/${bondDID}/exchange/buy`,
                    `/projects/${projectDID}/bonds/${bondDID}/exchange/`,
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
                          from="/bonds/${bondDID}"
                          to={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`}
                        />
                      )
                    } else {
                      return <QuoteBuy {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`}
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
