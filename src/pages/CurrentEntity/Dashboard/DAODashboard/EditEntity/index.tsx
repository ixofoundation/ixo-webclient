import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
// import EditGroups from './components/EditGroups'
import EditProfile from './components/EditProfile'

const EditEntity: React.FC = () => {
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

      {/* <FlexBox width='100%' direction='column' gap={8}>
        <Typography variant='secondary' size='4xl'>
          Group
        </Typography>

        <EditGroups />
      </FlexBox> */}
    </FlexBox>
  )
}

export default EditEntity
