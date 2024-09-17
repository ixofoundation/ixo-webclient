import { Box, Flex, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionCard } from 'components/ActionCard'
import { friendlyEntityTypes } from 'components/KeyValueTable'
import { IconUpload, ImageUpload } from 'screens/CreateEntity/Components'
import { useMemo } from 'react'
import { LiaCircleNotchSolid } from 'react-icons/lia'
import { updateLinkedResource } from 'redux/createFlow/slice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

export const CreateFlowProfileCard = () => {
  const [isEditing, { open: openEditing, close: closeEditing }] = useDisclosure()
  const dispatch = useAppDispatch()
  const { type, linkedResource } = useAppSelector((state) => state.createFlow)

  const profileResource = useMemo(() => {
    return linkedResource.find((resource) => resource.id === '{id}#profile')
  }, [linkedResource])

  const profile = profileResource?.data

  const handleImageUpload = (image: string) => {
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
          image: image,
        },
      }),
    )
  }

  const handleLogoUpload = (logo: string) => {
    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: '',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          logo: logo,
        },
      }),
    )
  }

  const handleNameUpdate = (name: string) => {
    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: '',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          name: name,
        },
      }),
    )
  }

  const handleBrandUpdate = (brand: string) => {
    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: '',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          brand: brand,
        },
      }),
    )
  }

  return (
    <ActionCard
      title={friendlyEntityTypes(type)}
      icon={<LiaCircleNotchSolid />}
      isEditing={isEditing}
      onOpen={openEditing}
      onClose={closeEditing}
    >
      <Box w='100%' h={180} style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <ImageUpload image={profile?.image} handleChange={handleImageUpload} allowEdit={isEditing} />
      </Box>
      <Flex bg='#F9F9F9' p='sm' gap={4} align='center' mt={'sm'} style={{ borderRadius: '10px' }}>
        <Box w='100%'>
          <TextInput
            w='100%'
            placeholder='Project Name'
            radius='md'
            value={profile?.name}
            variant={isEditing ? 'filled' : 'unstyled'}
            onChange={(e) => handleNameUpdate(e.target.value)}
          />
          <TextInput
            w='100%'
            mt={3}
            placeholder='Brand Name'
            radius='md'
            value={profile?.brand}
            variant={isEditing ? 'filled' : 'unstyled'}
            onChange={(e) => handleBrandUpdate(e.target.value)}
          />
        </Box>
        <Box>
          <IconUpload
            icon={profile?.logo}
            placeholder={`${friendlyEntityTypes(type)} Logo`}
            handleChange={handleLogoUpload}
            allowEdit={isEditing}
            sizeInPX={27}
          />
        </Box>
      </Flex>
    </ActionCard>
  )
}
