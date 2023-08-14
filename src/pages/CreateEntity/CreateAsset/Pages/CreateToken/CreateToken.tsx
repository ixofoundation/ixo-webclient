import { Box } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { AssetCard } from '../ReviewAssetClass'
import { AssetCollectionImage, TokenMetadata } from '../ReviewAssetClass/ReviewAssetClass'
import { CardWidthBox, CollectionIcon } from '../ReviewAssetClass/ReviewAssetClass.styles'
import { PageWrapper, PageRow } from './CreateToken.styles'
import IndividualToken from './IndividualToken'
import NewTokenTemplate from './NewTokenTemplate'
import { TAssetMetadataModel } from 'types/entities'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const CreateToken: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
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
  const profile: TAssetMetadataModel = createEntityState.profile as TAssetMetadataModel

  const [selectedToken, setSelectedToken] = useState<any>(undefined)

  const handleAddNewTokens = (numberOfTokens: number): void => {
    // fork collection
    addAssetInstances(
      new Array(Number(numberOfTokens)).fill(0).map(() => ({
        profile,
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
              {profile?.name}
            </Typography>
            <CollectionIcon background={profile?.logo} />
          </CardWidthBox>
        </PageRow>
        <PageRow className='align-items-end justify-content-between'>
          <Box className='d-flex' style={{ gap: 30 }}>
            <AssetCollectionImage
              image={profile?.image}
              sdgs={ddoTags.find((tag) => tag.category === 'SDG')?.tags ?? []}
            />
            <TokenMetadata
              brand={profile?.brand}
              description={profile?.description}
              metrics={profile?.metrics}
              attributes={profile?.attributes}
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
              image={item.profile?.image}
              logo={item.profile?.logo}
              tokenName={item.profile?.tokenName}
              name={item.profile?.name}
              type={item.profile?.type}
              denom={item.profile?.denom}
              maxSupply={item.profile?.maxSupply}
              price={189} //   TODO:
              onClick={(): void => setSelectedToken({ item, index: index + 1 })}
            />
          ))}
          <NewTokenTemplate
            maxSupply={profile?.maxSupply ? profile?.maxSupply - assetInstances?.length : undefined}
            handleSubmit={handleAddNewTokens}
          />
        </PageRow>
      </PageWrapper>
    </>
  )
}

export default CreateToken
