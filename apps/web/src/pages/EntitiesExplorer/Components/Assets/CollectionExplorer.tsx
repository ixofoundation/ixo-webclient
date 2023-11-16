import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { apiEntityToEntity } from 'utils/entities'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { Typography } from 'components/Typography'
import CollectionMetadata from './CollectionMetadata'
import Assets from './Assets'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { TEntityModel } from 'types/entities'
import CollectionCard from './CollectionCard'
import { useHistory } from 'react-router-dom'
import { useGetAssetDevicesByCollectionId } from 'graphql/entities'

interface Props {
  collection: any
}

const CollectionExplorer: React.FC<Props> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })

  const history = useHistory()
  const { data: assetDevices } = useGetAssetDevicesByCollectionId(props.collection.id)
  const [collection, setCollection] = useState<TEntityModel>()

  const logo = collection?.token?.properties?.icon
  const collectionId = collection?.id
  const collectionName = collection?.profile?.name
  const name = collection?.token?.name

  useEffect(() => {
    setCollection(props.collection)
    apiEntityToEntity({ entity: props.collection }, (key, value) => {
      setCollection((collection: any) => ({ ...collection, [key]: value }))
    })
    return () => {
      setCollection(undefined)
    }
  }, [props.collection])

  const onBack = () => {
    const pathname = history.location.pathname
    const searchParams = new URLSearchParams(history.location.search)
    searchParams.delete('collectionId')
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <FlexBox width='100%' direction='column' gap={8}>
      {/* Collection overview */}
      <GridContainer
        width='100%'
        columns={!isMobile ? (!isTablet ? 4 : 2) : 1}
        gridGap={7.5}
        gridTemplateAreas={!isMobile ? (!isTablet ? `"a b b b""c d d d"` : `"a b""c d"`) : `"b""a""c""d"`}
      >
        <GridItem gridArea='a'>
          <FlexBox alignItems='center' justifyContent='space-between'>
            <FlexBox direction='column' style={{ flex: 1 }}>
              <Typography weight='bold' size='2xl'>
                {name}
              </Typography>
              <Typography size='md' color='color-2'>
                {collectionName}
              </Typography>
            </FlexBox>
            <FlexBox
              borderRadius='100%'
              width='40px'
              height='40px'
              background={`url(${logo}), #ffffff`}
              backgroundPosition='center center'
              backgroundSize='100%'
            />
          </FlexBox>
        </GridItem>
        <GridItem gridArea='b'>
          <FlexBox width='100%' justifyContent='flex-end'>
            <Button
              variant='white'
              onClick={onBack}
              textSize='base'
              textTransform='capitalize'
              icon={<ArrowLeftIcon />}
            >
              Back
            </Button>
          </FlexBox>
        </GridItem>
        <GridItem gridArea='c'>
          <CollectionCard {...props.collection} />
        </GridItem>
        <GridItem gridArea='d'>{collection && <CollectionMetadata {...collection} />}</GridItem>
      </GridContainer>

      {/* Assets */}
      <Assets
        collectionId={collectionId!}
        collectionName={collectionName!}
        entities={[...assetDevices].sort((a: any, b: any) => {
          if (Number(a.alsoKnownAs.replace('{id}#', '')) > Number(b.alsoKnownAs.replace('{id}#', ''))) {
            return 1
          }
          return -1
        })}
      />
    </FlexBox>
  )
}

export default CollectionExplorer
