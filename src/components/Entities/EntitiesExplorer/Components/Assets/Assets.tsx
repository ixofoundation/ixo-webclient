import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { TButtonProps } from 'pages/CreateEntity/Components/Button'
import AssetCard from './AssetCard'
import { AssetCardSelection, AssetCardWrapper } from './AssetCard.styles'

import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet-solid.svg'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ReactComponent as GlobeIcon } from 'assets/images/icon-globe.svg'
import { ReactComponent as IconCheck } from 'assets/images/icon-check-big.svg'
import { ReactComponent as DiamondIcon } from 'assets/images/icon-diamond.svg'
import { InfiniteScroll } from 'components/InfiniteScroll'

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
  entities: any[]
}

const Devices: React.FC<Props> = (props) => {
  const itemsPerScreen = 4
  const [scrollOffset, setScrollOffest] = useState(1)
  const entities = useMemo(() => props.entities.slice(0, scrollOffset * itemsPerScreen), [scrollOffset, props.entities])
  const [selections, setSelections] = useState(new Array(props.entities.length).fill(false))
  const [selecting, setSelecting] = useState(false)
  const [filterBy, setFilterBy] = useState<'all' | 'on-sale' | 'owned'>('all')

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
    <FlexBox direction='column' width='100%' gap={7.5}>
      {/* Filter */}
      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <FlexBox gap={2.5}>
          <FilterButton
            variant={filterBy === 'all' ? 'primary' : 'tertiary'}
            icon={
              <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
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
              <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
                <DiamondIcon />
              </SvgBox>
            }
            onClick={() => setFilterBy('on-sale')}
          >
            On Sale
          </FilterButton>
          <FilterButton
            variant={filterBy === 'owned' ? 'primary' : 'tertiary'}
            icon={
              <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
                <WalletIcon />
              </SvgBox>
            }
            onClick={() => setFilterBy('owned')}
          >
            My Tokens
          </FilterButton>
        </FlexBox>
        <FlexBox gap={2.5}>
          {!selecting ? (
            <FilterButton
              variant='primary'
              icon={
                <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
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
                  <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
                    <WalletIcon />
                  </SvgBox>
                }
              >
                Buy
              </FilterButton>
              <FilterButton
                variant='tertiary'
                icon={
                  <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
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
        dataLength={entities.length} //This is important field to render the next data
        next={() => {
          setTimeout(() => {
            setScrollOffest((scrollOffset) => scrollOffset + 1)
          }, 1000 * 3)
        }}
        hasMore={entities.length < props.entities.length}
        columns={4}
      >
        {entities.map((asset, index) => (
          <AssetCardWrapper key={index} onClick={handleAssetCardClick(index)}>
            {selecting && (
              <AssetCardSelection selected={selections[index]}>{selections[index] && <IconCheck />}</AssetCardSelection>
            )}
            <AssetCard entity={asset} />
          </AssetCardWrapper>
        ))}
      </InfiniteScroll>
    </FlexBox>
  )
}

export default Devices
