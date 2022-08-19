import React, { FunctionComponent, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { EntityType } from '../../types'
import * as entitySelectors from '../SelectedEntity.selectors'
import { Redirect, Route } from 'react-router-dom'
import Dashboard from 'common/components/Dashboard/Dashboard'

import EntityExchangeTrade from './Trade'
import EntityExchangeTradeSwap from './Trade/Swap'
import EntityExchangePortfolio from './Portfolio'
import EntityExchangeStake from './Stake'
import EntityExchangePools from './Pools'
import EntityExchangeAirdrop from './Airdrop'
import EntityExchangeVote from './Vote'
import {
  selectPortfolioAsset,
  selectSelectedAccountAddress,
  selectStakeCellEntity,
} from './EntityExchange.selectors'
import { HeaderTab, Path } from 'common/components/Dashboard/types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { MatchType } from 'types/models'
import { getLiquidityPools } from './EntityExchange.actions'

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
  type,
  name,
  portfolioAsset,
  stakeCellEntity,
  selectedAccountAddress,
  location,
}) => {
  const dispatch = useDispatch()
  const entityTypeMap = useSelector(selectEntityConfig)

  const getTabButtons = (): HeaderTab[] => {
    const { pathname } = location

    const tabs = []

    if (pathname.includes('/airdrop')) {
      tabs.push({
        iconClass: `icon-project`,
        linkClass: null,
        path: `/`,
        title: entityTypeMap[EntityType.Project].plural,
        tooltip: `Explore all ${EntityType.Project}`,
      })
    } else {
      tabs.push({
        iconClass: `icon-${type.toLowerCase()}`,
        linkClass: null,
        path: `/`,
        title: entityTypeMap[type].plural,
        tooltip: `Explorer all ${type}`,
      })
    }

    if (type === EntityType.Project) {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: null,
        path: `/projects/${did}/detail`,
        title: 'DASHBOARD',
        tooltip: `${type} Management`,
      })
    } else {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: 'in-active',
        path: '/performace',
        title: 'DASHBOARD',
        tooltip: `${type} Management`,
      })
    }

    tabs.push({
      iconClass: 'icon-exchange',
      linkClass: 'active',
      path: `/projects/${did}/exchange`,
      title: 'EXCHANGE',
      tooltip: `EXCHANGE`,
    })

    return tabs
  }

  let title = name

  const generateRoutes = (): Path[] => {
    const { pathname } = location
    const routes = []

    routes.push({
      url: `/projects/${did}/exchange/portfolio`,
      icon: require('assets/img/sidebar/portfolio.svg'),
      sdg: portfolioAsset ?? 'No Asset',
      tooltip: 'My Portfolio',
    })
    if (pathname.includes('/exchange/trade/swap')) {
      routes.push({
        url: `/projects/${did}/exchange/trade/swap`,
        icon: require('assets/img/sidebar/trade.svg'),
        sdg: 'Swap',
        tooltip: 'Swap',
      })
    } else {
      routes.push({
        url: `/projects/${did}/exchange/trade`,
        icon: require('assets/img/sidebar/trade.svg'),
        sdg: 'Trade',
        tooltip: 'Trade',
      })
    }
    routes.push({
      url: `/projects/${did}/exchange/stake`,
      icon: require('assets/img/sidebar/stake.svg'),
      sdg:
        stakeCellEntity ??
        (process.env.REACT_APP_CHAIN_ID.indexOf('pandora') > -1
          ? 'pandora'
          : 'impact-hub'),
      tooltip: 'Stake',
    })
    routes.push({
      url: `/projects/${did}/exchange/pools`,
      icon: require('assets/img/sidebar/pools.svg'),
      sdg: 'Explorer',
      tooltip: 'Pools',
    })
    routes.push({
      // url: `/projects/${did}/exchange/airdrop`,
      url: '#',
      icon: require('assets/img/sidebar/airdrop.svg'),
      sdg: 'Missions',
      // tooltip: 'Airdrop',
      tooltip: 'Not Available',
    })
    // routes.push({
    //   url: `/projects/${did}/exchange/vote`,
    //   icon: require('assets/img/sidebar/vote.svg'),
    //   sdg: 'Vote',
    //   tooltip: 'Vote',
    // })

    return routes
  }

  const breadCrumbs = [
    {
      url: `/projects/${did}/exchange/trade`,
      icon: '',
      sdg: 'Exchange',
      tooltip: '',
    },
  ]

  if (location.pathname.indexOf('/exchange/trade') > -1) {
    title = 'Impact Exchange' //  FIXME: hardcoded
    breadCrumbs.unshift({
      url: `/projects/${did}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    })
    if (location.pathname.indexOf(`/exchange/trade/swap`) > -1) {
      breadCrumbs.push({
        url: `/projects/${did}/exchange/trade`,
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
    title =
      (process.env.REACT_APP_CHAIN_ID.indexOf('pandora') > -1
        ? 'Pandora'
        : 'Impact Hub') + ' Validators'
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
        sdg:
          process.env.REACT_APP_CHAIN_ID.indexOf('pandora') > -1
            ? 'pandora'
            : 'impact-hub',
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
      url: `/projects/${did}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    })
  }

  const theme = 'dark'

  const tabs = getTabButtons()
  const routes = generateRoutes()

  useEffect(() => {
    dispatch(getLiquidityPools())
  }, [dispatch])

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
      <Route exact path="/projects/:projectDID/exchange">
        <Redirect to={`/projects/${did}/exchange/portfolio`} />
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/exchange/trade`}
        component={EntityExchangeTrade}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/trade/swap`}
        component={EntityExchangeTradeSwap}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/portfolio`}
        component={EntityExchangePortfolio}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/stake`}
        component={EntityExchangeStake}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/pools`}
        component={EntityExchangePools}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/airdrop`}
        component={EntityExchangeAirdrop}
      />
      <Route
        exact
        path={`/projects/:projectDID/exchange/vote`}
        component={EntityExchangeVote}
      />
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
