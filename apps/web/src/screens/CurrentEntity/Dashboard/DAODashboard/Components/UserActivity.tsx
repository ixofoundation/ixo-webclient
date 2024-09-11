import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Card, TabButton } from '../../../Components'
import { Table } from 'components/Table'
import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'














import { truncateString } from 'utils/formatters'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 4px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }
  }
`

const renderTableHeader = (name: string) => (
  <Box p={5}>
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </Box>
)

const UserActivity: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const [tab, setTab] = useState('Transactions')

  const columns = [
    {
      Header: renderTableHeader('Date Status'),
      accessor: 'age',
      sortable: true,
      renderCell: (cell: any) => {
        const status = cell.row.original?.status
        return (
          <FlexBox p={5} position={'relative'}>
            <Box
              position='absolute'
              top={'50%'}
              left={'0px'}
              transform='translate(-50%, -50%)'
              width='12px'
              height='40px'
              $borderRadius='100px'
              background={theme[status] ?? theme.rejected}
            />
            <Typography color='white'>
              {cell.value}{' '}
              <Typography color='light-blue' size='md'>
                ago
              </Typography>
            </Typography>
          </FlexBox>
        )
      },
    },
    {
      Header: renderTableHeader('Type'),
      accessor: 'type',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>{cell.value}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Purpose'),
      accessor: 'purpose',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>{cell.value}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Description'),
      accessor: 'description',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>{truncateString(cell.value, 50)}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Value'),
      accessor: 'value',
      renderCell: (cell: any) => (
        <FlexBox height='100%'>
          <FlexBox width='100%' height='100%' p={5} $alignItems='center' background={theme.ixoNavyBlue} $gap={2.5}>
            <img src="/assets/images/icon-ixo.svg"  />
            <Typography weight='bold'>{Intl.NumberFormat().format(cell.value)}</Typography>
          </FlexBox>
          <FlexBox height='100%' $alignItems='center' background={theme.ixoMediumBlue}>
            <SvgBox width='60px' $alignItems='center' $justifyContent='center' color={theme.ixoNewBlue} $svgWidth={5.5}>
              <img src="/assets/images/icon-eye.svg"  />
            </SvgBox>
          </FlexBox>
        </FlexBox>
      ),
    },
  ]

  return (
    <Card icon={<img src="/assets/images/icon-clock.svg"  />} label='Activity'>
      <FlexBox width='100%' $gap={3}>
        <TabButton active={tab === 'Transactions'} preIcon={<img src="/assets/images/icon-swap.svg"  />} onClick={() => setTab('Transactions')}>
          Transactions
        </TabButton>
        <TabButton active={tab === 'Proposals'} preIcon={<img src="/assets/images/icon-paper.svg"  />} onClick={() => setTab('Proposals')}>
          Proposals
        </TabButton>
        <TabButton active={tab === 'Claims'} preIcon={<img src="/assets/images/icon-claim.svg"  />} onClick={() => setTab('Claims')}>
          Claims
        </TabButton>
        <TabButton active={tab === 'Members'} preIcon={<img src="/assets/images/icon-profile.svg"  />} onClick={() => setTab('Members')}>
          Members
        </TabButton>
        <TabButton active={tab === 'Policies'} preIcon={<img src="/assets/images/icon-profile.svg"  />} onClick={() => setTab('Policies')}>
          Policies
        </TabButton>
      </FlexBox>

      <TableWrapper>
        <Table
          columns={columns}
          data={[]}
          getRowProps={() => ({ style: { height: 70 } })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </Card>
  )
}

export default UserActivity
