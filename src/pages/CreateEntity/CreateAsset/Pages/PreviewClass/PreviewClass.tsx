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
  const {
    metadata,
    profile,
    creator,
    controller,
    tags,
    page,
    service,
    claim,
    linkedResource,
    accordedRight,
    linkedEntity,
    localisation,
    gotoStep,
    updateEntityClassDid,
    updateAssetClassDid,
    createEntityClass,
    createEntity,
    removeAssetInstances,
  } = useCreateEntityState()

  const handleCreate = async (): Promise<void> => {
    console.log(11111, {
      service,
      linkedResource: {
        profile: metadata,
        creator,
        controller,
        tags,
        page,
        claim,
        extra: linkedResource,
      },
      accordedRight,
      linkedEntity,
    })
    return

    removeAssetInstances()
    const entityClassDid = await createEntityClass()
    if (!entityClassDid) {
      return
    }
    updateEntityClassDid(entityClassDid)
    const assetClassDid = await createEntity(entityClassDid, [
      {
        metadata,
        service,
        tags: linkedResource.tags.data,
        claims: linkedResource.claim.data,
        page,
      },
    ])
    if (!assetClassDid) {
      return
    }
    updateAssetClassDid(assetClassDid)
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
        <AssetCollectionImage image={profile?.image} sdgs={linkedResource?.tags?.data?.SDG ?? []} />
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
          icon={profile?.logo || ''}
          name={profile?.name || ''}
          type={profile['@type'] as EAssetType}
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
