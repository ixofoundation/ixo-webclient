import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useAccount } from 'hooks/account'
import { useCreateEntityState } from 'hooks/createEntity'
import { CreateEntity, getDidFromEvents } from 'lib/protocol'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { TDAOMetadataModel } from 'types/protocol'
import DAOCard from './DAOCard'
import * as Toast from 'utils/toast'
import { Context } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import blocksyncApi from 'api/blocksync/blocksync'
import { encode as base64Encode } from 'js-base64'
import { PDS_URL } from 'types/entities'

const cellNodeEndpoint = PDS_URL

const ReviewDAO: React.FC = (): JSX.Element => {
  const { signingClient, address, did } = useAccount()
  const createEntityState = useCreateEntityState()
  const metadata: TDAOMetadataModel = createEntityState.metadata as TDAOMetadataModel
  const { entityType, service, creator, controller, ddoTags, page, claim, gotoStep } = createEntityState

  const handleCreateEntityClass = async (): Promise<string> => {
    const data = {
      entityType,
      context: [{ key: 'ixo', val: 'https://w3id.org/ixo/v1' }],
      service: [],
      linkedResource: [],
      accordedRight: [],
      linkedEntity: [],
    }
    const res = await CreateEntity(signingClient, address, did, [data])
    return getDidFromEvents(res)
  }

  const mapToSDKLinkedResource = async (): Promise<LinkedResource[]> => {
    const linkedResource: LinkedResource[] = []

    // Mapping Profile to LinkedResource > `profile` type
    try {
      const profile = {
        id: '', // TODO: ?
        // '@type': metadata?.type,
        name: metadata?.name,
        description: metadata?.description,
        image: metadata?.image,
        logo: metadata?.icon,
        brand: metadata?.brand,
        location: metadata?.location,
        attributes: metadata?.attributes ?? [],
        metrics: metadata?.metrics ?? [],
      }
      console.log('mapToSDKLinkedResource', 'profile', profile)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(profile))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'profile',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping to LinkedResource > `profile` type', e)
    }

    // Mapping Creator to LinkedResource > `creator` type
    try {
      console.log('mapToSDKLinkedResource', 'creator', creator)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(creator))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'creator',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping Creator to LinkedResource > `creator` type', e)
    }

    // Mapping Controller to LinkedResource > `controller` type
    try {
      console.log('mapToSDKLinkedResource', 'controller', controller)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(controller))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'controller',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping controller to LinkedResource > `controller` type', e)
    }

    // Mapping Claims to linkedResource > `claims` type
    try {
      console.log('mapToSDKLinkedResource', 'claim', claim)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(claim))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'claims',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping claim to linkedResource', e)
    }

    // Mapping Tags to linkedResource > `filters` type
    try {
      console.log('mapToSDKLinkedResource', 'filters', ddoTags)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(ddoTags))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'filters',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping ddoTags to linkedResource')
    }

    // Mapping PageContent to linkedResource > `page` type
    try {
      console.log('mapToSDKLinkedResource', 'page', page)
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(page))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'page',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping PageContent to linkedResource')
    }

    return linkedResource
  }
  const handleCreateDAOClass = async (inheritEntityDid: string): Promise<string> => {
    const context: Context[] = [{ key: 'class', val: inheritEntityDid }]

    const linkedResource: LinkedResource[] = await mapToSDKLinkedResource()
    const accordedRight: AccordedRight[] = []
    const linkedEntity: LinkedEntity[] = []

    const payload = {
      entityType,
      context,
      service,
      linkedResource,
      accordedRight,
      linkedEntity,
    }
    const res = await CreateEntity(signingClient, address, did, [payload])
    return getDidFromEvents(res)
  }

  const handleSignToCreate = async (): Promise<void> => {
    const entityClassDid: string = await handleCreateEntityClass() // probably entityClassDid = "did:ixo:entity:dao"
    if (!entityClassDid) {
      Toast.errorToast(`Creating Entity Class Failed`)
      return
    } else {
      Toast.successToast(`Creating Entity Class Succeed`)
    }

    const daoDid: string = await handleCreateDAOClass(entityClassDid)
    if (!daoDid) {
      Toast.errorToast(`Creating DAO Failed`)
      return
    } else {
      Toast.successToast(`Creating DAO Succeed`)
    }
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <DAOCard image={metadata.image ?? ''} name={metadata.name ?? ''} numberOfMembers={12} />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this DAO on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Review the DAO details
            </Typography>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              View the DAO Groups
            </Typography>{' '}
            you have added.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Confirm the Headline Metric
            </Typography>{' '}
            that will be displayed on the DAO card.
          </Typography>
          <Typography variant='secondary'>
            When you are ready to commit, sign with your DID Account keys, or{' '}
            <Typography variant='secondary' color='blue'>
              connect a different account
            </Typography>{' '}
            as the DAO Creator.
          </Typography>
        </FlexBox>
        <FlexBox width='100%' gap={4}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
            Back
          </Button>
          <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }}>
            Sign To Create
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewDAO
