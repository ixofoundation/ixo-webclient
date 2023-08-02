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
} from './ReviewAssetClass.styles'
import { EAssetType, TAssetMetadataModel } from 'types/entities'
import { Typography } from 'components/Typography'

export const TokenMetadata = ({ description, brand, metrics, attributes }: any): JSX.Element => {
  const [tab, setTab] = useState<string>('Context')
  return (
    <TokenMetadataWrapper>
      <TokenMetadataTabs>
        {['Context', 'Metrics', 'Attributes'].map((item) => (
          <Typography
            key={item}
            className='cursor-pointer'
            color={item === tab ? 'blue' : 'dark-blue'}
            weight='medium'
            onClick={(): void => setTab(item)}
          >
            {item}
          </Typography>
        ))}
      </TokenMetadataTabs>
      {tab === 'Context' && (
        <>
          <Typography color='grey700' size='xs' style={{ marginBottom: 8 }}>
            {description}
          </Typography>
          <Typography color='grey700' size='xs'>
            Creator: {brand}
          </Typography>
          <Typography color='grey700' size='xs'>
            Minted: {new Date().toLocaleDateString()}
          </Typography>
        </>
      )}
      {tab === 'Metrics' && (
        <ul>
          {metrics?.map((metric: any, index: any) => (
            <li key={index}>
              <Typography size='xs' color='grey700' weight='semi-bold'>
                {metric.source}
              </Typography>{' '}
              <Typography size='xs' color='grey700'>
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
              <Typography size='xs' color='grey700'>
                {key}
              </Typography>
              {': '}
              <Typography size='xs' color='grey700' weight='semi-bold'>
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

const ReviewAssetClass: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const {
    ddoTags,
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
  const profile: TAssetMetadataModel = createEntityState.profile as TAssetMetadataModel

  // const handleCreateEntityClass = async (): Promise<string> => {
  //   const data = { entityType: 'asset' }
  //   const res = await CreateEntity(signingClient, { address, did, pubKey: pubKeyUint8!, keyType }, [data])
  //   return utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
  // }

  // const mapToSDKLinkedResource = async (): Promise<LinkedResource[]> => {
  //   const linkedResource: LinkedResource[] = []

  //   // Mapping profile to LinkedResource > `profile` type
  //   try {
  //     const profile = {
  //       id: '', // TODO: ?
  //       '@type': metadata?.type,
  //       name: metadata?.name,
  //       description: metadata?.description,
  //       image: metadata?.image,
  //       logo: metadata?.icon,
  //       brand: metadata?.brand,
  //       location: metadata?.location,
  //       attributes: metadata?.attributes ?? [],
  //       metrics: metadata?.metrics ?? [],
  //     }
  //     console.log('mapToSDKLinkedResource', 'profile', profile)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(profile))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'profile',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping to LinkedResource > `profile` type', e)
  //   }

  //   // Mapping Creator to LinkedResource > `creator` type
  //   try {
  //     console.log('mapToSDKLinkedResource', 'creator', creator)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(creator))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'creator',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping Creator to LinkedResource > `creator` type', e)
  //   }

  //   // Mapping administrator to LinkedResource > `administrator` type
  //   try {
  //     console.log('mapToSDKLinkedResource', 'administrator', administrator)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(administrator))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'administrator',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping administrator to LinkedResource > `administrator` type', e)
  //   }

  //   // Mapping Token Metadata to linkedResource > `tokenMetadata` type
  //   // TODO: did:ixo:entity:abc123 -> chicken or egg problem
  //   try {
  //     const tokenMetadata = {
  //       id: 'did:ixo:entity:abc123', // TODO: An IID that identifies the asset that this token represents
  //       type: metadata?.type,
  //       name: metadata?.name,
  //       tokenName: metadata?.tokenName,
  //       decimals: metadata?.decimals,
  //       description: metadata?.description,
  //       image: metadata?.image,
  //       properties: {
  //         denom: metadata?.denom,
  //         icon: metadata?.icon,
  //         maxSupply: metadata?.maxSupply,
  //         attributes: _.mapValues(_.keyBy(metadata?.attributes, 'key'), 'value'),
  //         metrics: metadata?.metrics,
  //       },
  //     }
  //     console.log('mapToSDKLinkedResource', 'tokenMetadata', tokenMetadata)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(tokenMetadata))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'tokenMetadata',
  //         description: metadata.description!,
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping Token Metadata to linkedResource', e)
  //   }

  //   // Mapping claims to linkedResource > `claims` type
  //   try {
  //     console.log('mapToSDKLinkedResource', 'claim', claim)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(claim))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'claims',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping claim to linkedResource', e)
  //   }

  //   // Mapping tags to linkedResource > `filters` type
  //   try {
  //     console.log('mapToSDKLinkedResource', 'filters', ddoTags)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(ddoTags))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'filters',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping ddoTags to linkedResource')
  //   }

  //   // Mapping PageContent to linkedResource > `page` type
  //   try {
  //     console.log('mapToSDKLinkedResource', 'page', page)
  //     const { result: cid } = (await blocksyncApi.project.createPublic(
  //       `data:application/json;base64,${base64Encode(JSON.stringify(page))}`,
  //       cellNodeEndpoint!,
  //     )) as any
  //     if (cid) {
  //       linkedResource.push({
  //         id: `did:ixo:entity:abc123#${cid}`, // TODO:
  //         type: 'page',
  //         description: '',
  //         mediaType: 'application/json',
  //         serviceEndpoint: `#cellnode-pandora/public/${cid}`,
  //         proof: cid,
  //         encrypted: 'false',
  //         right: '',
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Mapping PageContent to linkedResource')
  //   }

  //   return linkedResource
  // }
  // const handleCreateAssetClass = async (inheritEntityDid: string): Promise<string> => {
  //   const context: Context[] = [{ key: 'class', val: inheritEntityDid }]

  //   const linkedResource: LinkedResource[] = await mapToSDKLinkedResource()
  //   const accordedRight: AccordedRight[] = []
  //   const linkedEntity: LinkedEntity[] = []

  //   const payload = {
  //     entityType,
  //     context,
  //     service,
  //     linkedResource,
  //     accordedRight,
  //     linkedEntity,
  //   }
  //   const res = await CreateEntity(signingClient, { address, did, pubKey: pubKeyUint8!, keyType }, [payload])
  //   return utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
  // }

  /**
   * @idea create entity class and get entityClassDid from response & create entity with entityClassDid
   * @returns
   */
  const handleCreate = async (): Promise<void> => {
    gotoStep(1)
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
            {profile?.name}
          </Typography>
          <CollectionIcon background={profile?.logo} />
        </CardWidthBox>
        <LocalisationForm localisation={localisation} />
      </PageRow>

      <PageRow style={{ gap: 30 }}>
        <AssetCollectionImage image={profile?.image} sdgs={ddoTags.find((tag) => tag.category === 'SDG')?.tags ?? []} />
        <TokenMetadata
          brandName={profile?.brand}
          description={profile?.description}
          metrics={profile?.metrics}
          attributes={profile?.attributes}
        />
      </PageRow>

      <PageRow className='align-items-end'>
        <AssetCard
          noIdx={1}
          image={profile?.image || ''}
          logo={profile?.logo || ''}
          name={profile?.name || ''}
          type={profile?.type as EAssetType}
          tokenName={(profile as TAssetMetadataModel)?.tokenName || ''}
          denom={(profile as TAssetMetadataModel)?.denom || ''}
          maxSupply={(profile as TAssetMetadataModel)?.maxSupply || 0}
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

export default ReviewAssetClass
