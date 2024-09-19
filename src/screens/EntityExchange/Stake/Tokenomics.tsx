import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useGetTokenomics } from 'graphql/tokens'
import React, { useMemo } from 'react'

const Tokenomics: React.FC = () => {
  const {
    data: { tokenomicsInflation, tokenomicsSupplyStaked },
  } = useGetTokenomics()
  const apr = useMemo(
    () =>
      new BigNumber(tokenomicsInflation).dividedBy(
        new BigNumber(tokenomicsSupplyStaked.bondedTokens).dividedBy(
          new BigNumber(tokenomicsSupplyStaked.bondedTokens).plus(tokenomicsSupplyStaked.notBondedTokens),
        ),
      ),
    [tokenomicsInflation, tokenomicsSupplyStaked],
  )

  return (
    <FlexBox $gap={4} $alignItems='center'>
      <Typography color='blue' weight='bold'>
        Inflation: {tokenomicsInflation.toFixed(2)}%
      </Typography>
      <Typography color='blue' weight='bold'>
        APY: {apr.toFixed(2)}%
      </Typography>
    </FlexBox>
  )
}

export default Tokenomics
