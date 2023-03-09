import React from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'

const SetupProperties: React.FC = (): JSX.Element => {
  const { entityType, validateRequiredProperties, gotoStep } = useCreateEntityState()

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm entityType={entityType} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!validateRequiredProperties} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
