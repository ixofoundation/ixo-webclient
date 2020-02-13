import React, { Component } from 'react'
import { Store } from '../../../../model/store'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteSwap from './QuoteSwap'
import ConfirmSwap from './ConfirmSwap'
import BondsWrapper from '../../BondsWrapper'

class Swap extends Component<any> {
  componentDidMount() {
    console.log(this.props)
  }

  // componentWillReceiveProps(nextProps : any) {
  //    if (nextProps.activeQuote.hasOwnProperty('actualPrices')) {
  //       this.props.history.push('/exchange/swap');
  //    } else {
  //       this.props.history.push('/exchange/swap.');
  //    }
  // }

  render() {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel__chrome">
          <div className="BondsWrapper_panel__content">
            <div className="centerAll">
              <BrowserRouter>
                <Route
                  exact
                  path="/exchange/swap"
                  render={props => {
                    if (this.props.activeQuote.hasOwnProperty('isSwapping')) {
                      return (
                        <Redirect
                          from="/exchange/swap"
                          exact
                          to="/exchange/swap/confirm"
                        />
                      )
                    } else if (
                      this.props.activeBond.type != 'swapper_function'
                    ) {
                      return (
                        <Redirect from="/exchange/swap" exact to="/exchange/" />
                      )
                    } else {
                      return <QuoteSwap {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path="/exchange/swap/confirm"
                  render={props => <ConfirmSwap {...props} />}
                />
              </BrowserRouter>
            </div>
          </div>
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(Swap)
