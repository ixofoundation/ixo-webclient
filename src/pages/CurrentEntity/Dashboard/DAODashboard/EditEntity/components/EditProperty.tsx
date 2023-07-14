import React, { useCallback, useMemo } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import {
  EntityLinkedResourceConfig,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/protocol'
import useEditEntity from 'hooks/editEntity'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

const EditProperty: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()

  const updateCreator = useCallback((creator: TEntityCreatorModel) => {
    setEditedField('creator', creator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateAdministrator = useCallback((administrator: TEntityAdministratorModel) => {
    setEditedField('administrator', administrator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateDDOTags = useCallback((ddoTags: TEntityDDOTagModel[]) => {
    setEditedField('tags', ddoTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updatePage = useCallback((page: TEntityPageModel) => {
    setEditedField('page', Object.values(page))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateService = useCallback((service: TEntityServiceModel[]) => {
    setEditedField('service', service)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateLinkedResource = useCallback((linkedResource: { [id: string]: LinkedResource | undefined }) => {
    setEditedField('linkedResource', linkedResource, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateClaim = useCallback((claim: { [id: string]: TEntityClaimModel }) => {
    setEditedField('claim', claim, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateAccordedRight = useCallback((accordedRight: { [id: string]: AccordedRight }) => {
    setEditedField('accordedRight', Object.values(accordedRight))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateLinkedEntity = useCallback((linkedEntity: { [id: string]: LinkedEntity }) => {
    setEditedField('linkedEntity', Object.values(linkedEntity))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const PropertiesFormProps = useMemo(() => {
    return {
      entityType: editEntity.type!,
      creator: editEntity.creator!,
      administrator: editEntity.administrator!,
      ddoTags: editEntity.tags ?? [],
      service: editEntity.service ?? [],
      page: Object.fromEntries((editEntity.page ?? []).map((item) => [item.id, item])),
      linkedResource: Object.fromEntries(
        (editEntity.linkedResource ?? [])
          .filter((v) => v && Object.keys(EntityLinkedResourceConfig).includes(v.type))
          .map((item) => [item.id, item]),
      ),
      claim: {},
      accordedRight: Object.fromEntries((editEntity.accordedRight ?? []).map((item) => [item.id, item])),
      linkedEntity: Object.fromEntries((editEntity.linkedEntity ?? []).map((item) => [item.id, item])),
      daoGroups: editEntity.daoGroups ?? {},
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(editEntity)])

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm {...PropertiesFormProps} />
    </FlexBox>
  )
}

export default EditProperty
