import { FlexBox, GridContainer } from 'components/App/App.styles'
import React, { useEffect, useMemo, useState } from 'react'
import { BlockSyncService } from 'services/blocksync'
import CollectionCard from './CollectionCard'
import CollectionExplorer from './CollectionExplorer'

const bsService = new BlockSyncService()

const AssetCollections: React.FC = () => {
  const [assets, setAssets] = useState<{ collection: any; entities: any[] }[]>([])
  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState<number | undefined>(undefined)
  const selectedAsset = useMemo(
    () =>
      selectedCollectionIdx !== undefined ? assets.find((_, index) => index === selectedCollectionIdx) : undefined,
    [assets, selectedCollectionIdx],
  )

  useEffect(() => {
    bsService.entity.getCollections().then(setAssets)
  }, [])

  if (selectedAsset) {
    return (
      <CollectionExplorer
        collection={selectedAsset.collection}
        entities={selectedAsset.entities}
        onBack={() => setSelectedCollectionIdx(undefined)}
      />
    )
  }

  return (
    <GridContainer width='100%' columns={3} gridGap={10}>
      {assets
        .map(({ collection }) => collection)
        .map((collection: any, index) => (
          <FlexBox key={index} onClick={() => setSelectedCollectionIdx(index)}>
            <CollectionCard {...collection} />
          </FlexBox>
        ))}
    </GridContainer>
  )
}

export default AssetCollections
