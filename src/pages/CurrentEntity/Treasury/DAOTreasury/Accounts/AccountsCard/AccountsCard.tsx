import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import styled from 'styled-components'
import { Table } from 'components/Table'
import CurrencyFormat from 'react-currency-format'
import { truncateString } from 'utils/formatters'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ReactComponent as GroupAccountIcon } from 'assets/images/icon-group-account.svg'
import { ReactComponent as EntityAccountIcon } from 'assets/images/icon-entity-account.svg'
import { ReactComponent as LinkedAccountIcon } from 'assets/images/icon-linked-account.svg'
import { successToast } from 'utils/toast'

const AccountTypeToIconMap = {
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
        outline-color: ${(props) => props.theme.ixoNewBlue};
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
      background: ${(props): string => props.theme.ixoDarkBlue};
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
    Header: renderTableHeader('Name'),
    accessor: 'name',
    renderCell: (cell: any) => {
      const name = cell.value
      const address = cell.row.original?.address
      const type = cell.row.original?.type
      const Icon = AccountTypeToIconMap[type]

      return (
        <FlexBox alignItems='center' gap={2} p={4}>
          <FlexBox direction='column' gap={4}>
            <FlexBox alignItems='center' gap={2}>
              {Icon && (
                <SvgBox
                  width='32px'
                  height='32px'
                  alignItems='center'
                  justifyContent='center'
                  svgWidth={6}
                  svgHeight={6}
                  borderRadius='100%'
                  background={theme.ixoDarkBlue}
                >
                  <Icon />
                </SvgBox>
              )}
              <Typography variant='secondary' size='2xl'>
                {name}
              </Typography>
            </FlexBox>

            <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
              <FlexBox alignItems='center' gap={2} onClick={(e) => e.stopPropagation()}>
                <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                  {truncateString(address, 20, 'middle')}
                </Typography>
                <SvgBox color={theme.ixoNewBlue} svgWidth={6} svgHeight={6}>
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
    accessor: 'balance',
    renderCell: (cell: any) => {
      const balance = cell.value
      const network = cell.row.original?.network
      return (
        <FlexBox height='100%' direction='column' justifyContent='space-between' alignItems='end' p={4}>
          <Typography size='2xl'>
            <CurrencyFormat prefix='$' displayType={'text'} value={balance} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography color='dark-blue'>{network} network</Typography>
        </FlexBox>
      )
    },
  },
]

interface Props {
  accounts: { [address: string]: { address: string; name: string; network: string; type: string; balance: string } }
  onSelect: (address: string) => void
}

const AccountsCard: React.FC<Props> = ({ accounts, onSelect }) => {
  return (
    <FlexBox direction='column' gap={4} p={8} background='#012D41' borderRadius='12px' color={theme.ixoWhite}>
      {/* Header */}
      <FlexBox>
        <Typography variant='secondary' size='2xl'>
          Accounts
        </Typography>
      </FlexBox>

      <TableWrapper>
        <Table
          columns={columns}
          data={Object.values(accounts)}
          getRowProps={(state) => {
            return {
              style: { height: 100, cursor: 'pointer' },
              onClick: onSelect(state.original.address),
            }
          }}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </FlexBox>
  )
}

export default AccountsCard
