import { getSDGIcon } from 'components/Modals/SelectionModal/SelectionModal'
import { Box, theme, Typography } from 'components/App/App.styles'
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
import { TAssetMetadataModel } from 'types/protocol'

export const TokenMetadata = ({ description, brandName, metrics, attributes }: any): JSX.Element => {
  const [tab, setTab] = useState<string>('Context')
  return (
    <TokenMetadataWrapper>
      <TokenMetadataTabs>
        {['Context', 'Metrics', 'Attributes'].map((item) => (
          <Typography
            key={item}
            color={item === tab ? theme.ixoNewBlue : theme.ixoColor1}
            fontSize='16px'
            lineHeight='19px'
            fontWeight={500}
            style={{ cursor: 'pointer' }}
            onClick={(): void => setTab(item)}
          >
            {item}
          </Typography>
        ))}
      </TokenMetadataTabs>
      {tab === 'Context' && (
        <>
          <Typography color='#828E94' fontSize='13px' lineHeight='15px' fontWeight={400} style={{ marginBottom: 8 }}>
            {description}
          </Typography>
          <Typography color='#828E94' fontSize='13px' lineHeight='15px' fontWeight={400}>
            Creator: {brandName}
          </Typography>
          <Typography color='#828E94' fontSize='13px' lineHeight='15px' fontWeight={400}>
            Minted: {new Date().toLocaleDateString()}
          </Typography>
        </>
      )}
      {tab === 'Metrics' && (
        <ul>
          {metrics?.map((metric: any, index: any) => (
            <li key={index}>
              <Typography fontSize='13px' lineHeight='15px' color='#828e94' fontWeight={600}>
                {metric.source}
              </Typography>{' '}
              <Typography fontSize='13px' lineHeight='15px' color='#828e94' fontWeight={400}>
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
              <Typography fontSize='13px' lineHeight='15px' color='#828e94' fontWeight={400}>
                {key}
              </Typography>
              {': '}
              <Typography fontSize='13px' lineHeight='15px' color='#828e94' fontWeight={600}>
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
        <Typography
          fontFamily={theme.secondaryFontFamily}
          fontWeight={400}
          fontSize='20px'
          lineHeight='23px'
          letterSpacing='0.3'
        >
          Preview. Please check if everything is correct before continuing.
        </Typography>
      </PageRow>

      <PageRow className='align-items-center justify-content-between'>
        <CardWidthBox className='d-flex align-items-center justify-content-between'>
          <Typography fontWeight={700} fontSize='20px' lineHeight='100%'>
            {(metadata as TAssetMetadataModel)?.name}
          </Typography>
          <CollectionIcon background={(metadata as TAssetMetadataModel)?.icon} />
        </CardWidthBox>
        <LocalisationForm localisation={localisation} />
      </PageRow>

      <PageRow style={{ gap: 30 }}>
        <AssetCollectionImage
          image={(metadata as TAssetMetadataModel)?.image}
          sdgs={linkedResource?.tags?.data?.SDG ?? []}
        />
        <TokenMetadata
          brandName={(metadata as TAssetMetadataModel)?.brandName}
          description={(metadata as TAssetMetadataModel)?.description}
          metrics={(metadata as TAssetMetadataModel)?.metrics}
          attributes={(metadata as TAssetMetadataModel)?.attributes}
        />
      </PageRow>

      <PageRow className='align-items-end'>
        <AssetCard
          noIdx={1}
          image={(metadata as TAssetMetadataModel)?.image || ''}
          icon={(metadata as TAssetMetadataModel)?.icon || ''}
          tokenName={(metadata as TAssetMetadataModel)?.tokenName || ''}
          name={(metadata as TAssetMetadataModel)?.name || ''}
          type={(metadata as TAssetMetadataModel)?.type}
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
