import React from 'react'
import { Redirect, Route, RouteComponentProps, useParams } from 'react-router-dom'
import Accounts from 'pages/Bond/Accounts/Account'
import Payments from 'pages/Bond/Payments/Payments'
import Claims from 'pages/Bond/Claims/Claims'
import Dashboard from 'components/Dashboard/Dashboard'
import { useAppSelector } from 'redux/hooks'
import { requireCheckDefault } from 'utils/images'

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({ match }) => {
  const pathName = window.location.pathname
  const theme = pathName.includes(`${match.url}/claims`) ? 'light' : 'dark'
  const { type, name } = useAppSelector((state) => state.selectedEntity)

  const { projectDID } = useParams<{ projectDID: string; bondDID: string }>()
  const breadcrumbs = [
    {
      url: `/entities/select?type=${type}&sector=all`,
      icon: '',
      sdg: `Explore ${type}s`,
      tooltip: '',
    },
    {
      url: `/projects/${projectDID}/overview`,
      icon: '',
      sdg: `${name}`,
      tooltip: '',
    },
    {
      url: window.location.pathname,
      icon: '',
      sdg: `FUNDING`,
      tooltip: '',
    },
  ]

  const routes = [
    {
      url: `${match.url}/accounts`,
      icon: requireCheckDefault(require('assets/img/sidebar/account.svg')),
      sdg: 'Account',
      tooltip: 'ACCOUNTS',
    },
    {
      url: `${match.url}/payments`,
      icon: requireCheckDefault(require('assets/img/sidebar/refresh.svg')),
      sdg: 'Payments',
      tooltip: 'PAYMENTS',
    },
    {
      url: `${match.url}/events`,
      icon: requireCheckDefault(require('assets/img/sidebar/history.svg')),
      sdg: 'Events',
      tooltip: 'EVENTS',
    },
    {
      url: `${match.url}/claims`,
      icon: requireCheckDefault(require('assets/img/sidebar/claim.svg')),
      sdg: 'Claims',
      tooltip: 'CLAIMS',
    },
  ]

  return (
    <Dashboard theme={theme} title={name} subRoutes={routes} baseRoutes={breadcrumbs} entityType={type}>
      <Route exact path={`${match.url}`}>
        <Redirect to={`${match.url}/accounts`} />
      </Route>
      <Route exact path={`${match.path}/accounts`} component={Accounts} />
      <Route exact path={`${match.path}/payments`} component={Payments} />
      <Route exact path={`${match.path}/claims`} component={Claims} />
      {/* <Route
        exact
        path={`${match.path}/events`}
        component={Payments}
      /> */}
    </Dashboard>
  )
}

export default BondRoutes
