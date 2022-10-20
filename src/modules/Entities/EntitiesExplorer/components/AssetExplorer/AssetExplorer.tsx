import { Button } from 'common/components'
import { Typography } from 'modules/App/App.styles'
import React, { useState } from 'react'
import {
  AssetExplorerWrapper,
  Header,
  HeaderSearch,
  HeaderSort,
  HR,
  Body,
} from './AssetExplorer.styles'
import { ReactComponent as GlobeIcon } from 'assets/images/icon-globe.svg'
import { ReactComponent as DiamondIcon } from 'assets/images/icon-diamond.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as SortIcon } from 'assets/images/icon-sort.svg'
import AssetCard from './AssetCard'

const AssetExplorer = (): JSX.Element => {
  const [filterBy, setFilterBy] = useState('AllTokens')
  const [sortBy, setSortBy] = useState('Number')

  const handleSelect = (): void => {
    //
    console.log('select clicked')
  }

  return (
    <AssetExplorerWrapper>
      <Header>
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
              lineHeight="21px"
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
              lineHeight="21px"
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
              lineHeight="21px"
              color="#ffffff"
            >
              My Tokens
            </Typography>
          </Button>

          <HeaderSort
            active={sortBy === 'Number'}
            onClick={(): void => setSortBy('Number')}
          >
            <Typography fontWeight={500} fontSize="18px" lineHeight="21px">
              Number
            </Typography>
            <SortIcon />
          </HeaderSort>
          <HeaderSort
            active={sortBy === 'Price'}
            onClick={(): void => setSortBy('Price')}
          >
            <Typography fontWeight={500} fontSize="18px" lineHeight="21px">
              Price
            </Typography>
            <SortIcon />
          </HeaderSort>
          <HeaderSort
            active={sortBy === 'Performance'}
            onClick={(): void => setSortBy('Performance')}
          >
            <Typography fontWeight={500} fontSize="18px" lineHeight="21px">
              Performance
            </Typography>
            <SortIcon />
          </HeaderSort>
        </HeaderSearch>

        <Button active size="medium" onClick={handleSelect}>
          <PlusIcon />
          <Typography
            fontWeight={400}
            fontSize="18px"
            lineHeight="21px"
            color="#ffffff"
          >
            Select
          </Typography>
        </Button>
      </Header>

      <HR />

      <Body>
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
      </Body>
    </AssetExplorerWrapper>
  )
}

export default AssetExplorer
