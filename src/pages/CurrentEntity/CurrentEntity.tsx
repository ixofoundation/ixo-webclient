import { Spinner } from 'components/Spinner/Spinner'
import useCurrentEntity from 'hooks/currentEntity'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import { useGetEntityById } from 'graphql/entities'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType, updateEntity, clearEntity } = useCurrentEntity()

  const { data: entity } = useGetEntityById(entityId)

  useEffect(() => {
    if (entity) {
      updateEntity(entity)
    }

    return () => {
      clearEntity()
    }
  }, [entity, clearEntity, updateEntity])

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
  }
  return (
    <Switch>
      <Route exact path='/entity/:entityId/overview' component={OverviewPage} />
      <Route path='/entity/:entityId/dashboard' component={DashboardPage} />
      <Route path='/entity/:entityId/treasury' component={TreasuryPage} />
      <Route path='/entity/:entityId/overview/proposal/:deedId' component={ProposalOverviewPage} />
      <Route exact path='/entity/:entityId'>
        <Redirect to={`/entity/${entityId}/overview`} />
      </Route>
    </Switch>
  )
}

export default CurrentEntityPage
