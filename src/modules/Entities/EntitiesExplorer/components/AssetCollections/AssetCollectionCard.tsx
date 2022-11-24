import { thousandSeparator } from 'common/utils/formatters'
import { Typography } from 'modules/App/App.styles'
import React from 'react'
import {
  AssetCollectionWrapper,
  AssetCollectionBackground,
  AssetCollectionContainer,
  AssetCollectionHeader,
  AssetCollectionHeaderText,
  AssetCollectionHeaderLogo,
  AssetCollectionDescription,
  AssetCollectionSdgs,
  AssetCollectionTotalSupply,
  SdgIcon,
} from './AssetCollectionCard.styles'
import { TAssetCollection } from './types'

interface Props {
  collection: TAssetCollection
  onClick: (collection: TAssetCollection) => void
}

const AssetCollection: React.FC<Props> = ({
  collection,
  onClick,
}): JSX.Element => {
  return (
    <AssetCollectionWrapper onClick={(): void => onClick(collection)}>
      <AssetCollectionBackground background={collection.image} />

      <AssetCollectionContainer>
        <AssetCollectionSdgs id="sdg">
          {collection.sdgs.map((sdg, index) => (
            <SdgIcon key={index} className={sdg} />
          ))}
        </AssetCollectionSdgs>

        <AssetCollectionHeader>
          <AssetCollectionHeaderText>
            <Typography
              fontWeight={700}
              fontSize="24px"
              lineHeight="28px"
              style={{ marginBottom: 5 }}
            >
              {collection.title}
            </Typography>
            <Typography fontWeight={400} fontSize="14px" lineHeight="16px">
              {collection.subTitle}
            </Typography>
          </AssetCollectionHeaderText>
          <AssetCollectionHeaderLogo src={collection.logo} alt="" />
        </AssetCollectionHeader>

        <AssetCollectionTotalSupply
          id="total-supply"
          fontWeight={400}
          fontSize="18px"
          lineHeight="24px"
        >
          {thousandSeparator(collection.totalSupply, ',')} impact tokens
        </AssetCollectionTotalSupply>

        <AssetCollectionDescription
          id="description"
          fontWeight={400}
          fontSize="14px"
          lineHeight="16px"
        >
          {collection.description}
        </AssetCollectionDescription>
      </AssetCollectionContainer>
    </AssetCollectionWrapper>
  )
}

export default AssetCollection
