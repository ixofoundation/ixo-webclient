import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { CardWrapper } from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupGroupSettings.styles'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { Button, InputWithLabel, TextArea } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'hooks/window'

const SetupInfo: React.FC = (): JSX.Element => {
  const navigate =useNavigate()

  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { getQuery } = useQuery()
  const join = getQuery('join')

  const createEntityState = useCreateEntityState()
  const profile = createEntityState.profile
  const { updateProfile } = createEntityState
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { search } = useLocation()
  const canContinue = name && description

  const onBack = () => {
    if (join) {
      navigate(`/create/entity/deed/${entityId}/${coreAddress}/select${search}`)
    } else {
      navigate(`/entity/${entityId}/dashboard/governance`)
    }
  }
  const onContinue = () => {
    if (name && description) {
      updateProfile({ name, description })
      navigate(`/create/entity/deed/${entityId}/${coreAddress}/page${search}`)
    }
  }

  useEffect(() => {
    setName(profile?.name || '')
    setDescription(profile?.description || '')
  }, [profile])

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <CardWrapper direction='column' gap={5}>
          <FlexBox gap={2} alignItems='center'>
            <InfoIcon />
            <Typography size='xl' weight='medium'>
              Proposal Info
            </Typography>
          </FlexBox>
          <FlexBox>
            <InputWithLabel
              height={'48px'}
              label='Proposal Name'
              inputValue={name}
              handleChange={setName}
              disabled={join === 'true'}
            />
          </FlexBox>
          <FlexBox>
            <TextArea height='100px' label='Short Description' inputValue={description} handleChange={setDescription} />
          </FlexBox>
        </CardWrapper>
        <FlexBox width='100%' justifyContent='flex-end' gap={4}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button disabled={!canContinue} onClick={onContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupInfo
