import React from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useHistory, useParams } from 'react-router-dom'

const SetupProperties: React.FC = (): JSX.Element => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const history = useHistory()
  const {
    entityType,
    creator,
    administrator,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
    validateRequiredProperties,
  } = useCreateEntityState()

  const handleBack = () => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/page`)
  }

  const handleNext = () => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/action`)
  }

  const PropertiesFormProps = {
    entityType,
    creator,
    administrator,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  }

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button variant='primary' disabled={!validateRequiredProperties} onClick={handleNext}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
