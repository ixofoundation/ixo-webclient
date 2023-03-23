import React from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import { Overview } from './Overview'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()

  return (
    <Switch>
      <Route path='/entity/:entityId/overview' component={Overview} />
      <Route path='/entity/:entityId/dashboard' component={DashboardPage} />

      <Route exact path='/entity/:entityId'>
        <Redirect to={`/entity/${entityId}/overview`} />
      </Route>
    </Switch>
  )
}

export default CurrentEntityPage
