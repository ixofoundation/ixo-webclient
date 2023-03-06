import { Box, theme } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { AssetCard } from '../ReviewAssetClass'
import { AssetCollectionImage, TokenMetadata } from '../ReviewAssetClass/ReviewAssetClass'
import { CardWidthBox, CollectionIcon } from '../ReviewAssetClass/ReviewAssetClass.styles'
import { PageWrapper, PageRow } from './CreateToken.styles'
import IndividualToken from './IndividualToken'
import NewTokenTemplate from './NewTokenTemplate'
import { TAssetMetadataModel } from 'types/protocol'
import { Typography } from 'components/Typography'

const CreateToken: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const {
    ddoTags,
    claim,
    creator,
    administrator,
    linkedResource,
    service,
    page,
    accordedRight,
    linkedEntity,
    // assetClassDid,
    assetInstances,
    localisation,
    gotoStep,
    addAssetInstances,
  } = createEntityState
  const metadata: TAssetMetadataModel = createEntityState.metadata as TAssetMetadataModel

  const [selectedToken, setSelectedToken] = useState<any>(undefined)

  const handleAddNewTokens = (numberOfTokens: number): void => {
    console.log(111)
    // fork collection
    addAssetInstances(
      new Array(Number(numberOfTokens)).fill(0).map(() => ({
        metadata,
        ddoTags,
        claim,
        creator,
        administrator,
        service,
        linkedResource,
        accordedRight,
        linkedEntity,
        localisation,
        page,
      })),
    )
  }

  const handleCreate = async (): Promise<void> => {
    if (assetInstances && assetInstances.length > 0) {
      // await createEntity(
      //   assetClassDid,
      //   assetInstances.map((item: any) => ({
      //     metadata: item.metadata,
      //     profile: item.profile,
      //     service: [],
      //     tags: item.tags,
      //     claims: item.claims,
      //     page: item.page,
      //   })),
      // )
    }
  }

  if (selectedToken?.item && selectedToken?.index) {
    return (
      <IndividualToken
        SN={selectedToken.index}
        token={selectedToken.item}
        goBack={(): void => setSelectedToken(undefined)}
      />
    )
  }

  return (
    <>
      <PageWrapper className='mb-5'>
        <PageRow>
          <Typography variant='secondary' size='xl'>
            Set up the individual Impact Tokens inside the Asset Class.
            <br />
            Click on an individual token to set its custom attributes (image, name, linked resources...)
          </Typography>
        </PageRow>

        <PageRow style={{ gap: 16 }}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
            <Typography color='inherit' size='xl' weight='bold'>
              Back
            </Typography>
          </Button>
          <Button variant='primary' onClick={handleCreate}>
            <Typography color='inherit' size='xl' weight='bold'>
              Sign To Create
            </Typography>
          </Button>
        </PageRow>
      </PageWrapper>

      <PageWrapper full>
        <PageRow>
          <CardWidthBox className='d-flex align-items-center justify-content-between'>
            <Typography weight='bold' size='xl'>
              {metadata?.name}
            </Typography>
            <CollectionIcon background={metadata?.icon} />
          </CardWidthBox>
        </PageRow>
        <PageRow className='align-items-end justify-content-between'>
          <Box className='d-flex' style={{ gap: 30 }}>
            <AssetCollectionImage
              image={metadata?.image}
              sdgs={ddoTags.find((tag) => tag.category === 'SDG')?.tags ?? []}
            />
            <TokenMetadata
              brand={metadata?.brand}
              description={metadata?.description}
              metrics={metadata?.metrics}
              attributes={metadata?.attributes}
            />
          </Box>
          Search
        </PageRow>

        <PageRow className='w-100' style={{ height: 1, backgroundColor: theme.ixoGrey300 }} />

        <PageRow className='flex-wrap' style={{ gap: 30 }}>
          {assetInstances?.map((item: any, index: any) => (
            <AssetCard
              key={index}
              noIdx={index + 1}
              image={item.metadata?.image}
              icon={item.metadata?.icon}
              tokenName={item.metadata?.tokenName}
              name={item.metadata?.name}
              type={item.metadata?.type}
              denom={item.metadata?.denom}
              maxSupply={item.metadata?.maxSupply}
              price={230} //   TODO:
              onClick={(): void => setSelectedToken({ item, index: index + 1 })}
            />
          ))}
          <NewTokenTemplate
            maxSupply={metadata?.maxSupply ? metadata?.maxSupply - assetInstances?.length : undefined}
            handleSubmit={handleAddNewTokens}
          />
        </PageRow>
      </PageWrapper>
    </>
  )
}

export default CreateToken
