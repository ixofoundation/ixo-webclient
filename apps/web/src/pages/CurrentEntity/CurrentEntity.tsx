import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
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
  const { entityId = '' } = useParams<{ entityId: string }>()
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
      <Route index element={<Navigate to='overview' />} />
      <Route path='overview' element={<OverviewPage />} />
      <Route path='dashboard/*' element={<DashboardPage />} />
      <Route path='treasury/*' element={<TreasuryPage />} />
      <Route path='overview/proposal/:deedId' element={<ProposalOverviewPage />} />
      {/* Add other nested routes as needed */}
    </Routes>
    // <Routes>
    //   <Route path="/" element={<Outlet/>}>
    //     <Route path='overview' element={<OverviewPage />} />
    //     <Route path='dashboard' element={<DashboardPage />} />
    //     <Route path='treasury' element={<TreasuryPage />} />
    //     <Route path='/entity/:entityId/overview/proposal/:deedId' element={<ProposalOverviewPage />} />
    //     <Route path='/entity/:entityId'>
    //       <Navigate to={`/entity/${entityId}/overview?collection=${location.state?.collectionName}`} />
    //     </Route>
    //   </Route>
    // </Routes>
  )
}

export default CurrentEntityPage
