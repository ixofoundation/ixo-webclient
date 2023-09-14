import React, { useEffect, useMemo } from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'
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

  const selectedEntity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))
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
        <>
          <Route strict path={`/transfer/entity/:entityId/group`} component={TransferEntityToDAOGroup} />
          <Route strict path={`/transfer/entity/:entityId/to`} component={TransferEntityTo} />
          <Route strict path={`/transfer/entity/:entityId/review`} component={TransferEntityReview} />

          <Route exact path='/transfer/entity/:entityId'>
            {selectedEntity?.type === 'dao' ? (
              <Redirect to={`/transfer/entity/${entityId}/group`} />
            ) : (
              <Redirect to={`/transfer/entity/${entityId}/to`} />
            )}
          </Route>
        </>
      ) : (
        <FlexBox>Loading...</FlexBox>
      )}
    </TransferEntityLayout>
  )
}

export default TransferEntity
