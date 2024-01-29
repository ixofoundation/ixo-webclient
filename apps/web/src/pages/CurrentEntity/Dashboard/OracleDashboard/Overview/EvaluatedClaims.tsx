import React from 'react'
import Table, { renderTableHeader } from 'components/Table/Table'
import { truncateString } from 'utils/formatters'
import { ReactComponent as IXOIcon } from 'assets/images/icon-ixo.svg'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'
import styled, { useTheme } from 'styled-components'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

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

const EvaluatedClaims: React.FC = () => {
  const theme: any = useTheme()

  const columns = [
    {
      Header: renderTableHeader('Date Status'),
      accessor: 'timestamp',
      sortable: true,
      renderCell: (cell: any) => {
        const status = cell.row.original?.status
        return (
          <FlexBox p={5} position={'relative'}>
            <FlexBox
              position='absolute'
              top={'50%'}
              left={'0px'}
              transform='translate(-50%, -50%)'
              width='12px'
              height='40px'
              borderRadius='100px'
              background={theme[status] ?? theme.rejected}
            />
            <Typography color='white'>
              {'3h 45m'}{' '}
              <Typography color='light-blue' size='md'>
                ago
              </Typography>
            </Typography>
          </FlexBox>
        )
      },
    },
    {
      Header: renderTableHeader('Action'),
      accessor: 'action',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>Claim Approved</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Asset'),
      accessor: 'asset',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>Supamoto #123</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Impact'),
      accessor: 'impact',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>235 kgCO2e</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Proof'),
      accessor: 'proof',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography color='blue'>{truncateString('ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm965', 10)}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Value'),
      accessor: 'value',
      renderCell: (cell: any) => (
        <FlexBox height='100%'>
          <FlexBox width='100%' height='100%' p={5} alignItems='center' background={theme.ixoNavyBlue} gap={2.5}>
            <IXOIcon />
            <Typography weight='bold'>235 CARBON</Typography>
          </FlexBox>
          <FlexBox height='100%' alignItems='center' background={theme.ixoMediumBlue}>
            <SvgBox width='60px' alignItems='center' justifyContent='center' color={theme.ixoNewBlue} svgWidth={5.5}>
              <EyeIcon />
            </SvgBox>
          </FlexBox>
        </FlexBox>
      ),
    },
  ]

  return (
    <TableWrapper>
      <Table
        columns={columns}
        data={[{}]}
        getRowProps={() => ({ style: { height: 70 } })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
    </TableWrapper>
  )
}

export default EvaluatedClaims
