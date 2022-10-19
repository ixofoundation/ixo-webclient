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
import AssetCollection from './AssetCollection'

const assetCollections: TAssetCollection[] = [
  {
    id: 'did:ixo:111',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['sdg1.svg', 'sdg2.svg'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
  },
  {
    id: 'did:ixo:222',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['sdg1.svg', 'sdg2.svg'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
  },
  {
    id: 'did:ixo:333',
    title: 'Clean Cooking',
    subTitle: 'Malawi Collection 2022',
    description:
      'This is the beginning of the “Context” text. The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto.The Clean Cooking Malawai Collection 2022 is the first collection of smart cooking stoves issued by SupaMoto. The stoves',
    totalSupply: 12000,
    sdgs: ['sdg1.svg', 'sdg2.svg'],
    image: 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c',
    logo: 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j',
  },
]

const AssetCollections = (): JSX.Element => {
  const [sortBy, setSortBy] = useState(SortOptions.Newest)

  const handleSort = (type: SortOptions): void => setSortBy(type)

  const handleCollectionClick = (collection: TAssetCollection): void => {
    // TODO: goto assetOverview
    console.log(111, collection)
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
        <AssetCollectionsSort
          isActive={sortBy === SortOptions.Name}
          onClick={(): void => handleSort(SortOptions.Name)}
        >
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
          <AssetCollection
            key={collection.id}
            collection={collection}
            onClick={handleCollectionClick}
          />
        ))}
      </AssetCollectionsContainer>
    </AssetCollectionsWrapper>
  )
}

export default AssetCollections
