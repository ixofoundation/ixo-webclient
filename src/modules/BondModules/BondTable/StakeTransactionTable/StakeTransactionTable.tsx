import React, { useMemo, Fragment, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Pagination } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.styles'
import { RootState } from 'common/redux/types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTransactionProps } from 'modules/BondModules/bond/bond.selectors'
import { formatCurrency } from 'modules/Account/Account.utils'
import Table from '../PriceTable'
import { TableStyledHeader } from '..'
import { StyledTableContainer } from '../index.styles'

export const StyledPagination = styled(Pagination)<{ dark: boolean }>`
  & a.page-link {
    color: ${(props): string => (props.dark ? '#83d9f2' : '#107591')};
  }
`
interface Props {
  isDark: boolean
}

export const StakeTransactionTable: React.SFC<Props> = ({ isDark }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        width: '100px',
      },
      {
        Header: 'BUY/SELL',
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
        Header: 'VALUE',
        accessor: 'value',
      },
    ],
    [],
  )
  const { symbol, reserveDenom } = useSelector((state: RootState) => state.activeBond)
  const transactions: any = useSelector(selectTransactionProps)
  const [tableData, setTableData] = useState([])

  // pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage] = useState(5)
  const [selected, setSelected] = useState(0)

  const handlePageClick = (event: any): void => {
    setSelected(event.selected)
    const newOffset = (event.selected * itemsPerPage) % tableData.length
    setItemOffset(newOffset)
  }

  useEffect(() => {
    // Fetch items from another resources.
    if (tableData.length > 0) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(tableData.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(tableData.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, tableData])

  useEffect(() => {
    if (transactions?.length) {
      setTableData(
        transactions
          .filter((transaction: any) => {
            return transaction.isMyStake
          })
          .map((transaction: any) => {
            return {
              // height: transaction.height,
              status: transaction.status,
              date: transaction.timestamp,
              buySell: transaction.buySell,
              quantity: transaction.quantity,
              price:
                symbol !== 'xusd'
                  ? formatCurrency({
                      amount: transaction.price,
                      denom: reserveDenom,
                    }).amount!.toFixed(3)
                  : Number(transaction.price).toFixed(3),
              denom: formatCurrency({
                amount: transaction.price,
                denom: reserveDenom,
              }).denom,
              value: {
                value:
                  symbol !== 'xusd'
                    ? formatCurrency({
                        amount: transaction.quantity * transaction.price,
                        denom: reserveDenom,
                      }).amount!.toFixed(2)
                    : (transaction.quantity * transaction.price).toFixed(2),
                txhash: transaction.txhash,
                log: transaction.raw_log,
              },
            }
          })
          .reverse(),
      )
    } else {
      setTableData([])
    }
    // eslint-disable-next-line
  }, [transactions])

  return (
    <Fragment>
      <TableStyledHeader dark={isDark}>{symbol.toUpperCase()} Transactions</TableStyledHeader>
      <StyledTableContainer dark={isDark}>
        <Table columns={columns} data={currentItems} />
      </StyledTableContainer>
      <StyledPagination dark={isDark} className='d-flex justify-content-center'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          forcePage={selected}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='Previous'
          renderOnZeroPageCount={null!}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
        />
      </StyledPagination>
    </Fragment>
  )
}

export default StakeTransactionTable
