import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import useCurrentEntity from 'hooks/currentEntity'
import { Spinner } from 'components/Spinner/Spinner'
import { TEntityModel } from 'types/entities'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const location = useLocation()
  const { entityId = "" } = useParams<{ entityId: string }>()
  const entity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))
  const { entityType, updateEntity, clearEntity } = useCurrentEntity()

  useEffect(() => {
    if (entity) {
      updateEntity(entity)
    }

    return () => {
      clearEntity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity])

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
  }

  return (
    <Routes>
      <Route  path='/entity/:entityId/overview' element={<OverviewPage/>} />
      <Route path='/entity/:entityId/dashboard' element={<DashboardPage/>} />
      <Route path='/entity/:entityId/treasury' element={<TreasuryPage/>} />
      <Route path='/entity/:entityId/overview/proposal/:deedId' element={<ProposalOverviewPage/>} />
      <Route  path='/entity/:entityId'>
        <Navigate to={`/entity/${entityId}/overview?collection=${location.state?.collectionName}`} />
      </Route>
    </Routes>
  )
}

export default CurrentEntityPage
