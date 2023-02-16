import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { CardWrapper } from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupGroupSettings.styles'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { Button, InputWithLabel, TextArea } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { useHistory } from 'react-router-dom'

const SetupInfo: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { deed, updateDeed, gotoStep } = useCreateEntityState()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const canContinue = name && description

  const onBack = () => {
    history.goBack()
  }
  const onContinue = () => {
    if (name && description) {
      updateDeed({ name, description })
      gotoStep(1)
    }
  }

  useEffect(() => {
    setName(deed?.name ?? '')
    setDescription(deed?.description ?? '')
  }, [deed])

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
            <InputWithLabel height={'48px'} label='Proposal Name' inputValue={name} handleChange={setName} />
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
