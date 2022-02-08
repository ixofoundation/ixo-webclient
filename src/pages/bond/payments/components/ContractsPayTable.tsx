import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import Table from './ContractsTable'
import Axios from 'axios'
import { selectEntityDid } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { useSelector } from 'react-redux'

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

const ContractsPayTable: FunctionComponent = () => {
  const [availableContracts, setAvailableContracts] = useState<any[]>([])
  const entityDid = useSelector(selectEntityDid)
  const getTableData = (contracts) =>
    contracts.map((contract) => ({
      date: new Date(2020, 6, 6),
      status: 'Paid',
      type: 'Loan Repayment',
      source: contract.id,
      conditions: '(Target C = 100%) OR (Target D = 50%)',
      discount: '10',
      value: 'xUSD 1,500 (1000)',
    }))

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/payments/contracts_by_id_prefix/payment:contract:${entityDid}`,
    ).then((response) => setAvailableContracts(response.data.result ?? []))
    // eslint-disable-next-line
  })
  const tableData = useMemo(() => getTableData(availableContracts), [
    availableContracts,
  ])
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default ContractsPayTable
