import React, { useContext } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'
import {
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/entities'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

const EditProperty: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const updateCreator = (creator: TEntityCreatorModel) => {
    entity.updatePartial('creator', creator)
  }
  const updateAdministrator = (administrator: TEntityAdministratorModel) => {
    entity.updatePartial('administrator', administrator)
  }
  const updateDDOTags = (ddoTags: TEntityDDOTagModel[]) => {
    entity.updatePartial('tags', ddoTags)
  }
  const updatePage = (page: TEntityPageModel) => {
    entity.updatePartial('page', page)
  }
  const updateService = (service: TEntityServiceModel[]) => {
    entity.updatePartial('service', service)
  }
  const updateLinkedResource = (linkedResource: { [id: string]: LinkedResource }) => {
    entity.updatePartial('linkedResource', linkedResource)
  }
  const updateClaim = (claim: { [id: string]: TEntityClaimModel }) => {
    entity.updatePartial('claim', claim)
  }
  const updateAccordedRight = (accordedRight: { [id: string]: AccordedRight }) => {
    entity.updatePartial('accordedRight', accordedRight)
  }
  const updateLinkedEntity = (linkedEntity: { [id: string]: LinkedEntity }) => {
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
    claim: entity.claim ?? {},
    accordedRight: entity.accordedRight,
    linkedEntity: entity.linkedEntity,
    daoGroups: entity.daoGroups,
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
    <FlexBox $direction='column' $gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' $gap={5}>
        <Button variant='secondary' onClick={(): void => navigate(-1)}>
          Back
        </Button>
        <Button
          variant='primary'
          onClick={(): void => navigate({ pathname: `/edit/entity/${entityId}/review`, search })}
        >
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default EditProperty
