import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useCurrentEntity from 'hooks/currentEntity'
import useEditEntity from 'hooks/editEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect } from 'react'
import EditGroups from './components/EditGroups'
import EditProfile from './components/EditProfile'
import EditProperty from './components/EditProperty'

const EditEntity: React.FC = () => {
  const { currentEntity } = useCurrentEntity()
  const { setEditEntity } = useEditEntity()

  useEffect(() => {
    setEditEntity(currentEntity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentEntity)])

  const handleEditEntity = () => {
    //
  }

  return (
    <FlexBox width='100%' direction='column' alignItems='start' gap={10} color='black' background='white'>
      <Typography variant='secondary' size='2xl'>
        Here you can update the DAO settings and submit the changes as a proposal.
      </Typography>

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
        <Button size='flex' onClick={handleEditEntity}>
          Update Entity
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default EditEntity
