import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import useCurrentEntity from 'hooks/currentEntity'
import { Spinner } from 'components/Spinner/Spinner'
import { useGetEntityById } from 'graphql/entities'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType, updateEntity, clearEntity } = useCurrentEntity()

  const { data } = useGetEntityById(entityId)
  useEffect(() => {
    if (data) {
      updateEntity(data)
    }

    return () => {
      clearEntity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
