import { Spinner } from 'components/Spinner/Spinner'
import useCurrentEntity from 'hooks/currentEntity'
import NotFound from 'pages/Error/NotFound'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType, getEntityByDid } = useCurrentEntity()
  const [errFetchingEntity, setErrFetchingEntity] = useState(false)

  useEffect(() => {
    if (entityId) {
      getEntityByDid(entityId).then((result) => {
        setErrFetchingEntity(!result)
      })
    }
    return () => {
      setErrFetchingEntity(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  if (errFetchingEntity) {
    return <NotFound />
  }

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
