import { TEntityModel } from 'api/blocksync/types/entities'
import { FlexBox, GridContainer, GridItem, theme } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { apiEntityToEntity } from 'utils/entities'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { Typography } from 'components/Typography'
import CollectionMetadata from './CollectionMetadata'
import Assets from './Assets'
import { getSDGIcon } from 'components/Modals/SelectionModal/SelectionModal'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { useAccount } from 'hooks/account'

interface Props {
  collection: any
  entities: any[]
  onBack: () => void
}

const CollectionExplorer: React.FC<Props> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const { cwClient } = useAccount()
  const [collection, setCollection] = useState<TEntityModel>()

  const logo = collection?.profile?.logo
  const image = collection?.token?.image
  const name = collection?.token?.name
  const tokenName = collection?.token?.tokenName

  const sdgs = collection?.tags
    ? collection.tags.find((item) => item && item.category === 'SDG' && Array.isArray(item.tags))?.tags ?? []
    : []

  useEffect(() => {
    setCollection(props.collection)
    apiEntityToEntity({ entity: props.collection, cwClient }, (key, value) => {
      setCollection((collection: any) => ({ ...collection, [key]: value }))
    })
    return () => {
      setCollection(undefined)
    }
  }, [props.collection, cwClient])

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
            <FlexBox direction='column'>
              <Typography weight='bold' size='2xl'>
                {tokenName}
              </Typography>
              <Typography size='md' color='color-2'>
                {name}
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
              onClick={props.onBack}
              textSize='base'
              textTransform='capitalize'
              icon={<ArrowLeftIcon />}
            >
              Back
            </Button>
          </FlexBox>
        </GridItem>
        <GridItem gridArea='c'>
          <FlexBox
            width='100%'
            height='190px'
            justifyContent='flex-end'
            borderRadius='8px'
            background={`url(${image}), linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%)`}
            backgroundSize='100%'
            backgroundPosition='center center'
            p={5}
            gap={2}
            color={theme.ixoWhite}
          >
            {sdgs.map((value, index) => {
              const sdgIcon = getSDGIcon(value)
              return <i key={index} className={sdgIcon.class} />
            })}
          </FlexBox>
        </GridItem>
        <GridItem gridArea='d'>{collection && <CollectionMetadata {...collection} />}</GridItem>
      </GridContainer>

      {/* Assets */}
      <Assets entities={props.entities} />
    </FlexBox>
  )
}

export default CollectionExplorer
