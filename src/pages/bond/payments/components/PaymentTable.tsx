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
    Header: 'STATUS',
    accessor: 'status',
  },
  {
    Header: 'TYPE',
    accessor: 'type',
  },
  {
    Header: 'SOURCE',
    accessor: 'source',
  },
  {
    Header: 'CONDITIONS',
    accessor: 'conditions',
  },
  {
    Header: 'VALUE',
    accessor: 'value',
  },
]

const tableData = [
  {
    date: new Date(2020, 6, 6),
    status: 'Open',
    type: 'Success Fee',
    source: 'UBS Optimus',
    conditions: '(Target A > 90%) AND (Target B > 50%)',
    value: 'xUSD 1,500',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Expired',
    type: 'Loan Repayment',
    source: 'ixo.fund',
    conditions: '(Target C = 100%) OR (Target D = 50%)',
    value: 'xUSD 1,500',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Failed',
    type: 'Revenue Share',
    source: 'ixo.world',
    conditions: 'UBSOF: Payment for Services: Evaluation',
    value: 'xUSD 1,500',
  },
  {
    date: new Date(2020, 6, 6),
    status: 'Paid',
    type: 'Loan Repayment',
    source: 'ixo.fund',
    conditions: '(Target C = 100%) OR (Target D = 50%)',
    value: 'xUSD 1,500',
  },
]

const PaymentTable: FunctionComponent = () => {
  return (
    <div>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

export default PaymentTable
