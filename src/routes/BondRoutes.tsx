import React, { useEffect, Dispatch } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { Overview } from 'pages/bond/overview'
import { Accounts } from 'pages/bond/accounts'
import { Payments } from 'pages/bond/payments'
import Exchange from 'pages/bond/exchange'
import Orders from 'pages/bond/orders'
import { withRouter } from 'react-router-dom'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { getBalances as getBondBalances } from 'modules/BondModules/bond/bond.actions'
import * as bondSelectors from 'modules/BondModules/bond/bond.selectors'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Spinner } from 'common/components/Spinner'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { EntityType } from 'modules/Entities/types'

interface Props extends RouteComponentProps {
  match: any
  bondName: string
  entityName: string
  entityDid: string
  entityType: string
  bondDid: string
  investmentDid: string
  handleGetBond: (bondDid: string) => void
}

export const BondRoutes: React.FunctionComponent<Props> = ({
  match,
  bondName,
  bondDid,
  entityName,
  entityDid,
  entityType,
  investmentDid,
  handleGetBond,
}) => {
  useEffect(() => {
    handleGetBond(bondDid)
  }, [bondDid])

  if (bondName) {
    let routes = [
      {
        url: `${match.url}/accounts`,
        icon: require('assets/img/sidebar/account.svg'),
        sdg: 'accounts',
        tooltip: 'ACCOUNTS',
      },
      {
        url: `${match.url}/payments`,
        icon: require('assets/img/sidebar/refresh.svg'),
        sdg: 'payments',
        tooltip: 'PAYMENTS',
      },
      {
        url: `${match.url}/events`,
        icon: require('assets/img/sidebar/history.svg'),
        sdg: 'events',
        tooltip: 'Events',
      },
      {
        url: `/projects/${investmentDid}/overview`,
        icon: require('assets/img/sidebar/investment.svg'),
        sdg: 'investment',
        tooltip: 'Investment',
      },
    ]

    const baseRoutes = [
      {
        url: `/`,
        icon: '',
        sdg: 'Explore Projects',
        tooltip: '',
      },
      {
        url: `/projects/${entityDid}/overview`,
        icon: '',
        sdg: entityName,
        tooltip: '',
      },
      {
        url: `/projects/${entityDid}/bonds/${bondDid}`,
        icon: '',
        sdg: 'Funding',
        tooltip: '',
      },
      {
        url: `/projects/${entityDid}/bonds/${bondDid}`,
        icon: '',
        sdg: 'Bond',
        tooltip: '',
      },
      {
        url: `/projects/${entityDid}/bonds/${bondDid}`,
        icon: '',
        sdg: bondName,
        tooltip: '',
      },
    ]

    if (entityType === EntityType.Investment) {
      routes = [
        {
          url: `${match.url}`,
          icon: require('assets/img/sidebar/global.svg'),
          sdg: 'overview',
          tooltip: 'Overview',
        },
        {
          url: `${match.url}/accounts`,
          icon: require('assets/img/sidebar/account.svg'),
          sdg: 'accounts',
          tooltip: 'ACCOUNTS',
        },
        {
          url: `${match.url}/payments`,
          icon: require('assets/img/sidebar/refresh.svg'),
          sdg: 'payments',
          tooltip: 'PAYMENTS',
        },
        {
          url: `${match.url}/events`,
          icon: require('assets/img/sidebar/history.svg'),
          sdg: 'events',
          tooltip: 'Events',
        },
      ]
    }

    const tabs = [
      {
        iconClass: `icon-${entityType.toLowerCase()}`,
        linkClass: null,
        path: `/projects/${entityDid}/overview`,
        title: entityTypeMap[entityType].title,
        tooltip: `View ${entityType} Page`,
      },
    ]

    if (entityType === EntityType.Project) {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: null,
        path: `/projects/${entityDid}/detail`,
        title: 'DASHBOARD',
        tooltip: `${entityType} Management`,
      })
    } else {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: 'in-active',
        path: '/performace',
        title: 'DASHBOARD',
        tooltip: `${entityType} Management`,
      })
    }

    const fundingTabUrl =
      entityType === EntityType.Investment
        ? `/projects/${entityDid}/bonds/${bondDid}`
        : `/projects/${entityDid}/bonds/${bondDid}/accounts`

    if (bondDid) {
      tabs.push({
        iconClass: 'icon-funding',
        linkClass: '',
        path: fundingTabUrl,
        title: 'FUNDING',
        tooltip: `${entityType} Funding`,
      })
    } else {
      tabs.push({
        iconClass: 'icon-funding',
        linkClass: 'restricted',
        path: fundingTabUrl,
        title: 'FUNDING',
        tooltip: `${entityType} Funding`,
      })
    }

    return (
      <Dashboard
        theme="dark"
        title={bondName}
        subRoutes={routes}
        baseRoutes={baseRoutes}
        tabs={tabs}
        entityType={entityType}
      >
        <Route exact path={`${match.url}`} component={Overview} />
        <Route exact path={`${match.url}/accounts`} component={Accounts} />
        <Route exact path={`${match.url}/payments`} component={Payments} />
        <Route exact path={`${match.url}/exchange`} component={Exchange} />
        <Route exact path={`${match.url}/orders`} component={Orders} />
      </Dashboard>
    )
  }

  return <Spinner info="Loading Bond..." />
}

const mapStateToProps = (state: RootState): any => ({
  bondName: bondSelectors.selectBondName(state),
  entityName: entitySelectors.selectEntityName(state),
  entityDid: entitySelectors.selectEntityDid(state),
  entityType: entitySelectors.selectEntityType(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  entityCreatorDid: entitySelectors.selectEntityCreator(state),
  investmentDid: entitySelectors.selectEntityInvestmentDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetBond: (bondDid: string): void => dispatch(getBondBalances(bondDid)),
})

const BondsWrapperConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BondRoutes as any),
) as any

export default BondsWrapperConnected
