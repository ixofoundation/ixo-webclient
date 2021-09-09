import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType } from '../../types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import { Route } from 'react-router-dom'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { changeEntitiesType } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { selectTradeMethod } from './EntityExchange.selectors'

import EntityExchangeTrade from './Trade'
import EntityExchangePortfolio from './Portfolio'
import EntityExchangeStake from './Stake'
import EntityExchangePools from './Pools'
import EntityExchangeAirdrop from './Airdrop'
import EntityExchangeVote from './Vote'

interface Props {
  match: any
  location: any
  type: EntityType
  did: string
  name: string
  userDid: string
  agents: Agent[]
  creatorDid: string
  tradeMethod: string
  handleGetEntity: (did: string) => void
  handleChangeEntitiesType: (type: EntityType) => void
}

class EntityExchange extends React.Component<Props> {
  async componentDidMount(): Promise<any> {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    await handleGetEntity(did)
  }

  getTabButtons(): any[] {
    const {
      did,
      type,
      handleChangeEntitiesType,
      location: { pathname },
    } = this.props

    handleChangeEntitiesType(type)

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

  render(): JSX.Element {
    const {
      did,
      type,
      name,
      tradeMethod,
      location,
    } = this.props

    let title = name

    const routes = [
      {
        url: `/projects/${did}/exchange/portfolio`,
        icon: require('assets/img/sidebar/portfolio.svg'),
        sdg: 'Portfolio',
        tooltip: 'My Portfolio',
      },
      {
        url: `/projects/${did}/exchange`,
        icon: require('assets/img/sidebar/trade.svg'),
        sdg: tradeMethod ?? 'Trade',
        tooltip: 'Trade',
      },
      {
        url: `/projects/${did}/exchange/stake`,
        icon: require('assets/img/sidebar/stake.svg'),
        sdg: 'Stake',
        tooltip: 'Stake',
      },
      {
        url: `/projects/${did}/exchange/pools`,
        icon: require('assets/img/sidebar/pools.svg'),
        sdg: 'Pools',
        tooltip: 'Pools',
      },
      {
        url: `/projects/${did}/exchange/airdrop`,
        icon: require('assets/img/sidebar/airdrop.svg'),
        sdg: 'Airdrop',
        tooltip: 'Airdrop',
      },
      {
        url: `/projects/${did}/exchange/vote`,
        icon: require('assets/img/sidebar/vote.svg'),
        sdg: 'Vote',
        tooltip: 'Vote',
      },
    ]

    const baseRoutes = [
      {
        url: `/`,
        icon: '',
        sdg: 'Exchange',
        tooltip: '',
      },
    ]

    if (location.pathname.endsWith('/exchange/airdrop')) {
      title = 'Airdrop Missions'
    } else if(location.pathname.endsWith('/exchange/stake')) {
      title = 'Impact Hub Validators'
    } else if (location.pathname.endsWith('/exchange/portfolio')) {
      title = 'My Portfolio'
    } else if(location.pathname.endsWith('/exchange')) {
      title = 'IXO Token'
      baseRoutes.push({
        url: ``,
        icon: '',
        sdg: 'IXO Token',
        tooltip: '',
      })
    } else {
      baseRoutes.push({
        url: `/projects/${did}/overview`,
        icon: '',
        sdg: name,
        tooltip: '',
      })
    }

    const theme = 'dark'

    const tabs = this.getTabButtons()

    return (
      <Dashboard
        theme={theme}
        title={title}
        subRoutes={routes}
        baseRoutes={baseRoutes}
        tabs={tabs}
        entityType={type}
        // matchType={MatchType.exact}
      >
        <Route
          exact
          path={`/projects/:projectDID/exchange`}
          component={EntityExchangeTrade}
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
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  userDid: accountSelectors.selectUserDid(state),
  agents: entitySelectors.selectEntityAgents(state),
  type: entitySelectors.selectEntityType(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  tradeMethod: selectTradeMethod(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleChangeEntitiesType: (type: EntityType): void =>
    dispatch(changeEntitiesType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityExchange)
