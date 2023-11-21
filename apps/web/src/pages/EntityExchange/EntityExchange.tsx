
import { useAppSelector } from 'redux/hooks'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from 'components/Dashboard/Dashboard'

import EntityExchangeTradeSwap from './Trade/Swap/Swap'
import {
  selectPortfolioAsset,
  selectSelectedAccountAddress,
  selectStakeCellEntity,
} from 'redux/selectedEntityExchange/entityExchange.selectors'
import { Path } from 'components/Dashboard/types'
import { MatchType } from 'types/models'
import { selectTradingAllowed } from 'redux/configs/configs.selectors'
import { requireCheckDefault } from 'utils/images'
import useRouteQuery from 'hooks/useRouteQuery'

const EntityExchange = () => {
  const did=  useAppSelector(entitySelectors.selectEntityDid)
  const name= useAppSelector(entitySelectors.selectEntityName)
  const type= useAppSelector(entitySelectors.selectEntityType)
  const portfolioAsset= useAppSelector(selectPortfolioAsset)
  const stakeCellEntity= useAppSelector(selectStakeCellEntity)
  const selectedAccountAddress= useAppSelector(selectSelectedAccountAddress)
  const location = useLocation()


  const tradingAllowed = useAppSelector(selectTradingAllowed)
  const query = useRouteQuery()
  const entityId = query.get('from')

  let title = name ?? ""

  const generateRoutes = (): Path[] => {
    const { pathname } = location
    const routes = []

    routes.push({
      url: `/entity/${entityId}/exchange/portfolio`,
      icon: requireCheckDefault(require('assets/img/sidebar/portfolio.svg')),
      sdg: portfolioAsset ?? 'No Asset',
      tooltip: 'My Portfolio',
    })
    if (pathname.includes('/exchange/trade/swap')) {
      routes.push({
        url: `/entity/${entityId}/exchange/trade/swap`,
        icon: requireCheckDefault(require('assets/img/sidebar/trade.svg')),
        sdg: 'Swap',
        tooltip: 'Swap',
      })
    } else {
      if (tradingAllowed) {
        routes.push({
          url: `/entity/${did}/exchange/trade`,
          icon: requireCheckDefault(require('assets/img/sidebar/trade.svg')),
          sdg: 'Trade',
          tooltip: 'Trade',
        })
      } else {
        routes.push({
          url: `#`,
          icon: requireCheckDefault(require('assets/img/sidebar/trade.svg')),
          sdg: 'Trade',
          tooltip: 'Trading disabled',
        })
      }
    }
    routes.push({
      url: `/entity/${entityId}/exchange/stake`,
      icon: requireCheckDefault(require('assets/img/sidebar/stake.svg')),
      sdg: stakeCellEntity ?? (process.env.REACT_APP_CHAIN_ID!.indexOf('pandora') > -1 ? 'pandora' : 'impact-hub'),
      tooltip: 'Stake',
    })
    routes.push({
      url: `/entity/${entityId}/exchange/pools`,
      icon: requireCheckDefault(require('assets/img/sidebar/pools.svg')),
      sdg: 'Explorer',
      tooltip: 'Pools',
    })
    routes.push({
      // url: `/projects/${did}/exchange/airdrop`,
      url: '#',
      icon: requireCheckDefault(require('assets/img/sidebar/airdrop.svg')),
      sdg: 'Missions',
      // tooltip: 'Airdrop',
      tooltip: 'Not Available',
    })
    // routes.push({
    //   url: `/projects/${did}/exchange/vote`,
    //   icon: requireCheckDefault(require('assets/img/sidebar/vote.svg')),
    //   sdg: 'Vote',
    //   tooltip: 'Vote',
    // })

    return routes
  }

  const breadCrumbs = [
    {
      url: `/entity/${entityId}/exchange/trade`,
      icon: '',
      sdg: 'Exchange',
      tooltip: '',
    },
  ]

  if (location.pathname.indexOf('/exchange/trade') > -1) {
    title = 'Impact Exchange' //  FIXME: hardcoded
    breadCrumbs.unshift({
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: title,
      tooltip: '',
    })
    if (location.pathname.indexOf(`/exchange/trade/swap`) > -1) {
      breadCrumbs.push({
        url: `/entity/${entityId}/exchange/trade`,
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
      url: `/entity/${did}/overview`,
      icon: '',
      sdg: title,
      tooltip: '',
    })
  }

  const theme = 'dark'

  const routes = generateRoutes()

  return (
    <Dashboard
      theme={theme}
      title={title}
      subRoutes={routes}
      baseRoutes={breadCrumbs}
      entityType={type}
      matchType={MatchType.strict}
    >
      {/* These routes are nested under '/exchange' */}
      <Routes>
        <Route path='/exchange'>
          <Navigate to={`/exchange/trade/swap`} />
        </Route>
        {/* <Route exact path='/exchange/trade/swap' component={EntityExchangeTrade} /> */}
        <Route path='/exchange/trade/swap' element={<EntityExchangeTradeSwap/>} />
        {/* <Route exact path='/exchange/trade/:id' component={EntityExchangeTrade} /> */}
      </Routes>
    </Dashboard>
  )
}


export default (EntityExchange)
