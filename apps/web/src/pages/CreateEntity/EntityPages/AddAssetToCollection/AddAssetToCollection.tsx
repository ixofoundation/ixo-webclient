import { useWallet } from '@ixo-webclient/wallet-connector'
import { Box, Card, Flex, Image, LoadingOverlay, Text } from '@mantine/core'
import { Button } from '../../Components'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services'
import { TEntityModel } from 'types/entities'
import { useCreateEntityState } from 'hooks/createEntity'

const AddAssetToCollection = ({ showNavigation = true }: { showNavigation?: boolean }) => {
  const { wallet } = useWallet()
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()
  const { protocolId, updateProtocolId } = useCreateEntityState()
  const [{ data, loading }, setCollections] = useState<{ data: TEntityModel[]; loading: boolean }>({
    data: [],
    loading: false,
  })

  useEntitiesQuery({
    variables: {
      filter: {
        type: {
          equalTo: 'asset/collection',
        },
        owner: {
          equalTo: wallet?.address,
        },
      },
    },
    onCompleted: async ({ entities }) => {
      setCollections({ data: [], loading: true })
      const nodes = entities?.nodes ?? []

      const updatedNodes = await populateEntitiesForEntityExplorer(nodes as Entity[])
      setCollections({ data: updatedNodes as TEntityModel[], loading: false })
    },
  })
  const handlePrev = (): void => {
    navigateToPreviousStep()
  }
  const handleNext = (): void => {
    navigateToNextStep()
  }

  if (loading) return <LoadingOverlay />

  return (
    <Box w='100%'>
      <Flex gap='md'>
        {data.map((collection) => (
          <Card
            shadow='md'
            radius={'md'}
            bg={protocolId === collection.id ? '#00D2FF' : 'white'}
            styles={{ root: { cursor: 'pointer' } }}
            onClick={() => updateProtocolId(collection.id)}
          >
            <Card.Section px='md' pt='md'>
              <Image src={collection.profile?.image} alt={collection.profile?.name} h={100} />
            </Card.Section>
            <Card.Section p='md'>
              <Text>{collection.profile?.name}</Text>
            </Card.Section>
          </Card>
        ))}
      </Flex>
      <Flex justify='flex-end'>
        {showNavigation && (
          <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
            <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
              Back
            </Button>
            <Button size='full' height={48} variant={'primary'} disabled={!protocolId} onClick={handleNext}>
              Continue
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default AddAssetToCollection
