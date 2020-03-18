import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import './Exchange.css'
import { QuoteActions } from '../../../modules/quote/types'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import BondsWrapper from '../BondsWrapper'
import Buy from './buy/Buy'
import Sell from './sell/Sell'
import Swap from './swap/Swap'
import styled from 'styled-components'

const BondsSectionNav = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  a {
    font-weight: normal;
    font-size: 1.1875rem;
    text-transform: uppercase;
    text-decoration: none;

    color: #ffffff;
    padding: 0.25rem 1.5rem;
    &.active {
      color: #87def6;
    }
    &:hover {
      text-decoration: none;
      color: #87def6;
    }
  }
`

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
    const projectDID = this.props.match.params.projectDID

    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel exchange_panel">
          {/*<b style={{fontSize: 'calc(10px + 2vmin)'}}>Balances</b>
              <div className="BondsWrapper_panel__content"></div>*/}
          <BondsSectionNav>
            <NavLink
              to={
                !this.props.activeQuote.transacting
                  ? `/projects/${projectDID}/bonds/exchange/`
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
                  ? `/projects/${projectDID}/bonds/exchange/sell`
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
                    ? `/projects/${projectDID}/bonds/exchange/swap`
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
              `/projects/${projectDID}/bonds/exchange/buy`,
              `/projects/${projectDID}/bonds/exchange/buy/confirm`,
              `/projects/${projectDID}/bonds/exchange/`,
            ]}
            render={(): JSX.Element => <Buy {...this.props.match.params} />}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/exchange/sell`,
              `/projects/${projectDID}/bonds/exchange/sell/confirm`,
            ]}
            render={(): JSX.Element => <Sell {...this.props.match.params} />}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/exchange/swap`,
              `/projects/${projectDID}/bonds/exchange/swap/confirm`,
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
