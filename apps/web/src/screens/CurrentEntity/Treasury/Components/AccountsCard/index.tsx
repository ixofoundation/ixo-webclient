import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Table } from 'components/Table'
import CurrencyFormat from 'react-currency-format'
import { truncateString } from 'utils/formatters'
import { ReactComponent as CopyIcon } from '/public/assets/images/icon-copy.svg'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ReactComponent as GroupAccountIcon } from '/public/assets/images/icon-group-account.svg'
import { ReactComponent as EntityAccountIcon } from '/public/assets/images/icon-entity-account.svg'
import { ReactComponent as LinkedAccountIcon } from '/public/assets/images/icon-linked-account.svg'
import { successToast } from 'utils/toast'
import Tooltip from 'components/Tooltip/Tooltip'
import { capitalize } from 'lodash'
import { TTreasuryAccountModel, TTreasuryCoinModel } from '../../InvestmentFunding/Accounts'
import BigNumber from 'bignumber.js'
import { renderTableHeader } from 'components/Table/Table'

export const AccountTypeToIconMap = {
  group: GroupAccountIcon,
  entity: EntityAccountIcon,
  linked: LinkedAccountIcon,
}

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
        outline-color: ${(props) => props.theme.colors.blue[5]};
      }
    }
  }

  table tbody {
    display: block;
    max-height: 300px;
    overflow-y: auto;
    padding: 4px;

    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-track {
      background-color: none;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #0d3c52;
      border-radius: 10px;
      background-clip: padding-box;
    }
  }
  table thead,
  table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    margin: 4px 0px;
  }
`

interface Props {
  accounts: { [address: string]: TTreasuryAccountModel }
  onSelect: (address: string) => void
}

const AccountsCard: React.FC<Props> = ({ accounts, onSelect }) => {
  const theme = useMantineTheme()
  const columns = [
    {
      Header: renderTableHeader('Name'),
      accessor: 'name',
      renderCell: (cell: any) => {
        const name = cell.value
        const address = cell.row.original?.address
        const type = cell.row.original?.type
        const Icon = AccountTypeToIconMap[type]

        return (
          <FlexBox $alignItems='center' $gap={2} p={4}>
            <FlexBox $direction='column' $gap={4}>
              <FlexBox $alignItems='center' $gap={2}>
                {Icon && (
                  <SvgBox
                    width='32px'
                    height='32px'
                    $alignItems='center'
                    $justifyContent='center'
                    $svgWidth={6}
                    $svgHeight={6}
                    $borderRadius='100%'
                    background={theme.ixoDarkBlue}
                    style={{ flex: 1 }}
                  >
                    <Icon />
                  </SvgBox>
                )}
                <Typography variant='secondary' size='2xl'>
                  {name || truncateString(address, 10, 'middle')}
                </Typography>
              </FlexBox>

              <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
                <FlexBox $alignItems='center' $gap={2} onClick={(e) => e.stopPropagation()}>
                  <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                    {truncateString(address, 20, 'middle')}
                  </Typography>
                  <SvgBox color={theme.colors.blue[5]} $svgWidth={6} $svgHeight={6}>
                    <CopyIcon />
                  </SvgBox>
                </FlexBox>
              </CopyToClipboard>
            </FlexBox>
          </FlexBox>
        )
      },
    },
    {
      Header: renderTableHeader('Value', 'flex-end'),
      accessor: 'coins',
      renderCell: (cell: any) => {
        const balance = Object.values(cell.value as { [denom: string]: TTreasuryCoinModel }).reduce(
          (acc, cur) => new BigNumber(cur.balance).times(cur.lastPriceUsd).plus(new BigNumber(acc)).toFixed(2),
          '0',
        )
        const network = cell.row.original?.network
        return (
          <FlexBox height='100%' $direction='column' $justifyContent='space-between' $alignItems='end' p={4}>
            <Typography size='2xl'>
              <CurrencyFormat prefix='$' displayType={'text'} value={balance} thousandSeparator decimalScale={2} />
            </Typography>
            <Typography color='dark-blue'>{network}</Typography>
          </FlexBox>
        )
      },
    },
  ]
  const [filter, setFilter] = useState({
    group: true,
    entity: true,
    linked: true,
  })

  const handleRowClick = (state: any) => () => {
    onSelect(state.original.address)
  }

  return (
    <FlexBox
      position='relative'
      $direction='column'
      $gap={8}
      p={8}
      background='#012D41'
      $borderRadius='12px'
      color={theme.ixoWhite}
    >
      {/* Header */}
      <FlexBox>
        <Typography variant='secondary' size='2xl'>
          Accounts
        </Typography>
      </FlexBox>

      <FlexBox position='absolute' top={'110px'} left={'0px'} width='100%' $justifyContent='center' $gap={2}>
        {Object.entries(AccountTypeToIconMap).map(([key, Icon]) => (
          <Tooltip key={key} text={capitalize(key) + ' accounts'}>
            <SvgBox
              width='32px'
              height='32px'
              $alignItems='center'
              $justifyContent='center'
              $svgWidth={6}
              $svgHeight={6}
              $borderRadius='100%'
              background={filter[key] ? theme.colors.blue[5] : theme.ixoDarkBlue}
              cursor='pointer'
              onClick={() => setFilter((filter) => ({ ...filter, [key]: !filter[key] }))}
            >
              <Icon />
            </SvgBox>
          </Tooltip>
        ))}
      </FlexBox>

      <TableWrapper>
        <Table
          columns={columns}
          data={Object.values(accounts).filter(({ type }) => filter[type])}
          getRowProps={(state) => {
            return {
              style: { height: 100, cursor: 'pointer' },
              onClick: handleRowClick(state),
            }
          }}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </FlexBox>
  )
}

export default AccountsCard
