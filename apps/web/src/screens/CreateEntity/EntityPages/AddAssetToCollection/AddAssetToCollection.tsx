import { useWallet } from 'wallet-connector'
import { Box, Card, Flex, Image, LoadingOverlay, Text } from '@mantine/core'
import { Button } from '../../Components'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services'
import { TEntityModel } from 'types/entities'
import { useCreateEntityState } from 'hooks/createEntity'
import { apiEntityToEntity } from 'utils/entities'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useParams } from 'react-router-dom'

const AddAssetToCollection = ({ showNavigation = true }: { showNavigation?: boolean }) => {
  const { wallet } = useWallet()
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()
  const { coreAddress } = useParams<{ coreAddress: string }>()

  const collectionOwner = coreAddress ?? wallet?.address

  const {
    protocolId,
    updateProtocolId,
    updateProfile,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedEntity,
    updateLinkedResource,
    updateStartEndDate,
    updateQuestionJSON,
    updateClaim,
  } = useCreateEntityState()
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
          equalTo: collectionOwner,
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

  const handleNext = async (protocolId?: string): Promise<void> => {
    const entity = data.find((collection) => collection.id === protocolId) as any
    await new Promise((resolve) => {
      apiEntityToEntity({ entity: entity }, (key: string, value: any, merge) => {
        switch (key) {
          case 'profile':
            updateProfile(value)
            break
          case 'creator':
            updateCreator(value)
            break
          case 'administrator':
            updateAdministrator(value)
            break
          case 'page':
            updatePage(value)
            break
          case 'tags':
            updateDDOTags(value)
            break
          case 'service':
            updateService(value)
            break
          case 'linkedEntity':
            updateLinkedEntity(value)
            break
          case 'linkedResource':
            updateLinkedResource(
              value.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
            )
            break
          case 'surveyTemplate':
            updateQuestionJSON(value)
            break
          case 'claim':
            updateClaim(value)
            break
          default:
            break
        }
      })
      return resolve(true)
    })
    // additional
    updateStartEndDate({ startDate: entity.startDate, endDate: entity.endDate })
    navigateToNextStep()
  }

  if (loading) return <LoadingOverlay />

  return (
    <Box w='100%'>
      <Flex gap='md'>
        {data.map((collection) => (
          <Card
            key={collection.id}
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
            <Button
              size='full'
              height={48}
              variant={'primary'}
              disabled={!protocolId}
              onClick={() => handleNext(protocolId)}
            >
              Continue
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default AddAssetToCollection
