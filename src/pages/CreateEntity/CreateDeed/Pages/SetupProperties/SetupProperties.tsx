import React from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useHistory, useParams } from 'react-router-dom'

const SetupProperties: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const { entityType } = useCreateEntityState()
  const canSubmit = true

  const handleBack = () => {
    history.push(`/create/entity/${entityId}/deed/setup-page`)
  }

  const handleNext = () => {
    history.push(`/create/entity/${entityId}/deed/setup-actions`)
  }

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm entityType={entityType} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={handleNext}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
