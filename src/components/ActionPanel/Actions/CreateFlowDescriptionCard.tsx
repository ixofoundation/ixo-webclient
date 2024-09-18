import { Flex, Textarea } from '@mantine/core'
import { ActionCard } from 'components/ActionCard'
import { useMemo } from 'react'
import { LiaTagSolid } from 'react-icons/lia'
import { useDispatch } from 'react-redux'
import { updateLinkedResource } from 'redux/createFlow/slice'
import { useAppSelector } from 'redux/hooks'

export const CreateFlowDescriptionCard = () => {
  const { linkedResource } = useAppSelector((state) => state.createFlow)
  const dispatch = useDispatch()

  const profileResource = useMemo(() => {
    return linkedResource.find((resource) => resource.id === '{id}#profile')
  }, [linkedResource])

  const profile = profileResource?.data

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          description: e.target.value,
        },
      }),
    )
  }

  return (
    <ActionCard title={'Description'} icon={<LiaTagSolid />}>
      <Flex bg='#F9F9F9' gap={4} align='center' w='100%'>
        <Textarea
          defaultValue={profile?.description}
          value={profile?.description}
          placeholder='Description'
          radius='md'
          rows={8}
          w='100%'
          onChange={handleDescriptionChange}
        />
      </Flex>
    </ActionCard>
  )
}
