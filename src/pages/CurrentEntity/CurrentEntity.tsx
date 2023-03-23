import { Spinner } from 'components/Spinner/Spinner'
import useCurrentEntity from 'hooks/currentEntity'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType, getEntityByDid } = useCurrentEntity()

  useEffect(() => {
    if (entityId) {
      getEntityByDid(entityId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
  }
  return (
    <Switch>
      <Route path='/entity/:entityId/overview' component={OverviewPage} />
      <Route path='/entity/:entityId/dashboard' component={DashboardPage} />

      <Route exact path='/entity/:entityId'>
        <Redirect to={`/entity/${entityId}/overview`} />
      </Route>
    </Switch>
  )
}

export default CurrentEntityPage
