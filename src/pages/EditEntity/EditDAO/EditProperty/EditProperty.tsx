import React, { useContext } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useHistory, useParams } from 'react-router-dom'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'
import {
  TEntityAccordedRightModel,
  TEntityAdministratorModel,
  TEntityClaimModel1,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityLinkedEntityModel,
  TEntityLinkedResourceModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/protocol'

const EditProperty: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const updateCreator = (creator: TEntityCreatorModel) => {
    entity.updatePartial('creator', creator)
  }
  const updateAdministrator = (administrator: TEntityAdministratorModel) => {
    entity.updatePartial('administrator', administrator)
  }
  const updateDDOTags = (ddoTags: TEntityDDOTagModel[]) => {
    entity.updatePartial('ddpTags', ddoTags)
  }
  const updatePage = (page: TEntityPageModel) => {
    entity.updatePartial('page', page)
  }
  const updateService = (service: TEntityServiceModel[]) => {
    entity.updatePartial('service', service)
  }
  const updateLinkedResource = (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => {
    entity.updatePartial('linkedResource', linkedResource)
  }
  const updateClaim = (claim: { [id: string]: TEntityClaimModel1 }) => {
    entity.updatePartial('claim', claim)
  }
  const updateAccordedRight = (accordedRight: { [id: string]: TEntityAccordedRightModel }) => {
    entity.updatePartial('accordedRight', accordedRight)
  }
  const updateLinkedEntity = (linkedEntity: { [id: string]: TEntityLinkedEntityModel }) => {
    entity.updatePartial('linkedEntity', linkedEntity)
  }

  const PropertiesFormProps = {
    entityType: entity.entityType,
    creator: entity.creator,
    administrator: entity.administrator,
    ddoTags: entity.ddoTags,
    page: entity.page,
    service: entity.service,
    linkedResource: entity.linkedResource,
    claim: entity.claim,
    accordedRight: entity.accordedRight,
    linkedEntity: entity.linkedEntity,
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

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={(): void => history.goBack()}>
          Back
        </Button>
        <Button variant='primary' onClick={(): void => history.push(`/edit/entity/${entityId}/review`)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default EditProperty
