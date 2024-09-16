import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'

import { Button, InputWithLabel, TextArea } from 'screens/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex } from '@mantine/core'
import { CardWrapper } from 'screens/CreateEntity/EntityPages/SetupGroups/SetupGroupSettings.styles'

const SetupProposalInfo: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()

  const { profile, updateProfile } = useCreateEntityState()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const canContinue = name && description

  const onBack = () => {
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/template`)
  }
  const onContinue = () => {
    if (name && description) {
      updateProfile({ name, description })
      navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/action`)
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
            <Box>
              <img src='/assets/images/icon-info.svg' />
            </Box>
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
