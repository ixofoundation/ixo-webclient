import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useEditEntity from 'hooks/editEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from 'utils/toast'
import EditProfile from '../../components/EditProfile'
import EditProperty from '../../components/EditProperty'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useParams } from 'react-router-dom'

const EditEntity: React.FC = () => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const { setEditEntity, ExecuteEditEntity } = useEditEntity()
  const [editing, setEditing] = useState(false)
  const { close } = useWallet()

  useEffect(() => {
    setEditEntity(currentEntity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentEntity)])

  const handleEditEntity = async () => {
    setEditing(true)
    try {
      const { transactionHash, code, rawLog } = await ExecuteEditEntity()
      if (transactionHash && code === 0) {
        close()
        successToast('Updating', 'Successfully Updated')
      } else {
        throw new Error(rawLog)
      }
    } catch (e: any) {
      errorToast('Updating', e.message ? JSON.stringify(e.message) : JSON.stringify(e))
    } finally {
      setEditing(false)
    }
  }

  return (
    <FlexBox width='100%' $direction='column' $alignItems='flex-start' $gap={10} color='black' background='white'>
      <Typography variant='secondary' size='2xl'>
        Here you can update the Investment settings.
      </Typography>

      <FlexBox width='100%' $direction='column' $gap={8}>
        <Typography variant='secondary' size='4xl'>
          Profile
        </Typography>

        <EditProfile />
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={8}>
        <Typography variant='secondary' size='4xl'>
          Settings
        </Typography>

        <EditProperty />
      </FlexBox>

      <FlexBox>
        <Button size='flex' width={180} onClick={handleEditEntity} loading={editing} textTransform='capitalize'>
          Update Entity
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default EditEntity
