import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Accounts } from 'pages/bond/accounts'
import { Payments } from 'pages/bond/payments'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { useParams } from "react-router-dom";

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  const theme = 'dark'
  const type = 'Investment'
  const name = 'Investment'
  const { projectDID, bondDID } = useParams();
  const tabs = [
    {
      iconClass: `icon-${type.toLowerCase()}`,
      linkClass: null,
      path: `/`,
      title: 'Investments',
      tooltip: `Explorer all ${type}`,
    },
    {
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${projectDID}/bonds/${bondDID}/overview`,
      title: 'DASHBOARD',
      tooltip: `${type} Management`,
    }
  ]

  const breadcrumbs = [
    {
      url: `/`,
      icon: '',
      sdg: 'Explore Projects',
      tooltip: '',
    },
    {
      url: `/projects/${projectDID}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]

  const routes = [
    {
      url: `${match.url}/accounts`,
      icon: require('assets/img/sidebar/account.svg'),
      sdg: 'Account',
      tooltip: 'ACCOUNTS',
    },
    {
      url: `${match.url}/payments`,
      icon: require('assets/img/sidebar/refresh.svg'),
      sdg: 'Payments',
      tooltip: 'PAYMENTS',
    },
    {
      url: `${match.url}/events`,
      icon: require('assets/img/sidebar/history.svg'),
      sdg: 'Events',
      tooltip: 'EVENTS',
    },
    {
      url: `${match.url}/claims`,
      icon: require('assets/img/sidebar/claim.svg'),
      sdg: 'Claims',
      tooltip: 'CLAIMS',
    },
  ]

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={type}
    >
      <Route exact path={`${match.url}`}>
        <Redirect to={`${match.url}/accounts`} />
      </Route>
      <Route
        exact
        path={`${match.path}/accounts`}
        component={Accounts}
      />
      <Route
        exact
        path={`${match.path}/payments`}
        component={Payments}
      />
      {/* <Route
        exact
        path={`${match.path}/events`}
        component={Payments}
      /> */}
    </Dashboard>
  )
}

export default BondRoutes
