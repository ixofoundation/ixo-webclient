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
import { useDispatch, useSelector } from 'react-redux'
import { selectTransactionProps } from '../bond/bond.selectors'
import { useState } from 'react'
import { useEffect } from 'react'

interface Props {
  selectedHeader: string
}

export const BondTable: React.SFC<Props> = ({ selectedHeader }) => {
  const dispatch = useDispatch();
  const transactions: any = useSelector(selectTransactionProps)
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    if (transactions?.length) {
      setTableData(transactions.map(transaction => {
        return {
        date: {
          status: transaction.status,
          date: new Date(transaction.timestamp),
        },
        buySell: transaction.buySell,
        quantity: transaction.quantity,
        price: 12,
        value: {
          value: transaction.price,
          txhash: transaction.txhash,
        }
      }}))
    } else {
      setTableData([]);
    } 
  }, [transactions])

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
