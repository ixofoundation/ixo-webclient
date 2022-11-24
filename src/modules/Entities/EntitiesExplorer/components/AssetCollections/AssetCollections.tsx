import React, { useState } from 'react'
import { Typography } from 'modules/App/App.styles'
import {
  AssetCollectionsWrapper,
  AssetCollectionsSortWrapper,
  AssetCollectionsSort,
  AssetCollectionsContainer,
} from './AssetCollections.styles'
import { ReactComponent as SortIcon } from 'assets/images/icon-sort.svg'
import { ReactComponent as SortAtoZIcon } from 'assets/images/icon-sort-atoz.svg'
import { SortOptions, TAssetCollection } from './types'
import AssetCollection from './AssetCollectionCard'
import { AssetCollectionOverview } from '../AssetCollectionOverview'
import { AssetExplorer } from '../AssetExplorer'

const assetCollections: TAssetCollection[] = [
  {
    id: 'did:ixo:111',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['icon-sdg-nopoverty', 'icon-sdg-zerohunger'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
    creator: 'SuperMoto Clean Cooking',
    minted: `31/09/2022`,
    maxSupply: 1000,
    owned: 630,
    highestPrice: 240,
    lowestPrice: 120,
    carbonCredits: 3430,
    location: 'Malawi District Y',
    make: 'SupaMoto',
    model: 'BurnaBoy',
    efficiency: 85,
    monthlyRevenue: 8.9,
  },
  {
    id: 'did:ixo:222',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['icon-sdg-nopoverty', 'icon-sdg-zerohunger'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
    creator: 'SuperMoto Clean Cooking',
    minted: `31/09/2022`,
    maxSupply: 1000,
    owned: 630,
    highestPrice: 240,
    lowestPrice: 120,
    carbonCredits: 3430,
    location: 'Malawi District Y',
    make: 'SupaMoto',
    model: 'BurnaBoy',
    efficiency: 85,
    monthlyRevenue: 8.9,
  },
  {
    id: 'did:ixo:333',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['icon-sdg-nopoverty', 'icon-sdg-zerohunger'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
    creator: 'SuperMoto Clean Cooking',
    minted: `31/09/2022`,
    maxSupply: 1000,
    owned: 630,
    highestPrice: 240,
    lowestPrice: 120,
    carbonCredits: 3430,
    location: 'Malawi District Y',
    make: 'SupaMoto',
    model: 'BurnaBoy',
    efficiency: 85,
    monthlyRevenue: 8.9,
  },
]

const AssetCollections = (): JSX.Element => {
  const [sortBy, setSortBy] = useState(SortOptions.Newest)
  const [selectedCollection, setSelectedCollection] = useState<TAssetCollection | undefined>(undefined)

  const handleSort = (type: SortOptions): void => setSortBy(type)

  const handleCollectionClick = (collection: TAssetCollection): void => {
    setSelectedCollection(collection)
  }

  if (selectedCollection) {
    return (
      <>
        <AssetCollectionOverview
          collection={selectedCollection}
          handleBack={(): void => setSelectedCollection(undefined)}
        />
        <AssetExplorer />
      </>
    )
  }
  return (
    <AssetCollectionsWrapper>
      <AssetCollectionsSortWrapper>
        <AssetCollectionsSort
          isActive={sortBy === SortOptions.Newest}
          onClick={(): void => handleSort(SortOptions.Newest)}
        >
          <Typography fontWeight={500} fontSize={'18px'} lineHeight={'21px'}>
            Newest
          </Typography>
          <SortIcon />
        </AssetCollectionsSort>
        <AssetCollectionsSort isActive={sortBy === SortOptions.Name} onClick={(): void => handleSort(SortOptions.Name)}>
          <Typography fontWeight={500} fontSize={'18px'} lineHeight={'21px'}>
            Name
          </Typography>
          <SortAtoZIcon />
        </AssetCollectionsSort>
        <AssetCollectionsSort
          isActive={sortBy === SortOptions.Price}
          onClick={(): void => handleSort(SortOptions.Price)}
        >
          <Typography fontWeight={500} fontSize={'18px'} lineHeight={'21px'}>
            Price
          </Typography>
          <SortIcon />
        </AssetCollectionsSort>
      </AssetCollectionsSortWrapper>
      <AssetCollectionsContainer>
        {assetCollections.map((collection) => (
          <AssetCollection key={collection.id} collection={collection} onClick={handleCollectionClick} />
        ))}
      </AssetCollectionsContainer>
    </AssetCollectionsWrapper>
  )
}

export default AssetCollections
