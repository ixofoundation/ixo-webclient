import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'
import { customQueries } from '@ixo/impactxclient-sdk'
import { useHistory } from 'react-router-dom'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }

    tbody > tr {
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const renderTableHeader = (name: string, justifyContent = 'flex-start') => (
  <FlexBox
    p={4}
    justifyContent={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </FlexBox>
)

const columns = [
  {
    Header: renderTableHeader('Token'),
    accessor: 'name',
    renderCell: (cell: any) => {
      const coinDenom = cell.row.original?.coinDenom
      const coinMinimalDenom = cell.row.original?.coinMinimalDenom
      const coinImageUrl = cell.row.original?.coinImageUrl

      return (
        <FlexBox alignItems='center' gap={2} p={4}>
          <img src={coinImageUrl} alt='' width='38px' height='38px' />
          <FlexBox direction='column'>
            <Typography size='lg'>{coinDenom}</Typography>
            <Typography size='md'>{coinMinimalDenom}</Typography>
          </FlexBox>
        </FlexBox>
      )
    },
  },
  {
    Header: renderTableHeader('Amount', 'flex-end'),
    accessor: 'balance',
    renderCell: (cell: any) => {
      const lastPriceUsd = cell.row.original?.lastPriceUsd
      const balanceUsd = new BigNumber(cell.value).times(lastPriceUsd).toString()
      return (
        <FlexBox direction='column' alignItems='end' p={4}>
          <Typography size='lg'>
            <CurrencyFormat
              displayType={'text'}
              value={new BigNumber(cell.value).toString()}
              thousandSeparator
              decimalScale={2}
            />
          </Typography>
          <Typography size='md' color='dark-blue'>
            <CurrencyFormat prefix='$' displayType={'text'} value={balanceUsd} thousandSeparator decimalScale={2} />
          </Typography>
        </FlexBox>
      )
    },
  },
]

interface Props {
  balances: Coin[]
  full?: boolean
}

const MyStakes: React.FC<Props> = ({ balances, full = true }) => {
  const history = useHistory()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (balances.length > 0) {
      const denoms = balances.map(({ denom }) => denom)
      customQueries.currency.findTokensInfoFromDenoms(denoms).then((tokensInfo) => {
        setData(
          tokensInfo.map((tokenInfo) => {
            const { lastPriceUsd, symbol, priceChangePercent } = tokenInfo
            const { coinDenom, coinMinimalDenom, coinImageUrl, coinDecimals } =
              customQueries.currency.findTokenFromDenom(symbol)
            const microBalance = balances.find(({ denom }) => denom === coinMinimalDenom)?.amount ?? '0'
            const balance = new BigNumber(microBalance).dividedBy(Math.pow(10, coinDecimals)).toString()
            return { coinDenom, coinMinimalDenom, coinImageUrl, lastPriceUsd, balance, priceChangePercent }
          }),
        )
      })
    }
  }, [balances])

  const handleAddStake = () => {
    console.log('Stake Modal popups')
  }

  const handleRowClick = (state: any) => () => {
    const { original } = state
    // original = { coinDenom, coinMinimalDenom, coinImageUrl, lastPriceUsd, balance, priceChangePercent }
    history.push({
      pathname: history.location.pathname,
      search: `?token=${original.coinMinimalDenom}`,
      state: original,
    })
  }

  return (
    <>
      <FlexBox width='100%' direction='column' gap={3}>
        <TableWrapper>
          <Table
            columns={columns}
            data={data}
            getRowProps={(state) => ({
              style: { height: 70, cursor: 'pointer' },
              onClick: handleRowClick(state),
            })}
            getCellProps={() => ({ style: { background: '#023044' } })}
          />
        </TableWrapper>
      </FlexBox>
      <Button
        variant='secondary'
        onClick={handleAddStake}
        size='flex'
        height={40}
        textSize='base'
        textTransform='capitalize'
        textWeight='medium'
      >
        Add Stake
      </Button>
    </>
  )
}

export default MyStakes
