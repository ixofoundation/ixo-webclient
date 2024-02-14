import React, { useEffect } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { Typography } from 'components/Typography'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'

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
    accordedRight,
    linkedEntity,
    daoGroups,
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
    profile,
  } = useCreateEntityState()
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()

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
    daoGroups,
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

  useEffect(() => {
    if (entityType === 'protocol/claim') {
      if (!ddoTags || ddoTags?.length === 0) {
        updateDDOTags([
          {
            category: 'Entity',
            tags: ['Claim'],
            readonly: true,
          },
          {
            category: 'Claim Type',
            tags: [profile?.type || ''],
            readonly: true,
          },
          {
            category: 'Token Class',
            tags: ['Unspecified'],
            readonly: true,
          },
        ])
      } else {
        updateDDOTags(
          ddoTags?.map((tag) =>
            tag.category === 'Entity' || tag.category === 'Claim Type' || tag.category === 'Token Class'
              ? { ...tag, readOnly: true }
              : tag,
          ),
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType])

  const handleContinue = () => {
    navigateToNextStep()
  }

  const handleBack = () => {
    navigateToPreviousStep()
  }

  return (
    <FlexBox $direction='column' $gap={7.5} width={deviceWidth.tablet + 'px'}>
      <Typography variant='secondary' size='xl'>
        Configure the properties
      </Typography>

      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' $gap={5}>
        <Button variant='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button variant='primary' disabled={!validateRequiredProperties} onClick={handleContinue}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
