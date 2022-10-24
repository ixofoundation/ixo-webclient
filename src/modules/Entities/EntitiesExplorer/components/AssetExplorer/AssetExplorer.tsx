import { Button } from 'common/components'
import { Box, Typography } from 'modules/App/App.styles'
import React, { useEffect, useState } from 'react'
import {
  AssetExplorerWrapper,
  Header,
  HeaderSearch,
  // HeaderSort,
  Body,
  HeaderRow,
} from './AssetExplorer.styles'
import { ReactComponent as GlobeIcon } from 'assets/images/icon-globe.svg'
import { ReactComponent as DiamondIcon } from 'assets/images/icon-diamond.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
// import { ReactComponent as SortIcon } from 'assets/images/icon-sort.svg'
import AssetCard from './AssetCard'

const AssetExplorer = (): JSX.Element => {
  const assetsLength = 9
  const [filterBy, setFilterBy] = useState('AllTokens')
  // const [sortBy, setSortBy] = useState('Number')
  const [selecting, setSelecting] = useState(false)
  const [selections, setSelections] = useState(
    new Array(assetsLength).fill(false),
  )
  const [actives, setActives] = useState(new Array(assetsLength).fill(false)) // TODO: my assets

  const filterDom = document.querySelector('[data-testid="EntitiesFilter"]')
  useEffect(() => {
    if (filterDom) {
      filterDom.setAttribute('style', 'display: none;')
    }
    return (): void => {
      if (filterDom) {
        filterDom.setAttribute('style', 'display: block;')
      }
    }
  }, [filterDom])

  useEffect(() => {
    const newArray = new Array(9).fill(false)
    newArray[0] = true
    newArray[1] = true
    setActives(newArray)
  }, [])

  const handleSelect = (): void => {
    setSelecting((prev) => !prev)
    setSelections(new Array(assetsLength).fill(false))
  }

  const handleAssetCardClick = (index: number): void => {
    if (selecting) {
      setSelections((prev) => prev.map((_, idx) => (idx === index ? !_ : _)))
    } else {
      console.log('navigating asset overview page')
    }
  }

  const handleBuy = (): void => {
    console.log('Selected Assets:', selections)
  }

  return (
    <AssetExplorerWrapper>
      <Header className="row">
        <HeaderRow className="col-12 d-flex justify-content-between">
          <HeaderSearch>
            <Button
              active={filterBy === 'AllTokens'}
              size="medium"
              onClick={(): void => setFilterBy('AllTokens')}
            >
              <GlobeIcon />
              <Typography
                fontWeight={400}
                fontSize="18px"
                lineHeight="18px"
                color="#ffffff"
              >
                All Tokens
              </Typography>
            </Button>
            <Button
              active={filterBy === 'OnSale'}
              size="medium"
              onClick={(): void => setFilterBy('OnSale')}
            >
              <DiamondIcon />
              <Typography
                fontWeight={400}
                fontSize="18px"
                lineHeight="18px"
                color="#ffffff"
              >
                On sale
              </Typography>
            </Button>
            <Button
              active={filterBy === 'MyTokens'}
              size="medium"
              onClick={(): void => setFilterBy('MyTokens')}
            >
              <WalletIcon />
              <Typography
                fontWeight={400}
                fontSize="18px"
                lineHeight="18px"
                color="#ffffff"
              >
                My Tokens
              </Typography>
            </Button>

            {/* <HeaderSort
              active={sortBy === 'Number'}
              onClick={(): void => setSortBy('Number')}
            >
              <Typography fontWeight={500} fontSize="18px" lineHeight="18px">
                Number
              </Typography>
              <SortIcon />
            </HeaderSort>
            <HeaderSort
              active={sortBy === 'Price'}
              onClick={(): void => setSortBy('Price')}
            >
              <Typography fontWeight={500} fontSize="18px" lineHeight="18px">
                Price
              </Typography>
              <SortIcon />
            </HeaderSort>
            <HeaderSort
              active={sortBy === 'Performance'}
              onClick={(): void => setSortBy('Performance')}
            >
              <Typography fontWeight={500} fontSize="18px" lineHeight="18px">
                Performance
              </Typography>
              <SortIcon />
            </HeaderSort> */}
          </HeaderSearch>

          {!selecting ? (
            <Button active={true} size="medium" onClick={handleSelect}>
              <PlusIcon />
              <Typography
                fontWeight={400}
                fontSize="18px"
                lineHeight="18px"
                color="#ffffff"
              >
                Select
              </Typography>
            </Button>
          ) : (
            <Box className="d-flex" style={{ gap: 10 }}>
              <Button active={true} size="medium" onClick={handleBuy}>
                <WalletIcon />
                <Typography
                  fontWeight={400}
                  fontSize="18px"
                  lineHeight="18px"
                  color="#ffffff"
                >
                  Buy
                </Typography>
              </Button>
              <Button active={true} size="medium" onClick={handleSelect}>
                <CloseIcon />
                <Typography
                  fontWeight={400}
                  fontSize="18px"
                  lineHeight="18px"
                  color="#ffffff"
                >
                  Cancel
                </Typography>
              </Button>
            </Box>
          )}
        </HeaderRow>
      </Header>

      <Body className="row mt-3">
        {new Array(9).fill(0).map((_, index) => (
          <Box key={index} className="col-3 p-0">
            <AssetCard
              active={actives[index]}
              selected={selections[index]}
              isSelecting={selecting}
              onClick={(): void => handleAssetCardClick(index)}
            />
          </Box>
        ))}
      </Body>
    </AssetExplorerWrapper>
  )
}

export default AssetExplorer
