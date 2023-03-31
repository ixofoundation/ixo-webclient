import { FlexBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import styled from 'styled-components'

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
    Header: renderTableHeader('Name'),
    accessor: 'name',
    renderCell: (cell: any) => {
      const id = cell.row.original?.id
      const title = cell.row.original?.title

      return (
        <FlexBox p={4}>
          <Typography size='lg'>
            #{id} {title}
          </Typography>
        </FlexBox>
      )
    },
  },
  {
    Header: renderTableHeader('Value', 'flex-end'),
    accessor: 'value',
    renderCell: (cell: any) => {
      return null
    },
  },
]

interface Props {
  full?: boolean
}

const MyProposals: React.FC<Props> = ({ full = true }) => {
  const data = [
    { id: 13, title: 'Extend project funding' },
    { id: 14, title: 'Extend project funding' },
  ]

  const handleNewProposal = () => {
    console.log('new proposal')
  }

  const handleRowClick = (state: any) => () => {
    const { original } = state
    console.log({ original })
    // original = { coinDenom, coinMinimalDenom, coinImageUrl, lastPriceUsd, balance, priceChangePercent }
    // history.push({
    //   pathname: history.location.pathname,
    //   search: `?token=${original.coinMinimalDenom}`,
    //   state: original,
    // })
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
        onClick={handleNewProposal}
        size='flex'
        height={40}
        textSize='base'
        textTransform='capitalize'
        textWeight='medium'
      >
        New Proposal
      </Button>
    </>
  )
}

export default MyProposals
