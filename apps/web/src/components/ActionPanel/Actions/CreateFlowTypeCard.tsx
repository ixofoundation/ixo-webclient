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

export const CreateFlowTypeCard: React.FC = () => {
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
    return entityConfig[rootEntityType]?.filterSchema?.ddoTags.find((tag: any) => tag.name === 'Project Type') ?? {}
  }, [entityConfig, type])

  const handleChange = (values: string[]): void => {
    const updatedEntityTags = data.entityTags.some((tag: any) => tag.category === 'Project Type')
      ? data.entityTags.map((tag: any) => (tag.category === 'Project Type' ? { ...tag, tags: values } : tag))
      : [...data.entityTags, { category: 'Project Type', tags: values }]

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

  const typeTags = useMemo(() => {
    return data?.entityTags?.find((tag: any) => tag.category === 'Project Type').tags ?? []
  }, [data?.entityTags])

  const typeOptions = useMemo(() => {
    return ddoTagsConfig?.tags?.map(({ name }: any) => name) ?? []
  }, [ddoTagsConfig])

  console.log({ typeTags })

  return (
    <ActionCard title='Type' icon={<LiaStar />}>
      <Flex gap={5} wrap={'wrap'}>
        {typeTags.map((tag: any) => {
          return (
            <Text p={10} w='auto' bg='#F9F9F9' style={{ borderRadius: 10 }}>
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
          name='Project Type'
          values={typeTags}
          open={opened}
          options={typeOptions}
          selectionType={ddoTagsConfig?.multiSelect ? 'multiple' : 'single'}
          onClose={close}
          handleChange={handleChange}
        />
      </Flex>
    </ActionCard>
  )
}
