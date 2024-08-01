import { FlexBox } from 'components/App/App.styles'
import { FormCard } from 'components'
import { Typography } from 'components/Typography'
import useEditEntity from 'hooks/editEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { errorToast, successToast } from 'utils/toast'
import EditGroups from '../../components/EditGroups'
import ExclamationIcon from 'assets/images/icon-exclamation-circle.svg'
import { useGetEntityByIdLazyQuery } from 'graphql/entities'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { useDispatch } from 'react-redux'
import { updateEntityAction, updateEntityPropertyAction } from 'redux/entities/entities.actions'
import EditProfile from '../../components/EditProfile'
import EditProperty from '../../components/EditProperty'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useEntity } from 'hooks/entity/useEntity'

const EditEntity: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const { cwClient } = useAccount()
  const { wallet, close } = useWallet()
  const isOwner = wallet?.address === currentEntity.owner
  const { setEditEntity, ExecuteEditEntity } = useEditEntity()
  const { data } = useGetEntityByIdLazyQuery()
  const [editing, setEditing] = useState(false)
  const { refetch } = useEntity(entityId)

  useEffect(() => {
    setEditEntity(currentEntity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentEntity)])

  useEffect(() => {
    if (data) {
      dispatch(updateEntityAction(data))
      apiEntityToEntity({ entity: data, cwClient }, (key, data, merge = false) => {
        dispatch(updateEntityPropertyAction(entityId, key, data, merge))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)])

  const handleEditEntity = async () => {
    setEditing(true)
    try {
      const { transactionHash, code, rawLog } = await ExecuteEditEntity()
      if (transactionHash && code === 0) {
        successToast('Updating', 'Successfully Updated')
        await refetch()
        close()
      } else {
        throw new Error(rawLog)
      }
    } catch (e: any) {
      console.error('handleEditEntity', e)
      errorToast('Updating', e.message ? JSON.stringify(e.message) : JSON.stringify(e))
    } finally {
      setEditing(false)
    }
  }

  const handleTransferEntity = async () => {
    navigate(`/entity/${entityId}/transfer`)
  }

  const handleReEnableKeys = async () => {
    navigate(`/entity/${entityId}/transfer/review`)
  }

  return (
    <FlexBox width='100%' $direction='column' $alignItems='flex-start' $gap={10} color='black' background='white'>
      <Typography variant='secondary' size='2xl'>
        Here you can update the DAO settings.
      </Typography>

      <FlexBox>
        {currentEntity.status === 0 && isOwner && (
          <Button size='flex' width={240} onClick={handleTransferEntity} textTransform='uppercase'>
            Transfer Entity
          </Button>
        )}
        {currentEntity.status === 2 && isOwner && (
          <FormCard title='Re-enable keys' preIcon={<ExclamationIcon />}>
            <Typography>The former owner of the entity created a document to re-enable verification keys.</Typography>
            <Button size='flex' onClick={handleReEnableKeys} textTransform='uppercase'>
              Review
            </Button>
          </FormCard>
        )}
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={8}>
        <Typography variant='secondary' size='4xl'>
          Profile
        </Typography>

        <EditProfile />
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={8}>
        <Typography variant='secondary' size='4xl'>
          Groups
        </Typography>

        <EditGroups />
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={8}>
        <Typography variant='secondary' size='4xl'>
          Settings
        </Typography>

        <EditProperty />
      </FlexBox>

      <FlexBox>
        <Button size='flex' width={240} onClick={handleEditEntity} loading={editing} textTransform='uppercase'>
          Update Entity
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default EditEntity
