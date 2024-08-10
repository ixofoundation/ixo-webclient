import React, { useMemo } from 'react'
import { ActionIcon, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LiaPlusSolid, LiaStar } from 'react-icons/lia'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { toRootEntityType } from 'utils/entities'
import { friendlyEntityTypes } from 'components/KeyValueTable'
import { ActionCard } from 'components/ActionCard'
import { SelectionModal } from 'components/Modals'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { updateLinkedResource } from 'redux/createFlow/slice'

export const CreateFlowStageCard: React.FC = () => {
  const [opened, { open, close }] = useDisclosure()
  const entityConfig = useAppSelector(selectEntityConfig)
  const { linkedResource, type } = useAppSelector((state) => state.createFlow)
  const dispatch = useAppDispatch()

  const tagsResource = useMemo(() => {
    return linkedResource.find((resource: LinkedResource) => resource.id === '{id}#tags')
  }, [linkedResource])

  const data = tagsResource?.data

  const ddoTagsConfig = useMemo(() => {
    const rootEntityType = toRootEntityType(friendlyEntityTypes(type))
    return entityConfig[rootEntityType]?.filterSchema?.ddoTags.find((tag: any) => tag.name === 'Stage') ?? {}
  }, [entityConfig, type])

  const handleChange = (values: string[]): void => {
    const updatedEntityTags = data.entityTags.some((tag: any) => tag.category === 'Stage')
      ? data.entityTags.map((tag: any) => (tag.category === 'Stage' ? { ...tag, tags: values } : tag))
      : [...data.entityTags, { category: 'Stage', tags: values }]

    console.log({ updatedEntityTags })

    dispatch(
      updateLinkedResource({
        id: '{id}#tags',
        type: 'Settings',
        proof: '',
        description: tagsResource?.description ?? 'Tags',
        mediaType: 'application/ld+json',
        serviceEndpoint: tagsResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: { ...data, entityTags: updatedEntityTags },
      }),
    )
  }

  const stageTags = useMemo(() => {
    return data?.entityTags?.find((tag: any) => tag.category === 'Stage').tags ?? []
  }, [data?.entityTags])

  const stageOptions = useMemo(() => {
    return ddoTagsConfig?.tags?.map(({ name }: any) => name) ?? []
  }, [ddoTagsConfig])

  console.log({ stageTags })

  return (
    <ActionCard title='Stage' icon={<LiaStar />}>
      <Flex gap={5}>
        {stageTags.map((tag: any) => {
          return (
            <Text p={10} bg='#F9F9F9' style={{ borderRadius: 10 }}>
              {tag}
            </Text>
          )
        })}
        <ActionIcon
          onClick={open}
          h={40}
          w={40}
          radius='md'
          styles={{ root: { outline: 'none', outlineStyle: 'none' } }}
        >
          <LiaPlusSolid size={20} />
        </ActionIcon>
        <SelectionModal
          name='Stage'
          values={stageTags}
          open={opened}
          options={stageOptions}
          selectionType={ddoTagsConfig?.multiSelect ? 'multiple' : 'single'}
          onClose={close}
          handleChange={handleChange}
        />
      </Flex>
    </ActionCard>
  )
}
