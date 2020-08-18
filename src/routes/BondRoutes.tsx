import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import { Overview } from 'pages/bond/overview'
import { Accounts } from 'pages/bond/accounts'
import Exchange from 'pages/bond/exchange'
import Orders from 'pages/bond/orders'

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/overview`} component={Overview} />
      <Route exact path={`${match.path}/accounts`} component={Accounts} />
      <Route exact path={`${match.path}/exchange`} component={Exchange} />
      <Route exact path={`${match.path}/orders`} component={Orders} />
      <Route path={`${match.path}/assistant`} component={Overview} />
      <Route path={`${match.path}`} component={Overview} />
    </Switch>
  )
}

export default BondRoutes
