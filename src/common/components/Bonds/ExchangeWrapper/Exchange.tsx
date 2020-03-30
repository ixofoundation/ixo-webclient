import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import './Exchange.css'
import { QuoteActions } from '../../../../modules/quote/types'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import BondsWrapper from '../BondsWrapper/BondsWrapper'
import Buy from '../../../../modules/BondBuy/screens/Buy'
import Sell from '../../../../modules/BondSell/screens/Sell'
import Swap from '../../../../modules/BondSwap/screens/Swap'
import { BondsSectionNav } from './Exchange.styles'

class Exchange extends Component<any> {
  componentDidMount(): void {
    this.props.dispatch({
      type: QuoteActions.QuoteFailure,
    })
  }

  isActive = (m: any, l: any, paths: [string]): boolean => {
    let active = m != undefined
    paths.forEach((path: string) => {
      active = active || l.pathname.indexOf(path) != -1
    })
    return active
  }

  render(): JSX.Element {
    const { projectDID, bondDID } = this.props.match.params

    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel exchange_panel">
          {/*<b style={{fontSize: 'calc(10px + 2vmin)'}}>Balances</b>
              <div className="BondsWrapper_panel__content"></div>*/}
          <BondsSectionNav>
            <NavLink
              to={
                !this.props.activeQuote.transacting
                  ? `/projects/${projectDID}/bonds/${bondDID}/exchange/`
                  : '#'
              }
              isActive={(m, l): boolean => this.isActive(m, l, ['/buy'])}
              exact
              className="tablinks_tablink"
            >
              Buy
            </NavLink>
            <NavLink
              to={
                !this.props.activeQuote.transacting
                  ? `/projects/${projectDID}/bonds/${bondDID}/exchange/sell`
                  : '#'
              }
              isActive={(m, l): boolean => this.isActive(m, l, ['/sell'])}
              className="tablinks_tablink"
            >
              Sell
            </NavLink>
            {this.props.activeBond.type == 'swapper_function' ? (
              <NavLink
                to={
                  !this.props.activeQuote.transacting
                    ? `/projects/${projectDID}/bonds/${bondDID}/exchange/swap`
                    : '#'
                }
                isActive={(m, l): boolean => this.isActive(m, l, ['/swap'])}
                className="tablinks_tablink"
              >
                Swap
              </NavLink>
            ) : (
              undefined
            )}
          </BondsSectionNav>
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/buy`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/`,
            ]}
            render={(): JSX.Element => <Buy {...this.props.match.params} />}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/sell`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/sell/confirm`,
            ]}
            render={(): JSX.Element => <Sell {...this.props.match.params} />}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/swap`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/swap/confirm`,
            ]}
            render={(): JSX.Element => <Swap {...this.props.match.params} />}
          />
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Exchange)
