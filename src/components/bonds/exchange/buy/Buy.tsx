import React, { Component } from 'react'
import { Store } from '../../../../model/store'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import QuoteBuy from './QuoteBuy'
import ConfirmBuy from './ConfirmBuy'
import BondsWrapper from '../../BondsWrapper'

class Buy extends Component<any> {
  componentDidMount() {
    console.log(this.props)
  }

  // componentWillReceiveProps(nextProps : any) {
  //    if (nextProps.activeQuote.hasOwnProperty('actualPrices')) {
  //       this.props.history.push('/exchange/buy');
  //    } else {
  //       this.props.history.push('/exchange/buy.');
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
                  path={['/exchange/buy', '/exchange/']}
                  render={props => {
                    if (this.props.activeQuote.hasOwnProperty('totalPrices')) {
                      return <Redirect from="/" to="/exchange/buy/confirm" />
                    } else {
                      return <QuoteBuy {...props} />
                    }
                  }}
                />
                <Route
                  exact
                  path="/exchange/buy/confirm"
                  render={props => <ConfirmBuy {...props} />}
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

export default connect(mapStateToProps)(Buy)
