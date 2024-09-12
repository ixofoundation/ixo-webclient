import { FlexBox, GridContainer } from 'components/CoreEntry/App.styles'
import React, { useMemo } from 'react'
import CollectionCard from './CollectionCard'
import CollectionExplorer from './CollectionExplorer'
import { deviceWidth } from 'constants/device'
import { useMediaQuery } from 'react-responsive'
import { useGetAllCollections } from 'graphql/entities'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'hooks/window'

const AssetCollections: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })

  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const { data: collections } = useGetAllCollections()
  const selectedCollection = useMemo(
    () => collections.find((v: any) => v.id === collectionId),
    [collections, collectionId],
  )

  const onCollectionClick = (collectionId: string) => () => {
    const searchParams = new URLSearchParams(search)
    searchParams.append('collectionId', collectionId)
    navigate({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }

  if (selectedCollection) {
    return <CollectionExplorer collection={selectedCollection} />
  }

  return (
    <GridContainer width='100%' columns={!isMobile ? (!isTablet ? 3 : 2) : 1} $gridGap={10}>
      {collections.map((collection: any) => (
        <FlexBox key={collection.id} onClick={onCollectionClick(collection.id)}>
          <CollectionCard {...collection} />
        </FlexBox>
      ))}
    </GridContainer>
  )
}

export default AssetCollections
