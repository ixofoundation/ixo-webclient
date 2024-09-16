import React, { useMemo } from 'react'
import { ActionIcon, Flex } from '@mantine/core'
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
import { getSDGIcon } from 'components/Modals/SelectionModal/SelectionModal'
import { SDGIconHolder } from 'components/SDGIconHolder/SDGIconHolder'

export const CreateFlowSDGCard: React.FC = () => {
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
    return entityConfig[rootEntityType]?.filterSchema?.ddoTags.find((tag: any) => tag.name === 'SDG') ?? {}
  }, [entityConfig, type])

  const handleChange = (values: string[]): void => {
    const updatedEntityTags = data.entityTags.some((tag: any) => tag.category === 'SDG')
      ? data.entityTags.map((tag: any) => (tag.category === 'SDG' ? { ...tag, tags: values } : tag))
      : [...data.entityTags, { category: 'SDG', tags: values }]

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

  const sdgTags = useMemo(() => {
    return data?.entityTags?.find((tag: any) => tag.category === 'SDG').tags ?? []
  }, [data?.entityTags])

  const sdgOptions = useMemo(() => {
    return ddoTagsConfig?.tags?.map(({ name }: any) => name) ?? []
  }, [ddoTagsConfig])

  return (
    <ActionCard title='SDGs' icon={<LiaStar />}>
      <Flex gap={5} wrap='wrap'>
        {sdgTags.map((tag: any) => {
          const sdgIcon = getSDGIcon(tag)
          return <SDGIconHolder key={tag} selected bgColor={sdgIcon.bgColor} icon={<i className={sdgIcon.class} />} />
        })}
        <ActionIcon
          onClick={open}
          h={60}
          w={60}
          radius='md'
          styles={{ root: { outline: 'none', outlineStyle: 'none' } }}
        >
          <LiaPlusSolid size={30} />
        </ActionIcon>
        <SelectionModal
          name='SDG'
          values={sdgTags}
          open={opened}
          options={sdgOptions}
          selectionType={ddoTagsConfig?.multiSelect ? 'multiple' : 'single'}
          onClose={close}
          handleChange={handleChange}
        />
      </Flex>
    </ActionCard>
  )
}
