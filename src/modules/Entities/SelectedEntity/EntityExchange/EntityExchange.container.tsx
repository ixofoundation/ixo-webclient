import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType } from '../../types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import { Spinner } from 'common/components/Spinner'
import { Route } from 'react-router-dom'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { entityTypeMap } from 'modules/Entities/strategy-map'

import EntityExchangeTrade from './Trade'
import EntityExchangeChart from './Chart'
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
  description: string
  dateCreated: Moment
  creatorName: string
  sdgs: string[]
  userDid: string
  agents: Agent[]
  country: string
  creatorDid: string
  isLoggedIn: boolean
  isLoading: boolean
  claimTemplateId: string
  isClaimTemplateLoading: boolean
  claimTemplateType: string
  bondDid: string
  analytics: any[]
  handleGetEntity: (did: string) => void
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
    const { did, type } = this.props

    const tabs = [
      {
        iconClass: `icon-${type.toLowerCase()}`,
        linkClass: null,
        path: `/projects/${did}/overview`,
        title: entityTypeMap[type].title,
        tooltip: `View ${type} Page`,
      },
    ]

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
      iconClass: 'icon-funding',
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
      isLoading,
      isClaimTemplateLoading,
    } = this.props

    if (isLoading || isClaimTemplateLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    const routes = [
      {
        url: `/projects/${did}/exchange`,
        icon: require('assets/img/sidebar/trade.svg'),
        sdg: 'Trade',
        tooltip: 'Trade',
      },
      {
        url: `/projects/${did}/exchange/chart`,
        icon: require('assets/img/sidebar/chart.svg'),
        sdg: 'Chart',
        tooltip: 'Chart',
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
      {
        url: `/projects/${did}/overview`,
        icon: '',
        sdg: name,
        tooltip: '',
      },
    ]

    const theme = 'dark'

    const tabs = this.getTabButtons()

    return (
      <Dashboard
        theme={theme}
        title={name}
        subRoutes={routes}
        baseRoutes={baseRoutes}
        tabs={tabs}
        entityType={type}
      >
        <Route
          exact
          path={`/projects/:projectDID/exchange`}
          component={EntityExchangeTrade}
        />
        <Route
          exact
          path={`/projects/:projectDID/exchange/chart`}
          component={EntityExchangeChart}
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
  description: entitySelectors.selectEntityDescription(state),
  type: entitySelectors.selectEntityType(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  dateCreated: entitySelectors.selectEntityDateCreated(state),
  creatorName: entitySelectors.selectEntityCreatorName(state),
  country: entitySelectors.selectEntityLocation(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  isLoading: entitySelectors.entityIsLoading(state),
  claimTemplateId: entitySelectors.selectEntityClaimTemplateId(state),
  isClaimTemplateLoading: submitEntityClaimSelectors.selectIsLoading(state),
  claimTemplateType: submitEntityClaimSelectors.selectClaimType(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  analytics: entitySelectors.selectEntityAnalytics(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityExchange)
