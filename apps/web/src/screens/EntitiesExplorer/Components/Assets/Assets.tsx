import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Button } from 'screens/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { TButtonProps } from 'screens/CreateEntity/Components/Button'
import AssetCard from './AssetCard'
import { AssetCardSelection, AssetCardWrapper } from './AssetCard.styles'

import { ReactComponent as PlusIcon } from '/public/assets/images/icon-plus.svg'
import { ReactComponent as WalletIcon } from '/public/assets/images/icon-wallet-solid.svg'
import { ReactComponent as CloseIcon } from '/public/assets/images/icon-close.svg'
import { ReactComponent as GlobeIcon } from '/public/assets/images/icon-globe.svg'
import { ReactComponent as IconCheck } from '/public/assets/images/icon-check-big.svg'
import { ReactComponent as DiamondIcon } from '/public/assets/images/icon-diamond.svg'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { deviceWidth } from 'constants/device'
import { useMediaQuery } from 'react-responsive'
import { useMantineTheme } from '@mantine/core'
import { useAccount } from 'hooks/account'
import { useGetAssetDevicesByCollectionIdAndOwner } from 'graphql/entities'

let timer: any = null

const FilterButton: React.FC<TButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      size='custom'
      width={150}
      height={40}
      textSize='xl'
      textTransform='capitalize'
      textWeight='normal'
      style={{ padding: '0.5rem 0rem' }}
      {...rest}
    >
      {children}
    </Button>
  )
}

interface Props {
  collectionId: string
  collectionName: string
  entities: any[]
}

const Assets: React.FC<Props> = (props) => {
  const theme = useMantineTheme()
  const { address } = useAccount()
  const { data: myEntities } = useGetAssetDevicesByCollectionIdAndOwner(props.collectionId, address)
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const itemsPerScreen = useMemo(() => (!isMobile ? (!isTablet ? 4 : 2) : 1), [isTablet, isMobile])
  const [scrollOffset, setScrollOffset] = useState(1)
  const [selections, setSelections] = useState(new Array(props.entities.length).fill(false))
  const [selecting, setSelecting] = useState(false)
  const [filterBy, setFilterBy] = useState<'all' | 'on-sale' | 'owned'>('all')
  const myEntityIds = useMemo(() => myEntities.map((v: any) => v.id), [myEntities])

  const [entities, hasMore] = useMemo(() => {
    let entities = props.entities
    switch (filterBy) {
      case 'all':
        break
      case 'on-sale':
        break
      case 'owned':
        entities = entities.filter((entity) => myEntityIds.includes(entity.id))
        break
      default:
        break
    }
    const slicedEntities = entities.slice(0, scrollOffset * 4)
    const hasMore = slicedEntities.length < entities.length
    return [slicedEntities, hasMore]
  }, [scrollOffset, props.entities, filterBy, myEntityIds])

  const handleSelecting = () => {
    setSelecting((prev) => !prev)
    setSelections(new Array(entities.length).fill(false))
  }

  const handleAssetCardClick = (index: number) => () => {
    if (selecting) {
      setSelections((prev) => prev.map((_, idx) => (idx === index ? !_ : _)))
    } else {
      console.log('navigating asset overview page')
    }
  }

  return (
    <FlexBox $direction='column' width='100%' $gap={7.5}>
      {/* Filter */}
      <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
        <FlexBox $gap={2.5} $flexWrap='wrap'>
          <FilterButton
            variant={filterBy === 'all' ? 'primary' : 'tertiary'}
            icon={
              <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                <GlobeIcon />
              </SvgBox>
            }
            onClick={() => setFilterBy('all')}
          >
            All Tokens
          </FilterButton>
          <FilterButton
            variant={filterBy === 'on-sale' ? 'primary' : 'tertiary'}
            icon={
              <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                <DiamondIcon />
              </SvgBox>
            }
            onClick={() => setFilterBy('on-sale')}
            disabled
          >
            On Sale
          </FilterButton>
          <FilterButton
            variant={filterBy === 'owned' ? 'primary' : 'tertiary'}
            icon={
              <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                <WalletIcon />
              </SvgBox>
            }
            onClick={() => setFilterBy('owned')}
          >
            My Tokens
          </FilterButton>
        </FlexBox>
        {/* TODO: remove actions for now */}
        <FlexBox $gap={2.5} style={{ display: 'none' }}>
          {!selecting ? (
            <FilterButton
              variant='primary'
              icon={
                <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                  <PlusIcon />
                </SvgBox>
              }
              onClick={handleSelecting}
            >
              Select
            </FilterButton>
          ) : (
            <>
              <FilterButton
                variant='primary'
                icon={
                  <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                    <WalletIcon />
                  </SvgBox>
                }
              >
                Buy
              </FilterButton>
              <FilterButton
                variant='tertiary'
                icon={
                  <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                    <CloseIcon />
                  </SvgBox>
                }
                onClick={handleSelecting}
              >
                Cancel
              </FilterButton>
            </>
          )}
        </FlexBox>
      </FlexBox>

      <InfiniteScroll
        dataLength={props.entities.length} // This is important field to render the next data
        next={() => {
          timer = setTimeout(() => {
            setScrollOffset((scrollOffset) => scrollOffset + 1)
            clearTimeout(timer)
          }, 1000 * 3)
        }}
        hasMore={hasMore}
        columns={itemsPerScreen}
        $gridGap={7.5}
        $scrollableTarget={document.querySelector('.mantine-ScrollArea-viewport')}
      >
        {entities.map((asset, index) => (
          <AssetCardWrapper key={index} onClick={handleAssetCardClick(index)}>
            {selecting && (
              <AssetCardSelection selected={selections[index]}>{selections[index] && <IconCheck />}</AssetCardSelection>
            )}
            <AssetCard collectionName={props.collectionName} entity={asset} />
          </AssetCardWrapper>
        ))}
      </InfiniteScroll>
    </FlexBox>
  )
}

export default Assets
