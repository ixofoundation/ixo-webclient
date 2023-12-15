import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
import { EntityType } from 'types/entities'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from 'components/Dashboard/Dashboard'

import EntityExchangeTrade from './Trade/Trade'
import EntityExchangeTradeSwap from './Trade/Swap/Swap'
import EntityExchangePortfolio from './Portfolio'
import EntityExchangeStake from './Stake'
import EntityExchangePools from './Pools/Pools'
import {
  selectPortfolioAsset,
  selectSelectedAccountAddress,
  selectStakeCellEntity,
} from 'redux/selectedEntityExchange/entityExchange.selectors'
import { Path } from 'components/Dashboard/types'
import { MatchType } from 'types/models'
import { selectTradingAllowed } from 'redux/configs/configs.selectors'
import { requireCheckDefault } from 'utils/images'

interface Props {
  location: any
  type: EntityType
  did: string
  name: string
  portfolioAsset: string
  stakeCellEntity: string
  selectedAccountAddress: string
}

const EntityExchange: FunctionComponent<Props> = ({
  did,
  type = 'asset',
  name,
  portfolioAsset,
  stakeCellEntity,
  selectedAccountAddress,
  location,
}) => {
  const tradingAllowed = useAppSelector(selectTradingAllowed)

  let title = name

  const generateRoutes = (): Path[] => {
    const { pathname } = location
    const routes = []

    routes.push({
      url: `/exchange/portfolio`,
      icon: requireCheckDefault(require('assets/img/sidebar/portfolio.svg')),
      sdg: portfolioAsset ?? 'No Asset',
      tooltip: 'My Portfolio',
    })
    if (pathname.includes('/trade/swap')) {
      routes.push({
        url: `/exchange/trade/swap`,
        icon: requireCheckDefault(require('assets/img/sidebar/trade.svg')),
        sdg: 'Swap',
        tooltip: 'Swap',
        strict: true,
      })
    } else {
      routes.push({
        url: tradingAllowed ? `/exchange/trade` : '#',
        icon: requireCheckDefault(require('assets/img/sidebar/trade.svg')),
        sdg: 'Trade',
        tooltip: tradingAllowed ? 'Trade' : 'Trading disabled',
      })
    }
    routes.push({
      url: `/exchange/stake`,
      icon: requireCheckDefault(require('assets/img/sidebar/stake.svg')),
      sdg: stakeCellEntity ?? (process.env.REACT_APP_CHAIN_ID!.indexOf('pandora') > -1 ? 'pandora' : 'impact-hub'),
      tooltip: 'Stake',
    })

    return routes
  }

  const breadCrumbs = [
    {
      url: `/exchange/trade`,
      icon: '',
      sdg: 'Exchange',
      tooltip: '',
    },
  ]

  if (location.pathname.indexOf('/exchange/trade') > -1) {
    title = 'Impact Exchange' //  FIXME: hardcoded
    if (location.pathname.indexOf(`/exchange/trade/swap`) > -1) {
      breadCrumbs.push({
        url: `#`,
        icon: '',
        sdg: 'Trade',
        tooltip: '',
      })
    }
  } else if (location.pathname.endsWith('/exchange/airdrop')) {
    title = 'Airdrop Missions'
    breadCrumbs.push({
      url: `#`,
      icon: '',
      sdg: 'airdrops',
      tooltip: '',
    })
  } else if (location.pathname.endsWith('/exchange/stake')) {
    title = (process.env.REACT_APP_CHAIN_ID!.indexOf('pandora') > -1 ? 'Pandora' : 'Impact Hub') + ' Validators'
    breadCrumbs.push({
      url: `#`,
      icon: '',
      sdg: 'Staking',
      tooltip: '',
    })
    if (stakeCellEntity) {
      breadCrumbs.push({
        url: `#`,
        icon: '',
        sdg: process.env.REACT_APP_CHAIN_ID!.indexOf('pandora') > -1 ? 'pandora' : 'impact-hub',
        tooltip: '',
      })
    }
  } else if (location.pathname.endsWith('/exchange/portfolio')) {
    title = 'My Portfolio'

    breadCrumbs.push({
      url: `#`,
      icon: '',
      sdg: selectedAccountAddress ?? 'No Address',
      tooltip: '',
    })
  } else if (location.pathname.endsWith('/exchange/pools')) {
    title = 'Liquidity Pools'

    breadCrumbs.push({
      url: `#`,
      icon: '',
      sdg: 'Pools',
      tooltip: '',
    })
  } else {
    breadCrumbs.push({
      url: `#`,
      icon: '',
      sdg: name,
      tooltip: '',
    })
  }

  const tabs = [
    {
      iconClass: 'icon-exchange',
      path: `/exchange`,
      title: 'EXCHANGE',
      tooltip: `Asset Exchange`,
    },
  ]

  const theme = 'dark'

  const routes = generateRoutes()

  return (
    <Dashboard
      theme={theme}
      title={title}
      subRoutes={routes}
      baseRoutes={breadCrumbs}
      tabs={tabs}
      entityType={type}
      matchType={MatchType.strict}
    >
      {/* These routes are nested under '/exchange' */}
      <Switch>
        <Route exact path='/exchange'>
          <Redirect to={`/exchange/trade`} />
        </Route>
        <Route exact path='/exchange/trade'>
          <Redirect to={`/exchange/trade/swap`} />
        </Route>
        <Route exact path='/exchange/trade/swap' component={EntityExchangeTrade} />
        <Route exact path='/exchange/portfolio' component={EntityExchangePortfolio} />
        <Route exact path='/exchange/stake' component={EntityExchangeStake} />
        <Route exact path='/exchange/pools' component={EntityExchangePools} />
        <Route path='/exchange/trade/swap/wallet/:wallet' component={EntityExchangeTradeSwap} />
        <Route exact path='/exchange/trade/:id' component={EntityExchangeTrade} />
      </Switch>
    </Dashboard>
  )
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  type: entitySelectors.selectEntityType(state),
  portfolioAsset: selectPortfolioAsset(state),
  stakeCellEntity: selectStakeCellEntity(state),
  selectedAccountAddress: selectSelectedAccountAddress(state),
})

const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EntityExchange)
