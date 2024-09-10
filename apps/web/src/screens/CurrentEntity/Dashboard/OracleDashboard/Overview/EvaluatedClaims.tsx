import React, { useMemo } from 'react'
import Table, { renderTableHeader } from 'components/Table/Table'

import IXOIcon from 'assets/images/icon-ixo.svg'

import EyeIcon from 'assets/images/icon-eye.svg'
import styled, { useTheme } from 'styled-components'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { timeAgo } from 'utils/time'
import { Column } from 'react-table'
import { evaluationStatusMap } from 'utils/claims/evaluationStatusMap'
import { capitalize } from 'lodash'

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

type Evaluation = {
  timestamp: string
  status: number
  action: string
  asset: string
  impact: string
  proof: string
  value: string
  claim: {
    submissionDate: string
  }
}

type EvaluatedClaimsProps = {
  evaluatedClaims: Evaluation[]
}

const EvaluatedClaims = ({ evaluatedClaims }: EvaluatedClaimsProps) => {
  const theme: any = useTheme()

  const columns: Column<Evaluation>[] = useMemo(() => {
    return [
      {
        Header: renderTableHeader('Date Status'),
        accessor: 'claim',
        sortable: true,
        Cell: ({ cell }) => {
          const status = cell.row.original.status
          return (
            <FlexBox p={5} position={'relative'}>
              <FlexBox
                position='absolute'
                top={'50%'}
                left={'0px'}
                transform='translate(-50%, -50%)'
                width='12px'
                height='40px'
                $borderRadius='100px'
                background={theme[evaluationStatusMap.get(status)?.toLowerCase() as any] ?? theme.rejected}
              />
              <Typography color='white'>{timeAgo.format(new Date(cell.value.submissionDate))}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Action'),
        accessor: 'status',
        Cell: ({ cell }) => (
          <FlexBox p={5}>
            <Typography>Claim {capitalize(evaluationStatusMap.get(cell.value))}</Typography>
          </FlexBox>
        ),
      },
      {
        Header: renderTableHeader('Asset'),
        accessor: 'asset',
        Cell: ({ cell }) => (
          <FlexBox p={5}>
            <Typography>Supamoto #123</Typography>
          </FlexBox>
        ),
      },
      {
        Header: renderTableHeader('Value'),
        accessor: 'value',
        Cell: ({ cell }) => (
          <FlexBox height='100%'>
            <FlexBox width='100%' height='100%' p={5} $alignItems='center' background={theme.ixoNavyBlue} $gap={2.5}>
              <IXOIcon />
              <Typography weight='bold'>235 CARBON</Typography>
            </FlexBox>
            <FlexBox height='100%' $alignItems='center' background={theme.ixoMediumBlue}>
              <SvgBox
                width='60px'
                $alignItems='center'
                $justifyContent='center'
                color={theme.ixoNewBlue}
                $svgWidth={5.5}
              >
                <EyeIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>
        ),
      },
    ]
  }, [theme])

  return (
    <TableWrapper>
      <Table
        columns={columns as any}
        data={evaluatedClaims}
        getRowProps={() => ({ style: { height: 70 } })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
    </TableWrapper>
  )
}

export default EvaluatedClaims
