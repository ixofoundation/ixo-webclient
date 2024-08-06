import Image from 'next/image'
import { Button } from 'screens/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { TButtonProps } from 'screens/CreateEntity/Components/Button'
import AssetCard from './AssetCard'
import { AssetCardSelection, AssetCardWrapper } from './AssetCard.styles'

import { ReactComponent as IconCheck } from '/public/assets/images/icon-check-big.svg'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { deviceWidth } from 'constants/device'
import { useMediaQuery } from 'react-responsive'
import { Flex, useMantineTheme } from '@mantine/core'
import { useAccount } from 'hooks/account'
import { useGetAssetDevicesByCollectionIdAndOwner } from 'graphql/entities'
import { IconDiamond, IconPlus, IconWalletSolid, IconClose, IconGlobe } from 'components/IconPaths'

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
    <Flex direction='column' w='100%' gap={7.5}>
      {/* Filter */}
      <Flex w='100%' align='center' justify='space-between'>
        <Flex gap={2.5} wrap='wrap'>
          <FilterButton
            variant={filterBy === 'all' ? 'primary' : 'tertiary'}
            icon={<Image src={IconGlobe} alt='Globe' width={5} height={5} color={theme.colors.blue[5]} />}
            onClick={() => setFilterBy('all')}
          >
            All Tokens
          </FilterButton>
          <FilterButton
            variant={filterBy === 'on-sale' ? 'primary' : 'tertiary'}
            icon={<Image src={IconDiamond} alt='Diamond' width={5} height={5} color={theme.colors.blue[5]} />}
            onClick={() => setFilterBy('on-sale')}
            disabled
          >
            On Sale
          </FilterButton>
          <FilterButton
            variant={filterBy === 'owned' ? 'primary' : 'tertiary'}
            icon={<Image src={IconWalletSolid} alt='Wallet' width={5} height={5} color={theme.colors.blue[5]} />}
            onClick={() => setFilterBy('owned')}
          >
            My Tokens
          </FilterButton>
        </Flex>
        {/* TODO: remove actions for now */}
        <Flex gap={2.5} style={{ display: 'none' }}>
          {!selecting ? (
            <FilterButton
              variant='primary'
              icon={<Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />}
              onClick={handleSelecting}
            >
              Select
            </FilterButton>
          ) : (
            <>
              <FilterButton
                variant='primary'
                icon={<Image src={IconWalletSolid} alt='Wallet' width={5} height={5} color={theme.colors.blue[5]} />}
              >
                Buy
              </FilterButton>
              <FilterButton
                variant='tertiary'
                icon={<Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />}
                onClick={handleSelecting}
              >
                Cancel
              </FilterButton>
            </>
          )}
        </Flex>
      </Flex>

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
    </Flex>
  )
}

export default Assets
