import React, { useContext } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import {
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/protocol'
import useEditEntity from 'hooks/editEntity'
import useCurrentEntity from 'hooks/currentEntity'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

const EditProperty: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()
  const { currentEntity } = useCurrentEntity()

  const updateCreator = (creator: TEntityCreatorModel) => {
    setEditedField('creator', creator)
  }
  const updateAdministrator = (administrator: TEntityAdministratorModel) => {
    setEditedField('administrator', administrator)
  }
  const updateDDOTags = (ddoTags: TEntityDDOTagModel[]) => {
    setEditedField('ddoTags', ddoTags)
  }
  const updatePage = (page: TEntityPageModel) => {
    setEditedField('page', page)
  }
  const updateService = (service: TEntityServiceModel[]) => {
    setEditedField('service', service)
  }
  const updateLinkedResource = (linkedResource: { [id: string]: LinkedResource }) => {
    setEditedField('linkedResource', linkedResource)
  }
  const updateClaim = (claim: { [id: string]: TEntityClaimModel }) => {
    setEditedField('claim', claim)
  }
  const updateAccordedRight = (accordedRight: { [id: string]: AccordedRight }) => {
    setEditedField('accordedRight', accordedRight)
  }
  const updateLinkedEntity = (linkedEntity: { [id: string]: LinkedEntity }) => {
    setEditedField('linkedEntity', linkedEntity)
  }

  const PropertiesFormProps = {
    entityType: currentEntity.type,
    creator: editEntity.creator ?? currentEntity.creator!,
    administrator: editEntity.administrator ?? currentEntity.administrator!,
    ddoTags: editEntity.tags ?? currentEntity.tags,
    page: Object.fromEntries((editEntity.page ?? currentEntity.page ?? []).map((item) => [item.id, item])),
    service: editEntity.service ?? currentEntity.service,
    linkedResource: Object.fromEntries(
      (editEntity.linkedResource ?? currentEntity.linkedResource ?? []).map((item) => [item.id, item]),
    ),
    claim: {},
    accordedRight: Object.fromEntries(
      (editEntity.accordedRight ?? currentEntity.accordedRight ?? []).map((item) => [item.id, item]),
    ),
    linkedEntity: Object.fromEntries(
      (editEntity.linkedEntity ?? currentEntity.linkedEntity ?? []).map((item) => [item.id, item]),
    ),
    daoGroups: editEntity.daoGroups ?? currentEntity.daoGroups,
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
      {/* <PropertiesForm {...PropertiesFormProps} /> */}
    </FlexBox>
  )
}

export default EditProperty
