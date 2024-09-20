import { Box, Button, Flex, Modal, Text, TextInput, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionCard } from 'components/ActionCard'
import { LiaChartBarSolid, LiaMinusCircleSolid, LiaPlusSolid } from 'react-icons/lia'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { updateLinkedResource } from 'redux/createFlow/slice'

type Inputs = {
  id: string
  key: string
  value: string
}

const AttributeItem = ({
  attribute,
  isEditing,
  remove,
}: {
  attribute: Inputs
  isEditing: boolean
  remove: () => void
}) => {
  const theme = useMantineTheme()
  return (
    <Flex pos='relative' direction={'column'} bg='#f9f9f9' p='sm' styles={{ root: { borderRadius: '10px' } }}>
      {isEditing && (
        <Box pos='absolute' style={{ top: -5, right: -5, cursor: 'pointer' }} onClick={remove}>
          <LiaMinusCircleSolid color={theme.colors.blue[5]} />
        </Box>
      )}
      <Text fz='xs'>{attribute.key}</Text>
      <Text>{attribute.value}</Text>
    </Flex>
  )
}

const AddAttributeModal = ({ onSubmit, isEditing }: { onSubmit: SubmitHandler<Inputs>; isEditing?: boolean }) => {
  const [opened, { open, close }] = useDisclosure()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const handleAdd = (data: Inputs) => {
    onSubmit(data)
    reset()
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add Attribute' centered radius='md'>
        <form onSubmit={handleSubmit(handleAdd)}>
          <Flex direction={'column'} gap={'md'}>
            <TextInput label='ID' placeholder='ID' {...register('id')} />
            <TextInput label='Key' placeholder='Key' {...register('key')} />
            <TextInput label='Value' placeholder='Value' {...register('value')} />

            <Button radius='md' w='100%' type='submit' styles={{ root: { outline: 'none' } }}>
              Add
            </Button>
          </Flex>
        </form>
      </Modal>
      {isEditing && (
        <Button radius='md' w='100%' onClick={open} styles={{ root: { outline: 'none' } }}>
          <LiaPlusSolid />
        </Button>
      )}
    </>
  )
}

export const CreateFlowAttributeCard = () => {
  const [isEditing, { open, close }] = useDisclosure()
  const dispatch = useAppDispatch()
  const { linkedResource } = useAppSelector((state) => state.createFlow)

  const profileResource = useMemo(() => {
    return linkedResource.find((resource) => resource.id === '{id}#profile')
  }, [linkedResource])

  const profile = profileResource?.data

  const attributes: Inputs[] = useMemo(() => profile?.attributes ?? [], [profile])

  const handleUpdateAttribute = (attribute: Inputs) => {
    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: profileResource?.description ?? 'Profile',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          attributes: [...attributes, attribute],
        },
      }),
    )
  }

  const removeAttribute = (id: string) => {
    const attributesAfterRemoval = attributes.filter((attribute) => attribute.id !== id)

    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: profileResource?.description ?? 'Profile',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          attributes: attributesAfterRemoval,
        },
      }),
    )
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleUpdateAttribute(data)
    close()
  }

  return (
    <ActionCard title='Attributes' icon={<LiaChartBarSolid />} isEditing={isEditing} onClose={close} onOpen={open}>
      <Flex direction={'column'} gap={'md'}>
        {attributes.map((attribute, index) => (
          <AttributeItem
            key={index}
            attribute={attribute}
            remove={() => removeAttribute(attribute.id)}
            isEditing={isEditing}
          />
        ))}
      </Flex>

      <Flex justify={'center'} mt={'md'}>
        <AddAttributeModal onSubmit={onSubmit} isEditing={isEditing} />
      </Flex>
    </ActionCard>
  )
}
