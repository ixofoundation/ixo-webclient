import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import { Accounts } from 'pages/investment/accounts'

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/funds/accounts`} component={Accounts} />
    </Switch>
  )
}

export default BondRoutes
