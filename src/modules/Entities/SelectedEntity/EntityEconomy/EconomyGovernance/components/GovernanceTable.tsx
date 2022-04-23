import React, { FunctionComponent } from 'react'
import {
  Table,
} from 'common/components/Dashboard'

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'PROPOSAL TYPE',
    accessor: 'type',
  },
  {
    Header: 'RESULT',
    accessor: 'result',
  },
  {
    Header: 'DESCRIPTION',
    accessor: 'description',
  },
  {
    Header: 'PROPOSAL',
    accessor: 'proposalId',
  },
  {
    Header: 'VALUE',
    accessor: 'vote',
  },
]

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

export interface GovernanceTableRow {
  proposalId: string,
  date: string,
  result: string,
  description: string,
  vote: string,
  type: string
}

interface GovernanceTableProps {
  data: GovernanceTableRow[]
}

const GovernanceTable: FunctionComponent<GovernanceTableProps> = ({
  data
}) => {
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default GovernanceTable
