import React, { Component } from 'react'
import { Store } from '../../../../model/store'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteSell from './QuoteSell'
import ConfirmSell from './ConfirmSell'

class Sell extends Component<any> {
  componentDidMount() {
    console.log(this.props)
  }

  // componentWillReceiveProps(nextProps : any) {
  //    if (nextProps.activeQuote.hasOwnProperty('actualPrices')) {
  //       this.props.history.push('/exchange/sell');
  //    } else {
  //       this.props.history.push('/exchange/sell.');
  //    }
  // }

  render() {
    return (
      <div className="BondsWrapper_panel__chrome">
        <div className="BondsWrapper_panel__content">
          <div className="centerAll">
            <BrowserRouter>
              <div>
                <Route
                  exact
                  path="/exchange/sell"
                  render={props => {
                    if (
                      this.props.activeQuote &&
                      this.props.activeQuote.hasOwnProperty('recieving') &&
                      this.props.activeQuote.recieving.hasOwnProperty('amount')
                    ) {
                      return (
                        <Redirect
                          from="/exchange/sell"
                          exact
                          to="/exchange/sell/confirm"
                        />
                      )
                    } else {
                      return <QuoteSell {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path="/exchange/sell/confirm"
                  render={props => <ConfirmSell {...props} />}
                />
              </div>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(Sell)
