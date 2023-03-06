import useCurrentEntity from 'hooks/useCurrentEntity'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import { validateEntityDid } from 'utils/validation'
import DashboardPage from './Dashboard/Dashboard'
import { Overview } from './Overview'

const CurrentEntityPage: React.FC = (): JSX.Element | null => {
  const { entityId } = useParams<{ entityId: string; groupId: string }>()
  const { entityType, getEntityByDid } = useCurrentEntity()

  console.log('entityType', entityType)

  useEffect(() => {
    if (validateEntityDid(entityId)) {
      getEntityByDid(entityId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

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
