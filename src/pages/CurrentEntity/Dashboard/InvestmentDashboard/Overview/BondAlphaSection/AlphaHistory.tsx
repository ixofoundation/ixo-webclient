import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Table } from 'components/Table'
import moment from 'moment'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetBondAlphas } from 'graphql/bonds'

const TableWrapper = styled(FlexBox)`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
      overflow: hidden;
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
        width: 250px;
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

interface Props {
  bondDid: string
}

const AlphaHistory: React.FC<Props> = ({ bondDid }) => {
  const { data: alphas } = useGetBondAlphas(bondDid)

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Date'),
        accessor: 'timestamp',
        renderCell: (cell: any) => {
          const timestamp = cell.value
          const date = moment(timestamp).format('DD MMM ‘YY')
          const time = moment(timestamp).format('hh:mm')
          return (
            <FlexBox direction='column' gap={1} p={4}>
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Oracle ID'),
        accessor: 'oracleDid',
        renderCell: (cell: any) => {
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>{cell.value}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Value'),
        accessor: 'alpha',
        renderCell: (cell: any) => {
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(cell.value)}
              </Typography>
            </FlexBox>
          )
        },
      },
    ],
    [],
  )

  const onRowClick = (state: any) => () => {
    console.log('onRowClick', { state })
  }

  return (
    <TableWrapper
      width='100%'
      direction='column'
      borderRadius='4px'
      border={`1px solid #0C3549`}
      background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
      p={4}
    >
      <Table
        columns={columns}
        data={alphas}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {alphas.length === 0 && (
        <FlexBox
          width='100%'
          height='80px'
          alignItems='center'
          justifyContent='center'
          borderRadius='8px'
          background='#053549'
        >
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Alpha histories
          </Typography>
        </FlexBox>
      )}
    </TableWrapper>
  )
}

export default AlphaHistory
