import { Spinner } from 'components/Spinner/Spinner'
import useCurrentEntity from 'hooks/currentEntity'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import { useAppSelector } from 'redux/hooks'
import { TEntityModel } from 'types/entities'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const entity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))
  const { entityType, updateEntity } = useCurrentEntity()

  useEffect(() => {
    if (entity) {
      updateEntity(entity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity])

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
