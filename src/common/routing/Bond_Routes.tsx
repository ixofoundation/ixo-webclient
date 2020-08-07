import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import { Overview } from '../components/Bonds/OverviewWrapper/Overview'
import Exchange from '../components/Bonds/ExchangeWrapper/Exchange'
import Orders from '../../modules/BondAccountOrders/BondAccountOrders.container'

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/overview`} component={Overview} />
      <Route exact path={`${match.path}/exchange`} component={Exchange} />
      <Route exact path={`${match.path}/orders`} component={Orders} />
      <Route path={`${match.path}`} component={Overview} />
    </Switch>
  )
}

export default BondRoutes
