import { Coin } from '@cosmjs/proto-signing'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React, { useState } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import AssetBalanceCard from './AssetBalanceCard'
import AssetTransactionTable from './AssetTransactionTable'

const Portfolio: React.FC = () => {
  const { displayBalances } = useAccount()
  const [selectedAsset, setSelectedAsset] = useState<Coin | undefined>(undefined)

  return (
    <FlexBox width='100%' direction='column' gap={4}>
      <Typography variant='secondary' size='2xl'>
        Assets
      </Typography>
      <FlexBox width='100%' gap={4} mb={4}>
        {displayBalances.map((balance, index) => (
          <AssetBalanceCard key={index} asset={balance} onClick={() => setSelectedAsset(balance)} />
        ))}
      </FlexBox>

      {selectedAsset && (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography variant='secondary' size='2xl'>
              Reserve Account Transactions ({selectedAsset.denom})
            </Typography>
            <Button variant='secondary' size='flex'>
              New Transaction
            </Button>
          </FlexBox>
          <FlexBox width='100%'>
            <AssetTransactionTable asset={selectedAsset} />
          </FlexBox>
        </>
      )}
    </FlexBox>
  )
}

export default Portfolio
