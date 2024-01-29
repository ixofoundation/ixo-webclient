import { Coin } from '@cosmjs/proto-signing'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React, { useState } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import AssetBalanceCard from './AssetBalanceCard'
import AssetTransactionTable from './AssetTransactionTable'
import { useIxoConfigs } from 'hooks/configs'

const Portfolio: React.FC = () => {
  const { convertToDenom } = useIxoConfigs()
  const { balances, address } = useAccount()
  const [selectedAsset, setSelectedAsset] = useState<Coin | undefined>(undefined)

  return (
    <FlexBox width='100%' direction='column' gap={4}>
      <Typography variant='secondary' size='2xl'>
        Assets
      </Typography>
      <FlexBox width='100%' gap={4} mb={4}>
        {balances.map((balance, index) => (
          <AssetBalanceCard
            key={index}
            asset={balance}
            selected={selectedAsset?.denom === balance.denom}
            onClick={() => setSelectedAsset(balance)}
          />
        ))}
      </FlexBox>

      {selectedAsset && (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography variant='secondary' size='2xl'>
              Reserve Account Transactions ({convertToDenom(selectedAsset)?.denom.toUpperCase()})
            </Typography>
            <Button variant='secondary' size='flex'>
              New Transaction
            </Button>
          </FlexBox>
          <FlexBox width='100%'>
            <AssetTransactionTable address={address} asset={selectedAsset} />
          </FlexBox>
        </>
      )}
    </FlexBox>
  )
}

export default Portfolio
