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
    accessor: 'proposal',
  },
  {
    Header: 'VALUE',
    accessor: 'vote',
  },
]

const tableData = [
  {
    date: new Date(2020, 6, 6),
    type: 'Technical',
    result: 'Passed (67%)',
    description: 'Add IRIS metrics to performance reporting',
    proposal: '#3',
    vote: '453 Yes /  800 No / 12 Veto'
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Technical',
    result: 'Passed (67%)',
    description: 'Add IRIS metrics to performance reporting',
    proposal: '#3',
    vote: '453 Yes /  800 No / 12 Veto'
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Technical',
    result: 'Passed (67%)',
    description: 'Add IRIS metrics to performance reporting',
    proposal: '#3',
    vote: '453 Yes /  800 No / 12 Veto'
  },
]

const OutcomeTable: FunctionComponent = () => {
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default OutcomeTable
