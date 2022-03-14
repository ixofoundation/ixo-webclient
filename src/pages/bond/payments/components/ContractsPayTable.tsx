import React, { FunctionComponent } from 'react'
import { ContractTableData } from '../types'
import Table from './ContractsTable'

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
    Header: 'PAY TO',
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
    Header: 'PAID(REMAINING)',
    accessor: 'value',
  },
]

// {
//   "id": "payment:contract:did:ixo:QMK87X9DaeXY6NmpV1peF9:contract1",
//   "payment_template_id": "payment:template:did:ixo:QMK87X9DaeXY6NmpV1peF9:template1",
//   "creator": "ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48",
//   "payer": "ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48",
//   "recipients": [
//     {
//       "address": "ixo1425lx87mhpzawpp5a3a68ft0hue6l7ce6d0g78",
//       "percentage": "100.000000000000000000"
//     }
//   ],
//   "cumulative_pay": [
//   ],
//   "current_remainder": [
//   ],
//   "can_deauthorise": false,
//   "authorised": false,
//   "discount_id": "0"
// }

// const tableData = [
//   {
//     date: new Date(2020, 6, 6),
//     status: 'Open',
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
//     status: 'Cancelled',
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

const ContractsPayTable: FunctionComponent<Props> = ({ tableData }) => {
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default ContractsPayTable
