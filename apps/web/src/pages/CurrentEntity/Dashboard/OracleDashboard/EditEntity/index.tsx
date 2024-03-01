import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useCurrentEntity from 'hooks/currentEntity'
import useEditEntity from 'hooks/editEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from 'utils/toast'
import EditProfile from '../../components/EditProfile'
import EditProperty from '../../components/EditProperty'

const EditEntity: React.FC = () => {
  const { currentEntity } = useCurrentEntity()
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
        successToast('Updating', 'Successfully updated!')
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

  return (
    <FlexBox width='100%' $direction='column' $alignItems='flex-start' $gap={10} color='black' background='white'>
      <Typography variant='secondary' size='2xl'>
        Here you can update the Project settings and submit the changes as a proposal.
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
