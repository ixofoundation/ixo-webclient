import { FlexBox } from 'components/App/App.styles'
import { FormCard } from 'components'
import { Typography } from 'components/Typography'
import useCurrentEntity from 'hooks/currentEntity'
import useEditEntity from 'hooks/editEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { errorToast, successToast } from 'utils/toast'
import EditGroups from './components/EditGroups'
import EditProfile from './components/EditProfile'
import EditProperty from './components/EditProperty'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'

const EditEntity: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { currentEntity, isOwner } = useCurrentEntity()
  const { setEditEntity, ExecuteEditEntity } = useEditEntity()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditEntity(currentEntity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentEntity)])

  const handleEditEntity = async () => {
    setEditing(true)
    try {
      const { transactionHash, code, rawLog } = await ExecuteEditEntity()
      if (transactionHash && code === 0) {
        successToast('Updating', 'Successfully Updated')
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
    history.push(`/transfer/entity/${entityId}`)
  }

  const handleReEnableKeys = async () => {
    history.push(`/transfer/entity/${entityId}/review`)
  }

  return (
    <FlexBox width='100%' direction='column' alignItems='start' gap={10} color='black' background='white'>
      <Typography variant='secondary' size='2xl'>
        Here you can update the DAO settings and submit the changes as a proposal.
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

      <FlexBox width='100%' direction='column' gap={8}>
        <Typography variant='secondary' size='4xl'>
          Profile
        </Typography>

        <EditProfile />
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={8}>
        <Typography variant='secondary' size='4xl'>
          Groups
        </Typography>

        <EditGroups />
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={8}>
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
