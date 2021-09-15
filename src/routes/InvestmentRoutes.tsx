import React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { Accounts } from 'pages/investment/accounts'
import Payments from 'pages/investment/payments'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { useParams } from "react-router-dom";

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  const theme = 'dark'
  const type = 'Investment'
  const name = 'Investment'
  const { projectDID } = useParams();
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
      path: `/investment/${projectDID}`,
      title: 'DASHBOARD',
      tooltip: `${type} Management`,
    }
  ]

  const baseRoutes = [
    {
      url: `/`,
      icon: '',
      sdg: 'Explore Projects',
      tooltip: '',
    },
    {
      url: `/investment/${projectDID}`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]

  const routes = [
    {
      url: `/investment/${projectDID}/funds/accounts`,
      icon: require('assets/img/sidebar/global.svg'),
      sdg: 'Account',
      tooltip: 'Account',
    },
    {
      url: `/investment/${projectDID}/funds/payments`,
      icon: require('assets/img/sidebar/global.svg'),
      sdg: 'Payments',
      tooltip: 'Payments',
    },
  ]

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
        path={`${match.path}/funds/accounts`}
        component={Accounts}
      />
      <Route
        exact
        path={`${match.path}/funds/payments`}
        component={Payments}
      />
    </Dashboard>
  )
}

export default BondRoutes
