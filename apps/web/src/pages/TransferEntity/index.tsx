import React, { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import TransferEntityLayout from './Components/TransferEntityLayout'
import { useTransferEntityState } from 'hooks/transferEntity'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useSigner } from 'hooks/account'
import { TEntityModel } from 'types/entities'
import { FlexBox } from 'components/App/App.styles'
import TransferEntityToDAOGroup from './TransferEntityToDAOGroup'
import TransferEntityTo from './TransferEntityTo'
import TransferEntityReview from './TransferEntityReview'

const TransferEntity: React.FC = (): JSX.Element => {
  const { did } = useSigner()
  const { entityId } = useParams<{ entityId: string }>()

  const selectedEntity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId ?? ""))
  const { breadCrumbs, title, subtitle, updateSelectedEntity } = useTransferEntityState()

  const isEligible = useMemo(() => did && selectedEntity, [selectedEntity, did])

  useEffect(() => {
    if (selectedEntity) {
      updateSelectedEntity(selectedEntity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity])

  return (
    <TransferEntityLayout title={title} subtitle={subtitle} breadCrumbs={breadCrumbs}>
      {isEligible ? (
        <Routes>
          <Route path={`/transfer/entity/:entityId/group`} element={<TransferEntityToDAOGroup/>} />
          <Route path={`/transfer/entity/:entityId/to`} element={<TransferEntityTo/>} />
          <Route path={`/transfer/entity/:entityId/review`} element={<TransferEntityReview/>} />

          <Route path='/transfer/entity/:entityId'>
            {selectedEntity?.type === 'dao' ? (
              <Navigate to={`/transfer/entity/${entityId}/group`} />
            ) : (
              <Navigate to={`/transfer/entity/${entityId}/to`} />
            )}
          </Route>
        </Routes>
      ) : (
        <FlexBox>Loading...</FlexBox>
      )}
    </TransferEntityLayout>
  )
}

export default TransferEntity
