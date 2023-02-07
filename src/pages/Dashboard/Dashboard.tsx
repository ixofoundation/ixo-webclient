import { useSelectedEntity } from 'hooks/entity'
import React, { useEffect } from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import { DAODashboard } from './DAODashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const { entityId } = useParams<{ entityId: string; groupId: string }>()
  const { type, updateEntityType } = useSelectedEntity()

  useEffect(() => {
    updateEntityType('Dao')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  if (!type) {
    return null
  }
  return (
    <Switch>
      <Route path='/entity/:entityId/dashboard' component={DAODashboard} />
    </Switch>
  )
}

export default DashboardPage
