import React, { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TransferEntityLayout from './Components/TransferEntityLayout'
import { useTransferEntityState } from 'hooks/transferEntity'
import { useSigner } from 'hooks/account'
import { FlexBox } from 'components/App/App.styles'
import TransferEntityToDAOGroup from './TransferEntityToDAOGroup'
import TransferEntityTo from './TransferEntityTo'
import TransferEntityReview from './TransferEntityReview'
import useCurrentEntity from 'hooks/currentEntity'

const TransferEntity: React.FC = (): JSX.Element => {
  const { did } = useSigner()

  const { currentEntity } = useCurrentEntity()
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
