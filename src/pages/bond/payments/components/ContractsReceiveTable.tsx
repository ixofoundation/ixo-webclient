import React, { FunctionComponent } from 'react'
import Table from './ContractsTable'

const columns = [
  {
    Header: 'Created',
    accessor: 'date',
    align: 'left',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    align: 'left',
  },
  {
    Header: 'TYPE',
    accessor: 'type',
    align: 'left',
  },
  {
    Header: 'RECEIVED FROM',
    accessor: 'source',
    align: 'left',
  },
  {
    Header: 'CONDITIONS',
    accessor: 'conditions',
    align: 'left',
  },
  {
    Header: 'DISCOUNT',
    accessor: 'discount',
    align: 'left',
  },
  {
    Header: 'RECEIVED(REMAINING)',
    accessor: 'value',
    align: 'left',
  },
]

const tableData = [
  {
    date: new Date(2020, 6, 6),
    status: 'Open',
    type: 'Success Fee',
    source: 'did:ixo:eRE42s...',
    conditions: 'This is a condition that has max string length',
    discount: '5%',
    value: 'xUSD 1,500 (1000)',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Cancelled',
    type: 'Success Fee',
    source: 'did:ixo:eRE42s...',
    conditions: 'This is a condition that has max string length',
    discount: '5%',
    value: 'xUSD 1,500 (1000)',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Expired',
    type: 'Loan Repayment',
    source: 'ixo.fund',
    conditions: '(Target C = 100%) OR (Target D = 50%)',
    discount: '–',
    value: 'xUSD 1,500 (1000)',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Failed',
    type: 'Revenue Share',
    source: 'ixo.world',
    conditions: 'UBSOF: Payment for Services: Evaluation',
    discount: '5%',
    value: 'xUSD 1,500 (1000)',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Paid',
    type: 'Loan Repayment',
    source: 'ixo.fund',
    conditions: '(Target C = 100%) OR (Target D = 50%)',
    discount: '5%',
    value: 'xUSD 1,500 (1000)',
  },
]

const ContractsReceiveTable: FunctionComponent = () => {
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default ContractsReceiveTable
