import Image from 'next/image'
import React, { useMemo } from 'react'
import Table, { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import { timeAgo } from 'utils/time'
import { Column } from 'react-table'
import { evaluationStatusMap } from 'utils/claims/evaluationStatusMap'
import { capitalize } from 'lodash'
import { IconEye, IconIxo } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

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
  const theme = useMantineTheme()

  const columns: Column<Evaluation>[] = useMemo(() => {
    return [
      {
        Header: renderTableHeader('Date Status'),
        accessor: 'claim',
        sortable: true,
        Cell: ({ cell }) => {
          const status = cell.row.original.status
          return (
            <Flex p={5} pos={'relative'}>
              <Flex
                pos='absolute'
                top={'50%'}
                left={'0px'}
                style={{
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '100px',
                }}
                w='12px'
                h='40px'
                bg={theme[evaluationStatusMap.get(status)?.toLowerCase() as any] ?? theme.colors.red[3]}
              />
              <Typography color='white'>{timeAgo.format(new Date(cell.value.submissionDate))}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Action'),
        accessor: 'status',
        Cell: ({ cell }) => (
          <Flex p={5}>
            <Typography>Claim {capitalize(evaluationStatusMap.get(cell.value))}</Typography>
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Asset'),
        accessor: 'asset',
        Cell: ({ cell }) => (
          <Flex p={5}>
            <Typography>Supamoto #123</Typography>
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Value'),
        accessor: 'value',
        Cell: ({ cell }) => (
          <Flex h='100%'>
            <Flex w='100%' h='100%' p={5} align='center' bg={theme.colors.blue[7]} gap={2.5}>
              <Image src={IconIxo} alt='IXO' width={5} height={5} color={theme.colors.blue[5]} />
              <Typography weight='bold'>235 CARBON</Typography>
            </Flex>
            <Flex h='100%' align='center' bg={theme.colors.blue[3]}>
              <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
          </Flex>
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
