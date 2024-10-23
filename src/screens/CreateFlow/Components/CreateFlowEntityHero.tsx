import { Flex, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import { updateLinkedResource } from 'redux/createFlow/slice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

const CreateFlowEntityHero = () => {
  const dispatch = useAppDispatch()
  const { linkedResource } = useAppSelector((state) => state.createFlow)

  const profileResource = useMemo(() => {
    return linkedResource.find((resource) => resource.id === '{id}#profile')
  }, [linkedResource])

  const profile = profileResource?.data

  const rightIcon = <LiaEditSolid size={20} />

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateLinkedResource({
        id: '{id}#profile',
        type: 'Settings',
        proof: '',
        description: 'Profile',
        mediaType: 'application/ld+json',
        serviceEndpoint: profileResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: {
          ...profile,
          name: e.target.value,
        },
      }),
    )
  }

  return (
    <Flex w='100%' direction={'column'}>
      <Flex w='100%' h='125px' bg='linear-gradient(180deg, #05324C 0%, #149FBD 100%)'>
        <Flex w='100%' h={'100%'} align={'center'}>
          <Flex w='100%' ml={80}>
            <TextInput
              variant='unstyled'
              size='xl'
              placeholder='Add Title'
              defaultValue={profile?.name}
              value={profile?.name}
              rightSection={rightIcon}
              styles={{
                input: {
                  color: 'white',
                },
              }}
              onChange={handleTitleChange}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateFlowEntityHero
