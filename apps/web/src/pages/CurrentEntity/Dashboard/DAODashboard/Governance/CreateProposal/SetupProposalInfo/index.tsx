import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { Button, InputWithLabel, TextArea } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { useNavigate, useParams } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { CardWrapper } from 'pages/CreateEntity/EntityPages/SetupGroups/SetupGroupSettings.styles'

const SetupProposalInfo: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()

  const { profile, updateProfile } = useCreateEntityState()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const canContinue = name && description

  const onBack = () => {
    // if (join) {
    //   navigate(`/create/entity/deed/${entityId}/${coreAddress}/select${history.location.search}`)
    // } else {
    //   navigate(`/entity/${entityId}/dashboard/governance`)
    // }
    navigate(`/entity/${entityId}/dashboard/governance?selectedGroup=${coreAddress}`)
  }
  const onContinue = () => {
    if (name && description) {
      updateProfile({ name, description })
      navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/page`)
    }
  }

  useEffect(() => {
    if (!entityId) {
      navigate(`/explore`)
    }
  }, [entityId, navigate])

  useEffect(() => {
    setName(profile?.name || '')
    setDescription(profile?.description || '')
  }, [profile])

  return (
    <Flex w={'100%'} justify='left'>
      <Flex direction='column' gap={60} w={deviceWidth.tablet + 'px'}>
        <CardWrapper $direction='column' $gap={5}>
          <Flex gap={2} align='center'>
            <InfoIcon />
            <Typography size='xl' weight='medium'>
              Proposal Info
            </Typography>
          </Flex>
          <Flex>
            <InputWithLabel height={'48px'} label='Proposal Name' inputValue={name} handleChange={setName} />
          </Flex>
          <Flex>
            <TextArea height='100px' label='Short Description' inputValue={description} handleChange={setDescription} />
          </Flex>
        </CardWrapper>
        <Flex w='100%' justify='flex-start' gap={16}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button disabled={!canContinue} onClick={onContinue}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupProposalInfo
