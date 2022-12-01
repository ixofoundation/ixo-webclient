import React, { FunctionComponent } from 'react'
import { ContractTableData } from '../types'
import Table from './ContractsTable/ContractTable'

const columns = [
  {
    Header: 'Created',
    accessor: 'date',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
  {
    Header: 'TYPE',
    accessor: 'type',
  },
  {
    Header: 'RECEIVED FROM',
    accessor: 'source',
  },
  {
    Header: 'CONDITIONS',
    accessor: 'conditions',
  },
  {
    Header: 'DISCOUNT',
    accessor: 'discount',
  },
  {
    Header: 'RECEIVED(REMAINING)',
    accessor: 'value',
  },
]

// const tableData = [
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Open',
//     type: 'Success Fee',
//     source: 'did:ixo:QMK87X9DaeXY6NmpV1peF9.',
//     conditions: 'This is a condition that has max string length',
//     discount: '5%',
//     value: 'xUSD 1,500 (1000)',
//   },
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Cancelled',
//     type: 'Success Fee',
//     source: 'did:ixo:QMK87X9DaeXY6NmpV1peF9',
//     conditions: 'This is a condition that has max string length',
//     discount: '5%',
//     value: 'xUSD 1,500 (1000)',
//   },
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Expired',
//     type: 'Loan Repayment',
//     source: 'did:ixo:QMK87X9DaeXY6NmpV1peF9',
//     conditions: '(Target C = 100%) OR (Target D = 50%)',
//     discount: '–',
//     value: 'xUSD 1,500 (1000)',
//   },
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Failed',
//     type: 'Revenue Share',
//     source: 'did:ixo:QMK87X9DaeXY6NmpV1peF9',
//     conditions: 'UBSOF: Payment for Services: Evaluation',
//     discount: '5%',
//     value: 'xUSD 1,500 (1000)',
//   },
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Paid',
//     type: 'Loan Repayment',
//     source: 'did:ixo:QMK87X9DaeXY6NmpV1peF9',
//     conditions: '(Target C = 100%) OR (Target D = 50%)',
//     discount: '5%',
//     value: 'xUSD 1,500 (1000)',
//   },
// ]

interface Props {
  tableData: ContractTableData[]
}

const ContractsReceiveTable: FunctionComponent<Props> = ({ tableData }) => {
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default ContractsReceiveTable
