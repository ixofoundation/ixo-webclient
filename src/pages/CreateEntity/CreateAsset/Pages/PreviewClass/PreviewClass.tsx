// TODO: createEntity accordedRight, linkedEntity payload
// TODO: cellNodeEndpoint
import { getSDGIcon } from 'components/Modals/SelectionModal/SelectionModal'
import { Box } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { LocalisationForm } from '../../../Forms'
import AssetCard from './AssetCard'
import {
  CardWidthBox,
  CollectionIcon,
  CollectionImage,
  PageRow,
  PageWrapper,
  SDGIcon,
  TokenMetadataTabs,
  TokenMetadataWrapper,
} from './PreviewClass.styles'
import { EAssetType, TAssetMetadataModel } from 'types/protocol'
import { Typography } from 'components/Typography'
import { CreateEntity, getDidFromEvents } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import {
  AccordedRight,
  Context,
  LinkedEntity,
  LinkedResource,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import _ from 'lodash'
import blocksyncApi from 'api/blocksync/blocksync'
import { encode as base64Encode } from 'js-base64'
import { PDS_URL } from 'types/entities'
import * as Toast from 'utils/toast'

const cellNodeEndpoint = PDS_URL

export const TokenMetadata = ({ description, brand, metrics, attributes }: any): JSX.Element => {
  const [tab, setTab] = useState<string>('Context')
  return (
    <TokenMetadataWrapper>
      <TokenMetadataTabs>
        {['Context', 'Metrics', 'Attributes'].map((item) => (
          <Typography
            key={item}
            className='cursor-pointer'
            color={item === tab ? 'blue' : 'color-1'}
            weight='medium'
            onClick={(): void => setTab(item)}
          >
            {item}
          </Typography>
        ))}
      </TokenMetadataTabs>
      {tab === 'Context' && (
        <>
          <Typography color='gray-medium' size='xs' style={{ marginBottom: 8 }}>
            {description}
          </Typography>
          <Typography color='gray-medium' size='xs'>
            Creator: {brand}
          </Typography>
          <Typography color='gray-medium' size='xs'>
            Minted: {new Date().toLocaleDateString()}
          </Typography>
        </>
      )}
      {tab === 'Metrics' && (
        <ul>
          {metrics?.map((metric: any, index: any) => (
            <li key={index}>
              <Typography size='xs' color='gray-medium' weight='semi-bold'>
                {metric.source}
              </Typography>{' '}
              <Typography size='xs' color='gray-medium'>
                {metric.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
      {tab === 'Attributes' && (
        <ul>
          {attributes?.map(({ key, value }: any, index: any) => (
            <li key={index}>
              <Typography size='xs' color='gray-medium'>
                {key}
              </Typography>
              {': '}
              <Typography size='xs' color='gray-medium' weight='semi-bold'>
                {value}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </TokenMetadataWrapper>
  )
}

export const AssetCollectionImage = ({ image, sdgs }: any): JSX.Element => (
  <CollectionImage background={image}>
    <Box className='d-flex justify-content-end align-items-center' style={{ gap: 8 }}>
      {sdgs.map((item: any, index: any) => (
        <SDGIcon key={index} className={getSDGIcon(item).class} />
      ))}
    </Box>
  </CollectionImage>
)

const PreviewClass: React.FC = (): JSX.Element => {
  const { signingClient, address, did } = useAccount()
  const createEntityState = useCreateEntityState()
  const {
    entityType,
    creator,
    controller,
    ddoTags,
    page,
    service,
    claim,
    // linkedResource,
    // accordedRight,
    // linkedEntity,
    localisation,
    gotoStep,
    // updateEntityClassDid,
    // updateAssetClassDid,
    // createEntity,
    // removeAssetInstances,
  } = createEntityState
  const metadata: TAssetMetadataModel = createEntityState.metadata as TAssetMetadataModel

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

    // Mapping profile to LinkedResource > `profile` type
    try {
      const profile = {
        id: '', // TODO: ?
        '@type': metadata?.type,
        name: metadata?.name,
        description: metadata?.description,
        image: metadata?.image,
        logo: metadata?.icon,
        brand: metadata?.brand,
        location: metadata?.location,
        attributes: metadata?.attributes ?? [],
        metrics: metadata?.metrics ?? [],
      }
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

    // Mapping controller to LinkedResource > `controller` type
    try {
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

    // Mapping Token Metadata to linkedResource > `tokenMetadata` type
    // TODO: did:ixo:entity:abc123 -> chicken or egg problem
    try {
      const tokenMetadata = {
        id: 'did:ixo:entity:abc123', // TODO: An IID that identifies the asset that this token represents
        type: metadata?.type,
        name: metadata?.name,
        tokenName: metadata?.tokenName,
        decimals: metadata?.decimals,
        description: metadata?.description,
        image: metadata?.image,
        properties: {
          denom: metadata?.denom,
          icon: metadata?.icon,
          maxSupply: metadata?.maxSupply,
          attributes: _.mapValues(_.keyBy(metadata?.attributes, 'key'), 'value'),
          metrics: metadata?.metrics,
        },
      }
      const { result: cid } = (await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(tokenMetadata))}`,
        cellNodeEndpoint!,
      )) as any
      if (cid) {
        linkedResource.push({
          id: `did:ixo:entity:abc123#${cid}`, // TODO:
          type: 'tokenMetadata',
          description: metadata.description!,
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${cid}`,
          proof: cid,
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('Mapping Token Metadata to linkedResource', e)
    }

    // Mapping claims to linkedResource > `claims` type
    try {
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

    // Mapping tags to linkedResource > `filters` type
    try {
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
  const handleCreateAssetClass = async (inheritEntityDid: string): Promise<string> => {
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

  /**
   * @idea create entity class and get entityClassDid from response & create entity with entityClassDid
   * @returns
   */
  const handleCreate = async (): Promise<void> => {
    gotoStep(1)
    return

    const entityClassDid: string = await handleCreateEntityClass()
    // probably entityClassDid = did:ixo:entity:asset
    if (!entityClassDid) {
      Toast.errorToast(`Creating Entity Class Failed`)
      return
    } else {
      Toast.successToast(`Creating Entity Class Succeed`)
    }

    const assetClassDid: string = await handleCreateAssetClass(entityClassDid)
    if (!assetClassDid) {
      Toast.errorToast(`Creating Asset Class Failed`)
      return
    } else {
      Toast.successToast(`Creating Asset Class Succeed`)
    }

    gotoStep(1)

    // removeAssetInstances()
    // const entityClassDid = await createEntityClass()
    // if (!entityClassDid) {
    //   return
    // }
    // updateEntityClassDid(entityClassDid)
    // const assetClassDid = await createEntity(entityClassDid, [
    //   {
    //     metadata,
    //     service,
    //     claims: linkedResource.claim.data,
    //     page,
    //   },
    // ])
    // if (!assetClassDid) {
    //   return
    // }
    // updateAssetClassDid(assetClassDid)
    // gotoStep(1)
  }

  return (
    <PageWrapper>
      <PageRow>
        <Typography variant='secondary' size='xl'>
          Preview. Please check if everything is correct before continuing.
        </Typography>
      </PageRow>

      <PageRow className='align-items-center justify-content-between'>
        <CardWidthBox className='d-flex align-items-center justify-content-between'>
          <Typography weight='bold' size='xl'>
            {metadata?.name}
          </Typography>
          <CollectionIcon background={metadata?.icon} />
        </CardWidthBox>
        <LocalisationForm localisation={localisation} />
      </PageRow>

      <PageRow style={{ gap: 30 }}>
        <AssetCollectionImage
          image={metadata?.image}
          sdgs={ddoTags.find((tag) => tag.category === 'SDG')?.tags ?? []}
        />
        <TokenMetadata
          brandName={metadata?.brand}
          description={metadata?.description}
          metrics={metadata?.metrics}
          attributes={metadata?.attributes}
        />
      </PageRow>

      <PageRow className='align-items-end'>
        <AssetCard
          noIdx={1}
          image={metadata?.image || ''}
          icon={metadata?.icon || ''}
          name={metadata?.name || ''}
          type={metadata?.type as EAssetType}
          tokenName={(metadata as TAssetMetadataModel)?.tokenName || ''}
          denom={(metadata as TAssetMetadataModel)?.denom || ''}
          maxSupply={(metadata as TAssetMetadataModel)?.maxSupply || 0}
          price={230} // TODO:
          style={{ opacity: 0.5 }}
        />

        <Box className='w-100 d-flex justify-content-end' style={{ gap: 16 }}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
            Back
          </Button>
          <Button variant={'primary'} onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </PageRow>
    </PageWrapper>
  )
}

export default PreviewClass
