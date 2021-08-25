import React, { useMemo, Fragment } from 'react'
import {
  TableContainer,
  StyledHeader,
  StyledButton,
} from './PriceTable/index.style'
import Table from './PriceTable'
import StakeTransactionTable from './StakeTransactionTable'
import CapitalTransactionTable from './CapitalTransactionTable'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { useDispatch } from 'react-redux'

const tableData = [
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: false,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
]

interface Props {
  selectedHeader: string
}

export const BondTable: React.SFC<Props> = ({ selectedHeader }) => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Buy/Sell',
        accessor: 'buySell',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    [],
  )

  const onPlaceAnOrder = (): void => {
    dispatch(toggleAssistant({
      fixed: true,
      intent: `/bond_order{"userID":"","entityID":"",trigger":"proto_sign","agentRole":"","creator":"","conversation_id":""}`,
    }))
  }

  return (
    <Fragment>
      {
        selectedHeader === 'price' && (
          <Fragment>
            <StyledHeader>
              EDU Transactions
              <StyledButton onClick={onPlaceAnOrder}>Place an Order</StyledButton>
            </StyledHeader>
            <TableContainer>
              <Table columns={columns} data={tableData} />
            </TableContainer>
          </Fragment>
        )
      }
      {
        selectedHeader === 'stake' && (
          <StakeTransactionTable />
        )
      }
      {
        selectedHeader === 'raised' && (
          <CapitalTransactionTable />
        )
      }
      {
        selectedHeader === 'reverse' && (
          <CapitalTransactionTable />
        )
      }
    </Fragment>
  )
}

export default BondTable
