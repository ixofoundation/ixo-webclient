import React, { useEffect, useState } from 'react'
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
import { useEntityQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'
import { useAccount } from 'hooks/account'
import TransferEntity from 'pages/TransferEntity'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { state } = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { cwClient } = useAccount()
  const entity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))
  const { entityType, updateEntity, clearEntity } = useCurrentEntity()
  const [fetchedEntity, setFetchedEntity] = useState<TEntityModel | null>(null)

  useEntityQuery({
    variables: {
      id: entityId,
    },
    skip: Boolean(entity),
    onCompleted: (data) => {
      setFetchedEntity(data?.entity as any)
      apiEntityToEntity({ entity: data?.entity, cwClient }, (key, value) => {
        setFetchedEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    },
  })

  useEffect(() => {
    if (fetchedEntity) {
      updateEntity(fetchedEntity)
    }
    if (entity) {
      updateEntity(entity)
    }

    return () => {
      clearEntity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, fetchedEntity])

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
  }

  return (
    <Routes>
      <Route index element={<Navigate to={`overview?collection=${state?.collectionName}`} />} />
      <Route path='overview' element={<OverviewPage />} />
      <Route path='dashboard/*' element={<DashboardPage />} />
      <Route path='treasury/*' element={<TreasuryPage />} />
      <Route path='overview/proposal/:deedId' element={<ProposalOverviewPage />} />
      <Route path='transfer/*' element={<TransferEntity />} />
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
