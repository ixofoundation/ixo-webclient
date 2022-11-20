import { Box, theme, Typography } from 'modules/App/App.styles'
import { Button } from 'pages/CreateEntity/components'
import React, { useState } from 'react'
import { useCreateEntityState } from 'states/createEntity/createEntity.hooks'
import { AssetCard } from '../PreviewClass'
import {
  AssetCollectionImage,
  TokenMetadata,
} from '../PreviewClass/PreviewClass'
import {
  CardWidthBox,
  CollectionIcon,
} from '../PreviewClass/PreviewClass.styles'
import { PageWrapper, PageRow } from './CreateToken.styles'
import IndividualToken from './IndividualToken'
import NewTokenTemplate from './NewTokenTemplate'

const CreateToken: React.FC = (): JSX.Element => {
  const {
    metadata,
    tags,
    claims,
    creator,
    payments,
    liquidity,
    linkedResource,
    service,
    assetClassDid,
    assetInstances,
    localisation,
    gotoStep,
    createEntity,
    addAssetInstances,
  } = useCreateEntityState()
  const [selectedToken, setSelectedToken] = useState(undefined)

  const handleAddNewTokens = (numberOfTokens: number): void => {
    // fork collection
    addAssetInstances(
      new Array(Number(numberOfTokens)).fill(0).map(() => ({
        metadata,
        tags,
        claims,
        creator,
        service,
        payments,
        liquidity,
        linkedResource,
        localisation,
      })),
    )
  }

  const handleCreate = async (): Promise<void> => {
    if (assetInstances && assetInstances.length > 0) {
      await createEntity(
        assetClassDid,
        assetInstances.map((item) => ({
          metadata: item.metadata,
          service: [],
          tags: item.tags,
          claims: item.claims,
          page: item.page,
        })),
      )
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
      <PageWrapper className="mb-5">
        <PageRow>
          <Typography
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="20px"
            lineHeight="23px"
            letterSpacing="0.3"
          >
            Set up the individual Impact Tokens inside the Asset Class.
            <br />
            Click on an individual token to set its custom attributes (image,
            name, linked resources...)
          </Typography>
        </PageRow>

        <PageRow style={{ gap: 16 }}>
          <Button variant="secondary" onClick={(): void => gotoStep(-1)}>
            <Typography
              color="inherit"
              fontSize="20px"
              lineHeight="24px"
              fontWeight={700}
            >
              Back
            </Typography>
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Typography
              color="inherit"
              fontSize="20px"
              lineHeight="24px"
              fontWeight={700}
            >
              Sign To Create
            </Typography>
          </Button>
        </PageRow>
      </PageWrapper>

      <PageWrapper full>
        <PageRow>
          <CardWidthBox className="d-flex align-items-center justify-content-between">
            <Typography fontWeight={700} fontSize="20px" lineHeight="100%">
              {metadata?.name}
            </Typography>
            <CollectionIcon background={metadata?.icon} />
          </CardWidthBox>
        </PageRow>
        <PageRow className="align-items-end justify-content-between">
          <Box className="d-flex" style={{ gap: 30 }}>
            <AssetCollectionImage
              image={metadata?.image}
              sdgs={tags?.SDG ?? []}
            />
            <TokenMetadata
              brandName={metadata?.brandName}
              description={metadata?.description}
              metrics={metadata?.metrics}
              attributes={metadata?.attributes}
            />
          </Box>
          Search
        </PageRow>

        <PageRow
          className="w-100"
          style={{ height: 1, backgroundColor: theme.ixoLightGrey2 }}
        />

        <PageRow className="flex-wrap" style={{ gap: 30 }}>
          {assetInstances?.map((item, index) => (
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
            maxSupply={metadata?.maxSupply - assetInstances?.length}
            handleSubmit={handleAddNewTokens}
          />
        </PageRow>
      </PageWrapper>
    </>
  )
}

export default CreateToken
