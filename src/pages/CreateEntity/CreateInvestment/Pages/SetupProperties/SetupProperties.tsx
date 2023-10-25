import React, { useMemo } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { Typography } from 'components/Typography'

const SetupProperties: React.FC = (): JSX.Element => {
  const {
    entityType,
    creator,
    administrator,
    ddoTags,
    page,
    service,
    linkedResource,
    claim,
    headlineMetricClaim,
    accordedRight,
    linkedEntity,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
    validateRequiredProperties,
    gotoStep,
  } = useCreateEntityState()

  const PropertiesFormProps = {
    entityType,
    creator,
    administrator,
    ddoTags,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  }

  const valid = useMemo(() => {
    return validateRequiredProperties && !!headlineMetricClaim
  }, [validateRequiredProperties, headlineMetricClaim])

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <Typography variant='secondary' size='xl'>
        Configure the properties
      </Typography>

      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!valid} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
