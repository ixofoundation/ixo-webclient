import { Spinner } from 'components/Spinner/Spinner'
import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import { Overview } from './Overview'

const CurrentEntityPage: React.FC = (): JSX.Element | null => {
  const { entityId } = useParams<{ entityId: string; groupId: string }>()
  const { entityType } = useCurrentEntity()

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
    // return <NotFound />
  }

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
