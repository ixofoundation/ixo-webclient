import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import moment from 'moment'
import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { truncateString } from 'utils/formatters'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'

const TableWrapper = styled.div<{ isDark: boolean }>`
  background: ${(props) => (props.isDark ? props.theme.ixoGradientDark2 : props.theme.ixoGradientLight)};
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.isDark ? '#083347' : undefined)};

  color: ${(props) => (props.isDark ? props.theme.ixoWhite : props.theme.ixoGrey900)};
  width: 100%;
  padding: 20px;

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

// const tableData = [
//   {
//     date: new Date(2020, 6, 6),
//     type: 'Technical',
//     result: 'Passed (67%)',
//     description: 'Add IRIS metrics to performance reporting',
//     proposal: '#3',
//     vote: '453 Yes /  800 No / 12 Veto'
//   },
//   {
//     date: new Date(2020, 6, 6),
//     type: 'Technical',
//     result: 'Passed (67%)',
//     description: 'Add IRIS metrics to performance reporting',
//     proposal: '#3',
//     vote: '453 Yes /  800 No / 12 Veto'
//   },
//   {
//     date: new Date(2020, 6, 6),
//     type: 'Technical',
//     result: 'Passed (67%)',
//     description: 'Add IRIS metrics to performance reporting',
//     proposal: '#3',
//     vote: '453 Yes /  800 No / 12 Veto'
//   },
// ]

const renderTableHeader = (name: string) => (
  <Box p={3.5}>
    <Typography transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </Box>
)

export interface GovernanceTableRow {
  proposalId: string
  date: string
  result: string
  description: string
  vote: string
  type: string
}

interface GovernanceTableProps {
  data: GovernanceTableRow[]
}

const GovernanceTable: FunctionComponent<GovernanceTableProps> = ({ data }) => {
  const { isDark } = useContext(DashboardThemeContext)
  const columns = [
    {
      Header: renderTableHeader('Date'),
      accessor: 'date',
      renderCell: (cell: any) => (
        <FlexBox p={3.5} direction='column' gap={0.5}>
          <Typography noWrap>{moment(cell.value).format('DD MMM [‘]YY')}</Typography>
          <Typography size='md' color='grey700'>
            {moment(cell.value).format('HH:mm')}
          </Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Proposal Type'),
      accessor: 'type',
      renderCell: (cell: any) => (
        <FlexBox p={3.5}>
          <Typography>{cell.value}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Result'),
      accessor: 'result',
      renderCell: (cell: any) => (
        <FlexBox p={3.5}>
          <Typography>{cell.value}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Description'),
      accessor: 'description',
      renderCell: (cell: any) => (
        <FlexBox p={3.5}>
          <Typography>{truncateString(cell.value, 50)}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Proposal'),
      accessor: 'proposalId',
      renderCell: (cell: any) => (
        <FlexBox p={3.5}>
          <Typography>{cell.value}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Value'),
      accessor: 'vote',
      renderCell: (cell: any) => (
        <FlexBox height='100%' gap={0.5}>
          <FlexBox
            width='100%'
            height='100%'
            p={3.5}
            alignItems='center'
            background={isDark ? theme.ixoNavyBlue : theme.ixoGrey300}
            gap={2.5}
          >
            <Typography weight='bold'>{cell.value}</Typography>
          </FlexBox>
          <FlexBox height='100%' alignItems='center' background={isDark ? theme.ixoMediumBlue : theme.ixoGrey300}>
            <SvgBox width='60px' alignItems='center' justifyContent='center' color={theme.ixoBlue} svgWidth={5.5}>
              <EyeIcon />
            </SvgBox>
          </FlexBox>
        </FlexBox>
      ),
    },
  ]
  return (
    <TableWrapper isDark={isDark}>
      <Table
        columns={columns}
        data={data}
        getRowProps={() => ({ style: { height: 70 } })}
        getCellProps={() => ({ style: { background: isDark ? '#023044' : theme.ixoGrey100 } })}
      />
    </TableWrapper>
  )
}

export default GovernanceTable
