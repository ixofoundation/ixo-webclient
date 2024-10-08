import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { deviceWidth } from 'constants/device'
import { EntityLinkedResourceConfig } from 'constants/entity'
import useEditEntity from 'hooks/editEntity'
import React, { useCallback, useMemo } from 'react'
import { PropertiesForm } from 'screens/CreateEntity/Forms'
import {
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityServiceModel,
} from 'types/entities'

const EditProperty: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()

  const updateAdministrator = useCallback((administrator: TEntityAdministratorModel) => {
    setEditedField('administrator', administrator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCreator = useCallback((creator: TEntityCreatorModel) => {
    setEditedField('creator', creator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateDDOTags = useCallback((ddoTags: TEntityDDOTagModel[]) => {
    setEditedField('tags', ddoTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updatePage = useCallback((page: any) => {
    setEditedField('page', page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateService = useCallback((service: TEntityServiceModel[]) => {
    setEditedField('service', service)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateLinkedResource = useCallback((linkedResource: { [id: string]: LinkedResource }) => {
    setEditedField('linkedResource', Object.values(linkedResource))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateClaim = useCallback((claim: { [id: string]: TEntityClaimModel }) => {
    setEditedField('claim', claim)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateAccordedRight = useCallback((accordedRight: { [id: string]: AccordedRight[] }) => {
    setEditedField('accordedRight', accordedRight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateLinkedEntity = useCallback((linkedEntity: { [id: string]: LinkedEntity }) => {
    setEditedField('linkedEntity', Object.values(linkedEntity))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const PropertiesFormProps = useMemo(() => {
    const accordedRight = Array.isArray(editEntity?.accordedRight)
      ? editEntity?.accordedRight?.reduce((acc, item) => {
          const type = item.type.startsWith?.('capability') ? 'agentCapability' : item.type
          if (type) {
            acc[type] = [...(acc[type] || []), item]
          }
          return acc
        }, {} as any)
      : editEntity?.accordedRight

    return {
      entityType: editEntity.type || '',
      creator: editEntity.creator!,
      administrator: editEntity.administrator!,
      ddoTags: editEntity.tags ?? [],
      service: editEntity.service ?? [],
      page: (editEntity.page ?? []) as any,
      linkedResource: Object.fromEntries(
        (editEntity.linkedResource ?? [])
          .filter((v) => v && Object.keys(EntityLinkedResourceConfig).includes(v.type))
          .map((item) => [item.id, item]),
      ),
      claim: editEntity.claim ?? {},
      accordedRight,
      linkedEntity: Object.fromEntries(
        (editEntity.linkedEntity ?? []).map((item) => [item.id.replace('{id}#', ''), item]),
      ),
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
    <FlexBox $direction='column' $gap={7.5} width={deviceWidth.tablet + 'px'}>
      <PropertiesForm {...PropertiesFormProps} />
    </FlexBox>
  )
}

export default EditProperty
