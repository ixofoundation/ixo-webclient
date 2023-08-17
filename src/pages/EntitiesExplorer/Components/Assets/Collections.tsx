import { FlexBox, GridContainer } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import CollectionCard from './CollectionCard'
import CollectionExplorer from './CollectionExplorer'
import { deviceWidth } from 'constants/device'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from 'redux/hooks'
import { selectCollections } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const AssetCollections: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const collections = useAppSelector(selectCollections)
  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState<number | undefined>(undefined)
  const selectedAsset = useMemo(
    () =>
      selectedCollectionIdx !== undefined ? collections.find((_, index) => index === selectedCollectionIdx) : undefined,
    [collections, selectedCollectionIdx],
  )

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
    <GridContainer width='100%' columns={!isMobile ? (!isTablet ? 3 : 2) : 1} gridGap={10}>
      {collections
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
