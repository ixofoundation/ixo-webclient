import { FlexBox, GridContainer } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import CollectionCard from './CollectionCard'
import CollectionExplorer from './CollectionExplorer'
import { deviceWidth } from 'constants/device'
import { useMediaQuery } from 'react-responsive'
import { useGetAllCollections } from 'hooks/entities'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'hooks/window'

const AssetCollections: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })

  const history = useHistory()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const { data: collections } = useGetAllCollections()
  const selectedCollection = useMemo(
    () => collections.find((v: any) => v.id === collectionId),
    [collections, collectionId],
  )

  const onCollectionClick = (collectionId: string) => () => {
    const pathname = history.location.pathname
    const searchParams = new URLSearchParams(history.location.search)
    searchParams.append('collectionId', collectionId)
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }

  if (selectedCollection) {
    return <CollectionExplorer collection={selectedCollection} />
  }

  return (
    <GridContainer width='100%' columns={!isMobile ? (!isTablet ? 3 : 2) : 1} gridGap={10}>
      {collections.map((collection: any) => (
        <FlexBox key={collection.id} onClick={onCollectionClick(collection.id)}>
          <CollectionCard {...collection} />
        </FlexBox>
      ))}
    </GridContainer>
  )
}

export default AssetCollections
