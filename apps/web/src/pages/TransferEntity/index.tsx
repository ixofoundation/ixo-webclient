import React, { useMemo } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import TransferEntityLayout from './Components/TransferEntityLayout'
import { useTransferEntityState } from 'hooks/transferEntity'
import { useSigner } from 'hooks/account'
import { FlexBox } from 'components/App/App.styles'
import TransferEntityToDAOGroup from './TransferEntityToDAOGroup'
import TransferEntityTo from './TransferEntityTo'
import TransferEntityReview from './TransferEntityReview'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'

const TransferEntity: React.FC = (): JSX.Element => {
  const { did } = useSigner()

  const { entityId = "" } = useParams()
  const  currentEntity = useAppSelector(getEntityById(entityId))

  const { breadCrumbs, title, subtitle } = useTransferEntityState()

  const isEligible = useMemo(() => did && currentEntity, [currentEntity, did])

  const pathToNavigateTo = currentEntity?.type === 'dao' ? 'group' : 'to'
  return (
    <TransferEntityLayout title={title} subtitle={subtitle} breadCrumbs={breadCrumbs}>
      {isEligible ? (
        <Routes>
          <Route index element={<Navigate to={pathToNavigateTo} />} />
          <Route path={'group'} element={<TransferEntityToDAOGroup />} />
          <Route path={'to'} element={<TransferEntityTo />} />
          <Route path={'review'} element={<TransferEntityReview />} />
        </Routes>
      ) : (
        <FlexBox>Loading...</FlexBox>
      )}
    </TransferEntityLayout>
  )
}

export default TransferEntity
