import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Buy from './buy/Buy'
import Sell from './sell/Sell'
import Swap from './swap/Swap'
import './Exchange.scss'
import { QuoteActions } from '../../model/quote'
import { connect } from 'react-redux'
import { Store } from '../../model/store'

class Exchange extends Component<any> {
  // console.log(this.props)
  componentDidMount() {
    this.props.dispatch({
      type: QuoteActions.QUOTE_BUY + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.QUOTE_SELL + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.QUOTE_SWAP + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.CONFIRM_QUOTE + '_FAILED',
    })
  }

  isActive = (m: any, l: any, paths: [string]) => {
    let active = m != undefined
    paths.forEach((path: string) => {
      active = active || l.pathname.indexOf(path) != -1
    })
    return active
  }

  render() {
    return (
      <div className="AppBody_panel exchange_panel">
        {/*<b style={{fontSize: 'calc(10px + 2vmin)'}}>Balances</b>
            <div className="AppBody_panel__content"></div>*/}
        <div className="tablinks">
          <NavLink
            to={!this.props.transacting ? `/exchange/` : '#'}
            isActive={(m, l) => this.isActive(m, l, ['/buy'])}
            exact
            className="tablinks_tablink"
          >
            Buy
          </NavLink>
          <NavLink
            to={!this.props.transacting ? `/exchange/sell` : '#'}
            isActive={(m, l) => this.isActive(m, l, ['/sell'])}
            className="tablinks_tablink"
          >
            Sell
          </NavLink>
          {this.props.activeBond.type == 'swapper_function' ? (
            <NavLink
              to={!this.props.transacting ? `/exchange/swap` : '#'}
              isActive={(m, l) => this.isActive(m, l, ['/swap'])}
              className="tablinks_tablink"
            >
              Swap
            </NavLink>
          ) : (
            undefined
          )}
        </div>

        <Route
          exact
          path={[`/exchange/buy`, `/exchange/buy/confirm`, '/exchange/']}
          component={Buy}
        />
        <Route
          exact
          path={[`/exchange/sell`, '/exchange/sell/confirm']}
          component={Sell}
        />
        <Route
          exact
          path={[`/exchange/swap`, '/exchange/swap/confirm']}
          component={Swap}
        />
      </div>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(Exchange)
